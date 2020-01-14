var express = require('express');
var controller  = require('./controllers/urls');
var expressLayouts = require('express-ejs-layouts');
var passport = require('passport');
var session = require('express-session');
var flash = require('connect-flash');

app = express();
//app.use(expressLayouts);
require('./config/passport')(passport);
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.set('view engine','ejs');

controller(app);

app.listen(3000);
