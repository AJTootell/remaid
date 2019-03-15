const
path = require('path'),
express = require('express'),
app = express.Router(),
serverFunc = require('./JavaScript/serverFunctionality.js');

app.get('/', function(req, res, next) {
  res.render('mainMenu');
});
app.get('/mediaChoice', function(req, res, next) {
  res.render('mediaChoice');
});
app.get('/mediaDisplay', function(req, res, next) {
//  function renderCB(mediaData) {
  res.render('mediaDisplay');//,mediaData);
//  }
  //serverFunc.oldGetMedia(renderCB);
});
app.get('/filter', function(req, res, next) {
  res.render('filter');
});

app.get('/styleSheet',  function(req, res) {
  //console.log("Getting CSS");
  res.sendFile(path.join(__dirname, '/CSS/','styleSheet.css'));
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

app.post('/viewedMedia', function(req,res){
  serverFunc.viewedMedia(req, res)
});

app.post('/addFilter', function(req,res){
  serverFunc.addFilter(req, res)
});

app.get('/getFilters', function(req,res){
  serverFunc.getFilters(req, res)
});

app.get('/getCategory', function(req,res){
  serverFunc.getCategory(req, res)
});

app.get('/addWeight', function(req,res){
  serverFunc.addWeight(req, res)
});


module.exports = app;
