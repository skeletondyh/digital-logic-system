var should = require('should');
var session = require('./session');
var dbtop = require('../../db/dbtop');
var md5 = require('js-md5');
var auth = require('./account');


describe('题目编辑模块', function() {

    describe('题目编辑页面', function() {
        it('GET /problem/edit/1001', function(done) {
            session.get('/problem/edit/1001')
            .expect(200, done);
        });

        it('GET /problem/edit/999 expect error page', function(done) {
            session.get('/problem/edit/999')
            .expect(404, done);
        });

        describe('权限测试', function() {
            before(function(done) {
                auth.login(session, auth.test, done);
            });
            after(function(done) {
                auth.login(session, auth.root, done);
            });

            it('权限大于零才能编辑题目', function(done) {
                session.get('/problem/edit/new')
                .expect(200, 'Permission denied.', done);
            });
        });
    });

    var probid = null;
    var getProbCnt = dbtop.env.getProblemCount;
    function pidPath() {
        return 999 + probid;
    }

    describe('新建题目', function() {

        before(function() {
            probid = getProbCnt();
        });
        
        it('GET /problem/edit/new', function(done) {
            session.get('/problem/edit/new')
            .expect(200, done);
        });
        
        it('POST /problem/edit/new', function(done) {
            probid += 1;
            session.post('/problem/edit/new')
            .send({
                title: 'test4new',
                source: 'supertest',
                limits: '["code"]',
                description: '1'
            })
            .expect(200, pidPath().toString(), done);
        });

        it('测试新建题目是否成功 JSON API', function(done) {
            try {
                probid.should.be.equal(getProbCnt());
            } catch(err) {
                done(err);
                return ;
            }
            session.get('/problem/' + pidPath() + '/limits')
            .accept('json')
            .expect(200, {
                status: 200,
                data: ["code"]
            }, done);
        });

    });

    describe('修改题目', function() {
        
        after(function(done) {
            dbtop.db().run('delete from problem where pid = ?'
            , pidPath(), done);
        });

        it('POST /problem/edit/<pid>', function(done) {
            session.post('/problem/edit/' + pidPath())
            .send({
                title: 'test4new',
                source: 'supertest',
                limits: '["test"]',
                description: '1'
            })
            .expect(200, 'OK', done);
        });

        it('测试修改题目是否成功 JSON API', function(done) {
            session.get('/problem/' + pidPath() + '/limits')
            .accept('json')
            .expect(200, {
                status: 200,
                data: ["test"]
            }, done);
        });

    });

});