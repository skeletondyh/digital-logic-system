/**
 * Created by kinnplh on 10/30/16.
 */
var express = require('express');
var router = express.Router();
var homework = require('../../dataBase/model/homework');
var user = require('../../dataBase/model/user');
var example = require('../../dataBase/model/example');
var project = require('../../dataBase/model/project');
var submit = require('../../dataBase/model/submit');
var path = require('path');
var multiparty = require('multiparty');
var fs = require('fs');
var process = require('child_process');
var vcd = require('../vcd.js');
var SCG = require('../../VHDL/simpleSimulationCodeGet');

router.get('/example', function(req, res, next) {
    if (!req.session.user){
        res.redirect('/');
    }
    user.findOne({userName:req.session.user.userName}).exec(function (err, obj) {
        if (req.session.user.uniquetoken !== obj.uniquetoken) {
            req.session = null;
            res.redirect('/');
        }
        else if(req.session.user.authority === 0) {
            res.redirect('/');
        }
        else {
            // homework 对不同的发布者可能不同
            var currentUserId = obj._id;

            var exampleBox = [];
            example.find({}).exec(function (err, exampleobj) {
                if (exampleobj !== null) {
                    for(var i = 0; i < exampleobj.length; i++) {
                        exampleBox.push(exampleobj[i]);
                    }
                }

                var hwBox = [];
                homework.find({author:currentUserId}).populate('relateExample').exec(function (err, homeworkobj) {

                    //var stimulateObj = {};

                    if (homeworkobj !== null) {
                        for (var j = 0; j < homeworkobj.length; j++) {
                            hwBox.push(homeworkobj[j]);
                            hwBox[j].exampleName = homeworkobj[j].relateExample.projectName;
                            //stimulateObj[homeworkobj[j]._id] = fs.readdirSync('/home/yuhui/DC_Data/homeworkFile/' + homeworkobj[j]._id);
                        }
                    }

                    res.render('admin/example', {
                        exampleList: exampleBox,
                        homeworkList: hwBox
                    });
                });
            });
        }
    });
});


router.post('/createHomework', function (req, res, next) {
    if (!req.session.user) {
        res.redirect('/');
    }

    user.findOne({userName:req.session.user.userName}).exec(function (err, obj) {
        if (req.session.user.uniquetoken !== obj.uniquetoken) {
            req.session = null;
            res.redirect('/');
        }
        else if(req.session.user.authority === 0) {
            res.redirect('/');
        }
        else {

            //作业可能每人不一样
            var currentUserId = obj._id;

            var hwName = req.body.homeworkName;
            var exampleName = req.body.exampleName;
            var day = req.body.D_Day;
            var month = req.body.D_Month;
            var year = req.body.D_Year;
            //console.log(day);
            //console.log(month);
            //console.log(year);
            console.log(year+'-'+month+'-'+day);
            if (isNaN(day) || isNaN(month) || isNaN(year)){
                res.render('error', {error: "invalid date"});
                return;
            }

            var re = /((^((1[8-9]\d{2})|([2-9]\d{3}))([-\/\._])(10|12|0?[13578])([-\/\._])(3[01]|[12][0-9]|0?[1-9])$)|(^((1[8-9]\d{2})|([2-9]\d{3}))([-\/\._])(11|0?[469])([-\/\._])(30|[12][0-9]|0?[1-9])$)|(^((1[8-9]\d{2})|([2-9]\d{3}))([-\/\._])(0?2)([-\/\._])(2[0-8]|1[0-9]|0?[1-9])$)|(^([2468][048]00)([-\/\._])(0?2)([-\/\._])(29)$)|(^([3579][26]00)([-\/\._])(0?2)([-\/\._])(29)$)|(^([1][89][0][48])([-\/\._])(0?2)([-\/\._])(29)$)|(^([2-9][0-9][0][48])([-\/\._])(0?2)([-\/\._])(29)$)|(^([1][89][2468][048])([-\/\._])(0?2)([-\/\._])(29)$)|(^([2-9][0-9][2468][048])([-\/\._])(0?2)([-\/\._])(29)$)|(^([1][89][13579][26])([-\/\._])(0?2)([-\/\._])(29)$)|(^([2-9][0-9][13579][26])([-\/\._])(0?2)([-\/\._])(29)$))/;  
            var valid = re.test(year+'-'+month+'-'+day);
            if (!(valid)){
                res.render('error', {error: "invalid date"});
                return;
            }

            var description = req.body.description;

            // if some elements of form are empty ?

            homework.findOne({homeworkName:hwName, author:currentUserId}).exec(function (err, hwwobj) {
                if(err) res.render('error', {error: err});
                if(hwwobj !== null)
                    res.render('error', {error: 'The homework name has already existed!'});

                example.findOne({projectName:exampleName}).exec(function (err, exampleobj) {

                    if(exampleobj === null) {
                        res.render('error', {error: 'Invalid example name'});
                    }

                    exampleobj.isHomework = true;
                    exampleobj.save();

                    console.log('---------HH');
                    console.log(year);
                    console.log(month);
                    console.log(day);

                    var newHW = new homework({
                        homeworkName: hwName,
                        deadline: new Date(year, month-1, day),
                        describe: description,
                        totalsimfiles: 0,
                        correspondProject: [],
                        author: currentUserId,
                        relateExample:exampleobj._id
                    });

                    // multi homework match one example?
                    // multi teachers?

                    newHW.save(function (err) {

                        if(err) res.render('error', {error: err});

                        homework.findOne({homeworkName: hwName, author: currentUserId}).exec(function (err, hwobj) {

                            process.exec('mkdir /home/yuhui/DC_Data/homeworkFile/' + hwobj._id, function(err, stdout, stderr) {

                                user.find({authority:0}).exec( function (err, urobj) {

                                    if(urobj !== null) {
                                        for (var i = 0; i < urobj.length; i++) {

                                            var hwforeach = new project({
                                                projectName: hwName,
                                                is_homework: true,
                                                author: urobj[i]._id,
                                                type: exampleobj.type,
                                                deleted: false,
                                                createTime: new Date(),
                                                lastModifiedTime: new Date(),
                                                filePath: "/home/yuhui/DC_Data/projectFile/",
                                                inputFile: exampleobj.inputFile,
                                                submitBox: [],
                                                compileStatus: 1,
                                                topEntityName: exampleobj.topEntityName,

                                                homework: hwobj._id,

                                                score: 0,
                                                hwSubmitBox: [],

                                                input: [],
                                                output: [],

                                                lastSimulationTime: 0
                                                //entityPath: ''
                                            });

                                            hwobj.correspondProject.push(hwforeach._id);

                                            hwforeach.save((function (i) {
                                                return function () {
                                                    project.findOne({
                                                        projectName: hwName,
                                                        is_homework: true,
                                                        author: urobj[i]._id,
                                                        homework: hwobj._id
                                                    })
                                                        .exec(function (err, tempobj) {
                                                            var PATH = path.join(tempobj.filePath, tempobj._id.toString());
                                                            tempobj.filePath = PATH;
                                                            //var entityP = "/home/yuhui/DC_Data/cpuEntity/";
                                                            //entityP = path.join(entityP, tempobj._id.toString());
                                                            //tempobj.entityPath = entityP;
                                                            tempobj.save(function (err) {
                                                                //if(err) res.render('error', {error: err});
                                                                process.exec("mkdir " + PATH, function (err, stdout, stderr) {
                                                                    var fileSuffix = "";
                                                                    if (tempobj.type === 1)// editor
                                                                        fileSuffix = ".vhd";
                                                                    var cmd = "touch " + path.join(tempobj.filePath, tempobj.topEntityName + fileSuffix);
                                                                    //if (tempobj.type == 2)
                                                                        //cmd += "; cp " + path.resolve(path.dirname(fs.realpathSync(__filename)),
                                                                            //'..', './chipInfo/vhdls', './* ') + tempobj.entityPath;
                                                                    process.exec(cmd, function (err, stdout, stderr) {
                                                                        //if (err)
                                                                        //res.render('error', {error: err});
                                                                        urobj[i].homeworkBox.push(tempobj._id);
                                                                        urobj[i].save(function (err) {
                                                                        });
                                                                    });
                                                                });
                                                            });
                                                        });
                                                };
                                            })(i));
                                        }

                                        hwobj.save();
                                    }
                                });
                            });
                        });
                        res.json({
                            status:1,
                            description:"homework"
                        });
                    });
                });
            });
        }
    });
});


router.post('/createExamples', function (req, res, next) {
    if (!req.session.user) {
        res.redirect('/');
    }
    user.findOne({userName: req.session.user.userName}).exec(function (err, obj) {
        if (req.session.user.uniquetoken !== obj.uniquetoken) {
            req.session = null;
            res.redirect('/');
        }
        else if (req.session.user.authority === 0) {
            res.redirect('/');
        }
        else {
            var currentUserId = obj._id;

            var projectName = req.body.projectName;
            var projectType = req.body.projectType;
            var topEntity = req.body.topEntity;
            var inputFile = req.body.inputFile + '.vhd';

            if ((projectName === '') || (projectName === undefined) || (projectName === null)){
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
            //console.log(topEntity);
            if (!(flag1 && flag2 && flag3)){
                res.render('error',{error: "invalid top entity name!"});
                return;
            } 

            var patternForInput = new RegExp("\\.");
            if (patternForInput.test(req.body.inputFile)){
                res.render('error',{error: "invalid input file name!"});
                return;
            }

            var newProject = new example({
                author: currentUserId,
                projectName: projectName,
                type: new Number(projectType),
                deleted: false,
                createTime: new Date(),
                lastModifiedTime: new Date(),
                score: 0,
                ifvisibletoUser: true,
                isHomework: false,
                filePath: '/home/yuhui/DC_Data/exampleFile',
                inputFile: inputFile,
                submitBox: [],
                topEntityName: topEntity,
                compileStatus: 1,
                lastSimulationTime: 0,
                entityPath: '/home/yuhui/DC_Data/cpuEntity'
            });

            if(newProject.type == 1) {
                newProject.ifvisibletoUser = false;
            }  // 编辑代码example对用户不可见

            console.log('Fix TextEditor on 12/01 By skeletondyh');
            console.log('Type: ', newProject.type);
            //注意查重
            //example 是公共的 不用查ID
            example.findOne({projectName: newProject.projectName}, function (err, obj) {
                if (err)
                    res.render('error', {error: err});
                //console.log(obj);
                if (obj !== null)
                    res.status(500).send('The example name has been used!');
                else {

                    newProject.save(function (err) {
                        if (err) res.render('error', {error: err});
                        example.findOne({
                            projectName: newProject.projectName
                            //author: currentUserId
                        }).exec(function (err, obj) {
                            if (err) res.render('error', {error: err});
                            var Path = path.join(obj.filePath, obj._id.toString());
                            obj.filePath = Path;
                            //var PathEntity = "/home/yuhui/DC_Data/cpuEntity";
                            //PathEntity = path.join(PathEntity, obj._id.toString());
                            //obj.entityPath = PathEntity;
                            obj.save(function (err) {
                                if (err)
                                    res.render('error', {error: err});
                                // 需要事先创建根目录 即exampleFile 与 cpuEntity
                                process.exec("mkdir " + Path, function (err, stdout, stderr) {
                                    if (err)
                                        res.render('error', {error: err});
                                    var fileSuffix = '';
                                    if (obj.type === 1)// editor
                                        fileSuffix = ".vhd";
                                    var cmd = "touch " + path.join(obj.filePath, obj.topEntityName + fileSuffix);
                                    //if (obj.type === 2)
                                        //cmd += "; cp " + path.resolve(path.dirname(fs.realpathSync(__filename)),
                                            //'..', './chipInfo/vhdls', './* ') + obj.entityPath;
                                    process.exec(cmd, function (err, stdout, stderr) {
                                        if (err)
                                            res.render('error', {error: err});
                                        //console.log("OBJ_");
                                        //console.log(req.session.user);
                                        //res.setHeader("Content-Type", "text/html");
                                        //res.redirect('/');
                                        //console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^");
                                        //console.log(obj._id);
                                        res.json({
                                            projectId: obj._id
                                        });
                                    });
                                });
                            });
                        });
                    });
                }
            });
        }
    });
});

router.post('/newHomeworkBasicInfo', function (req, res, next) {
    //get the basic info
    //and set to the session
    if(!req.session.user) {
        res.redirect('/');
    }
    user.findOne({userName:req.session.user.userName}).exec(function (err, obj) {
        if (req.session.user.uniquetoken !== obj.uniquetoken) {
            req.session = null;
            res.redirect('/');
        }
        else if(req.session.user.authority == 0) {
            res.redirect('/');
        }
        else {
            var newHw = {
                hwName: req.body.homeworkName,
                type: req.body.homeworkType,
                topEntityName: req.body.topEntityName,
                inPortName: req.body.inputPortName.split(",").filter(function (portName, id) {
                    if (portName == '' || portName == ';')
                        return false;
                    return true;
                }),
                outPortName: req.body.outputPortName.split(",").filter(function (portName, id) {
                    if (portName == '' || portName == ';')
                        return false;
                    return true;
                }),
                deadline: new Date(req.body.deadline),
                filePath: "",
                inputFile: req.body.simulateFileName,
                simulateRes: "",
                xtime: "",
                lastlist: [],
                changelist: [],
                signalname: [],
                describe: req.body.describe,
                correspondProject: []
            };
            req.session.newHw = newHw;
            res.locals.newHw = newHw;
            res.json({status: "success"});
        }
    });
});

router.post('/uploadStandardFiles', function (req, res, next) {
    if(!req.session.user) {
        res.redirect('/');
    }
    user.findOne({userName:req.session.user.userName}).exec(function (err, obj) {
        if (req.session.user.uniquetoken !== obj.uniquetoken) {
            req.session = null;
            res.redirect('/');
        }
        else if(req.session.user.authority == 0) {
            res.redirect('/');
        }
        else {
            var temSavePath = "/home/yuhui/DC_Data/homeworkFile/tem/";
            var form = new multiparty.Form({uploadDir: temSavePath});

            form.parse(req, function (err, fields, files) {
                var filesTmp = JSON.stringify(files, null, 2);

                if (err) {
                    console.log('parse error: ' + err);
                } else {
                    console.log(files);
                    console.log('parse files: ' + filesTmp);
                    console.log('length:' + files.file.length);
                    var fileNum = files.file.length;
                    for (var i = 0; i < fileNum; i++) {
                        var inputFile = files.file[i];
                        var uploadedPath = inputFile.path;
                        var pathAfterChange = path.join(path.dirname(uploadedPath), inputFile.originalFilename);
                        fs.rename(uploadedPath, pathAfterChange, function (err) {
                            if (err)
                                res.render('error', {error: err});
                        });
                    }
                }
            });
            res.json({status: "success"});
        }
    });
});

router.post('/homeworkSimulate', function (req, res, next) {
    if(!req.session.user) {
        res.redirect('/');
    }
    user.findOne({userName:req.session.user.userName}).exec(function (err, obj) {
        if (req.session.user.uniquetoken !== obj.uniquetoken) {
            req.session = null;
            res.redirect('/');
        }
        else if(req.session.user.authority == 0) {
            res.redirect('/');
        }
        else {
            var newHw = res.locals.newHw;
            var temSavePath = "/home/yuhui/DC_Data/homeworkFile/tem/";

            process.exec('cp ' + __dirname.slice(0,-13)+'/public/files/model.sh ' + temSavePath, function (err, stdout, stderr){
                //move the script to the folder
                console.log('cp ' + __dirname.slice(0,-13)+'/public/files/model.sh ' + temSavePath);
                var compileFiles =  newHw.topEntityName;
                var fileArray = fs.readdirSync(temSavePath).filter(function (fileName, id) {
                    if (path.extname(fileName) == ".vhd")
                        return true;
                    else
                        return false;
                });
                fileArray.forEach(function (ele, id) {
                    console.log(ele + path.basename(newHw.inputFile));
                    if (ele == newHw.topEntityName + '.vhd' || ele == path.basename(newHw.inputFile))
                        return;
                    compileFiles += (".vhd " + path.basename(ele, '.vhd'));
                });

                console.log(compileFiles);
                process.execFile(path.join(temSavePath, "model.sh"), [compileFiles, path.basename(newHw.inputFile, '.vhd'), "vsim"], {cwd: temSavePath}, function (err, stdout, stderr){
                    if(stderr != "")
                    {
                        res.json({
                            status: 1,
                            stdoutMsg: stdout,
                            stderrMsg: stderr
                        });
                    }
                    else {
                        //look into the vcd fle and
                        //pass enough msg to the front to show the results
                        var xtime = "";
                        var lastlist = new Array();
                        var changelist = new Array();
                        var signalname;
                        fs.createReadStream(path.join(temSavePath, "dump.vcd"))
                            .pipe(vcd.createStream())
                            .on('begin', function (state) {
                                // state contains date, variable definitions, etc.
                                //console.log(state);
                            })
                            .on('sample', function (index, changes, last) {
                                // index = number of sample
                                // changes = hash of changed vars (by name)
                                // last = last state of all vars
                                signalname = new Array();
                                vectorSignalName = new Array();


                                const changeordered = {};
                                Object.keys(changes).sort(compareFunc).forEach(function(key) {
                                    changeordered[key] = changes[key];
                                });
                                const lastordered = {};
                                Object.keys(last).sort(compareFunc).forEach(function(key) {
                                    lastordered[key] = last[key];
                                });

                                console.log("change");
                                console.log(changeordered);
                                console.log("last"+last);
                                for (key in lastordered) {
                                    //console.log(key);
                                    signalname.push(key );
                                }
                                var k = signalname.length-1;
                                lasttemp = [];
                                for(var key in lastordered){
                                    if(lastordered[key] == 0)
                                    {
                                        lasttemp.push(0);
                                    }
                                    else
                                    {
                                        lasttemp.push(1);
                                    }
                                    k = k - 1;
                                }
                                changetemp = [];
                                k = signalname.length-1;
                                for(var key in changeordered){
                                    if(changeordered[key] == 0){
                                        changetemp.push(1);
                                    }else if(changeordered[key] == 1){
                                        changetemp.push(0 );
                                    }else{
                                        changetemp.push(changeordered[key]);
                                    }
                                    k = k - 1;

                                }
                                lastlist.push(lasttemp);
                                changelist.push(changetemp);
                                // console.log(lastlist);
                                xtime = xtime + index + " ";
                            }).on('finish',function(){
                            list = new Array();
                            list = xtime.split(" ");
                            list = xtime.split(" ").slice(1,-1);
                            list.unshift("0");
                            //list.push((parseInt(list[1])+parseInt(list[list.length-1])).toString());
                            //console.log(xtime);
                            for(var i in list)
                            {
                                list[i] = (parseInt(list[i])/1000).toString();
                            }
                            xtime =  JSON.stringify(list);
                            var vectortemp = "";
                            var vectorlist = new Array();
                            for(var i in signalname)
                            {
                                console.log(i + " " + signalname[i] + " !!!");
                                var z = signalname[i].indexOf('[');
                                if(z == -1)
                                {
                                    vectorSignalName.push(signalname[i]);
                                    vectorlist.push(i);
                                }
                                else
                                {
                                    var name = signalname[i].slice(0,z);
                                    if(vectorSignalName.slice(-1) != name)
                                    {
                                        vectorSignalName.push(name);
                                        vectorlist.push(i);
                                    }
                                }
                            }
                            console.log(vectorlist);
                            changelist = new Array();
                            console.log(vectorlist);
                            for(i in lastlist)
                            {
                                var newChangeListSub = new Array();
                                var j = 0;
                                for(var k in lastlist[i])
                                {

                                    console.log(k == parseInt(vectorlist[j]));


                                    if(k == parseInt(vectorlist[j]))
                                    {
                                        if(k != 0)
                                        {
                                            newChangeListSub.push(vectortemp);
                                        }

                                        vectortemp = "";
                                        j++;
                                    }
                                    if(k == lastlist[i].length-1)
                                    {
                                        console.log("vectorTempBefore: " +vectortemp);
                                        vectortemp = vectortemp + lastlist[i][k].toString();
                                        newChangeListSub.push(vectortemp);
                                        console.log("vectorTempAfter: " +vectortemp);
                                        break;

                                    }
                                    vectortemp = vectortemp + lastlist[i][k].toString();

                                }
                                console.log("qwertyu" + newChangeListSub);
                                changelist.push(newChangeListSub);
                            }
                            xtime =  JSON.stringify(list);
                            newHw.xtime = xtime;
                            newHw.changelist = JSON.stringify(changelist);
                            newHw.lastlist = JSON.stringify(lastlist);
                            newHw.signalname = JSON.stringify(vectorSignalName);
                            newHw.simulationTime = 0;
                            req.session.newHw = newHw;
                            res.locals.newHw = newHw;
                            res.json({
                                status: 0,
                                newHw: newHw
                            });
                        });
                        //generate enough msg to show the results
                        //
                    }
                });

            });
        }
    });
});

router.post('/deleteHomeworkFile', function (req, res, next) {
    if(!req.session.user) {
        res.redirect('/');
    }
    user.findOne({userName:req.session.user.userName}).exec(function (err, obj) {
        if (req.session.user.uniquetoken !== obj.uniquetoken) {
            req.session = null;
            res.redirect('/');
        }
        else if(req.session.user.authority == 0) {
            res.redirect('/');
        }
        else {
            var fileName = req.body.fileName;
            var temSavePath = "/home/yuhui/DC_Data/homeworkFile/tem/";
            var fullPath = path.join(temSavePath, fileName);
            if(fs.existsSync(fullPath)){
                fs.unlink(fullPath, function (err) {
                    res.json({
                        status: 0
                    });
                });
            }
            else {
                res.json({
                    status: 1,
                    msg: "no such file"
                });
            }
        }
    });
});

router.post('/createHomeworkFinished', function (req, res, next) {
    if(!req.session.user) {
        res.redirect('/');
    }
    user.findOne({userName:req.session.user.userName}).exec(function (err, obj) {
        if (req.session.user.uniquetoken !== obj.uniquetoken) {
            req.session = null;
            res.redirect('/');
        }
        else if(req.session.user.authority == 0) {
            res.redirect('/');
        }
        else {
            var newHw = res.locals.newHw;
            var newHomework = new homework(newHw);
            var temSavePath = "/home/yuhui/DC_Data/homeworkFile/tem/";
            //if the homework name used
            console.log("nhcl:");
            console.log(newHw.changelist);
            console.log(JSON.parse(newHw.changelist));



            homework.findOne({hwName: newHomework.hwName}, function (err, obj) {
                if(obj != null){
                    res.json({
                        status: 1,
                        msg: "The homework name has been used already"
                    });
                    return;
                }

                //save the current homework
                // and push to the homework box
                newHomework.save(function (err) {
                    if(err)
                        res.render('error', {error: err});
                    newHomework.filePath = "/home/yuhui/DC_Data/homeworkFile/" + newHomework._id;
                    var newFolderPath = "/home/yuhui/DC_Data/homeworkFile/" + newHomework._id;
                    user.find({authority: 0}, function (err, users) {
                        if(err)
                            res.render('error', {error: err});
                        console.log(users);
                        for(var i = 0; i < users.length; ++ i){
                            var homeworkProject = new project({
                                projectName: newHomework.hwName,
                                author: users[i]._id,
                                type: newHomework.type,
                                deleted: false,
                                createTime: new Date(),
                                lastModifiedTime: new Date(),
                                filePath: "", // to be determined
                                inputFile: newHomework.inputFile,
                                submitBox: [],
                                compileStatus: 1,
                                topEntityName: newHomework.topEntityName,

                                homework: newHomework._id,
                                score: 0,
                                hwSubmitBox: []
                            });

                            newHomework.correspondProject.push(homeworkProject._id);

                            homeworkProject.save(
                                (function (i) {
                                    return function (err) {
                                        users[i].homeworkBox.push(homeworkProject._id);
                                        users[i].save(function (err) {
                                            homeworkProject.filePath = path.join("/home/yuhui/DC_Data/projectFile", "" + homeworkProject._id);
                                            process.exec("mkdir " + homeworkProject.filePath, function (err, stdout, stderr) {
                                                homeworkProject.save(function (err) {
                                                    var fileSuffix = "";
                                                    if(homeworkProject.type == 1)
                                                        fileSuffix = ".vhd";
                                                    process.exec("touch " + path.join(homeworkProject.filePath, homeworkProject.topEntityName + fileSuffix), function (err, stdout, stderr){

                                                    });
                                                });
                                            });
                                        });
                                    }
                                })(i)
                            );

                        }

                    });
                    //move the current files out of tem
                    //for future possible use

                    process.exec("mkdir " + newFolderPath, function (err, stdout, stderr) {
                        process.exec("mv " + temSavePath + '* ' + newFolderPath, function (err, stdout, stderr) {
                            newHomework.save(function () {
                                res.json({
                                    status: 0
                                });
                            });

                        });
                    });

                });


            });
        }
    });
});

router.post('/getHomeworkData', function (req, res, next) {
    if(!req.session.user) {
        res.redirect('/');
    }
    user.findOne({userName:req.session.user.userName}).exec(function (err, obj) {
        if (req.session.user.uniquetoken !== obj.uniquetoken) {
            req.session = null;
            res.redirect('/');
        }
        else if(req.session.user.authority == 0) {
            res.redirect('/');
        }
        else {
            console.log(req.body.homeworkId);
            var graph;
            homework.findById(req.body.homeworkId).populate('relateExample').exec(function(err, obj){
                if (err) {
                    console.log("error loading homework!");
                    return;
                }
                var filePath = obj.relateExample.filePath;
                var topEntityName = obj.relateExample.topEntityName;
                console.log("read: "+ filePath);
                console.log("read: "+ topEntityName);
                console.log("read: "+ path.join(filePath,topEntityName));
                fs.readFile(path.join(filePath,topEntityName), function(err, buffer){
                    if (err) {
                        graph = "";
                        return;
                    }
                    graph = buffer;
                    console.log("homework graph: "+graph);
                    res.json({
                        status: 1,
                        graph: graph.toString()
                    });
                });
            });
        }
    });
});

router.post('/getStimFileList', function (req, res, next) {
    if(!req.session.user) {
        res.redirect('/');
    }
    user.findOne({userName:req.session.user.userName}).exec(function (err, obj) {
        if (req.session.user.uniquetoken !== obj.uniquetoken) {
            req.session = null;
            res.redirect('/');
        }
        else if(req.session.user.authority == 0) {
            res.redirect('/');
        }
        else {
            console.log("homework: "+req.body.homeworkId);
            homework.findById(req.body.homeworkId).exec(function(err, obj){
                if (err) {
                    console.log("error loading homework when getStimFileList!");
                    res.render("error",{error: "error loading homework when getStimFileList!"});
                    return;
                }
                var filePath = "/home/yuhui/DC_Data/homeworkFile/"+req.body.homeworkId;

                function isStimFile(str){
                    return str.endsWith(".stim");
                }

                res.json({
                    status: 1,
                    list: fs.readdirSync(filePath).filter(isStimFile)
                });
            });
        }
    });
});

router.post('/getStimFile', function (req, res, next) {
    if(!req.session.user) {
        res.redirect('/');
    }
    user.findOne({userName:req.session.user.userName}).exec(function (err, obj) {
        if (req.session.user.uniquetoken !== obj.uniquetoken) {
            req.session = null;
            res.redirect('/');
        }
        else if(req.session.user.authority == 0) {
            res.redirect('/');
        }
        else {
            console.log("stimfile: "+req.body.stimFileName);
            console.log("homework: "+req.body.homeworkId);
            var graph;
            homework.findById(req.body.homeworkId).exec(function(err, obj){
                if (err) {
                    console.log("error loading homework when getStimFile!");
                    return;
                }
                var filePath = "/home/yuhui/DC_Data/homeworkFile/"+req.body.homeworkId;
                var stimFileName = req.body.stimFileName;
                console.log("read: "+ path.join(filePath,stimFileName));
                fs.readFile(path.join(filePath,stimFileName), function(err, buffer){
                    if (err) {
                        graph = "";
                        console.log("no such stimFile!");
                        res.json({
                            status: 1,
                            graph: ""
                        });
                        return;
                    }
                    graph = buffer;
                    console.log("stim graph: "+graph);
                    res.json({
                        status: 1,
                        graph: graph.toString()
                    });
                });
            });
        }
    });
});

function stimFileSimulation(retPrj, homeworkId, stimFileName){
    var homeworkPath = "/home/yuhui/DC_Data/homeworkFile/"+homeworkId;
    process.exec("cp -r " + path.join(retPrj.filePath, '*') + ' ' + homeworkPath, function (err, stdout, stderr) {
        console.log("stdout: " + stdout);
        console.log("stderr: " + stderr);
        var cmd = 'cp ' + __dirname.slice(0,-12)+'public/files/model.sh ' + homeworkPath;

        process.exec(cmd, function (err, stdout, stderr) {
            var compileFiles = retPrj.topEntityName;
            process.execFile(path.join(homeworkPath, "model.sh"), [compileFiles, stimFileName, "vsim"], {cwd: homeworkPath}, function (err, stdout, stderr) {
                console.log("stdout: "+stdout);
                console.log("stderr: "+stderr);
                console.log("cmd: " + path.join(homeworkPath, "model.sh") + ' ' + [compileFiles, stimFileName, "vsim"]);
                
                var cmd = "mv "+homeworkPath+"/dump.vcd "+homeworkPath+"/"+stimFileName+".vcd";
                console.log(cmd);
                process.exec(cmd,function(err,stdout,stderr){
                    if (err){
                        console.log("error renaming!"+stderr);
                        return;
                    }
                    xtime = "";
                    lastlist = [];
                    changelist = [];
                    signalname = "";
                    vcd.vcdFileParser(homeworkPath,stimFileName,
                    function(xtime,lastlist,changelist,signalname){
                        console.log("xtime: "+xtime);
                        console.log("lastlist: "+lastlist);
                        console.log("changelist: "+changelist);
                        console.log("signalname: "+signalname);
                    });
                });
            });
        });
    });
}

router.post('/saveStimFile', function (req, res, next) {
    if(!req.session.user) {
        res.redirect('/');
    }
    user.findOne({userName:req.session.user.userName}).exec(function (err, obj) {
        if (req.session.user.uniquetoken !== obj.uniquetoken) {
            req.session = null;
            res.redirect('/');
        }
        else if(req.session.user.authority == 0) {
            res.redirect('/');
        }
        else {
            console.log("stimfile: "+req.body.stimFileName);
            console.log("homework: "+req.body.homeworkId);

            var regex = new RegExp("^[a-zA-z0-9]+\\.stim$");
            if (!(regex.test(req.body.stimFileName))){
                res.json({
                    status: 0,
                    responseText: "invalid stimFileName"
                });
                return;
            }
            
            if (req.body.stimFileName == "dump.stim"){
                res.json({
                    status: 0,
                    responseText: "invalid stimFileName"
                });
                return;
            }

            if (req.body.stimFileName > 15){
                res.json({
                    status: 0,
                    responseText: "invalid stimFileName"
                });
                return;
            }

            var graph;
            var stimFileName = req.body.stimFileName.slice(0,-5);
            homework.findById(req.body.homeworkId).populate("relateExample").exec(function(err, obj){
                if (err) {
                    console.log("error loading homework when getStimFile!");
                    return;
                }
                var filePath = "/home/yuhui/DC_Data/homeworkFile/"+req.body.homeworkId;
                console.log("read: "+ path.join(filePath,stimFileName+".stim"));
                fs.writeFile(path.join(filePath,stimFileName+".stim"), req.body.stimFileData, function(err, buffer){
                    if (err) {
                        console.log("error saving stimFile!")
                        return;
                    }

                    var editSignalList = [];
                    var graph = JSON.parse(req.body.stimFileData);
                    if (graph.data !== undefined){
                        editSignalList = graph.data;
                    }

                    var inputSignalList = [];
                    var editList = [];
                    for (k in editSignalList)
                    {
                        inputSignalList.push(editSignalList[k].ref.tag);
                        editList.push(editSignalList[k].list);
                    }

                    console.log(inputSignalList);
                    console.log(editList);
                    SCG(obj.relateExample,inputSignalList,editList,function(err){
                        if (err){
                            console.log("error SCGing!");
                            return;
                        }
                    },1,stimFileName,req.body.homeworkId);

                    stimFileSimulation(obj.relateExample,req.body.homeworkId,stimFileName);

                    res.json({
                        status: 1,
                        description: "save successful!"
                    });
                });

            });
        }
    });
});

router.post('/deleteStimFile', function (req, res, next) {
    if(!req.session.user) {
        res.redirect('/');
    }
    user.findOne({userName:req.session.user.userName}).exec(function (err, obj) {
        if (req.session.user.uniquetoken !== obj.uniquetoken) {
            req.session = null;
            res.redirect('/');
        }
        else if(req.session.user.authority == 0) {
            res.redirect('/');
        }
        else {
            console.log("stimfile: "+req.body.stimFileName);
            console.log("homework: "+req.body.homeworkId);
            var graph;
            homework.findById(req.body.homeworkId).exec(function(err, obj){
                if (err) {
                    console.log("error loading homework when getStimFile!");
                    return;
                }
                var filePath = "/home/yuhui/DC_Data/homeworkFile/"+req.body.homeworkId;
                var stimFileName = req.body.stimFileName;
                var stimVHDFileName = req.body.stimFileName.slice(0,-5)+".vhd";
                var stimVCDFileName = req.body.stimFileName.slice(0,-5)+".vcd";
                console.log("delete: "+ path.join(filePath,stimFileName));
                fs.unlink(path.join(filePath,stimFileName), function(err, buffer){
                    if (err) {
                        console.log("error deleting stimFile!")
                        return;
                    }
                    fs.unlink(path.join(filePath,stimVHDFileName), function(err, buffer){
                        if (err) {
                            console.log("error deleting stimVHDFile!")
                            return;
                        }
                        fs.unlink(path.join(filePath,stimVCDFileName), function(err, buffer){
                            if (err) {
                                console.log("error deleting stimVCDFile!")
                                return;
                            }
                            res.json({
                                status: 1,
                                description: "delete successful!"
                            });
                        });
                    });
                });

            });
        }
    });
});

router.get('/viewStimResult', function (req, res, next) {
    console.log("viewStimResult!!!");
    if(!req.session.user) {
        res.redirect('/');
    }
    user.findOne({userName:req.session.user.userName}).exec(function (err, obj) {
        if (req.session.user.uniquetoken !== obj.uniquetoken) {
            req.session = null;
            res.redirect('/');
        }
        else if(req.session.user.authority == 0) {
            res.redirect('/');
        }
        else {
            console.log("stimfile: "+req.query.stimFileName);
            console.log("homework: "+req.query.homeworkId);
            var graph;
            homework.findById(req.query.homeworkId).exec(function(err, obj){
                if (err) {
                    console.log("error loading homework when viewStimResult!");
                    return;
                }
                var filePath = "/home/yuhui/DC_Data/homeworkFile/"+req.query.homeworkId;
                var stimVCDFileName = req.query.stimFileName.slice(0,-5);
                console.log("stimVCDFileName: "+stimVCDFileName);
                try{
                    vcd.vcdFileParser(filePath,stimVCDFileName,
                        function(xtime,lastlist,changelist,signalname){
                            if ((xtime == undefined) || (lastlist == []) || 
                            (changelist == []) || (signalname == [])){
                                res.render('error',{
                                    error: "仿真出错!"
                                });
                            } else {
                                console.log("here, success");
                                res.render('file',{
                                    simulatem: "",
                                    xtime: xtime,
                                    changelist: JSON.stringify(changelist),
                                    lastlist: JSON.stringify(lastlist),
                                    signalname: JSON.stringify(signalname),
                                    pathNav: [{name: stimVCDFileName, link: "/admin/example"}]
                                });
                            }
                    });
                } catch(err) {
                    res.render('error',{
                        error: "仿真尚未结束或结果文件丢失,请稍等或重新编辑仿真波形!"
                    });
                }

            });
        }
    });
});

function compareFunc(a, b) {
    if(a.indexOf('[') == -1 || b.indexOf('[') == -1){
        var pureNameA = (a.indexOf('[') != -1)? a.slice(0, a.indexOf('[')): a;
        var pureNameB = (b.indexOf('[') != -1)? b.slice(0, b.indexOf('[')): b;
        if(pureNameA < pureNameB)
            return -1;
        else if(pureNameA == pureNameB)
            throw new Error("reused name");
        else
            return 1;
    }
    else {
        var pureNameA = (a.indexOf('[') != -1)? a.slice(0, a.indexOf('[')): a;
        var pureNameB = (b.indexOf('[') != -1)? b.slice(0, b.indexOf('[')): b;

        if(pureNameA < pureNameB)
            return -1;
        else if(pureNameA == pureNameB){
            var numA = parseInt(a.slice(a.indexOf('[') + 1, a.indexOf(']')));
            var numB = parseInt(b.slice(b.indexOf('[') + 1, b.indexOf(']')));
            if(numA > numB)
                return -1;
            else if(numA < numB)
                return 1;
            else
                throw new Error("reused name");
        }
        else
            return 1;

    }




}

module.exports = router;