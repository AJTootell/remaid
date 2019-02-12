var
debugging = false;	//run with 'node server/webServer.js on' or 'npm run debug' to see server-side debugging messages

const
express = require('express'),
app = express(),
path = require('path'),
util =  require('./util.js'),
routes = require(path.join(__dirname, '../routes'));

//check if there is an additional argument, if it is on the console.log debugs
if(process.argv.length == 3){
  util.debugable(process.argv[2])
}

// view engine setup
app.set('views', 'server/views');
app.set('view engine', 'hbs');

app.use('/', routes);
app.use(express.static('server/media'));

app.listen(8080);
