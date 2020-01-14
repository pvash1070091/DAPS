var mongoose = require('mongoose');

mongoose.connect('mongodb://new_user:pvash@user-shard-00-00-gn6fa.mongodb.net:27017,user-shard-00-01-gn6fa.mongodb.net:27017,user-shard-00-02-gn6fa.mongodb.net:27017/test?ssl=true&replicaSet=User-shard-0&authSource=admin&retryWrites=true&w=majority')
/*var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://new_user:pvash@user-shard-00-00-gn6fa.mongodb.net:27017,user-shard-00-01-gn6fa.mongodb.net:27017,user-shard-00-02-gn6fa.mongodb.net:27017/test?ssl=true&replicaSet=User-shard-0&authSource=admin&retryWrites=true&w=majority";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  console.log("Database created!");
  db.close();
});
*/

var userSchema = mongoose.Schema({
  _id : mongoose.Schema.Types.ObjectId,
  emailId: {type : String, required: true},
  password: {type: String, required: true},
  //group: [{type: mongoose.Schema.Types.ObjectId, ref: 'Group'}]
  role: {type: String, default: "basic", enum: ["basic" , "admin" , "superadmin"]}
});
module.exports = mongoose.model('User', userSchema);
