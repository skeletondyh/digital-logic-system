var should = require('should');
var session = require('./session');

describe('题目阅读模块', function() {
    describe('目录', function() {
        it('GET /problem 第一页', function(done) {
            session.get('/problem')
            .expect(200, done);
        });
        it('GET /problem?index=0 最后一页', function(done) {
            session.get('/problem')
            .query({ index: 0 })
            .expect(200, done);
        });
    });
    describe('题目描述阅读', function() {
        it('GET /problem/1000', function(done) {
            session.get('/problem/1000')
            .expect(200, done);
        });
        it('GET /problem/999  expect 404', function(done) {
            session.get('/problem/999')
            .expect(404, done);
        });
    });
    describe('题目限制申请 API: GET /problem/<pid>/limits => json'
    , function() {
        it('GET /problem/1001/limits', function(done) {
            session.get('/problem/1001/limits')
            .expect(200)
            .expect({
                status: 200,
                data: ["code"]
            }, done);
        });
        it('GET /problem/999/limits expect bad message', function(done) {
            session.get('/problem/999/limits')
            .accept('json')
            .expect(200)
            .expect({
                status: 404,
                message: "problem not found"
            }, done);
        });
    });
});