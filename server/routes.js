const
path = require('path'),
express = require('express'),
app = express.Router(),
serverFunc = require('./JavaScript/serverFunctionality.js');

app.get('/', function(req, res, next) {
  res.render('mainMenu');
});
app.get('/mediaDisplay', function(req, res, next) {
  function renderCB(mediaData) {
    res.render('mediaDisplay',mediaData);
  }
  serverFunc.getMedia(renderCB);
});
app.get('/filter', function(req, res, next) {
  res.render('filter');
});

app.get('/styleSheet',  function(req, res) {
  res.sendFile(path.join(__dirname, 'CSS/','styleSheet.css'));
});
app.get('/client', function(req, res) {
  res.sendFile(path.join(__dirname, 'JavaScript/','client.js'));
});

app.get('/addUser', function(req,res){
  serverFunc.addUser(req, res)
});

app.get('/getMedia', function(req,res){
  serverFunc.getMedia(req, res)
});

app.get('/addFilter', function(req,res){
  serverFunc.addFilter(req, res)
});

app.get('/getCategory', function(req,res){
  serverFunc.getCategory(req, res)
});

app.get('/addWeight', function(req,res){
  serverFunc.addWeight(req, res)
});


module.exports = app;
