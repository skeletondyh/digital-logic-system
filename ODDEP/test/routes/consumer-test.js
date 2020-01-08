var should = require('should');
var session = require('./session');
var data = require('./testdata/data');
var tp = require('../../tiny-promise');
var dbtop = require('../../db/dbtop');


describe('提交处理模块', function() {

    describe('文本传输，非文件上传模式', function() {

        describe('提交', function() {
            it('POST /submit expect 200', function(done) {
                session.post('/submit')
                .send({
                    token: 'test-mocha',
                    pid: '1001',
                    tag: 'mocha',
                    code: data['test.vhd'].replace(/\n/g, '<br>'),
                    stim: data['testbench.vhd'].replace(/\n/g, '<br>')
                })
                .expect(200, 'ok', done);
            });
        });

    });

    describe('上传激励文件，代码普通传输', function() {

        describe('上传激励文件', function() {
            it('POST /upload/motivate/<token>', function(done) {
                session.post('/upload/motivate/test-mocha-2')
                .attach('motivate', './test/routes/testdata/testbench.vhd')
                .expect(200, 'OK', done);
            });
        });

        describe('传输代码', function() {
            it('POST /submit', function(done) {
                session.post('/submit')
                .send({
                    token: 'test-mocha-2',
                    pid: '1001',
                    tag: '2 mocha',
                    code: data['test.vhd'].replace(/\n/g, '<br>'),
                    stim: data['-mot-upl']
                })
                .expect(200, 'ok', done);
            });
        });

    });

    var count = 0;
    var slot = null;
    var bound = 0;
    var lemon = require('../../sim/lemon');
    var token = 'consumer-test';
    function setListener(val, cb) {
        if (count >= val) {
            cb();
        } else {
            bound = val;
            slot = cb;
        }
    }

    describe('验证提交完成测试', function() {
        this.timeout(8000);

        before(function() {
            lemon.setSLOT(token, function() {
                ++ count;
                if (count >= bound && typeof(slot) === 'function') {
                    slot();
                    slot = null;
                }
            });
        });

        it('提交1', function(done) {
            setListener(1, done);
        });

        it('提交2', function(done) {
            setListener(2, done);
        });

    });

    after(function() {
        var db = dbtop.db();
        return Promise.all([
            tp.promisify.call(db, 'run'
            , 'delete from submission where token = ?'
            , 'test-mocha')
            .should.be.finally.an.Null(),
            tp.promisify.call(db, 'run'
            , 'delete from submission where token = ?'
            , 'test-mocha-2')
            .should.be.finally.an.Null()
        ]);
    });

});