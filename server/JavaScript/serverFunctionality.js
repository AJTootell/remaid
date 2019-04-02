const util =  require('./util.js');

/*
addUser - add a new user to the database
//
Params:
  req - request from client with query data
  res - response data to send to the client
*/

function addUser(req,res){
  var time = new Date();
  time = time.getHours() + ':' + time.getMinutes();
  var query = 'insert into rdc01hn4hfiuo1rv.user(user_loginTime,user_showPhoto,user_showVideo,user_showAudio) values ("'+time+'",1,1,1)';
  function queryCB(err,data) {
    res.send(JSON.stringify(data.insertId));
  }
  util.queryDB(query,queryCB);

}

/*
updateLoginTime -
//
Params:
  userId
*/

function updateLoginTime(userId){
  var time = new Date();
  time = time.getHours() + ':' + time.getMinutes();
  var query = 'update rdc01hn4hfiuo1rv.user set user_loginTime = "'+time+'" where user_id = '+userId+';';
  util.queryDB(query);
}

/*
checkUserTimeout - check user list every 5 mins and if they haven't done anything for the last 15 mins then remove user data from db
*/

function checkUserTimeout(){
  var query = 'select user_id,user_loginTime from rdc01hn4hfiuo1rv.user';

  function queryCB(err,data) {
    var toRemove = [];
    for (var i=0;i<data.length;i++){
      var rowTime = data[i].user_loginTime;
      var lastLoginTime = parseInt(rowTime.split(':')[0])*60 + parseInt(rowTime.split(':')[1]);
      var curTime = new Date();
      curTime = curTime.getHours()*60 + curTime.getMinutes();
      timeDiff = curTime - lastLoginTime;
      if (timeDiff>15){
        toRemove.push(data[i].user_id);
      }
    }
    for (var i=0;i<toRemove.length;i++){
      setTimeout(cb,500*i,toRemove[i]);
      function cb(id){
        removeUser(id);
      }
    }
  }

  util.queryDB(query,queryCB);
}

/*
removeUser - remove a user and all thier data from the database
//
Params:
  userId
*/

function removeUser(userId){
  util.debug("removing user");
  util.debug(userId);

  var query = 'delete from rdc01hn4hfiuo1rv.usercate where user_id = ' + userId + ';';

  function usercateCB(err,data){
    var query = 'delete from rdc01hn4hfiuo1rv.usermed where user_id = ' + userId + ';';
    function usermedCB(err,data){
      var query = 'delete from rdc01hn4hfiuo1rv.user where user_id = ' + userId + ';';
      util.queryDB(query);
    }
    util.queryDB(query,usermedCB);
  }

  util.queryDB(query,usercateCB);
}

/*
addFilter - add a new filter for the user
//
Params:
  req - request from client with query data
  res - response data to send to the client
*/

function addFilter(req,res){

  var userId = req.query.userId;
  updateLoginTime(userId);

  util.debug(req.query.type);
  util.debug(userId);
  switch(req.query.type) {
    case "category":
      var
      cateId = req.query.cateId,
      weight = req.query.weight;

      var query = 'insert into rdc01hn4hfiuo1rv.usercate(cate_id, user_id, usercate_weight) values (';
      query+= cateId + ', ';
      query+= userId + ', ';
      query+= weight +');';

      util.queryDB(query);

      break;

    case "time":
      var
      startDate = req.query.startDate,
      endDate = req.query.endDate;
      var query = 'update rdc01hn4hfiuo1rv.user set user_startDate = '+startDate+' user_endDate = '+endDate+' where user_id = '+userId+';';

      util.queryDB(query);
      break;
    case "location":
      break;
    case "photo":
    case "video":
    case "audio":
      var query = 'update rdc01hn4hfiuo1rv.user set user_show'+util.capitalize(req.query.type)+' = '+req.query.weight+' where user_id = '+userId+';';
      util.queryDB(query);
      break;
    default:
      break;
  }
  res.send();
}

/*
increWeight - TODO
*/

function increWeight(req,res){

    var userId = req.query.userId,
    medId = req.query.medId;
    updateLoginTime(userId);

    var query = 'update rdc01hn4hfiuo1rv.usercate SET usercate_weight = usercate_weight + 1 where user_id = '+userId+' and where cate_id in (select cate_id from rdc01hn4hfiuo1rv.medcate where med_id = '+medId+');';

    util.queryDB(query);
}

/*
getFilters -
//
Params:
  req - request from client with query data
  res - response data to send to the client
*/

function getFilters(req,res){
  var userId = req.query.userId,
  query = "select user_showPhoto,user_showVideo,user_showAudio from rdc01hn4hfiuo1rv.user where user_id = "+userId+';';
  updateLoginTime(userId);

  function queryCB(err,data){
    var filters = {"filters":[{"name": "photo", "weight": data[0].user_showPhoto},
      {"name": "video", "weight": data[0].user_showVideo},
      {"name": "audio", "weight": data[0].user_showAudio}]};
    res.send(JSON.stringify(filters));
  }
  util.queryDB(query, queryCB);
}

/*
getCategory - return a random category
//
Params:
  req - request from client with query data
  res - response data to send to the client
*/

function getCategory(req,res){
  var userId = req.query.userId,
  query = "select * from rdc01hn4hfiuo1rv.usercate where user_id = "+userId+';';
  updateLoginTime(userId);
  function usercateQueryCB(err,data){
    var userSelected = data,
    query = "select * from rdc01hn4hfiuo1rv.category;";
    function cateQueryCB(err,data){
      var categories = data.filter(function(value, index, arr){
        for (var i=0;i<userSelected.length;i++){
          if (userSelected[i].cate_id == value.cate_id){
            return false;
          }
        }
        return true;
      });
      var rdmCate = [];
      while(rdmCate.length<4){
        if(rdmCate.length == categories.length){
          break;
        }
        var rng = Math.floor(Math.random() * categories.length),
        used = false;
        for (var i=0;i<rdmCate.length;i++){
          if (rdmCate[i].cate_id == categories[rng].cate_id){
            used = true;
          }
        }
        if (!used){
          rdmCate.push(categories[rng]);
        }
      }
      res.send(JSON.stringify(rdmCate));
    }
    util.queryDB(query, cateQueryCB);

  }
  util.queryDB(query, usercateQueryCB);

}

setInterval(checkUserTimeout, 30000);

module.exports.addUser = addUser;
module.exports.removeUser = removeUser;
module.exports.addFilter = addFilter;
module.exports.increWeight = increWeight;
module.exports.getFilters = getFilters;
module.exports.getCategory = getCategory;
module.exports.updateLoginTime = updateLoginTime;
