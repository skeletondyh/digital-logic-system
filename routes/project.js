/**
 * Created by kinnplh on 2016/10/6.
 */
var express = require('express');
var router = express.Router();
var project = require('../dataBase/model/project');
var example = require('../dataBase/model/example');
var user = require('../dataBase/model/user');
var submit = require('../dataBase/model/submit');
var fs = require('fs');
var path = require('path');
var c74s = require('../chipInfo/c74s');
// var cpu_comps = require('../chipInfo/cpu_comps');

router.post('/project/getFileTree', function (req, res, next) {
    if(!req.session.user) {
        res.redirect('/');
    }
    user.findOne({userName:req.session.user.userName}).exec(function (err, obj) {
        if(err) res.render('error', { error: err }); 
        if (req.session.user.uniquetoken !== obj.uniquetoken) {
            req.session = null;
            res.redirect('/');
        }
        else {
            var prjId = req.body.projectId;
            if(!prjId) res.render('error', { error: err }); 

            if(req.body.projectType !== undefined && req.body.projectType === 'Example')
                example.findById(prjId, function (err, prj) {
                    if(err) res.render('error', { error: err });
                    res.json({
                        fileTree: getDirStruct(prj.filePath)
                    });
                });
            else
                project.findById(prjId, function (err, prj) {
                    if(err) res.render('error', { error: err });
                    res.json({
                        fileTree: getDirStruct(prj.filePath)
                    });
                });
        }
    });
});

router.get('/project', function (req, res) {

    if(!req.session.user) {
        res.redirect('/');
    }
    user.findOne({userName:req.session.user.userName}).exec(function (err, obj) {
        if(err) res.render('error', { error: err });
        
        if (false) {

        }
        else {

            var currentUser = res.locals.user;
            var projectId = req.query.projectId;
            if(currentUser === null || currentUser ===undefined || projectId === null || projectId === undefined) res.render('error', { error: err }); 
            
            // 是否需要 populate homework?
            project.findById(projectId).populate('submitBox').populate('homework').exec(function (err, obj) {
                if(err)
                    res.render('error', { error: err });
                if(obj === null)
                    res.render('error', { error: "No such project" });
                req.session.project = {
                    _id: obj._id,
                    filePath: obj.filePath,
                    inputFile: obj.inputFile,
                    topEntityName: obj.topEntityName,
                    type: obj.type
                };

                res.locals.project = {_id: obj._id};

                var projectRoot = obj.filePath;

                if (obj.homework) console.log("Even though homework field is undefined we can reach here")
                else console.log("homework undefined means false")

                if(obj.type === 1) {                    //Editor mode
                    var struct = getDirStruct(obj.filePath);
                    if(obj.homework)
                        res.render('editor', {fileTree: struct, simulateFile: obj.inputFile, topEntity: obj.topEntityName ,projectId: obj._id, homework: obj.homework, pathNav:[{name: obj.projectName, link: "/project?projectId="+obj._id}]});
                    else
                        res.render('editor', {fileTree: struct, simulateFile: obj.inputFile, topEntity: obj.topEntityName ,projectId: obj._id,pathNav:[{name: obj.projectName, link: "/project?projectId="+obj._id}]});
                }
                else if(obj.type === 0) {              // drag and drop mode
                    
                    var circuitFileName = path.join(obj.filePath, 'OD_'+ obj.topEntityName);
                    
                    console.log("Circuit File Name: ", circuitFileName);

                    fs.readFile(circuitFileName, function (err, circuitDescribe) {
                        
                        if(err)
                            res.render('error', {error: err});
                        
                        var localsForJade = JSON.stringify(res.locals);
                        
                        if(obj.homework)
                            res.render('editor-visual_do_homework.jade', { localsForJade: localsForJade, c74s: c74s, circuit: circuitDescribe, projectId: obj._id, homework: obj.homework, pathNav:[{name: obj.projectName, link: "/project?projectId="+obj._id}]});
                        else {
                            res.render('editor-beta.jade', { localsForJade: localsForJade, c74s: c74s, circuit: circuitDescribe, projectId: obj._id,pathNav:[{name: obj.projectName, link: "/project?projectId="+obj._id}]});
                            console.log("Come here for beta modules");
                        }
                    });
                } 
                else
                    res.render('error', {error: "Invalid project type"});
            });
        }
    });
});

router.get('/example', function (req, res) {
    //console.log('/example');
    //console.log(req.session.user);
    if(!req.session.user) {
        res.redirect('/');
    }
    user.findOne({userName:req.session.user.userName}).exec(function (err, obj) {
        //console.log(obj);
        if(err || !req.session.user.uniquetoken || !obj.uniquetoken) res.render('error', { error: err });
        if (req.session.user.uniquetoken !== obj.uniquetoken) {
            req.session = null;
            res.redirect('/');
        }
        else {
            //console.log(req.session.user);
            var currentUser = res.locals.user;
            var projectId = req.query.projectId;
            example.findById(projectId).populate('submitBox').exec(function (err, obj) {
                if(err)
                    res.render('error', { error: err });
                if(obj === null || obj === undefined)
                    res.render('error', { error: "No such project" });
                req.session.project = {
                    _id: obj._id,
                    filePath: obj.filePath,
                    inputFile: obj.inputFile,
                    topEntityName: obj.topEntityName,
                    //entityPath: obj.entityPath,
                    type: obj.type
                };
                res.locals.project = {_id: obj._id};

                var projectRoot = obj.filePath;
                if(obj.type === 1) { //Editor
                    var struct = getDirStruct(obj.filePath);
                    res.render('editor_example', {fileTree: struct, simulateFile: obj.inputFile, topEntity: obj.topEntityName ,projectId: obj._id, pathNav:[{name: obj.projectName, link: "/example?projectId="+obj._id}]});
                    //else
                        //res.render('editor', {fileTree: struct, simulateFile: obj.inputFile, topEntity: obj.topEntityName ,projectId: obj._id,pathNav:[{name: obj.projectName, link: "/example?projectId="+obj._id}]});
                } else if(obj.type === 0) { // drag and drop
                    //get the file and pass the info to
                    var circuitFileName = path.join(obj.filePath, 'OD_'+obj.topEntityName);
                    fs.readFile(circuitFileName, function (err, circuitDescribe) {
                        if(err)
                            res.render('error', {error: err});
                        //console.log("canvas.c74s: " + JSON.stringify(c74s));
                        var localsForJade = JSON.stringify(res.locals);
                        console.log('OD_circuit: '+circuitDescribe);
                        if (currentUser.authority === 1){
                            res.render('editor-visual_edit_homework.jade', { localsForJade: localsForJade, c74s: c74s, circuit: circuitDescribe, projectId: obj._id,pathNav:[{name: obj.projectName, link: "/example?projectId="+obj._id}]});
                        } else {
                            res.render('editor-visual_see_example.jade', { localsForJade: localsForJade, c74s: c74s, circuit: circuitDescribe, projectId: obj._id,pathNav:[{name: obj.projectName, link: "/example?projectId="+obj._id}]});
                        }
                        
                    });
                } /*else if(obj.type == 2){
                    var circuitFileName = path.join(obj.filePath, obj.topEntityName);
                    var compDir = obj.entityPath;
                    var chips = cpu_comps(compDir);
                    console.log("chips:");
                    console.log(chips);

                    fs.readFile(circuitFileName, function (err, circuitDescribe) {
                        if(err)
                            res.render('error', {error: err});
                        res.render('cpu', { c74s: chips, circuit: circuitDescribe, projectId: obj._id,pathNav:[{name: obj.projectName, link: "/project?projectId="+obj._id}]});
                    });
                }*/
                else
                    res.render('error', {error: "Invalid project type"});
            });
        }
    });
});

router.post('/project/projectSettingChange', function (req, res, next) {
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
            var topEntityName = req.body.topEntityName;
            var inputFile = req.body.inputFile;

            project.findById(prjId, function (err, prj) {
                prj.topEntityName = topEntityName;
                prj.inputFile = inputFile;
                prj.save(function (err) {

                    res.json({status: "success"});
                });
            });
        }
    });
});

function File(name, path) {
    this.name = name;
    this.type = "file";
    this.path = path;
}

function Dir(name, children) {
    this.name = name;
    this.type = "folder";
    this.children = children;
}

function getDirChildren(root) {
    var fileArray = fs.readdirSync(root);//root is an absolute path!!
    var res = [];
    for(var i = 0; i < fileArray.length; ++ i)
    {
        var name = fileArray[i];
        var p = path.join(root, name);
        var fileStat = fs.statSync(p);
        if(fileStat)
        {
            if(fileStat.isFile())
                res.push(new File(name, p));
            else if(fileStat.isDirectory())
                res.push(new Dir(name, getDirChildren(p)));
        }
    }

    return res;
}

function getDirStruct(root) {
    var res = new Dir('Root', getDirChildren(root));
    res =  JSON.stringify(res);
    console.log(res);
    return res;
}



module.exports = router;