var
debugging = false;	//run with 'node server/webServer.js on' or 'npm run debug' to see server-side debugging messages

const
express = require('express'),
app = express(),
path = require('path'),
util =  require('./util.js');

//check if there is an additional argument, if it is on the console.log debugs
if(process.argv.length == 3){
  util.debugable(process.argv[2])
}

// view engine setup
app.set('views', './client/views');
app.set('view engine', 'hbs');

app.use(express.static('../client'));

//get client side style sheet and javascript file
app.get('/styleSheet',  function(req, res) {
  res.sendFile(path.join(__dirname, '../client/CSS/','styleSheet.css'));
});
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../client/JavaScript','index.js'));
});

//redirect calls to server to appropriate frunctions in util or widget folder

app.listen(8080);
