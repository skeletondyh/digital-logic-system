var assert = require('assert');
var dabs = require('../../db/dbtop');
var tp = require('../../tiny-promise');
var debug = require('debug');
var log = debug('prj7_tot:testPreStart:log');

var db = dabs.db();
var md5 = require('js-md5');
/*
tp.promisify.call(db, 'all', 'SELECT id, nickname, status, submit_time from submission inner join user on user.uid = submission.uid WHERE id <= 3 and id > -17 ORDER BY id DESC')
.then(tp.spread(function(err, rows) {
    log(err, rows);
}));//*/

db.get('select count(*) from user', function(err, row) {
    assert.strictEqual(err, null);
    log('user amount:', row['count(*)']);
});

db.get('select count(*) from submission', function(err, row) {
    assert.strictEqual(err, null);
    log('submission amount:', row['count(*)']);
});

var rock = "yvykf07ej800be29TAOLIDIXIACHEDUI8nzoyyz0z5lsdcxr";
dabs.md5Salt_auth('root', md5('root'+'root'+rock), function(err, row) {
    assert.strictEqual(err, null);
    log('md5Salt_auth got result:', row);
    log(row.nickname + '认证测试成功');
})

db.get('select * from user' + dabs.obj2Stmt('where', {uid:1, name:'root'}, {sep:'and'}),
    function(err, row) {
        assert.strictEqual(err, null);
        assert.strictEqual(row.name, 'root');
        log('dbtop.obj2Stmt tested.');
    })

//log(dabs.obj2Stmt('set', {uid:1,name:'root'},{funs:{'u.u':'root'}}));
//log(dabs.obj2Stmt('set', {uid:1,name:'root'},{funs:{'u.u':'root'},sep:'and'}));
// dabs.submissionRegisterIfNotExists('lk039ax39e3lerk9:1476348300969',
//     1, 1000, '', function(err) {
//         assert.strictEqual(err, null);
//         log('submission register tested.');
//     })