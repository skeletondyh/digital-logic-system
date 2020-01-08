var fs = require('fs');
var split = require('split');
var Duplex = require('stream').Duplex;
var path = require('path');

function state (initial, props) {
  var handler, cur;
  function fsm () {
    return handler.apply(fsm, arguments);
  }
  for (var key in props) {
    fsm[key] = props[key];
  }
  fsm.goto = function (name) {
    if (!fsm[name]) {
      throw new Error('unknown state ' + name);
    }
    cur = name;
    handler = fsm[name];
  }
  fsm.goto(initial);
  return fsm;
}

function augment (a, b)
{
  for (var k in b) {

    if (b[k] != null) {
      //console.log("k:"+k);
      a[k] = b[k];
    }
  }
  return a;
}

function numberlike (val)
{
  var n = Number(val);
  return String(n) == val ? n : val;
}

function keyify (arr, keys)
{
  var nu = {};
  for (var i = 0; i < arr.length; i++) {
    nu[keys[i]] = numberlike(arr[i]);
  }
  return nu;
}

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

function vcdFileParser(homeworkPath, stimFileName, callback){
  var xtime = "";
  var lastlist = new Array();
  var changelist = new Array();
  var signalname;
  var vectorSignalName;
  fs.createReadStream(path.join(homeworkPath, stimFileName+".vcd"))
      .pipe(vcdStream())
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

          //console.log("change");
          //console.log(changeordered);
          //console.log("last"+last);
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
      //console.log(vectorlist);
      changelist = new Array();
      //console.log(vectorlist);
      for(i in lastlist)
      {
          var newChangeListSub = new Array();
          var j = 0;
          for(var k in lastlist[i])
          {

              //console.log(k == parseInt(vectorlist[j]));


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
                  //console.log("vectorTempBefore: " +vectortemp);
                  vectortemp = vectortemp + lastlist[i][k].toString();
                  newChangeListSub.push(vectortemp);
                  //console.log("vectorTempAfter: " +vectortemp);
                  break;

              }
              vectortemp = vectortemp + lastlist[i][k].toString();

          }
          //console.log("qwertyu" + newChangeListSub);
          changelist.push(newChangeListSub);
      }
      //console.log("signallist"+vectorSignalName);
      //console.log(",,,,"+changelist);
      callback(xtime,lastlist,changelist,signalname);
      });
}

function vcdStream (opts) {
  var stream = new Duplex();
  stream.state = {
    vars: {}
  };

  // options
  opts = opts || {}
  var ignore = {};
  if (opts.ignore) {
    opts.ignore.forEach(function (k) {
      ignore[k] = true;
    })
  }

  var s_index = -1;
  var s_changes = {}, s_changes_tmp = null;
  var s_lastSample = {};

  var fsm = state('tokenStart', {
    state: stream.state,
    s_pending: false,

    tokenStart: function (token) {
      if (token == '$dumpvars') {
        // go through options
        if (opts.rename) {

          for (var k in this.state.vars) {
            if (this.state.vars[k].name in opts.rename) {
              this.state.vars[k].name = opts.rename[this.state.vars[k].name]
            }
          }
        }
        //console.log("vars");
        //console.log(this.state.vars);
        // initialize singleton values
        for (var k in this.state.vars) {
          s_lastSample[this.state.vars[k].name] = 0;
          s_changes[this.state.vars[k].name] = null;
        }

        stream.emit('begin', this.state);
        //var index = parseInt(0);
        this.s_pending = true;
        return this.goto('dumpvarContent');
      } else if (token == '#0'){
        return this.goto('tokenStart');
      } else if (token.substr(0, 1) == '#'){
        // initialize singleton values
        /*for (var k in this.state.vars) {
         s_lastSample[this.state.vars[k].name] = 0;
         s_changes[this.state.vars[k].name] = null;
         }

         stream.emit('begin', this.state);

         this.s_pending = false;*/
        return this.goto('dumpvarContent');
      }
      else if (token) {
        this.curvar = [token.substr(1)];
        return this.goto('tokenContent');
      }
    },

    tokenContent: function (token) {
      if (token == '$end') {
        switch (this.curvar[0]) {
          case 'version':
            this.state[this.curvar[0]] = this.curvar.slice(1).join(' ');
            break;
          case 'timescale':
          case 'scope':
            this.state[this.curvar[0]] = this.curvar.slice(1);
            break;
          case 'date':
            this.state[this.curvar[0]] = new Date(Date.parse(this.curvar.slice(1).join(' '))).toJSON();
            break;
          case 'var':
            var obj = keyify(this.curvar.slice(1), ['type', 'bitwidth', 'id', 'name','addname']);
            if(obj.addname != null) obj.name = obj.name + obj.addname;
            this.state.vars[obj.id] = obj;
            break;
        }
        return this.goto('tokenStart');
      }
      this.curvar.push(token);
    },

    dumpvarContent: function (token) {
      //console.log("token:"+token);
      if (token == '$dumpoff') { // spurious?
        return;
      }

      if ((token == '$end' || token[0] == '#') && this.s_pending) {
        augment(s_lastSample, s_changes);
        stream.emit('sample', s_index, s_changes, s_lastSample);

        this.s_pending = false;
      }

      if (token == '$end') {
        return this.goto('dumpvarContent');
      }
      if (token[0] == '#') {
        var index = parseInt(token.substr(1));
        //console.log("index"+index);
        this.s_pending = true;
        s_index = index;
        for (var k in s_changes) {
          s_changes[k] = null;
        }
      } else if (token[0] == '0' || token[0] == '1') {
        //console.log("name:"+this.state.vars[token.substr(1, 2)].name);
        s_changes[this.state.vars[token.substr(1, 2)].name] = parseInt(token.substr(0, 1));
      } else if (token[0] == 'b') {
        s_changes_tmp = parseInt(token.substr(1), 2);
        this.goto('binaryId');
      }
    },

    binaryId: function (token) {
      s_changes[this.state.vars[token].name] = s_changes_tmp;
      this.goto('dumpvarContent');
    }
  });

  var splitter = split(/[\r\n\s]+/, fsm);
  stream._write = function (chunk, encoding, callback) {
    splitter.write(chunk);
    callback();
  };
  stream._read = function () { }
  return stream;
}

exports.createStream = vcdStream;
exports.vcdFileParser = vcdFileParser;