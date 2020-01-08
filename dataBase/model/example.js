/*
 * Created by skeletondyh on
 *  2017/11/13
 */
var mongodb = require('../mongodb');
var Schema = mongodb.mongoose.Schema;

var exampleSchema = new Schema({

    projectName: String,
    author: {type: Schema.Types.ObjectId, ref: "user"},
    type: Number,
    deleted: Boolean,
    createTime: Date,
    lastModifiedTime: Date,
    filePath: String,
    inputFile: String,
    submitBox: [{type: Schema.Types.ObjectId, ref: 'submit'}],
    compileStatus: Number,
    topEntityName: String,

    ifvisibletoUser: Boolean,
    isHomework: Boolean,
    //is_example: Boolean,
    //is_homework: Boolean,

    //homework: {type: Schema.Types.ObjectId, ref: 'homework'},
    score: Number,
    //hwSubmitBox: [{type: Schema.Types.ObjectId, ref: 'submit'}],

    input: Array,
    output: Array,

    lastSimulationTime: Number,
    entityPath: String
});

var example = mongodb.mongoose.model('example', exampleSchema);

module.exports = example;