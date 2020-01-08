var app = require('../../app');
var superSession = require('supertest-session');
var session = superSession(app);

module.exports = session;