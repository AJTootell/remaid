const util =  require('./util.js');
var res,
media,
userId;

/*
Select all the media currently available
*/

function mediaQueryCB(err,data){

  media = data;

  var query = 'select * from rdc01hn4hfiuo1rv.user where user_id = '+userId+';';
  util.queryDB(query, userQueryCB);
}

/*
Filter out irelevant media based on user filters
*/

function userQueryCB(err,data){

  var userData = data[0];

  // filter by type
  var typeFilteredMedia = [];

  for (var i=0;i<media.length;i++){
    if (media[i].med_type == "photo" && userData.user_showPhoto == '1'){
      typeFilteredMedia.push(media[i])
    }
    if (media[i].med_type == "video" && userData.user_showVideo == '1'){
      typeFilteredMedia.push(media[i])
    }
    if (media[i].med_type == "audio" && userData.user_showAudio == '1'){
      typeFilteredMedia.push(media[i])
    }
  }

  //filter by date
  var dateFilteredMedia = [];

  if (userData.user_startDate && userDate.user_endDate){

    for (var i=0;i<typeFilteredMedia.length;i++){
      if (typeFilteredMedia[i].med_year &&
        typeFilteredMedia[i].med_year > userData.user_startDate &&
        typeFilteredMedia[i].med_year < userData.user_endDate){
            dateFilteredMedia.push(typeFilteredMedia[i])
      }
    }

  } else {
    dateFilteredMedia = typeFilteredMedia;
  }
/*
  //filter by location
  var region = false,
  country = false,
  location = false;

  if (userData.reg_id){
    region = true;
    if (userData.cou_id){
      country = true;
      if (userData.loc_id){
        location = true;
      }
    }
  }

  var locFilteredMedia = [];

  for (var i=0;i<dateFilteredMedia.length;i++){
    if (dateFilteredMedia[i].med_type == "photo" && userData.user_showPhoto == '1'){
      locFilteredMedia.push(dateFilteredMedia[i])
    }
    if (dateFilteredMedia[i].med_type == "video" && userData.user_showVideo == '1'){
      locFilteredMedia.push(dateFilteredMedia[i])
    }
    if (dateFilteredMedia[i].med_type == "audio" && userData.user_showAudio == '1'){
      locFilteredMedia.push(dateFilteredMedia[i])
    }
  }


*/
  media = dateFilteredMedia;

  var query = 'select * from rdc01hn4hfiuo1rv.usermed where user_id = '+userId+';';
  util.queryDB(query, usermedQueryCB);
}

/*
removed alredy viewed media
*/


function usermedQueryCB(err, data){
  var newMedia = media.filter(function(value, index, arr){
    for (var j=0; j<data.length; j++){
      if (value.med_id == data[j].med_id){
        return false;
      }
    }
    return true;
  });

  media = newMedia

  selectRandom();
}

/*
Select a random media from the created array
*/

function selectRandom(){

  var rng = Math.floor(Math.random() * media.length);

  util.debug('filteredMedia');
  util.debug(media);

  viewedMedia(media[rng].med_id);

  res.send(JSON.stringify(media[rng]));
}


function viewedMedia(medId){
  var medId = req.query.medId,
  query = 'insert into rdc01hn4hfiuo1rv.usermed(user_id, med_id) values (';

  query+= userId + ', ';
  query+= medId + ');';

  util.queryDB(query);
}

/*
return a random media
*/
function getMedia (req,localRes){
  util.debug("getting media");

  res = localRes;
  userId = req.query.userId;

  var query = 'select * from rdc01hn4hfiuo1rv.media;';
  util.queryDB(query, mediaQueryCB);
}

module.exports.getMedia = getMedia;
