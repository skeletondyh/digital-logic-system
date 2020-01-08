import requests
import json
import time
import threading 
import sys


url = 'http://localhost:3000/'

finished_thread = 0
start_time = 0
thread_num = 0

test_times = 35

def thread_finished():
    global start_time
    global thread_num
    global finished_threa
    finished_thread += 1
    if thread_num == finished_thread:
        print('time used:', time.time() - start_time)

class TestThread:
    # project_type = 1 文本编辑, 0 drag and drop
    def __init__(self, project_num, user, project_type):
        self.session = requests.Session()
        self.project_num = project_num
        self.user = user
        self.project_type = project_type
        
    def run(self):
        lock = threading.Lock()
        self.thread = threading.Thread(target=self.worker, args = (lock,))
        self.thread.start()

    def worker(self, lock):
        #login
        res = self.session.post(url + 'login/',
                            data = user)
                            
        if res.status_code != 200:
            print('error------------')
            print(res.text)

        #create project
        self.projectID_list = []
        for i in range(0, self.project_num):
            res = self.session.post(url + 'createProject/',
                            data = {
                                'projectName': 'test_drag_and_drop'+ str(test_times)+'_'+str(i),#####################
                                'topEntity': 'fe',
                                'inputFile': 'sim.vhd',
                                'projectType': self.project_type
                            })

            if res.status_code == 500:
                print('error: project name has been used--------------')
            elif res.status_code == 200:
                print('js loads', res.text)
                projectID = json.loads(res.text)['projectId']
                self.projectID_list.append(projectID)
                print(projectID)
        
        #upload files
        print('uplaod graph')
        for i in range(0, self.project_num):
            # 需要先进入project页面，后端才会设置res.locals.project
            # 然后才能uploadFile
            res = self.session.get(url + 'project?projectId=' + self.projectID_list[i])
            print('upload graph')

            # 这里可以看到 res.locals 被传到了前端，其中就包括 user 的完整数据
            # 也包括密码
            # print('project', res.text)

            # 有时会在这里出错 error2
            OD_fe = open('OD_fe', 'r').read()
            fe = open('fe', 'r').read()
            print('file read')

            res = self.session.post(
                url + 'file/uploadGraph',
                data = {
                    'OD_link': OD_fe,
                    'link': fe
                }
            )

            print(res.text)
        # boom: 如果不提供 projectId
        print('reload start')
        for i in range(0, self.project_num):
            array = [-1,]
            for j in range(0, 100):
                array.append(j*2)
            print(str(array))
            res = self.session.post(
                url + 'file/reloadJili',
                data = {
                    'projectId': self.projectID_list[i],
                    'inputSignal': '[\"RST\",\"CLK\"]',
                    'editSignal': '[[-1, 198],' + str(array) +']'
                }
            )

        print('sim start')
        # simulate boom
        for i in range(0, self.project_num):
            res = self.session.post(
                url + 'file/simulate/',
                data = {
                    'projectId': self.projectID_list[i]
                }
            )

            print('simulate', res.text)
        
        # #delete project
        # for i in range(0, self.project_num):
        #     #print(self.user['userName'])
        #     res = self.session.get(url + 'deleteProject?projectId=' + self.projectID_list[i])
        #     #print('delete project', res.text)
        #     if res.status_code != 200:
        #         print('error:-----------------')
        #         print(res.text)

        with lock:
            thread_finished()


start_time = time.time()

# 创建的用户数量只有50个
thread_num = 1
for i in range(0, thread_num):
    user = {
        'userName': 'user' + str(i),
        'password': 'password' + str(i)
    }
    thread = TestThread(1, user, 0)
    thread.run()