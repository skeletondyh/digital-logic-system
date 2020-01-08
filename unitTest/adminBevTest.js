/**
 * Created by kinnplh on 11/29/16.
 */
var app = require("../app");
var session = require('supertest-session');
var request = session(app);
var should = require('should');

describe("test admin", function () {
    it("should redirect to a admin page", function (done) {
        request.post('/login').send({
            userName: "admin",
            password: "admin"
        }).expect(302).end(function (err, res) {
            (res.text == "Found. Redirecting to /admin").should.be.ok();
            done(err);
        });
    });

    it("test visit student table", function (done) {
        request.get('/admin/studentTable')
            .expect(200)
            .end(function (err, res) {
                done(err);
            });
    });

    it("test visit homework list", function (done) {
        request.get('/admin/homeworkList')
            .expect(200)
            .end(function (err, res) {
                done(err);
            });
    });

    it("test visit homework create page", function (done) {
        request.get('/admin/createHomework')
            .expect(200)
            .end(function (err, res) {
                done(err);
            });
    });

    it("test send basic info about the new homework", function (done) {
        request.post('/admin/newHomeworkBasicInfo')
            .send({
                homework: "testNewHomeworkName",
                homeworkType: 1,
                topEntityName: "testTopEntityName",
                simulateFileName: "testSimulateFileName.vhd",
                inputPortName: "inA,inB",
                outputPortName: "outA,outB",
                deadline: new Date(),
                describe: "it is just a test homework"
            })
            .type('form')
            .expect(200)
            .end(function (err, res) {
                (JSON.parse(res.text).status == "success").should.be.ok();
                done(err);
            });
    });
});

