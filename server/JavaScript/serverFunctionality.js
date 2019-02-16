const util =  require('./util.js');

/*
add a new user to the database
*/
function addUser (req,res) {
  var time = new Date();
  time = time.getHours() + ':' + time.getMinutes();
  var query = 'insert into user(user_loginTime) values ("'+time+'")';
  function queryCB(err,data) {
    res.send(JSON.stringify(data.insertId));
  }
  util.queryDB(query,queryCB);

}

/*
check user list every 5 mins and if they haven't done anything for the last 15 mins then remove user data from db
*/

function checkUserTimeout() {
  var query = 'select user_id,user_loginTime from rdc01hn4hfiuo1rv.user';

  function queryCB(err,data) {
    for (var i=0;i<data.length;i++){
      var rowTime = data[i].user_loginTime;
      var lastLoginTime = parseInt(rowTime.split(':')[0])*60 + parseInt(rowTime.split(':')[1]);
      var curTime = new Date();
      curTime = curTime.getHours()*60 + curTime.getMinutes();
      timeDiff = curTime - lastLoginTime;
      if (timeDiff>15){
        removeUser(data[i].user_id)
      }
    }
  }

  util.queryDB(query,queryCB);
}

/*
remove a user and all thier data from the database
*/
function removeUser (userId) {
  util.debug("removing user");

  var query = 'delete from rdc01hn4hfiuo1rv.usercate where user_id = ' + userId + ';';
  query += 'delete from rdc01hn4hfiuo1rv.user where user_id = ' + userId;

  util.queryDB(query);
}

/*
return a random media
*/
function getMedia (renderCB) {

  util.debug("getting media");

  var query = 'select med_filepath,med_alt,med_type from rdc01hn4hfiuo1rv.media where med_id = ' + "1" + ';';

  function queryCB(err,data){
    var mediaUrl = data[0].med_filepath,
    mediaAlt = data[0].med_alt,
    mediaType = data[0].med_type,
    isPhoto = false,
    isVideo = false;
    if (mediaType == "photo"){
      isPhoto = true;
    }
    else if (mediaType == "video") {
      isVideo = true;
    }
    util.debug({mediaUrl:mediaUrl,mediaAlt:mediaAlt,isPhoto:isPhoto,isVideo:isVideo});
    renderCB({mediaUrl:mediaUrl,mediaAlt:mediaAlt,isPhoto:isPhoto,isVideo:isVideo});
  }

  util.queryDB(query, queryCB);


}

/*
add a new filter for the user
*/
function addFilter (req,res) {

}

/*
return a random category
*/
function getCategory (req,res) {

}

/*
increment or deincrement weight of a user category
*/
function addWeight (req,res) {

}

setInterval(checkUserTimeout, 300000);

module.exports.addUser = addUser;
module.exports.removeUser = removeUser;
module.exports.getMedia = getMedia;
module.exports.addFilter = addFilter;
module.exports.getCategory = getCategory;
module.exports.addWeight = addWeight;
