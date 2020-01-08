var md5 = require('js-md5');
var rock = 'yvykf07ej800be29TAOLIDIXIACHEDUI8nzoyyz0z5lsdcxr';

var root = {
    username: 'root',
    rawpass : 'root'
}

var test = {
    username : 'test',
    rawpass : 'kkk'
}

function account() {
    this.password = md5(this.rawpass + this.username + rock);
    return this;
}

exports.root = account.apply(root);
exports.test = account.apply(test);

exports.login = function(session, data, cb) {
    session.post('/auth/login')
    .send(data)
    .expect(302)
    .expect('Location', '/', cb);
}