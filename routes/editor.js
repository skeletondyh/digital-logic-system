/**
 * Created by kinnplh on 2016/10/7.
 */

var express = require('express');
var example = require('../dataBase/model/example');
var router = express.Router();
var fs = require('fs');
var user = require('../dataBase/model/user');
var path = require('path');
var project = require('../dataBase/model/project');

router.post('/deleteFile', function (req, res, next) {
    if(!req.session.user) {
        res.redirect('/');
    }
    user.findOne({userName:req.session.user.userName}).exec(function (err, obj) {
        if (req.session.user.uniquetoken !== obj.uniquetoken) {
            req.session = null;
            res.redirect('/');
        }
        else {
            var prjId = req.body.projectId;
            var pathOfFile = req.body.filePath;
            var fileName = path.basename(pathOfFile);
            var pathName = path.dirname(pathOfFile);
            //to check if the path and the project match
            if(req.body.projectType !== undefined && req.body.projectType === 'Example')
                example.findById(prjId, function (err, prj) {
                    if(prj.filePath !== pathName || !fs.existsSync(pathOfFile)) {
                        res.json({
                            status: "error",
                            msg: "no such file"
                        });
                        return;
                    }
                    fs.unlink(pathOfFile, function (err) {
                        if(err)
                            res.render('error', {error: err});
                        else
                            res.json({status: "success"});
                    });
                });
            else
                project.findById(prjId, function (err, prj) {
                    if(prj.filePath !== pathName || !fs.existsSync(pathOfFile)) {
                        res.json({
                            status: "error",
                            msg: "no such file"
                        });
                        return;
                    }
                    fs.unlink(pathOfFile, function (err) {
                        if(err)
                            res.render('error', {error: err});
                        else
                            res.json({status: "success"});
                    });
                });
        }
    });
});


router.post('/getFileContent',function (req, res, next) {
    //console.log(req.body.projectType);
    if(!req.session.user) {
        res.redirect('/');
    }
    user.findOne({userName:req.session.user.userName}).exec(function (err, obj) {
        if (req.session.user.uniquetoken !== obj.uniquetoken) {
            req.session = null;
            res.redirect('/');
        }
        else {
            var Path = req.body.path;
            var absolutePath = Path;
            fs.stat(absolutePath, function (err, stat) {
                if(err)
                    res.render('error', { error: err });
                if(stat === null || stat.isFile() === false)
                    res.render('error', { error: "The file is not available" });
                fs.readFile(absolutePath, 'utf8',function (err, content) {
                    if(err)
                        res.render('error', { error: err });
                    res.json({
                        content: content,
                        status: 'success'
                    });
                });
            });

            /*var currentUser = res.locals.user;
            console.log("user: ");
            console.log(currentUser);
            var currentProjectId = req.body.projectId;
            user.findById(currentUser._id)
                .populate('projectBox')
                .populate({
                    path: "homeworkBox",
                    populate: {path: "homework"}
                })
                .exec(function (err, obj) {
                    if(err)
                        res.render('error', { error: err });
                    if(obj == null)
                        res.render('error', { error: "No such user" });
                    var currentProject = null;
                    var l = obj.projectBox.length;
                    for(var i = 0; i < l; ++ i){
                        if(obj.projectBox[i]._id == currentProjectId) {
                            currentProject = obj.projectBox[i];
                            break;
                        }
                    }
                    if(obj.homeworkBox != undefined) {
                        l = obj.homeworkBox.length;
                        for (var i = 0; i < l; ++i) {
                            if (obj.homeworkBox[i]._id == currentProjectId) {
                                currentProject = obj.homeworkBox[i];
                                break;
                            }
                        }
                    }
                    if(currentProject == null)
                        res.render('error', { error: "No such project" });
                    var pathRoot = currentProject.filePath;
                    var absolutePath = Path;
                    fs.stat(absolutePath, function (err, stat) {
                        if(err)
                            res.render('error', { error: err });
                        if(stat == null || stat.isFile() == false)
                            res.render('error', { error: "The file is not available" });
                        fs.readFile(absolutePath, 'utf8',function (err, content) {
                            if(err)
                                res.render('error', { error: err });
                            res.json({
                                content: content,
                                status: 'success'
                            });
                        })
                    });

                });*/
        }
    });
});

module.exports = router;