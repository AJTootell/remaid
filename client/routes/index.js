var
express = require('express'),
router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index');
});

app.get('/styleSheet',  function(req, res) {
  res.sendFile(path.join(__dirname, '../CSS/','styleSheet.css'));
});
app.get('/index', function(req, res) {
  res.sendFile(path.join(__dirname, '../JavaScript','index.js'));
});

module.exports = router;
