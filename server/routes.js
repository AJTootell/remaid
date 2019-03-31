const
path = require('path'),
express = require('express'),
app = express.Router(),
serverFunc = require('./JavaScript/serverFunctionality.js'),
getMedia = require('./JavaScript/selectionAlgorithm.js').getMedia;

app.get('/', function(req, res, next) {
  res.render('mainMenu');
});
app.get('/mediaChoice', function(req, res, next) {
  res.render('mediaChoice');
});
app.get('/mediaDisplay', function(req, res, next) {
  res.render('mediaDisplay');
});
app.get('/filter', function(req, res, next) {
  res.render('filter');
});
app.get('/category', function(req, res, next) {
  res.render('category');
});
app.get('/time', function(req, res, next) {
  res.render('time');
});
app.get('/geo', function(req, res, next) {
  res.render('geo');
});

app.get('/styleSheet',  function(req, res) {
  //console.log("Getting CSS");
  res.sendFile(path.join(__dirname, '/CSS/styleSheet.css'));
});
app.get('/sliderCSS',function(req, res) {
  res.sendFile(path.join(__dirname, '/CSS/nouislider.min.css'));
});
app.get('/client', function(req, res) {
  res.sendFile(path.join(__dirname, 'JavaScript/','client.js'));
});
app.get('/sliderJS',function(req, res) {
  res.sendFile(path.join(__dirname, 'JavaScript/','nouislider.min.js'));
});

app.get('/addUser', function(req,res){
  serverFunc.addUser(req, res)
});
app.get('/getMedia', function(req,res){
  serverFunc.updateLoginTime(req.query.userId);
  getMedia(req, res)
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

module.exports = app;
