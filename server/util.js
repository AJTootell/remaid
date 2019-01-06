var
debugging,
mysql = require('mysql'),
config = require('./database/config.json');

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

  sqlCon.on('error',function(err) {
    debug(err);
    sqlCon.end();
  });

  sqlCon.query(query, function (err, data) {
    debug("Querying");
    //debug(data);
    if(err) {
      //cb(err);
      throw err;
      broke = true;
      sqlCon.end();
    } else{
      /*data.forEach(function(row){
      debug("Results: "+JSON.stringify(row));
    });*/
    results = data;
    debug(JSON.stringify(results));
    broke = false;
    sqlCon.end();
  };
});
sqlCon.on('end',function(){datacb(broke,results)});
}

module.exports.debugable = debugable;
module.exports.debug = debug;
module.exports.queryDB = queryDB;
