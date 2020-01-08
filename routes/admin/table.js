/**
 * Created by kinnplh on 10/19/16.
 */

var express = require('express');
var router = express.Router();
var student = require('../../dataBase/model/user');
var homework = require('../../dataBase/model/homework');
var project = require('../../dataBase/model/project');
var message = require('../../dataBase/model/message');
var multiparty = require('multiparty');
var path = require('path');
var fs = require('fs');
var excelParser = require('excel-parser');

router.post('/getbroadcast', function (req, res, next) {
    if(!req.session.user) {
        res.redirect('/');
    }
    student.findOne({userName:req.session.user.userName}).exec(function (err, obj) {
        if (req.session.user.uniquetoken !== obj.uniquetoken) {
            req.session = null;
            res.redirect('/');
        }
        else if(req.session.user.authority == 0) {
            res.redirect('/');
        }
        else {
            var content = req.body['description'];
            var title = req.body['title'];
            if ((title === "") || (title === undefined) || (title === null) ||
                (content === "") || (content === undefined) || (content === null)){
                res.json();
                return;
            }

            console.log(Date.now());
            console.log(title);
            console.log(content);

            var msg = new message({
                author: res.locals.user._id,
                createTime: new Date(),
                title: title,
                content: content
            });

            msg.save(function (err) {
                if (err) res.render("error", {error: err});
                console.log("Insert new message");
                /*student.update({}, {"msgBox": msg}, {multi: true}, function (err, docnum) {
                    if(err) console.log(err);
                    console.log(docnum + "Successfully updated!");
                });*/
            });
            res.json({
                status: 1
            });
        }
    });
});

router.get('/studentTable', function (req, res, next) {
    if(!req.session.user) {
        res.redirect('/');
    }
    student.findOne({userName:req.session.user.userName}).exec(function (err, obj) {
        if (req.session.user.uniquetoken !== obj.uniquetoken) {
            req.session = null;
            res.redirect('/');
        }
        else if(req.session.user.authority === 0) {
            res.redirect('/');
        }
        else {
            student.find().exec(function (err, students) {
                if(err)
                    res.render("error", {error: err});
                res.render('admin/studentTable', {students: students});
            });
        }
    });
    //get all students and pass to the page
});

router.get('/projectDetail', function (req, res, next) {
    if(!req.session.user) {
        res.redirect('/');
    }
    student.findOne({userName:req.session.user.userName}).exec(function (err, obj) {
        if (req.session.user.uniquetoken !== obj.uniquetoken) {
            req.session = null;
            res.redirect('/');
        }
        else if(req.session.user.authority == 0) {
            res.redirect('/');
        }
        else {
            var targetUserId = req.query.userId;
            student.findById(targetUserId).populate({
                path: 'projectBox',
                populate: {path: 'submitBox'}
            }).exec(function (err, retStdt) {
                res.render('admin/projectDetail', {student: retStdt});
            });
        }
    });
});

router.get('/homeworkList', function (req, res, next) {
    if(!req.session.user) {
        res.redirect('/');
    }
    student.findOne({userName:req.session.user.userName}).exec(function (err, obj) {
        if (req.session.user.uniquetoken !== obj.uniquetoken) {
            req.session = null;
            res.redirect('/');
        }
        else if(req.session.user.authority === 0) {
            res.redirect('/');
        }
        else {
            homework.find({author: obj._id}).populate('relateExample').exec(function (err, homeworks) {
                if(err)
                    res.render('error', {error: err});
                res.render('admin/homeworkList', {homeworks: homeworks});
            });
        }
    });
});

router.get('/homeworkProjectDetail', function (req, res, next) {
    if(!req.session.user) {
        res.redirect('/');
    }
    student.findOne({userName:req.session.user.userName}).exec(function (err, obj) {
        if (req.session.user.uniquetoken !== obj.uniquetoken) {
            req.session = null;
            res.redirect('/');
        }
        else if(req.session.user.authority === 0) {
            res.redirect('/');
        }
        else {
            homework.findById(req.query.homeworkId)
                .populate({
                    path: 'correspondProject',
                    populate: {path: 'author'}
                })
                .exec(function (err, retHw) {
                    res.render('admin/homeworkProjectDetails', {crtHw: retHw});
                });
        }
    });
});

router.get('/homeworkProjectSubmit', function (req, res, next) {
    if(!req.session.user) {
        res.redirect('/');
    }
    student.findOne({userName:req.session.user.userName}).exec(function (err, obj) {
        if (req.session.user.uniquetoken !== obj.uniquetoken) {
            req.session = null;
            res.redirect('/');
        }
        else if(req.session.user.authority === 0) {
            res.redirect('/');
        }
        else {
            var projectId = req.query.projectId;
            project.findById(projectId).populate('hwSubmitBox')
                .exec(function (err, retPrj) {
                    res.render('admin/homeworkSubmitList', {prj: retPrj, submitList: retPrj.hwSubmitBox});
                });
        }
    });
});


router.post('/importStudent', function (req, res, next) {
    if(!req.session.user) {
        res.redirect('/');
    }
    student.findOne({userName:req.session.user.userName}).exec(function (err, obj) {
        if (req.session.user.uniquetoken !== obj.uniquetoken) {
            req.session = null;
            res.redirect('/');
        }
        else if(req.session.user.authority == 0) {
            res.redirect('/');
        }
        else {
            temPath = "/home/yuhui/DC_Data/tmp";
            var form = new multiparty.Form({uploadDir: temPath});
            form.parse(req, function(err, fields, files){
                var filesTmp = JSON.stringify(files,null,2);
                if(err){
                    console.log('parse error: ' + err);
                } else {
                    console.log('parse files: ' + filesTmp);
                    console.log('length:'+files.inputFile.length);
                    var fileNum = files.inputFile.length;
                    for(var i = 0; i < fileNum; i++){
                        var inputFile = files.inputFile[i];
                        var uploadedPath = inputFile.path;
                        if(path.extname(uploadedPath) != ".xls" && path.extname(uploadedPath) != ".xlsx")
                            continue;
                        console.log("uploadedPath: " + uploadedPath);
                        excelParser.parse({
                            inFile: uploadedPath,
                            worksheet: 1,
                            skipEmpty: false
                        }, function(err, records){
                            if(err)
                                console.log(err);
                            console.log(records);

                            for(var j = 1; j < records.length; ++ j){
                                student.findOne({userName: records[j][0]})
                                    .exec((
                                        function(j){
                                            return function (err, retUser) {
                                                if(retUser != null)
                                                    return;
                                                var newUser = new student({
                                                    userName: records[j][0],
                                                    password: records[j][0],
                                                    projectBox: [],
                                                    homeworkBox: [],
                                                    authority: 0,
                                                    group: records[j][3]
                                                });
                                                newUser.save(function (err) {
                                                    if(j == records.length - 1)
                                                        res.redirect('studentTable');
                                                });
                                            }
                                        }
                                    )(j));
                            }
                        });
                    }
                }
            })
        }
    });
});

module.exports = router;