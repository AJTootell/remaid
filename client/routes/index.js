const
path = require('path'),
express = require('express'),
app = express.Router();

app.get('/', function(req, res, next) {
  res.render('mainMenu');
});

app.get('/mediaDisplay', function(req, res, next) {
  res.render('mediaDisplay');
});

app.get('/filter', function(req, res, next) {
  res.render('filter');
});

app.get('/styleSheet',  function(req, res) {
  res.sendFile(path.join(__dirname, '../CSS/','styleSheet.css'));
});
app.get('/index', function(req, res) {
  res.sendFile(path.join(__dirname, '../JavaScript','index.js'));
});

module.exports = app;
