const LocalStratergy = require('passport-local').Strategy;
const mongoose = require('mongoose');

var Userr = require('../models/user');

module.exports = function(passport){
  passport.use(
    new LocalStratergy({usernameField:"email", passwordField: 'password' },function(email,password,done){
      Userr.findOne({emailId:email})
           .then(function(user){
             if (!user){
               //console.log("user no fnd");
               return done(null, false, { message: 'Incorrect username.' });
             }
             return done(null,user);
           })
           .catch(function(error){
             if (error) {
               throw error;
             }
           })
    })
  );
  passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  Users.findById(id, function(err, user) {
    done(err, user);
  });
});
}
