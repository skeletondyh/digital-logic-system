var should = require('should');
var session = require('./session');
var auth = require('./account');


describe('status查询模块', function() {
    
    describe('status页面', function() {
        
        it('GET /status 所有状态', function(done) {
            session.get('/status')
            .expect(200, done);
        });

        it('GET /status 用户root', function(done) {
            session.get('/status')
            .query({
                user: 'root'
            })
            .expect(200, done);
        });

        it('GET /status pid=1000', function(done) {
            session.get('/status')
            .query({
                pid: 1000
            })
            .expect(200, done);
        });

        it('GET /status tag="测试1"', function(done) {
            session.get('/status')
            .query({
                tag: "测试1"
            })
            .expect(200, done);
        });

        it('GET /status index=0 最后一页', function(done) {
            session.get('/status')
            .query({
                index: 0
            })
            .expect(200, done);
        });

        it('GET /status 综合', function(done) {
            session.get('/status')
            .query({
                user: 'root',
                pid: 1000,
                tag: '测试1',
                index: 0
            })
            .expect(200, done);
        });
        
    });

    describe('result页面', function() {

        it('GET 测试', function(done) {
            session.get('/status/submission/1')
            .expect(200, done)
        });

        it('下载测试', function(done) {
            session.get('/status/download/code/test')
            .expect(200, done);
        });

        it('破坏性下载测试', function(done) {
            session.get('/status/download/log/test')
            .expect(404, done);
        });

        describe('权限测试', function() {

            before(function(done) {
                auth.login(session, auth.test, done);
            });

            after(function(done) {
                auth.login(session, auth.root, done);
            });

            it('GET /status/submission/1 应抛出denied', function(done) {
                session.get('/status/submission/1')
                .expect(200, 'Permission denied.', done);
            });

        });

    });

});