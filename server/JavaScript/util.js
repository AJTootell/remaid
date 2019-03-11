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
  connection = mysql.createConnection(process.env.JAWSDB_URL),// || config.mysql),
  isErr;

  connection.connect();

  connection.on('error',function(err) {
    debug(err);
    connection.end();
  });

  connection.query(query, function (err, data) {
    if(err) {
      throw err;
      isErr = true;
      connection.end();
    } else{
    results = data;
    isErr = false;
    connection.end();
    };
  });
  if (datacb){
    connection.on('end',function(){datacb(isErr,results)});
  }
}

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

module.exports.debugable = debugable;
module.exports.debug = debug;
module.exports.queryDB = queryDB;
module.exports.capitalize = capitalize;
