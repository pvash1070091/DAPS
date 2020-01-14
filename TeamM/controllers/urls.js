var mongo = require('mongodb');

var mongoose = require('mongoose');

var bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({extended: true});

var passport = require('passport');

var Userr = require('../models/user');
var Groupp = require('../models/group');
var { role } = require('./roles');


require('../config/passport')(passport);

module.exports = function(app){

console.log("hi");



app.get('/',function(req,res){
return res.render('welcome');
       });



app.get('/dashboard',function(req,res){
  return res.render('d');
});


//Login
app.get('/login',function(req,res){
  Userr.findOne({emailId:"qwq@qwqe.ccom"})
       .then(function(user){
         if (user){
           console.log("yeasss");
           console.log(user.password);
         }
         else{
           console.log("Nnooo");
         }
       })
  return res.render('login');
});

app.post('/login', urlencodedParser,function(req,res,next){
  console.log(req.body);
  passport.authenticate('local', function(err,user,info){
    if (err) throw err;
    console.log(user);
    console.log(info);
    if (!user) {
      return res.redirect('/login');
    }
    return res.redirect('/dashboard');
  })(req,res,next);
});
//register
app.get('/register',function(req,res){
  res.render('register');
});


app.post('/register',urlencodedParser,function(req,res){
  let error=[];
  const {name,email,password,password2} = req.body;
  if (!name|| !email || !password || !password2){
    error.push({msg: "Please fill all the fields"});
  }
  if (password.length < 6){
    error.push({msg:"password small"});
  }
  if (password != password2){
    error.push({msg:"mismatch password"});
  }
  if (error.length > 0){
    res.render('register',{
      error,
      email,
      password,
      password2
    });
  }
});

app.get('/signup',function(req,res){
  return res.render('signup');
});
app.post('/signup',urlencodedParser,function(req,res){

  console.log(req.body);
  console.log("hello");
// group created
/*  var group = new Groupp({
    _id : new mongoose.Types.ObjectId(),
    title: req.body.group
  });
*/
// User.findOne(emailId: "asas.codksaa");
  var user = new Userr({
    _id : new mongoose.Types.ObjectId(),
    emailId: req.body.emailId,
    password: req.body.password
  });
  user.save().then(function(){
    console.log("working");
    Groupp.findOne({title:req.body.group})
    .populate('users')
    .then(function(document){
      console.log("its working")
        console.log(document.users[0]);
        if (document){
        console.log("group found");
        console.log(document);
        document.users.push(user);
        document.save().then(function(){
          let count;
          Groupp.find({})
            .populate('users')
            .then(function(documents){
              count = documents.length;
              console.log(count);
              console.log("all");
              console.log(documents[0]);
              res.render('dashboard',{groups:documents,count:count});
          })
          .catch(function(err){
            if (err) {
              throw err;
            }
          });

        });
      }
    })
    .catch(function(err){
      if (err) {
        throw err;
      }
    });

  //  group.users.push(user);
  /*console.log("saving");
printing users in Group1

  Groupp.findOne({title: "Group1"},function(err,document){
    console.log("thisssss");
    if (err) throw err;
    console.log(document.users);
  })*/

});

//

});
};
