var mongoose = require('mongoose');

mongoose.connect('mongodb://new_user:pvash@user-shard-00-00-gn6fa.mongodb.net:27017,user-shard-00-01-gn6fa.mongodb.net:27017,user-shard-00-02-gn6fa.mongodb.net:27017/test?ssl=true&replicaSet=User-shard-0&authSource=admin&retryWrites=true&w=majority')

var groupSchema = mongoose.Schema({
  _id : mongoose.Schema.Types.ObjectId,
  title: {type : String, required: true,unique: true},
  users: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
});


module.exports = mongoose.model('Group', groupSchema);
