/**
 * Created by kinnplh on 2016/10/10.
 */
var mongodb = require('../mongodb');
var Schema = mongodb.mongoose.Schema;
var messageSchema = new Schema({
    author: {type: Schema.Types.ObjectId, ref: 'user'}, // String represents the _id
    createTime: Date,
    title: String,
    content: String
    //type: Number // the meaning to be determined
});
var message = mongodb.mongoose.model('message', messageSchema);

module.exports = message;