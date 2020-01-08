var express = require('express');
var router = express.Router();
var multiparty = require('multiparty');
var util = require('util');
var fs = require('fs');
var codeGenerator = require("../VHDL/VHDLCodeGenerator");
// var cpuCodeGenetator = require("../VHDL/CPUCodeGenerator");

// Database config
var user = require("../dataBase/model/user");
var project = require('../dataBase/model/project');
var homework = require('../dataBase/model/homework');
var message = require('../dataBase/model/message');
var example = require('../dataBase/model/example');


var process = require('child_process');
var path = require('path');
var modelsim = require('./modelsim.js');
var submit = require('../dataBase/model/submit');
// var cpuSCG = require('../VHDL/simulationCodeGenerator');
var SCG = require('../VHDL/simpleSimulationCodeGet');
var vcdfunc = require('./vcd.js');

// 所有利用到缓存的地方 都得小心 是否会造成服务器炸掉

router.get('/', function(req, res, next) {

    console.log('Come at index page. Log session info below:');
    console.log('########################')
    console.log(req.session);
    console.log('########################');

    if(res.locals.user && res.locals.user.authority === 0)
    {
        message.find({}).populate('author').exec(function (err, msgobj) {
            var messageBox = [];
            for(var i = 0; i < msgobj.length; i++){
                var Onemsg = {
                    _id: msgobj[i]._id,
                    title: msgobj[i].title,
                    content: msgobj[i].content,
                    date: msgobj[i].createTime,
                    author:msgobj[i].author.userName
                };
                messageBox.push(Onemsg);
            }

            user.findById(res.locals.user._id).populate({
                path: 'homeworkBox',
                populate: {path: "homework"}
            }).populate('projectBox')//.populate('msgBox')
                .exec(function (err, obj){
                    req.session.user = {
                        userName: obj.userName,
                        _id: obj._id,
                        password: obj.password,
                        authority: obj.authority
                        // uniquetoken: obj.uniquetoken
                    };

                    example.find({}).exec(function (err, exampleobj) {
                        if (err) res.render('error', {error: err});
                        var exampleBox = [];
                        for (var j = 0; j < exampleobj.length; j++) {
                            if(exampleobj[j].ifvisibletoUser) {
                                exampleBox.push(exampleobj[j]);
                            }
                        }

                        res.render('index',
                            {title: "Index",
                            projectList: obj.projectBox.reverse(),
                            homeworkList: obj.homeworkBox.reverse(),
                            messagelist: messageBox.reverse(),
                            exampleList: exampleBox
                        });

                    });

                });
        });
    }
    else if (res.locals.user && res.locals.user.authority === 1)
        res.redirect('/admin');
    else
        res.redirect('/login');
});

router.post('/file/uploadEditor', function (req, res, next) {
    if (!req.session.user) {
        res.redirect('/');
    }
    user.findOne({ userName: req.session.user.userName }).exec(function (err, obj) {
        if (req.session.user.uniquetoken !== obj.uniquetoken) {
            req.session = null;
            res.redirect('/');
        }
        else {
            var prjID = req.body.projectId;
            var originFilePath = req.body.filePath;
            var newName = req.body.name;
            var text = req.body.text;

            project.findById(prjID, function (err, prj) {
                if (originFilePath != "") {
                    if (prj === undefined || prj === null || prj.filePath != path.dirname(originFilePath)) {
                        console.log("the origin file does not belongs to the project!");
                        res.json({
                            status: "error",
                            msg: "the origin file does not belongs to the project!"
                        });
                        return;
                    }
                    //delete the origin file
                    if (!fs.existsSync(originFilePath)) {
                        console.log("the origin file does nor exist");
                        res.json({
                            status: "error",
                            msg: "the origin file does nor exist"
                        });
                        return;
                    }
                    fs.unlinkSync(originFilePath);
                }
                fs.writeFile(path.join(prj.filePath, newName), text, function (err) {
                    if (err)
                        res.render('error', { error: err });
                    else
                        res.json({ status: "success" });
                });
            })
        }
    });
});

router.post('/file/uploadEditorExample', function (req, res, next) {
    if (!req.session.user) {
        res.redirect('/');
    }
    user.findOne({ userName: req.session.user.userName }).exec(function (err, obj) {
        if (req.session.user.uniquetoken !== obj.uniquetoken) {
            req.session = null;
            res.redirect('/');
        }
        else {
            var prjID = req.body.projectId;
            var originFilePath = req.body.filePath;
            var newName = req.body.name;
            var text = req.body.text;

            example.findById(prjID, function (err, prj) {
                if (originFilePath !== '') {
                    if (prj === undefined || prj === null || prj.filePath !== path.dirname(originFilePath)) {
                        console.log("the origin file does not belongs to the project!");
                        res.json({
                            status: "error",
                            msg: "the origin file does not belongs to the project!"
                        });
                        return;
                    }
                    //delete the origin file
                    if (!fs.existsSync(originFilePath)) {
                        console.log("the origin file does nor exist");
                        res.json({
                            status: "error",
                            msg: "the origin file does nor exist"
                        });
                        return;
                    }
                    fs.unlinkSync(originFilePath);
                }
                fs.writeFile(path.join(prj.filePath, newName), text, function (err) {
                    if (err)
                        res.render('error', { error: err });
                    else
                        res.json({ status: "success" });
                });
            })
        }
    });
});

router.post('/file/uploadGraph', function (req, res, next) {
    
    if (!req.session.user) {
        res.redirect('/');
    }
    
    user.findOne({ userName: req.session.user.userName }).exec(function (err, obj) {
        if (false) {
            // req.session = null;
            // res.redirect('/');
        }
        else {
            OD_text = req.body.OD_link;
            DC_text = req.body.link;
            // var currentProject;
            
            if (req.body.projectType === "Example"){
                example.findById(req.body.projectId).exec(function(err, currentProject){
                    if (err){
                        res.render('error', { error: err });
                    }

                    // currentProject = obj;
                    if (OD_text !== undefined) {
                        var OD_filePath = path.join(currentProject.filePath, 'OD_' + currentProject.topEntityName);
                        fs.open(OD_filePath, 'w', function (err, fd) {
                            if (err)
                                res.render('error', { error: err });
                            var writeBuffer = new Buffer(OD_text),
                                offset = 0,
                                len = writeBuffer.length,
                                filePostion = null;
                            fs.write(fd, writeBuffer, offset, len, filePostion, function (err, readByte) {
                                if (err)
                                    res.render('error', { error: err });
                                console.log('写数据总数：' + readByte + ' bytes');
                            });
                        });
                    }
        
                    var filePath = path.join(currentProject.filePath, currentProject.topEntityName);
                    fs.open(filePath, 'w', function (err, fd) {
                        if (err)
                            res.render('error', { error: err });
                        var writeBuffer = new Buffer(DC_text),
                            offset = 0,
                            len = writeBuffer.length,
                            filePostion = null;
                        fs.write(fd, writeBuffer, offset, len, filePostion, function (err, readByte) {
                            if (err)
                                res.render('error', { error: err });
                            console.log('写数据总数：' + readByte + ' bytes');
        
                            // if a drag project, generate VHDL file according to req.body.link
                            // console.log("type: " + currentProject.type);
                            // console.log("Projecttype: " + req.body.projectType);
                            if (currentProject.type == 0) {
                                var portInfo = new Object();
                                try{
                                    codeGenerator(currentProject.filePath, JSON.parse(req.body.link), currentProject.topEntityName, portInfo,function (err) {
                                        if(err)
                                            res.render('error', {error: err});
                                        console.log("input: " + portInfo.input + " output: " + portInfo.output);
                                        example.update({_id: currentProject._id}, {$set:{input: portInfo.input, output: portInfo.output}}, function (err) {
                                            res.json({status: "success"});
                                        });
                                    });
                                } catch (err){
                                    res.render('error', {error: err});
                                }
                            }
                            else    //editor project
                                res.json({ status: "success" });
                        });
                    });
                });
            } else {
                currentProject = res.locals.project;

                if (OD_text !== undefined) {
                    var OD_filePath = path.join(currentProject.filePath, 'OD_' + currentProject.topEntityName);
                    fs.open(OD_filePath, 'w', function (err, fd) {
                        if (err)
                            res.render('error', { error: err });
                        // console.log(OD_text);
                        var writeBuffer = new Buffer(OD_text),
                            offset = 0,
                            len = writeBuffer.length,
                            filePostion = null;
                        // console.log(OD_filePath);
                        // console.log(fd);
                        fs.write(fd, writeBuffer, offset, len, filePostion, function (err, readByte) {
                            if (err)
                                res.render('error', { error: err });
                            console.log('写数据总数：' + readByte + ' bytes');
                        });
                    });
                }
    
                var filePath = path.join(currentProject.filePath, currentProject.topEntityName);
                fs.open(filePath, 'w', function (err, fd) {
                    if (err)
                        res.render('error', { error: err });
                    // console.log(DC_text);
                    var writeBuffer = new Buffer(DC_text),
                        offset = 0,
                        len = writeBuffer.length,
                        filePostion = null;
                    fs.write(fd, writeBuffer, offset, len, filePostion, function (err, readByte) {
                        if (err)
                            res.render('error', { error: err });
                        console.log('写数据总数：' + readByte + ' bytes');
    
                        // if a drag project, generate VHDL file according to req.body.link
                        // console.log("type: " + currentProject.type);
                        // console.log("Projecttype: " + req.body.projectType);
                        if (currentProject.type == 0) {
                            var portInfo = new Object();
                            try{
                                codeGenerator(currentProject.filePath, JSON.parse(req.body.link), currentProject.topEntityName, portInfo,function (err) {
                                    if(err)
                                        res.render('error', {error: err});
                                    console.log("input: " + portInfo.input + " output: " + portInfo.output);
                                    project.update({_id: currentProject._id}, {$set:{input: portInfo.input, output: portInfo.output}}, function (err) {
                                        res.json({status: "success"});
                                    });
                                });
                            } catch (err){
                                res.render('error', {error: err});
                            }
                        }
                        else    //editor project
                            res.json({ status: "success" });
                    });
                });
            }
        }
    });
});

/* router.post('/file/uploadCpuGraph', function (req, res, next) {

    if (!req.session.user) {
        res.redirect('/');
    }
    user.findOne({ userName: req.session.user.userName }).exec(function (err, obj) {
        if (req.session.user.uniquetoken !== obj.uniquetoken) {
            req.session = null;
            res.redirect('/');
        }
        else {
            if(!req || !req.body || !req.body.link || !res.locals || !res.locals.project || !res.locals.project.filePath || !res.locals.project.topEntityName)
            {
                console.log("invalid access!");
                res.redirect('/');
            }
            text = req.body.link;
            var currentProject = res.locals.project;

            console.log(currentProject.filePath);
            var filePath = path.join(currentProject.filePath, currentProject.topEntityName);
            console.log("filePath: " + filePath);
            fs.open(filePath, 'w', function (err, fd) {
                if (err)
                    res.render('error', { error: err });
                console.log(text);
                var writeBuffer = new Buffer(text),
                    offset = 0,
                    len = writeBuffer.length,
                    filePostion = null;
                fs.write(fd, writeBuffer, offset, len, filePostion, function (err, readByte) {
                    if (err)
                        res.render('error', { error: err });
                    console.log('写数据总数：' + readByte + ' bytes');

                    // if a drag project, generate VHDL file according to req.body.link
                    var portInfo = new Object();
                    cpuCodeGenetator(currentProject.filePath, JSON.parse(req.body.link), currentProject.topEntityName, portInfo, currentProject.entityPath, function (err) {
                        if (err)
                            res.render('error', { error: err });
                        console.log("input: " + portInfo.input + " output: " + portInfo.output);
                        project.update({ _id: currentProject._id }, { $set: { input: portInfo.input, output: portInfo.output } }, function (err) {
                            res.json({ status: "success" });
                        });

                    });
                });
            });
        }
    });
}); */


router.get('/download/kkk', modelsim.download);
router.get('/revert',modelsim.revert);
router.post('/file/uploadFile', modelsim.upload);
router.post('/file/simulate', modelsim.simulate);

router.get('/deleteProject', function (req, res, next) {
    if (!req.session.user) {
        res.redirect('/');
    }
    user.findOne({ userName: req.session.user.userName }).exec(function (err, obj) {
        
        if (false) {
            // req.session = null;
            // res.redirect('/');
        }
        else {
            var projectId = req.query.projectId;
            var currentUserId;
            if (req.query.userId != undefined)
                currentUserId = req.query.userId;
            else
                currentUserId = res.locals.user._id;
            user.findById(currentUserId, function (err, obj) {
                if (err)
                    throw err;
                else if (obj === null || obj === undefined)
                    throw new Error("No such user!");
                else {
                    var index = obj.projectBox.indexOf(projectId);
                    if (index === -1 || index === undefined || index === null)
                        throw new Error("The user do not have such project!");

                    // console.log(obj.projectBox);
                    // console.log(index);
                    obj.projectBox.splice(index, 1);
                    // console.log(obj.projectBox);
                    obj.save(function (err) {
                        if (err)
                            throw err;
                        project.findOneAndRemove({ _id: projectId }).exec(function (err, retPrj) {
                            if (err)
                                throw err;
                            if (retPrj == null)
                                throw new Error("No such project!");
                            // delete corresponding files and submit entity
                            process.exec('rm -r ' + retPrj.filePath, function (err, stdout, stderr) {
                                // console.log(stdout + '\n' + stderr + "\n===");
                                for (var i = 0; i < retPrj.submitBox.length; ++i) {
                                    submit.findOneAndRemove({ _id: retPrj.submitBox[i] }).exec(function (err, retSbm) {
                                        process.exec('rm -r ' + retSbm.filePath, function (err, stdout, stderr) {
                                            console.log(stdout + '\n' + stderr + "\n!!!");
                                        });
                                    });
                                }
                            });
                            res.redirect("/");
                        });
                    })

                }
            });
        }
    });
});

router.get('/deleteExample', function (req, res, next) {
    if(!req.session.user){
        res.redirect('/');
    } else if (req.session.user.authority == 0) {
        res.redirect('/');
    }
    var projectId = req.query.projectId;
    example.findOne({_id:projectId},function(err,obj){
        if ((err) || (obj == null) || (obj == undefined)){
            console.log("error finding example!");
            return;
        }
        if (obj.isHomework == true){
            console.log("cannot delete example relating homework");
            return;
        }
        example.findOneAndRemove({_id:projectId},function(err,obj){
            process.exec('rm -r ' + obj.filePath, function (err, stdout, stderr) {
                console.log(stdout + '\n' + stderr + "\n===");
                for (var i = 0; i < obj.submitBox.length; ++i) {
                    submit.findOneAndRemove({ _id: obj.submitBox[i] }).exec(function (err, retSbm) {
                        process.exec('rm -r ' + retSbm.filePath, function (err, stdout, stderr) {
                            console.log(stdout + '\n' + stderr + "\n!!!");
                        });
                    });
                }
            });
        });
    });

    res.redirect('/admin/example');
});

/*router.get('/deleteHomework', function(req, res, next){
    if(!req.session.user){
        res.redirect('/');
    } else if (req.session.user.authority == 0) {
        res.redirect('/');
    }
    var homeworkId = req.query.homeworkId;
    homework.findOneAndRemove({_id:homeworkId},function(err,obj){
        if ((err) || (obj == null) || (obj == undefined)){
            console.log("error finding homework!");
            return;
        }
        process.exec('rm -r /home/yuhui/DC_Data/homeworkFile/'+obj._id,function(err,stdout,stderr){
            if (err){
                console.log("error deleting homework!");
                return;
            }
        })
    });

    res.redirect('admin/example');
});*/


router.post('/createProject', function (req, res, next) {
    // console.log(req.session.user);
    if (!req.session.user) {
        // console.log("here1")
        res.redirect('/');
    }

    user.findOne({ userName: req.session.user.userName }).exec(function (err, obj) {
        if (false) {
            // req.session = null;
            // res.redirect('/');
        }
        else {
            // console.log("findOne else");
            var currentUserId;
            if (req.body.userId != undefined)
                currentUserId = req.body.userId;
            else
                currentUserId = res.locals.user._id;
            var projectName = req.body.projectName;
            var projectType = req.body.projectType;
            var topEntity = req.body.topEntity;
            var inputFile = req.body.inputFile+".vhd";

            if ((projectName === "") || (projectName === undefined) || (projectName === null)){
                res.render('error',{error: "invalid top project name!"});
                return;
            } 

            if (req.body.topEntity === req.body.inputFile){
                res.render('error',{error: "invalid top entity name!"});
                return;
            }

            var stringForReg = "^[A-Za-z][A-Za-z0-9_]*$";
            var stringForWrongReg = "__|_$";
            var reservedWordReg = "("
                                +"^abs$"+"|^case$"+"|^generate$"+"|^map$"+"|^package$"+"|^select$"
                                +"|^unaffected$"+"|^access$"+"|^component$"+"|^generic$"
                                +"|^mod$"+"|^port$"+"|^severity$"+"|^units$"+"|^after$"
                                +"|^configuration$"+"|^group$"+"|^postponed$"+"|^signal$"
                                +"|^until$"+"|^alias$"+"|^constant$"+"|^guarded$"+"|^nand$"+"|^procedure$"
                                +"|^shared$"+"|^use$"+"|^all$"+"|^new$"+"|^process$"
                                +"|^sla$"+"|^and$"+"|^disconnect$"+"|^if$"+"|^next$"
                                +"|^pure$"+"|^sll$"+"|^variable$"+"|^architecture$"+"|^downto$"
                                +"|^impure$"+"|^nor$"+"|^sra$"+"|^array$"+"|^in$"+"|^not$"
                                +"|^range$"+"|^srl$"+"|^wait$"+"|^assert$"+"|^else$"+"|^inertial$"+"|^null$"
                                +"|^record$"+"|^subtype$"+"|^when$"+"|^attribute$"+"|^elsif$"+"|^inout$"
                                +"|^register$"+"|^while$"+"|^end$"+"|^is$"+"|^of$"
                                +"|^reject$"+"|^then$"+"|^with$"+"|^begin$"+"|^entity$"+"|^on$"
                                +"|^rem$"+"|^to$"+"|^block$"+"|^exit$"+"|^label$"+"|^open$"+"|^report$"
                                +"|^transport$"+"|^xnor$"+"|^body$"+"|^library$"+"|^or$"+"|^return$"
                                +"|^type$"+"|^xor$"+"|^buffer$"+"|^file$"+"|^linkage$"
                                +"|^others$"+"|^rol$"+"|^bus$"+"|^for$"+"|^literal$"+"|^out$"+"|^ror$"
                                +"|^function$"+"|^loop$"
                                +")";
            var patternForLabels = new RegExp(stringForReg);
            var patternForReservedWords = new RegExp(reservedWordReg);
            var patternForWrongLabels = new RegExp(stringForWrongReg);

            var flag1 = patternForLabels.test(topEntity);
            var flag2 = !(patternForReservedWords.test(topEntity));
            var flag3 = !(patternForWrongLabels.test(topEntity));
            if (!(flag1 && flag2 && flag3)){
                res.render('error',{error: "invalid top entity name!"});
                return;
            } 

            var patternForInput = new RegExp("\\.");
            if (patternForInput.test(req.body.inputFile)){
                res.render('error',{error: "invalid input file name!"});
                return;
            }

            var newProject = new project({
                author: currentUserId,
                projectName: projectName,
                type: new Number(projectType),
                deleted: false,
                createTime: new Date(),
                lastModifiedTime: new Date(),
                filePath: "",
                inputFile: inputFile,
                submitBox: [],
                topEntityName: topEntity,
                // is_example: true,
                compileStatus: 1,
                lastSimulationTime: 0
                // entityPath: ""
            });

            //注意查重
            project.findOne({ projectName: newProject.projectName, author: currentUserId }, function (err, obj) {
                if (err)
                    res.render('error', { error: err });
                if (obj != null)
                    res.status(500).send("The project name has been used!");
                else {
                    newProject.save(function (err) {
                        if (err)
                            res.render('error', { error: err });
                        else {
                            user.findById(currentUserId, function (err, userobj) {
                                if (err)
                                    res.render('error', { error: err });
                                userobj.projectBox.push(newProject._id);
                                userobj.save(function (err) {
                                    if (err)
                                        throw err;
                                    project.findOne({
                                        projectName: newProject.projectName,
                                        author: currentUserId
                                    }, function (err, obj) {
                                        if (err)
                                            res.render('error', { error: err });
                                        if (obj == null)
                                            res.render('error', { error: "Why cannot find the project just saved!" });
                                        var Path = "/home/yuhui/DC_Data/projectFile";
                                        Path = path.join(Path, obj._id.toString());
                                        obj.filePath = Path;

                                        // var PathEntity = "/home/yuhui/DC_Data/cpuEntity";
                                        // PathEntity = path.join(PathEntity, obj._id.toString());
                                        // obj.entityPath = PathEntity;
                                        obj.save(function (err) {
                                            if (err)
                                                res.render('error', { error: err });
                                            process.exec("mkdir " + Path, function (err, stdout, stderr) {
                                                if (err)
                                                    res.render('error', { error: err });
                                                var fileSuffix = "";
                                                if (obj.type == 1)              // editor mode
                                                    fileSuffix = ".vhd";
                                                var cmd = "touch " + path.join(obj.filePath, obj.topEntityName + fileSuffix);
                                                // if (obj.type == 2)
                                                    // cmd += "; cp " + path.resolve(path.dirname(fs.realpathSync(__filename)),
                                                        // '..', './chipInfo/vhdls', './* ') + obj.entityPath;
                                                process.exec(cmd, function (err, stdout, stderr) {
                                                    if (err)
                                                        res.render('error', { error: err });
                                                    if (req.session)
                                                        req.session.user = {
                                                            userName: userobj.userName,
                                                            password: userobj.password,
                                                            authority: userobj.authority,
                                                            _id: userobj._id
                                                        };
                                                    res.json({
                                                        projectId: obj._id
                                                    });
                                                });
                                            });
                                        });
                                    });
                                })
                            })
                        }
                    });
                }
            });
        }
    });
});



router.post('/file/reloadJili', function (req, res, next) {

    if (!req.session.user) {
        res.redirect('/');
    }

    user.findOne({ userName: req.session.user.userName }).exec(function (err, obj) {
        if (false) {
            // req.session = null;
            // res.redirect('/');
        }
        else {
            var projectId = req.body.projectId;
            var inputSignal = JSON.parse(req.body.inputSignal);
            var editSignal = JSON.parse(req.body.editSignal);
            
            console.log(projectId);
            console.log(inputSignal);
            console.log(editSignal);

            if (req.body.projectType == "Example"){
                example.findById(projectId).exec(function (err, retPrj) {
                    SCG(retPrj, inputSignal, editSignal, function (err) {
                        retPrj.lastSimulationTime = editSignal[0][editSignal[0].length - 1] - 1;
                        retPrj.save(function (err) {
                            res.json({
                                status: "success"
                            });
                        });

                    }, 0);
    
                });
            } else {
                project.findById(projectId).exec(function (err, retPrj) {
                    SCG(retPrj, inputSignal, editSignal, function (err) {
                        retPrj.lastSimulationTime = editSignal[0][editSignal[0].length - 1] - 1;
                        retPrj.save(function (err) {
                            res.json({
                                status: "success"
                            });
                        });

                    }, 0);
    
                });
            }

        }
    });
});

router.post('/file/submitHomework', function (req, res, next) {
    if (!req.session.user) {
        res.redirect('/');
    }
    user.findOne({ userName: req.session.user.userName }).exec(function (err, obj) {
        if (req.session.user.uniquetoken !== obj.uniquetoken) {
            req.session = null;
            res.redirect('/');
        }
        else {
            var projectId = req.body.projectId;
            //console.log(projectId);
            //console.log(req.body.projectType);
            if (req.body.projectType !== "Project") {
                res.render("error", {error: "invalid projectType"});
            }
            if (req.body.isEditor) {
                project.findById(projectId).populate('homework').exec(function (err, obj) {
                    var hwid = obj.homework._id;
                    homework.findById(hwid).populate('relateExample').exec(function (err, obj1) {
                        obj1.totalsimfiles = 1;
                        obj1.save();
                        //var cmd = 'cp ' + path.join(obj1.relateExample.filePath, obj1.relateExample.inputFile) + ';';
                        var newSubmit = new submit({
                            time: new Date(),
                            project: obj._id,
                            state: 0,
                            score: 0,
                            filepath: ''
                        });

                        obj.hwSubmitBox.push(newSubmit._id);
                        newSubmit.filePath = path.join('/home/yuhui/DC_Data/submitFile', newSubmit._id.toString());
                        process.exec('mkdir ' + newSubmit.filePath, function (err, stdout, stderr) {
                            process.exec("cp -r " + path.join(obj.filePath, '*') + ' ' + newSubmit.filePath, function (err, stdout, stderr) {
                               process.exec('rm ' + path.join(newSubmit.filePath, obj.inputFile), function (err, stdout, stderr) {
                                   var compilefiles = obj.topEntityName;
                                   var fileArray = fs.readdirSync(newSubmit.filePath).filter(function (fileName, id) {
                                       if (path.extname(fileName) === ".vhd")
                                           return true;
                                       else
                                           return false;
                                   });
                                   fileArray.forEach(function (ele, id) {
                                       if (ele === obj.topEntityName + '.vhd' || ele === path.basename(obj.inputFile))
                                           return;
                                       if (path.basename(ele, '.vhd').search(/const/i) == -1)
                                           compilefiles += (".vhd " + path.basename(ele, '.vhd'));
                                       else
                                           compilefiles = path.basename(ele, '.vhd') + ".vhd " + compilefiles;
                                   });
                                   process.exec('cp ' + path.join(obj1.relateExample.filePath, obj1.relateExample.inputFile) + ' ' + newSubmit.filePath, function (err, stdout, stderr) {
                                      var cmd = 'cp ' + __dirname.slice(0, -6) + '/public/files/model.sh ' + newSubmit.filePath;
                                      process.exec(cmd, function (err, stdout, stderr) {
                                          process.execFile(path.join(newSubmit.filePath, 'model.sh'), [compilefiles, path.basename(obj1.relateExample.inputFile, '.vhd'), 'vsim'], {cwd: newSubmit.filePath}, function (err, stdout, stderr) {
                                              console.log(stderr);
                                              console.log(err);
                                              console.log(stdout);
                                              vcdfunc.vcdFileParser(obj1.relateExample.filePath, 'dump', function (xtime1, lastlist1, changelist1, signalname1) {
                                                  vcdfunc.vcdFileParser(newSubmit.filePath, 'dump', function (xtime2, lastlist2, changelist2, signalname2) {
                                                      var right = (xtime2 === xtime1 && modelsim.compare2DArray(lastlist2, lastlist1) &&
                                                          modelsim.compare2DArray(changelist1, changelist2)
                                                          && modelsim.compare2DArray(signalname2, signalname1));
                                                      //count = count + 1;
                                                      //console.log(simfiles[i] + right);
                                                      if (right) {
                                                          newSubmit.score = newSubmit.score + 1;
                                                          newSubmit.state = 1;
                                                          obj.score = newSubmit.score;
                                                          newSubmit.save(function (err) {
                                                              obj.save(function (err) {
                                                                  res.json({
                                                                      message: 'Submit Success'
                                                                  });
                                                              });
                                                          });
                                                      }
                                                      else {
                                                        newSubmit.state = 1;
                                                        newSubmit.save(function (err) {
                                                            obj.save(function (err) {
                                                                res.json({
                                                                    message: 'Error Loading Design!'
                                                                });
                                                            });
                                                        });
                                                      }
                                                  });
                                              });
                                          });
                                      });
                                  });
                               });
                            });
                        });
                    });
                });
            } else {
                project.findById(projectId).populate('homework').exec(function (err, obj) {
                    var hwid = obj.homework._id;

                    //console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^^^');
                    //homework.findById(hwid).exec(function(err, hwobj) {
                    //console.log(obj);
                    //console.log(obj.hwSubmitBox);
                    //if(obj.hwSubmitBox.length === 0) {
                    //console.log('herehereherehere');
                    //hwobj.correspondProject.push(obj._id);
                    //}
                    //hwobj.save(function (err) {

                    //});
                    //});

                    var Path = path.join('/home/yuhui/DC_Data/homeworkFile', hwid.toString());
                    var simfiles = fs.readdirSync(Path).filter(function (fileName, id) {
                        if (path.extname(fileName) == '.vcd') {
                            return true;
                        }
                        else {
                            return false;
                        }
                    });
                    if (simfiles === null || simfiles === [] || simfiles === undefined) res.json({
                        status: 1,
                        message: 'The teacher hasn\'t add stimulate files'
                    });
                    else {

                        homework.findById(hwid).exec(function (err, hhobj) {
                            hhobj.totalsimfiles = simfiles.length;
                            hhobj.save();
                        });

                        var newSubmit = new submit({
                            time: new Date(),
                            project: obj._id,
                            state: 0,
                            score: 0,
                            filepath: ''
                        });

                        // Date 时间错乱？
                        //var day = newSubmit.time.get
                        obj.hwSubmitBox.push(newSubmit._id);

                        newSubmit.filePath = path.join('/home/yuhui/DC_Data/submitFile', newSubmit._id.toString());

                        process.exec('mkdir ' + newSubmit.filePath, function (err, stdout, stderr) {
                            if (/*newSubmit.time > obj.homework.deadline*/false) {
                                //newSubmit.score = 0;
                            }
                            else {
                                process.exec("cp -r " + path.join(obj.filePath, '*') + ' ' + newSubmit.filePath, function (err, stdout, stderr) {
                                    var cmd = 'cp ' + __dirname.slice(0, -6) + '/public/files/model.sh ' + newSubmit.filePath;
                                    process.exec(cmd, function (err, stdout, stderr) {
                                        var compileFiles = obj.topEntityName;
                                        if (obj.type === 1 || obj.type === 2) {//the compile and simulation of drag and drop only include topEntity and simulation file
                                            var fileArray = fs.readdirSync(newSubmit.filePath).filter(function (fileName, id) {
                                                if (path.extname(fileName) === ".vhd")
                                                    return true;
                                                else
                                                    return false;
                                            });
                                            fileArray.forEach(function (ele, id) {
                                                if (ele === obj.topEntityName + '.vhd' || ele === path.basename(obj.inputFile))
                                                    return;
                                                if (path.basename(ele, '.vhd').search(/const/i) == -1)
                                                    compileFiles += (".vhd " + path.basename(ele, '.vhd'));
                                                else
                                                    compileFiles = path.basename(ele, '.vhd') + ".vhd " + compileFiles;
                                            });
                                        }


                                        var task = [];

                                        for (var i = 0; i < simfiles.length; i++) {
                                            task.push((function (i) {
                                                    return function () {
                                                        var vhdfile = path.basename(simfiles[i], '.vcd') + '.vhd';
                                                        var incmd = 'cp ' + path.join(Path, vhdfile) + ' ' + newSubmit.filePath;
                                                        console.log('command:');
                                                        console.log(incmd);
                                                        process.exec(incmd, function (err, stdout, stderr) {
                                                            console.log('haha');
                                                            process.execFile(path.join(newSubmit.filePath, 'model.sh'), [compileFiles, path.basename(vhdfile, '.vhd'), 'vsim'], {cwd: newSubmit.filePath}, function (err, stdout, stderr) {
                                                                console.log(Path);
                                                                console.log(vhdfile);
                                                                vcdfunc.vcdFileParser(Path, path.basename(simfiles[i], '.vcd'), function (xtime1, lastlist1, changelist1, signalname1) {
                                                                    vcdfunc.vcdFileParser(newSubmit.filePath, 'dump', function (xtime2, lastlist2, changelist2, signalname2) {
                                                                        var right = (xtime2 === xtime1 && modelsim.compare2DArray(lastlist2, lastlist1) &&
                                                                            modelsim.compare2DArray(changelist1, changelist2)
                                                                            && modelsim.compare2DArray(signalname2, signalname1));
                                                                        //count = count + 1;
                                                                        console.log(simfiles[i] + right);
                                                                        if (right) {
                                                                            newSubmit.score = newSubmit.score + 1;
                                                                            //count = count + 1
                                                                            //console.log('count:');
                                                                            //console.log(count);
                                                                        }

                                                                        if (i === simfiles.length - 1) {
                                                                            newSubmit.state = 1;
                                                                            newSubmit.save(function (err) {
                                                                                if (newSubmit.score > obj.score) {
                                                                                    obj.score = newSubmit.score;
                                                                                    obj.save();
                                                                                }
                                                                            });
                                                                        }
                                                                        //if(count === simfiles.length) {
                                                                        //newSubmit.save();
                                                                        //}
                                                                        if (task.length > 0) {
                                                                            task.shift()();
                                                                        }
                                                                    });
                                                                });
                                                            });
                                                        });
                                                    };
                                                })(i));
                                        }
                                        //console.log('Finish');
                                        task.shift()();

                                        newSubmit.save(function (err) {
                                            obj.save(function (err) {
                                                res.json({
                                                    message: 'Submit Success'
                                                });
                                            });
                                        });

                                    });
                                });
                            }
                        });
                    }
                });
            }
        }
    });
});

router.post('/getDescription', function (req, res, next) {
    if (!req.session.user) {
        res.redirect('/');
        return;
    }

    project.findById(req.body.projectId).populate('homework').exec(function(err,prj){
        if (err){
            res.redirect('/');
            return;
        }

        if (prj.homework == undefined){
            res.redirect('/');
            return;
        }

        res.json({
            status: 0,
            responseText:prj.homework.describe
        });
        return;
    });
});

module.exports = router;
