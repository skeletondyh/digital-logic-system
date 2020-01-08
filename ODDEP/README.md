# Project 7: Team of Taoli

## Set Up and Run
### Install npm dependencies and bower dependencies
In project path, /path/to/prj7_tot/ , run
```
/path/to/prj7_tot $ npm install
```
Install *bower* globally if not installed yet
```
$ npm install -g bower
```
Then install dependencies managed by *bower*
```
/path/to/prj7_tot $ bower install
```
### Config sqlite database
On first configuration: 
#### 1. Install sqlite3 globally
When in *Install npm dependencies*, node_module *sqlite3* has been installed, but the project also need the sqlite3 program.
To install sqlite3 globally
##### 1.1 On Ubuntu or Mac
```
$ sudo apt-get install sqlite3
```
##### 1.2 On Windows
Go to [SQLite Download Page](https://sqlite.org/download.html) and get the proper version installed for Windows.
#### 2. SetUp and Test database
##### 2.1 On Windows
```
/path/to/prj7_tot $ cd db
/path/to/prj7_tot/db $ sqlite3
sqlite> .read dbinit.sql
sqlite> .read dbtest-load.sql
sqlite> .save tot.db
sqlite> .exit
```
##### 2.2 On Ubuntu or Mac
Because there maybe no *.save* command on Ubuntu sqlite3, so you should open sqlite3 with the database name specified. Here the project uses *tot.db*.
```
/path/to/prj7_tot $ cd db
/path/to/prj7_tot/db $ sqlite3 tot.db
sqlite> .read dbinit.sql
sqlite> .read dbtest-load.sql
sqlite> .exit 
```
##### 2.3 Attention on Update Project
To update the project, you may need to reset the sqlite3 database file currently. Because database may change its format or structure.
You should run 
```
sqlite> .read dbrm.sql
```
firstly to remove old database before dbinit.sql.

#### 3. Set Up ModelSim Simulator
See TA's [Install ModelSim References](https://github.com/xgeric/2016-SE-TA/blob/master/ModelSim%E5%AE%89%E8%A3%85%E4%BD%BF%E7%94%A8%E6%89%8B%E5%86%8C.pdf)

To upload ModelSim installer to virtual machine on Azure or anywhere else, can use *scp* for simplicity. Because scp use 22 port as ssh.
Run
```
 $ scp /path/to/ModelSimSetup-16.0.0.211-linux.run  username@ip.ip.ip.ip:/path/to/put/modelsim
``` 
Then install ModelSim, cd to path to ModelSimSetup-16.0.0.211-linux.run, and run
```
 $ ./ModelSimSetup-16.0.0.211-linux.run
``` 
It will detect if your server has GUI, if not, it will just run in command line mode.

Then add path to environment variable to enable use modelsim globally.

Remember to solve 32bit dependencies on 64bit server after install.
```
sudo dpkg --add-architecture i386
sudo apt-get update
sudo apt-get install build-essential
```
At last, run
```
sudo apt-get install gcc-multilib g++-multilib \
lib32z1 lib32stdc++6 lib32gcc1 \
expat:i386 fontconfig:i386 libfreetype6:i386 libexpat1:i386 libc6:i386 libgtk-3-0:i386 \
libcanberra0:i386 libpng12-0:i386 libice6:i386 libsm6:i386 libncurses5:i386 zlib1g:i386 \
libx11-6:i386 libxau6:i386 libxdmcp6:i386 libxext6:i386 libxft2:i386 libxrender1:i386 \
libxt6:i386 libxtst6:i386
```
Then in any path, run vlib to test. 

## Members
| Name         | Email        
|:------------ |:------------
| Chen Yazheng |icyz14@163.com
| Li Chengjie  |licj14@mails.tsinghua.edu.cn
| Chen Minghao |cmh14@mails.tsinghua.edu.cn
| Tian Yu      |tianyu.bruce@gmail.com
| Ning Minxing |1554948687@qq.com

## ToDo 

### Future ToDo
1. ModelSim 模块化
    a. 请求(文件，激励）
    b. 结果返回

2. 激励信号可视化编辑

## HINTS

### Password encrypt
rock=`"yvykf07ej800be29TAOLIDIXIACHEDUI8nzoyyz0z5lsdcxr"`

1. In transport: md5(password+username+rock)
2. In Database Server: md5(md5(password+username+rock)+salt)

## References
### Nodejs Express etc.
[setting-up-express-with-nginx-and-pm2/](http://blog.danyll.com/setting-up-express-with-nginx-and-pm2/)

### Electrical Symbols Library SVG
[commons.wikimedia.org/wiki/File:Electrical_symbols_library.svg](https://commons.wikimedia.org/wiki/File:Electrical_symbols_library.svg)</br>

### Draw2d Library
[Draw2d touch](http://www.draw2d.org/draw2d/)
