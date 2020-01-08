/**
 * Created by lixin on 2016/10/3.
 */
var multiparty = require('multiparty');
var util = require('util');
var fs = require('fs');
var path = require('path');
var project = require('../dataBase/model/project');
var example = require('../dataBase/model/example');
var user = require('../dataBase/model/user');
var submit = require('../dataBase/model/submit');
var vcd = require('./vcd.js');
var split = require('split');
var homework = require('../dataBase/model/homework');
//var test = require('async');
//require("fusioncharts/fusioncharts.charts")(FusionCharts);


function compare2DArray(array1, array2) {
   if(array1.length != array2.length)
      return false;
   for(var i = 0; i < array2.length; ++ i){
      var subArr1 = array1[i];
      var subArr2 = array2[i];
      if(subArr1.length != subArr2.length)
         return false;
      for(var j = 0; j < subArr2.length; ++ j)
         if(subArr1[j] != subArr2[j])
            return false;
   }
   return true;
}

exports.compare2DArray = compare2DArray;

exports.download = function(req, res){
    if(!req.session.user) {
        res.redirect('/');
    }
    user.findOne({userName:req.session.user.userName}).exec(function (err, obj) {
        if (req.session.user.uniquetoken !== obj.uniquetoken) {
            req.session = null;
            res.redirect('/');
        }
        else {
            var submitId = req.query.submitId;
            var submitIdForFIle = req.query.submitIdForFile;
            if(submitId) {
                submit.findById(submitId, function (err, retSubmit) {
                    var file = retSubmit.simulateRes;
                    res.download(file);
                });
            } else
            {
                submit.findById(submitIdForFIle, function (err, retSubmit) {
                    var filePath = retSubmit.filePath;
                    var zipPath = path.join(filePath, 'all.zip');
                    fs.exists(zipPath, function (exists) {
                        if(exists)
                            res.download(zipPath);
                        else
                        {
                            var process = require('child_process');
                            process.exec("zip -r " + zipPath + ' *', {cwd: filePath},function (err, stdout, errout) {
                                res.download(zipPath);
                            });
                        }
                    });
                });
            }
        }
    });
};

exports.upload = function uploadFile(req,res){//just upload files and no simulation following

   //may be difficult to get rid of variables stored in locals
    if(!req.session.user) {
        res.redirect('/');
    }
    user.findOne({userName:req.session.user.userName}).exec(function (err, obj) {
        if (req.session.user.uniquetoken !== obj.uniquetoken) {
            req.session = null;
            res.redirect('/');
        }
        else {
            console.log(req);
            project.findById(res.locals.project._id, function (err, retPrj) {
                if(err)
                    res.render('error', {error: err});
                if(retPrj == null)
                    res.render('error', {error: "No such project!"});
                var projectPath = retPrj.filePath;

                //生成multiparty对象，并配置上传目标路径
                var form = new multiparty.Form({uploadDir: projectPath});
                //上传完成后处理
                form.parse(req, function(err, fields, files) {
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
                            var pathAfterChange = path.join(path.dirname(uploadedPath), inputFile.originalFilename);
                            fs.rename(uploadedPath, pathAfterChange, function (err) {
                                if(err)
                                    res.render('error',{error: err});
                            });
                        }
                        res.json({status: "success"});
                    }
                });
            });
        }
    });
};

exports.judge = function (projectId) {
    project.findById(projectId).exec(function (err, resultobj) {
       if(err) res.render('error', {error: err});
       var newSubmit = new submit({
           time: new Date(),
           project: resultobj._id,
           state: 0,
           score: 0,
           filepath: ''
       });
       newSubmit.save(function (err) {
           if(err) res.render('error', {error: err});
           resultobj.hwSubmitBox.push(newSubmit._id);
           var process = require('child_process');
           newSubmit.filePath = path.join('/home/yuhui/DC_Data/submitFile', newSubmit._id.toString());
           process.exec('mkdir ' + newSubmit.filePath, function (err, stdout, stderr) {
               process.exec("cp -r " + path.join(resultobj.filePath, '*') + ' ' + newSubmit.filePath, function (err, stdout, stderr) {
                   var cmd = 'cp ' + __dirname.slice(0,-6)+'/public/files/model.sh ' + newSubmit.filePath;
                   process.exec(cmd, function (err, stdout, stderr) {
                       var standardfiles = fs.readdirSync(path.join('/home/yuhui/DC_Data/homeworkFile', resultobj.homework.toString())).filter(function (filename, id) {
                          if(path.extname(filename) == '.vhd') {
                              return true;
                          }
                          else {
                              return false;
                          }
                       });
                       var compileFiles = resultobj.topEntityName;
                       if(resultobj.type == 1 || resultobj.type == 2) {//the compile and simulation of drag and drop only include topEntity and simulation file
                           var fileArray = fs.readdirSync(newSubmit.filePath).filter(function (fileName, id) {
                               if (path.extname(fileName) == ".vhd")
                                   return true;
                               else
                                   return false;
                           });
                           fileArray.forEach(function (ele, id) {
                               if (ele == retPrj.topEntityName + '.vhd' || ele == path.basename(newSubmit.inputFile))
                                   return;
                               if(path.basename(ele, '.vhd').search(/const/i) == -1)
                                   compileFiles += (".vhd " + path.basename(ele, '.vhd'));
                               else
                                   compileFiles = path.basename(ele, '.vhd') + ".vhd " + compileFiles;
                           });
                       }
                       process.exec('cp ' + path.join('/home/yuhui/DC_Data/homeworkFile/' + resultobj.homework.toString(), '*.vhd') + ' ' + newSubmit.filePath, async function (err, stdout, stderr) {
                           for(var i = 0; i < standardfiles.length; i++) {
                               var inputfile = standardfiles[i];
                               await process.execFile(path.join(newSubmit.filePath, 'model.sh'), [compileFiles, path.basename(inputfile, '.vhd'), path.basename(inputfile, '.vhd') + '.vcd', 'vsim'], {cwd: newSubmit.filePath}, function (err, stdout, stderr) {
                                   if(stderr && stderr.length > 0) {

                                   }
                                   else {
                                       var xtime = "";
                                       var lastlist = new Array();
                                       var changelist = new Array();
                                       var signalname;
                                       var vectorSignalName;
                                       fs.createReadStream(path.join(newSubmit.filePath, path.basename(inputfile, '.vhd') + '.vcd'))
                                           .pipe(vcd.createStream())
                                           .on('begin', function (state) {

                                           })
                                           .on('sample', function (index, changes, last) {
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

                                               //console.log("change");
                                               //console.log(changeordered);
                                               //console.log("last"+last);
                                               for (key in lastordered) {
                                                   //console.log(key);
                                                   signalname.push(key );
                                               }
                                               var k = signalname.length-1;
                                               var lasttemp = [];
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
                                               var changetemp = [];
                                               k = signalname.length-1;
                                               for(var key in changeordered){
                                                   if(changeordered[key] == 0){
                                                       changetemp.push(1);
                                                   }else if(changeordered[key] == 1){
                                                       changetemp.push(0);
                                                   }else{
                                                       changetemp.push(changeordered[key]);
                                                   }
                                                   k = k - 1;

                                               }
                                               lastlist.push(lasttemp);
                                               changelist.push(changetemp);
                                               // console.log(lastlist);
                                               xtime = xtime + index + " ";
                                           }).on('finish',function() {
                                                   var list;
                                                   //list = xtime.split(" ");
                                                   list = xtime.split(" ").slice(1, -1);
                                                   list.unshift("0");
                                                   //list.push((parseInt(list[1])+parseInt(list[list.length-1])).toString());
                                                   //console.log(xtime);
                                                   for (var i in list) {
                                                       list[i] = (parseInt(list[i]) / 1000).toString();
                                                   }
                                                   xtime = JSON.stringify(list);
                                                   var vectortemp = "";
                                                   var vectorlist = new Array();
                                                   for (var i in signalname) {
                                                       console.log(i + " " + signalname[i] + " !!!");
                                                       var z = signalname[i].indexOf('[');
                                                       if (z == -1) {
                                                           vectorSignalName.push(signalname[i]);
                                                           vectorlist.push(i);
                                                       }
                                                       else {
                                                           var name = signalname[i].slice(0, z);
                                                           if (vectorSignalName.slice(-1) != name) {
                                                               vectorSignalName.push(name);
                                                               vectorlist.push(i);
                                                           }
                                                       }
                                                   }
                                                   console.log(vectorlist);
                                                   changelist = new Array();
                                                   console.log(vectorlist);
                                                   for (i in lastlist) {
                                                       var newChangeListSub = new Array();
                                                       var j = 0;
                                                       for (var k in lastlist[i]) {

                                                           console.log(k == parseInt(vectorlist[j]));


                                                           if (k == parseInt(vectorlist[j])) {
                                                               if (k != 0) {
                                                                   newChangeListSub.push(vectortemp);
                                                               }

                                                               vectortemp = "";
                                                               j++;
                                                           }
                                                           if (k == lastlist[i].length - 1) {
                                                               console.log("vectorTempBefore: " + vectortemp);
                                                               vectortemp = vectortemp + lastlist[i][k].toString();
                                                               newChangeListSub.push(vectortemp);
                                                               console.log("vectorTempAfter: " + vectortemp);
                                                               break;

                                                           }
                                                           vectortemp = vectortemp + lastlist[i][k].toString();

                                                       }
                                                       console.log("qwertyu" + newChangeListSub);
                                                       changelist.push(newChangeListSub);
                                                   }
                                                   console.log("signallist" + vectorSignalName);
                                                   console.log(",,,," + changelist);
                                                   //newSubmit.xtime = xtime;
                                                   //newSubmit.changelist = changelist;
                                                   //newSubmit.lastlist = lastlist;
                                                   //newSubmit.signalname = vectorSignalName;
                                                   //console.log(lastlist);
                                                    homework.findById(resultobj.homework).exec(function (err, hw) {
                                                        if(err) res.render('error', {error: err});
                                                        var keyfile = path.basename(inputfile, '.vhd');
                                                        var hwxtime = hw.keyfile.xtime;
                                                        var hwchangelist = hw.keyfile.changelist;
                                                        var hwlastlist = hw.keyfile.lastlist;
                                                        var hwsignalname = hw.keyfile.signalname;
                                                        var right = (xtime == hwxtime
                                                            && compare2DArray(changelist, hwchangelist)
                                                            && compare2DArray(lastlist, hwlastlist)
                                                            && compare2DArray(vectorSignalName, hwsignalname));
                                                        if(right) {
                                                            newSubmit.score = newSubmit.score + 1;
                                                        }
                                                    });
                                           });
                                       //homework.findById(resultobj).exec
                                   }
                               });
                           }

                           newSubmit.score = newSubmit.score / standardfiles.length;
                           newSubmit.save(function(err) {
                               resultobj.save(function(err) {

                               })
                           });
                       });
                   });
               });
           });
       });
    });
};

exports.simulate = function (req, res) {

    console.log('---------------------------------');
    console.log('Simulating with Modelsim');
    console.log('---------------------------------');

    if(!req.session.user) {
        res.redirect('/');
    }
    user.findOne({userName:req.session.user.userName}).exec(function (err, obj) {
        if (false) {
            // req.session = null;
            // res.redirect('/');
        }
        else {

            var prjId = req.body.projectId;

            if (req.body.projectType === 'Example') {

            example.findById(prjId, function (err, retPrj) {

                if (err)
                    res.render("error", {error: err});
                var newSubmit = new submit({
                    time: new Date(),
                    project: retPrj._id,
                    state: 0,                                   // simulate processing
                    stdMsg: "",
                    errMsg: "",
                    filePath: "",
                    simulateRes: "",
                    xtime: "",
                    lastlist: [],
                    changelist: [],
                    signalname: [],
                    score: undefined,
                    simulationTime: retPrj.lastSimulationTime
                });
                newSubmit.save(function (err) {
                    if (err)
                        res.render('error', {error: err});
                    retPrj.submitBox.push(newSubmit._id);
                    var process = require('child_process');
                    newSubmit.filePath = path.join("/home/yuhui/DC_Data/submitFile", newSubmit._id.toString());
                    newSubmit.inputFile = path.join(newSubmit.filePath, path.basename(retPrj.inputFile));
                    process.exec("mkdir " + newSubmit.filePath, function (err, stdout, stderr) {
                        process.exec("cp -r " + path.join(retPrj.filePath, '*') + ' ' + newSubmit.filePath, function (err, stdout, stderr) {
                            // console.log("stdout: " + stdout);
                            // console.log("stderr: " + stderr);
                            var cmd = 'cp ' + __dirname.slice(0, -6) + '/public/files/model.sh ' + newSubmit.filePath;

                            process.exec(cmd, function (err, stdout, stderr) {
                                var compileFiles = retPrj.topEntityName;
                                if (retPrj.type === 1) {            //the compile and simulation of drag and drop only include topEntity and simulation file
                                    var fileArray = fs.readdirSync(newSubmit.filePath).filter(function (fileName, id) {
                                        if (path.extname(fileName) == ".vhd")
                                            return true;
                                        else
                                            return false;
                                    });
                                    fileArray.forEach(function (ele, id) {
                                        if (ele == retPrj.topEntityName + '.vhd' || ele == path.basename(newSubmit.inputFile))
                                            return;
                                        if (path.basename(ele, '.vhd').search(/const/i) == -1)
                                            compileFiles += (".vhd " + path.basename(ele, '.vhd'));
                                        else
                                            compileFiles = path.basename(ele, '.vhd') + ".vhd " + compileFiles;
                                    });
                                }
                                // console.log(compileFiles);
                                process.execFile(path.join(newSubmit.filePath, "model.sh"), [compileFiles, path.basename(newSubmit.inputFile, '.vhd'), "vsim"], {cwd: newSubmit.filePath}, function (err, stdout, stderr) {

                                    newSubmit.stdMsg = stdout;
                                    newSubmit.errMsg = stderr;
                                    if (newSubmit.errMsg && newSubmit.errMsg.length > 0) {
                                        if (retPrj.compileStatus == 1)
                                            retPrj.compileStatus = 3;
                                        if (retPrj.compileStatus == 0)
                                            retPrj.compileStatus = 2;
                                        newSubmit.state = -1;
                                        newSubmit.simulateRes = null;
                                    }
                                    else {
                                        retPrj.compileStatus = 0;
                                        newSubmit.state = 1;
                                        newSubmit.simulateRes = path.join(newSubmit.filePath, "dump.vcd");
                                    }

                                    //if simulate successfully, generate the info used for show
                                    retPrj.save(function (err) {
                                        if (err)
                                            res.render('error', {error: err});
                                        if (newSubmit.state == 1) {
                                            var xtime = "";
                                            var lastlist = new Array();
                                            var changelist = new Array();
                                            var signalname;
                                            var vectorSignalName;
                                            fs.createReadStream(path.join(newSubmit.filePath, "dump.vcd"))
                                                .pipe(vcd.createStream())
                                                .on('begin', function (state) {

                                                })
                                                .on('sample', function (index, changes, last) {

                                                    signalname = new Array();
                                                    vectorSignalName = new Array();


                                                    const changeordered = {};
                                                    Object.keys(changes).sort(compareFunc).forEach(function (key) {
                                                        changeordered[key] = changes[key];
                                                    });
                                                    const lastordered = {};
                                                    Object.keys(last).sort(compareFunc).forEach(function (key) {
                                                        lastordered[key] = last[key];
                                                    });

                                                    // console.log("change");
                                                    // console.log(changeordered);
                                                    // console.log("last" + last);
                                                    for (key in lastordered) {
                                                        //console.log(key);
                                                        signalname.push(key);
                                                    }
                                                    var k = signalname.length - 1;
                                                    //全局
                                                    lasttemp = [];
                                                    for (var key in lastordered) {
                                                        if (lastordered[key] == 0) {
                                                            lasttemp.push(0);
                                                        }
                                                        else {
                                                            lasttemp.push(1);
                                                        }
                                                        k = k - 1;
                                                    }
                                                    //全局
                                                    changetemp = [];
                                                    k = signalname.length - 1;
                                                    for (var key in changeordered) {
                                                        if (changeordered[key] == 0) {
                                                            changetemp.push(1);
                                                        } else if (changeordered[key] == 1) {
                                                            changetemp.push(0);
                                                        } else {
                                                            changetemp.push(changeordered[key]);
                                                        }
                                                        k = k - 1;

                                                    }
                                                    lastlist.push(lasttemp);
                                                    changelist.push(changetemp);
                                                    // console.log(lastlist);
                                                    xtime = xtime + index + " ";
                                                }).on('finish', function () {
                                                list = new Array();
                                                list = xtime.split(" ");
                                                list = xtime.split(" ").slice(1, -1);
                                                list.unshift("0");
                                                //list.push((parseInt(list[1])+parseInt(list[list.length-1])).toString());
                                                //console.log(xtime);
                                                for (var i in list) {
                                                    list[i] = (parseInt(list[i]) / 1000).toString();
                                                }
                                                xtime = JSON.stringify(list);
                                                var vectortemp = "";
                                                var vectorlist = new Array();
                                                for (var i in signalname) {
                                                    // console.log(i + " " + signalname[i] + " !!!");
                                                    var z = signalname[i].indexOf('[');
                                                    if (z == -1) {
                                                        vectorSignalName.push(signalname[i]);
                                                        vectorlist.push(i);
                                                    }
                                                    else {
                                                        var name = signalname[i].slice(0, z);
                                                        if (vectorSignalName.slice(-1) != name) {
                                                            vectorSignalName.push(name);
                                                            vectorlist.push(i);
                                                        }
                                                    }
                                                }
                                                // console.log(vectorlist);
                                                changelist = new Array();
                                                // console.log(vectorlist);
                                                for (i in lastlist) {
                                                    var newChangeListSub = new Array();
                                                    var j = 0;
                                                    for (var k in lastlist[i]) {

                                                        // console.log(k == parseInt(vectorlist[j]));


                                                        if (k == parseInt(vectorlist[j])) {
                                                            if (k != 0) {
                                                                newChangeListSub.push(vectortemp);
                                                            }

                                                            vectortemp = "";
                                                            j++;
                                                        }
                                                        if (k == lastlist[i].length - 1) {
                                                            // console.log("vectorTempBefore: " + vectortemp);
                                                            vectortemp = vectortemp + lastlist[i][k].toString();
                                                            newChangeListSub.push(vectortemp);
                                                            // console.log("vectorTempAfter: " + vectortemp);
                                                            break;

                                                        }
                                                        vectortemp = vectortemp + lastlist[i][k].toString();

                                                    }
                                                    // console.log("qwertyu" + newChangeListSub);
                                                    changelist.push(newChangeListSub);
                                                }
                                                // console.log("signallist" + vectorSignalName);
                                                // console.log(",,,," + changelist);
                                                newSubmit.xtime = xtime;
                                                newSubmit.changelist = changelist;
                                                newSubmit.lastlist = lastlist;
                                                newSubmit.signalname = vectorSignalName;
                                                // console.log(lastlist);


                                                //if(hwId == undefined) {
                                                newSubmit.save(function (err) {
                                                    process.exec('rm ' + path.join(retPrj.filePath, 'dump.vcd'), function(err, stdout, stderr) {
                                                       process.exec('cp ' + path.join(newSubmit.filePath, 'dump.vcd') + ' ' +  retPrj.filePath, function (err, stdout, stderr) {
                                                           res.json({
                                                               compileStatus: "success",
                                                               message: "Compile Success!"
                                                           });
                                                       });
                                                    });
                                                });

                                            });
                                        }
                                        else                //not success, then save directly
                                            newSubmit.save(function (err) {
                                                var errors = errorMsgInterpreter(newSubmit.stdMsg);
                                                //if(hwId == undefined)
                                                res.json({
                                                    compileStatus: "danger",
                                                    message: "Compile fails. " + stderr,
                                                    errors: errors
                                                });
                                            });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        }

            else {
                project.findById(prjId, function (err, retPrj) {

                    if (err)
                        res.render("error", {error: err});
                    var newSubmit = new submit({
                        time: new Date(),
                        project: retPrj._id,
                        state: 0,                           // simulate processing
                        stdMsg: "",
                        errMsg: "",
                        filePath: "",
                        simulateRes: "",
                        xtime: "",
                        lastlist: [],
                        changelist: [],
                        signalname: [],
                        score: undefined,
                        simulationTime: retPrj.lastSimulationTime
                    });
                    newSubmit.save(function (err) {
                        if (err)
                            res.render('error', {error: err});
                        retPrj.submitBox.push(newSubmit._id);
                        var process = require('child_process');
                        newSubmit.filePath = path.join("/home/yuhui/DC_Data/submitFile", newSubmit._id.toString());
                        newSubmit.inputFile = path.join(newSubmit.filePath, path.basename(retPrj.inputFile));
                        process.exec("mkdir " + newSubmit.filePath, function (err, stdout, stderr) {

                            process.exec("cp -r " + path.join(retPrj.filePath, '*') + ' ' + newSubmit.filePath, function (err, stdout, stderr) {
                                // console.log("stdout: " + stdout);
                                // console.log("stderr: " + stderr);
                                var cmd = 'cp ' + __dirname.slice(0, -6) + '/public/files/model.sh ' + newSubmit.filePath;

                                process.exec(cmd, function (err, stdout, stderr) {
                                    var compileFiles = retPrj.topEntityName;
                                    if (retPrj.type === 1) {        //the compile and simulation of drag and drop only include topEntity and simulation file
                                        var fileArray = fs.readdirSync(newSubmit.filePath).filter(function (fileName, id) {
                                            if (path.extname(fileName) == ".vhd")
                                                return true;
                                            else
                                                return false;
                                        });
                                        fileArray.forEach(function (ele, id) {
                                            if (ele == retPrj.topEntityName + '.vhd' || ele == path.basename(newSubmit.inputFile))
                                                return;
                                            if (path.basename(ele, '.vhd').search(/const/i) == -1)
                                                compileFiles += (".vhd " + path.basename(ele, '.vhd'));
                                            else
                                                compileFiles = path.basename(ele, '.vhd') + ".vhd " + compileFiles;
                                        });
                                    }
                                    //console.log(compileFiles);
                                    process.execFile(path.join(newSubmit.filePath, "model.sh"), [compileFiles, path.basename(newSubmit.inputFile, '.vhd'), "vsim"], {cwd: newSubmit.filePath}, function (err, stdout, stderr) {

                                        newSubmit.stdMsg = stdout;
                                        newSubmit.errMsg = stderr;
                                        if (newSubmit.errMsg && newSubmit.errMsg.length > 0) {
                                            if (retPrj.compileStatus == 1)
                                                retPrj.compileStatus = 3;
                                            if (retPrj.compileStatus == 0)
                                                retPrj.compileStatus = 2;
                                            newSubmit.state = -1;
                                            newSubmit.simulateRes = null;
                                        }
                                        else {
                                            retPrj.compileStatus = 0;
                                            newSubmit.state = 1;
                                            newSubmit.simulateRes = path.join(newSubmit.filePath, "dump.vcd");
                                        }

                                        //if simulate successfully, generate the info used for show
                                        retPrj.save(function (err) {
                                            if (err)
                                                res.render('error', {error: err});
                                            if (newSubmit.state == 1) {
                                                var xtime = "";
                                                var lastlist = new Array();
                                                var changelist = new Array();
                                                var signalname;
                                                var vectorSignalName;
                                                fs.createReadStream(path.join(newSubmit.filePath, "dump.vcd"))
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
                                                        Object.keys(changes).sort(compareFunc).forEach(function (key) {
                                                            changeordered[key] = changes[key];
                                                        });
                                                        const lastordered = {};
                                                        Object.keys(last).sort(compareFunc).forEach(function (key) {
                                                            lastordered[key] = last[key];
                                                        });

                                                        // console.log("change");
                                                        // console.log(changeordered);
                                                        // console.log("last" + last);
                                                        for (key in lastordered) {
                                                            //console.log(key);
                                                            signalname.push(key);
                                                        }
                                                        var k = signalname.length - 1;
                                                        //全局
                                                        lasttemp = [];
                                                        for (var key in lastordered) {
                                                            if (lastordered[key] == 0) {
                                                                lasttemp.push(0);
                                                            }
                                                            else {
                                                                lasttemp.push(1);
                                                            }
                                                            k = k - 1;
                                                        }
                                                        //全局
                                                        changetemp = [];
                                                        k = signalname.length - 1;
                                                        for (var key in changeordered) {
                                                            if (changeordered[key] == 0) {
                                                                changetemp.push(1);
                                                            } else if (changeordered[key] == 1) {
                                                                changetemp.push(0);
                                                            } else {
                                                                changetemp.push(changeordered[key]);
                                                            }
                                                            k = k - 1;

                                                        }
                                                        lastlist.push(lasttemp);
                                                        changelist.push(changetemp);
                                                        // console.log(lastlist);
                                                        xtime = xtime + index + " ";
                                                    }).on('finish', function () {
                                                    list = new Array();
                                                    list = xtime.split(" ");
                                                    list = xtime.split(" ").slice(1, -1);
                                                    list.unshift("0");
                                                    //list.push((parseInt(list[1])+parseInt(list[list.length-1])).toString());
                                                    //console.log(xtime);
                                                    for (var i in list) {
                                                        list[i] = (parseInt(list[i]) / 1000).toString();
                                                    }
                                                    xtime = JSON.stringify(list);
                                                    var vectortemp = "";
                                                    var vectorlist = new Array();
                                                    for (var i in signalname) {
                                                        // console.log(i + " " + signalname[i] + " !!!");
                                                        var z = signalname[i].indexOf('[');
                                                        if (z == -1) {
                                                            vectorSignalName.push(signalname[i]);
                                                            vectorlist.push(i);
                                                        }
                                                        else {
                                                            var name = signalname[i].slice(0, z);
                                                            if (vectorSignalName.slice(-1) != name) {
                                                                vectorSignalName.push(name);
                                                                vectorlist.push(i);
                                                            }
                                                        }
                                                    }
                                                    // console.log(vectorlist);
                                                    changelist = new Array();
                                                    // console.log(vectorlist);
                                                    for (i in lastlist) {
                                                        var newChangeListSub = new Array();
                                                        var j = 0;
                                                        for (var k in lastlist[i]) {

                                                            // console.log(k == parseInt(vectorlist[j]));


                                                            if (k == parseInt(vectorlist[j])) {
                                                                if (k != 0) {
                                                                    newChangeListSub.push(vectortemp);
                                                                }

                                                                vectortemp = "";
                                                                j++;
                                                            }
                                                            if (k == lastlist[i].length - 1) {
                                                                // console.log("vectorTempBefore: " + vectortemp);
                                                                vectortemp = vectortemp + lastlist[i][k].toString();
                                                                newChangeListSub.push(vectortemp);
                                                                // console.log("vectorTempAfter: " + vectortemp);
                                                                break;

                                                            }
                                                            vectortemp = vectortemp + lastlist[i][k].toString();

                                                        }
                                                        // console.log("qwertyu" + newChangeListSub);
                                                        changelist.push(newChangeListSub);
                                                    }
                                                    // console.log("signallist" + vectorSignalName);
                                                    // console.log(",,,," + changelist);
                                                    newSubmit.xtime = xtime;
                                                    newSubmit.changelist = changelist;
                                                    newSubmit.lastlist = lastlist;
                                                    newSubmit.signalname = vectorSignalName;
                                                    // console.log(lastlist);


                                                    //if(hwId == undefined) {
                                                    newSubmit.save(function (err) {
                                                        res.json({
                                                            compileStatus: "success",
                                                            message: "Compile Success!"
                                                        });
                                                    });

                                                });
                                            }
                                            else//not success, then save directly
                                                newSubmit.save(function (err) {
                                                    var errors = errorMsgInterpreter(newSubmit.stdMsg);
                                                    //if(hwId == undefined)
                                                    res.json({
                                                        compileStatus: "danger",
                                                        message: "Compile fails. " + stderr,
                                                        errors: errors
                                                    });
                                                });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            }

        }
    });
};

function sigleError(fileName, col, row, errorMsg){
   this.fileName = fileName;
   this.col = col;
   this.row = row;
   this.errorMsg = errorMsg;
}
function errorMsgInterpreter(msg) {
   var errors = [];
   var re = /\*\*\s*Error:\s*([^:\s]*)[:\s]*(.*)/ig;
   var resArray;
   while((resArray = re.exec(msg)) != null) {
      console.log(resArray[1]);
      console.log(resArray[2]);
      var errorMsg = resArray[2];
      if (resArray[1].charAt(0) == '(') {
         var currentError = new sigleError("", -1, -1, errorMsg);
         errors.push(currentError);
         continue;
      }
      var numIndex = resArray[1].indexOf('(');
      if (numIndex == -1) {
         var currentError = new sigleError("", -1, -1, errorMsg);
         errors.push(currentError);
         continue;
      }
      var fileName = resArray[1].slice(0, numIndex);
      var row = resArray[1].slice(numIndex + 1, resArray[1].indexOf(')'));
      console.log(row);
      if (row.search(/\D/) != -1) {
         var currentError = new sigleError("", -1, -1, errorMsg);
         errors.push(currentError);
         continue;
      }
      var currentError = new sigleError(fileName, 0, parseInt(row), errorMsg);
      errors.push(currentError);
   }
   return errors;
}

exports.revert = function(req, res){
    if(!req.session.user) {
        res.redirect('/');
        return;
    }
    user.findOne({userName:req.session.user.userName}).exec(function (err, obj) {
        if (req.session.user.uniquetoken !== obj.uniquetoken) {
            req.session = null;
            res.redirect('/');
            return;
        }
        var submitId = req.query.submitId;
        submit.findById(submitId).populate('project').exec(function (err, retSubmit) {
            var submitPath = retSubmit.filePath;
            var prjPath = retSubmit.project.filePath;
            fs.exists(submitPath, function (submitExists) {
                if (!submitExists) {
                    console.log("submit path error!");
                    res.redirect('/');
                    return;
                }
                fs.exists(prjPath, function (prjExists) {
                    if (!prjExists) {
                        console.log("prj path error!");
                        res.redirect('/');
                        return;
                    }
                });
            });
            var cmd = 'cp -f ' + submitPath + '/* ' + prjPath;
            require('child_process').exec(cmd, function (err, stdout, stderr){
                if (err) {
                    res.redirect('/');
                    return;
                }
                res.redirect('/project?projectId='+retSubmit.project._id);
                return;
            });
        });
    });
};


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
