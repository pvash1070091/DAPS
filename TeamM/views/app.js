//Events

/*var events = require('events');
var myEmitter = new events.EventEmitter();
myEmitter.on('callE',function(msg){
  console.log(msg);
});
myEmitter.emit('callE','Event is Called');
*/

//Reading and writing files :Asyncronous
/*
var fs = require('fs');
fs.readFile('read.txt','utf8', function(err,data){
  fs.writeFile('write.txt',data,function(err){
    if(err)
    {
      console.log(err);
    }
    console.log('saved')
  });
});*/
//server
/*
var http = require('http');

var server = http.createServer(function(req,res){
  console.log(req.url);
  res.writeHead(200,{'Content-Type': 'text/plain'});
  res.end('Hey ninja');
});
server.listen(3000,'127.0.0.1');
*/

//var http = require('http');
//var fs = require('fs');


//var server = http.createServer(function(req,res){
  /*console.log(req.url);
  res.writeHead(200,{'Content-Type': 'text/html'});
  var myReadStream = fs.createReadStream(__dirname + '/index.html','utf8');
  myReadStream.pipe(res)*/

//Serving html pages

/*fs.readFile('index.html',function(err,html){
    if (err)
    {
      console.log('error');
    }
    var server = http.createServer(function(req,res){
      res.writeHead(200,{'Content-Type':'text/html'});
      res.write(html);
      res.end()
    });
    server.listen(3000,'127.0.0.1');
    console.log('listening');
  })
*/

//Express
/*
var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var urlencodedParser = bodyParser.urlencoded({extended: false});

app.set('view engine','ejs');

app.get('/',function(req,res){
  res.send('Hi this is first express page');
});

app.get('/index',function(req,res){
  req.sendFile(__dirname + '/index.html');
});

app.get('/contact',function(req,res){
  res.render('contact');
});

app.post('/contact', urlencodedParser,function(req,res){
  console.log(req.body);
  res.render('contact-success',{data: req.body});
});

app.get('/profile/:name',function(req,res){
  var data = {Age: 20,Job: 'ninja', Hobbies: ['a','b','c','d']};
  res.render('profile',{person: req.params.name, data:data});
});
app.listen(3000);
*/
var express = require('express');
var todoController = require('./controllers/todoController');

var app = express();


app.set('view engine','ejs');

app.use(express.static('./public'));

todoController(app);

app.listen(3000);
