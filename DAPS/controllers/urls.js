var mongo = require('mongodb');

var mongoose = require('mongoose');

var bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({extended: true});

var passport = require('passport');

var Userr = require('../models/user');

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
  return res.render('login');
});

app.post('/login', urlencodedParser,function(req,res,next){
  console.log(req.body);
  passport.authenticate('local', function(err,user,info){
    if (err) throw err;
    console.log("this is the user info");
    console.log(user);

    if (!user) {
      return res.redirect('/login');
    }
    return res.redirect('/welcome?usr=' + user.emailId);
  })(req,res,next);
});

app.get('/welcome',function(req,res){
  var usr = req.query.usr;
  return res.render('welcome',{usr:usr});
});
//register
app.get('/register',function(req,res){
  return res.render('register');
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
    console.log("error");
    res.render('register',{
      error,
      email,
      password,
      password2
    });
  }
  else{
    var user = new Userr({
      _id : new mongoose.Types.ObjectId(),
      emailId: req.body.email,
      password: req.body.password,
      password2: req.body.password2
    });
    user.save()
    .then(function(usr){
      console.log("usr created");
      return res.redirect('/login');
    })
    .catch(function(err){
      if (err){
        throw err;
      }
    })
  }
});

}
