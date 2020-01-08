var should = require('should');
var session = require('./session');
var auth = require('./account');
var dbtop = require('../../db/dbtop');


describe('后台管理模块', function() {

    describe('页面响应', function() {
        it('GET /admin', function(done) {
            session.get('/admin')
            .expect(200, done);
        });
    });

    describe('查询用户权限 GET /admin/search/user', function() {

        it('所有', function(done) {
            session.get('/admin/search/user')
            .query({ all: 1 })
            .expect(200, done);
        });

        var res1 = null;

        it('UID', function(done) {
            session.get('/admin/search/user')
            .query({ uid: 1 })
            .expect(200)
            .end(function(err, res) {
                if (err) done(err);
                res1 = res.body;
                done();
            });
        });

        it('username', function(done) {
            session.get('/admin/search/user')
            .query({ name: 'root' })
            .expect(200, res1, done);
        });

        it('NULL error', function(done) {
            session.get('/admin/search/user')
            .expect(403, 'Forbidden', done);
        });

    });

    describe('权限变更', function(done) {

        it('参数错误测试', function(done) {
            session.post('/admin/power')
            .send({
                uid: 1,
                oper: '-'
            })
            .expect(403, 'Forbidden', done);
        });

        it('不能改变root的权限(99)', function(done) {
            session.post('/admin/power')
            .send({
                uid: 1,
                oper: 1
            })
            .expect(403, 'Forbidden', done);
        });

        it('置权限为2', function(done) {
            session.post('/admin/power')
            .send({
                uid: 2,
                oper: 2
            })
            .expect(200, 'OK', done);
        });

        it('置权限为1', function(done) {
            session.post('/admin/power')
            .send({
                uid: 2,
                oper: 1
            })
            .expect(200, 'OK', done);
        });

        it('置权限为0', function(done) {
            session.post('/admin/power')
            .send({
                uid: 2,
                oper: 0
            })
            .expect(200, 'OK', done);
        });

    });

    describe('用户导入功能', function() {

        it('POST /admin/userimport', function(done) {
            session.post('/admin/userimport')
            .expect(200, 'OK', done);
        });

        after(function(done) {
            var db = dbtop.db();
            db.run('delete from user where name = ?'
            , 'Trump', done);
        });

    });

    describe('权限限制测试', function() {

        before(function(done) {
            auth.login(session, auth.test, done);
        });

        after(function(done) {
            auth.login(session, auth.root, done);
        });

        it('GET /admin', function(done) {
            session.get('/admin')
            .expect(403, done);
        });

        it('GET /admin/search/user', function(done) {
            session.get('/admin/search/user')
            .query({ all: 1 })
            .expect(403, done);
        });

    })
    
});