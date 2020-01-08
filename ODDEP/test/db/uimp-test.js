var should = require('should');
var uimp = require('../../db/userimport');
var db = require('../../db/dbtop').db();

describe('db/userImport.js', function() {
    describe('doDefault()', function() {
        var fs = require('fs');
        before('准备userImport文件', function(done) {
            fs.writeFile('./db/userImport.txt', 'Trump xilali', done);
        });
        after('删去测试用户', function(done) {
            db.run('delete from user where name = ?', 'Trump', done);
        });
        it('导入用户', function(done) {
            uimp.doDefault(done);
        });
    });
});