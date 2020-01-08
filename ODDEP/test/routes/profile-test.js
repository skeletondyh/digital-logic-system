var should = require('should');
var session = require('./session');
var md5 = require('js-md5');
var dbtop = require('../../db/dbtop');
var tp = require('../../tiny-promise');

var rock = 'yvykf07ej800be29TAOLIDIXIACHEDUI8nzoyyz0z5lsdcxr';


describe('个人设定模块', function() {
    
    describe('页面响应', function() {
        
        it('GET /profile', function(done) {
            session.get('/profile')
            .expect(200, done);
        });
        
    });
    
    describe('修改', function() {

        it('POST /profile/update 两个都修改', function(done) {
            session.post('/profile/update')
            .send({
                nickname : 'THE MASTER',
                passwd : md5('rootroot' + rock),
                newpasswd : md5('testroot' + rock)
            })
            .expect(200, 'ok', done);
        });
        
        it('验证修改是否成功', function() {
            var db = dbtop.db();
            return tp.promisify.call(db, 'get'
            , 'select * from user where uid = 1')
            .then(tp.spread(function(err, row) {
                if (err)  throw err;
                row.nickname.should.be.equal('THE MASTER');
                row.password.should.be.equal(md5(
                    md5('testroot' + rock) + row.salt
                ));
            }));
        });

        it('POST /profile/update 只修改nickname', function(done) {
            session.post('/profile/update')
            .send({
                nickname : 'THE MASTER 2',
            })
            .expect(200, 'ok', done);
        });
        
        it('验证修改是否成功', function() {
            var db = dbtop.db();
            return tp.promisify.call(db, 'get'
            , 'select * from user where uid = 1')
            .then(tp.spread(function(err, row) {
                if (err)  throw err;
                row.nickname.should.be.equal('THE MASTER 2');
            }));
        });

        it('POST /profile/update 只修改password', function(done) {
            session.post('/profile/update')
            .send({
                passwd : md5('testroot' + rock),
                newpasswd : md5('test2root' + rock)
            })
            .expect(200, 'ok', done);
        });
        
        it('验证修改是否成功', function() {
            var db = dbtop.db();
            return tp.promisify.call(db, 'get'
            , 'select * from user where uid = 1')
            .then(tp.spread(function(err, row) {
                if (err)  throw err;
                row.password.should.be.equal(md5(
                    md5('test2root' + rock) + row.salt
                ));
            }));
        });

        it('POST /profile/update 测试元密码错误情况', function(done) {
            session.post('/profile/update')
            .send({
                passwd : md5('watestroot' + rock),
                newpasswd : md5('actest2root' + rock)
            })
            .expect(200, 'auth err', done);
        });

        after(function(done) {
            var db = dbtop.db();
            db.run('update user set nickname = ?, password = ? where uid = 1'
            , '老大哥不会被敲诈'
            , '26bd71f6b39404c1ab8b25e2567e80d9'
            , done);
        });

    });

});