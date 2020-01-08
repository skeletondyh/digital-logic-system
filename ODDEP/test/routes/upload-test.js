var should = require('should');
var session = require('./session');
var testdata = require('./testdata/data');
var auth = require('./account');


describe('上传模块', function() {

    describe('用户导入文件上传', function() {

        it('POST /upload/admin/userimport 200', function(done) {
            session.post('/upload/admin/userimport')
            .attach('importfile', './test/routes/testdata/userImport.txt')
            .expect(200, '上传完成', done);
        });

        describe('权限测试', function() {

            before(function(done) {
                auth.login(session, auth.test, done);
            });

            after(function(done) {
                auth.login(session, auth.root, done);
            });

            it('应该返回403', function(done) {
                session.post('/upload/admin/userimport')
                .attach('importfile', './test/routes/testdata/userImport.txt')
                .expect(403, 'Permission denied.', done);
            });

        });

    });

    describe('题目依赖文件上传', function() {

        it('正常上传', function(done) {
            session.post('/upload/std/input/1002')
            .attach('stdfile', './test/routes/testdata/1002.in')
            .expect(200, 'OK', done);
        });

        it('错误上传', function(done) {
            session.post('/upload/std/errortest/1002')
            .attach('stdfile', './test/routes/testdata/1002.in')
            .expect(403, '不能识别的类型或权限不足', done);
        });

        describe('权限测试', function() {

            before(function(done) {
                auth.login(session, auth.test, done);
            });

            after(function(done) {
                auth.login(session, auth.root, done);
            });

            it('应该被拒绝', function(done) {
                session.post('/upload/std/input/1002')
                .attach('stdfile', './test/routes/testdata/1002.in')
                .expect(403, '不能识别的类型或权限不足', done);
            });

        });

    });

});