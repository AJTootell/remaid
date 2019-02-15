var
debugging,
mysql = require('mysql'),
config = require('../database/config.json');

//turn on debugging
function debugable(state){
  if(state == 'on'){
    debugging = true;
    debug('Debugging turned on');
  }
}

//if debugging has been turned on will log else will do nothing
function debug(text){
  if(debugging == true){
    console.log(text);
  }
}

/*
open connection to sql database, run given query and run callback with err, data
*/
function queryDB(query, datacb){
  debug("\nQuery ran: " + query);
  var
  results,
  sqlCon = mysql.createConnection(config.mysql),
  broke;

  sqlCon.connect();

  sqlCon.on('error',function(err) {
    debug(err);
    sqlCon.end();
  });

  sqlCon.query(query, function (err, data) {
    if(err) {
      throw err;
      broke = true;
      sqlCon.end();
    } else{
    results = data;
    broke = false;
    sqlCon.end();
  };
});
if (datacb){
  sqlCon.on('end',function(){datacb(broke,results)});
}
}

module.exports.debugable = debugable;
module.exports.debug = debug;
module.exports.queryDB = queryDB;
