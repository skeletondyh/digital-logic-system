/**
 * Created by kinnplh on 11/1/16.
 * Modified by skeletondyh on 2017/11/13
 */

var mongodb = require('../mongodb');
var Schema = mongodb.mongoose.Schema;

var homeworkSchema = new Schema({

    //hwName: String, // example name acturally
    //type: Number, // drag and drop OR editor
    //topEntityName: String,

    relateExample: {type: Schema.Types.ObjectId, ref: 'example'},
    homeworkName: String,
    describe: String,
    deadline: Date,
    totalsimfiles: Number,
    simulateRes: {},
    author: {type: Schema.Types.ObjectId, ref: 'user'},

    //ifvisibletoUser: Bool,
    //ifassignedHW: Bool,

    // Maybe Useless
    //inPortName: Array,
    //outPortName: Array,

    //filePath: String,
    //inputFilelist: [],
    //simulateReslist: [],
    //exampleName: String,

    //info for judge
    //xtime: String,
    //lastlist: Array,
    //changelist: Array,
    //signalname: Array,

    correspondProject: [{type: Schema.Types.ObjectId, ref:'project'}]
});
var homework = mongodb.mongoose.model('homework', homeworkSchema);

module.exports = homework;