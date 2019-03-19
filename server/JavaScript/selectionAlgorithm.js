const util =  require('./util.js');
var res,
media,
userId;

/*
Select all the media currently available
*/

function mediaQueryCB(err,data){

  media = data;

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

  media = newMedia;

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

  //filter by location

  var locFilteredMedia = [];

  if (userData.reg_id){
    for (var i=0;i<dateFilteredMedia.length;i++){
      if (dateFilteredMedia[i].reg_id && dateFilteredMedia[i].reg_id == userData.reg_id){
        if (userData.cou_id){
          if (dateFilteredMedia[i].cou_id && dateFilteredMedia[i].cou_id == userData.cou_id){
            if (userData.loc_id){
              if (dateFilteredMedia[i].loc_id && dateFilteredMedia[i].loc_id == userData.loc_id){
                //region, country and location match
                locFilteredMedia.push(dateFilteredMedia[i]);
              }
            }
            else{
              //region and country match and no location filter given
              locFilteredMedia.push(dateFilteredMedia[i]);
            }
          }
        }
        else{
          //region match and no country or location filter given
          locFilteredMedia.push(dateFilteredMedia[i]);
        }
      }
      // end of loop
    }
  }
  else {
    //no filter based on location of media
    locFilteredMedia = dateFilteredMedia;
  }

  media = locFilteredMedia;
  query = 'select * from rdc01hn4hfiuo1rv.medcate';

  util.queryDB(query,medcateQueryCB);

}

/*
Add array of categories for each media
*/

function medcateQueryCB(err,data){

  for (var i=0;i<data.length;i++){
    for (var j=0;i<media.length;j++){
      if(data[i].med_id == media[j].med_id){
        if (media[j].hasOwnProperty('categories')){
          media[j].categories.push(data[i].cate_id);
        }
        else{
          media[j].categories = [data[i].cate_id];
        }
      }
    }
  }

  query = 'select * from rdc01hn4hfiuo1rv.usercate where user_id = '+userId;

  util.queryDB(query,usercateQueryCB);
}

/*
Add each media every time based on combined weights of it's categories
*/

function usercateQueryCB(err,data){

  var multipliedMedia = [];

  if (!data){
    selectRandom();
    return;
  }

  for (var i=0; i<data.length;i++){
    for (var j=0;j<media.length;j++){
      if (media[j].categories.includes(data[i].cate_id)) {
        for (var k=0;k<data[i].usercate_weight;k++){
          multipleMedia.push(media[j]);
        }
      }
    }
  }

  media = multipleMedia;

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
