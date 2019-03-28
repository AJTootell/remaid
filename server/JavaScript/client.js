/*
redirect - changes the url of the page

Params:
  url - new url to call
*/

function redirect (url){
  location.href = url;
}
/*
addMediaFilter - Adds a new filters for users for given media type

Params:
  mediaType - type of media to filter out
*/

function addMediaFilter(mediaType){
  var
  userId = sessionStorage.getItem('userId'),
  elName = mediaType + '_filter_button',
  buttonEl = document.getElementById(elName),
  url = '/addFilter?',
  xhr = new XMLHttpRequest(),
  weight = 0;

  if (buttonEl.textContent.includes('Selected')) {
    weight = 0;
    buttonEl.textContent = capitalizeFirstLetter(mediaType) + ": Hidden";
  }
  else{
    weight = 1;
    buttonEl.textContent = capitalizeFirstLetter(mediaType) + ": Selected";
  }

  url += "userId="+userId+"&";
  url += "type="+mediaType+"&";
  url += "weight="+weight;
  console.log(url);
  xhr.open('POST', url, true);
  xhr.send();
}
/*
addTimeFilter - todo
*/

function addTimeFilter(){

}
/*
addCategory - todo
*/

function addCategory(){

}
/*
getMedia - gets a new media from server and displays dynamically on the page
*/

function getMedia(){
  var userId,
  url = '/getMedia',
  xhr = new XMLHttpRequest();

  userId = sessionStorage.getItem('userId');
  url += '?userId='+userId;

  xhr.open('GET', url, true);
  xhr.onload = function() {
    if (xhr.responseText == ''){
      console.log("Error")
      return;
    }
    var media = JSON.parse(xhr.responseText),
    el,
    elParent = document.getElementById('mediaHolder');
    //el.class = 'media';
    switch(media.med_type){
      case "photo":
        console.log("photo");
        el = document.createElement('img');
        el.src = media.med_filepath;
        el.alt = media.med_alt;

        //el.id = media.med_id;
        elParent.appendChild(el);
        break;
      case "video":
        var elSrc = document.createElement('source');
        el = document.createElement('video');
        elSrc.src = media.med_filepath;
        elSrc.type = "video/"+media.med_filepath.split('.').pop();
        el.textContent = media.med_alt;
        el.controls = ' ';

        //el.id = media.med_id;
        el.appendChild(elSrc);
        elParent.appendChild(el);
        break;
      case "audio":
        el = document.createElement('audio');
        el.src = media.med_filepath;
        el.controls = ' ';

        //el.id = media.med_id;
        elParent.appendChild(el);
        break;
      default:
        console.log("Media type not supported")
        break;
    }
    console.log(el);
    /*
    {{else if isVideo}}
      <video><source src="{{{mediaUrl}}}" type="video/webm">{{{mediaAlt}}}</video>
    {{else}}
      <audio controls src="{{{mediaUrl}}}"></audio>
    {{/if}}
    */
  }
  xhr.send();
}

/*
addUser - add a new user to server and set user id in browsers' local storage
*/

function addUser(){
  var
  userId,
  url = '/addUser',
  xhr = new XMLHttpRequest();
  console.log('checking user id');
  userId = sessionStorage.getItem('userId');
  if (userId == null){
    xhr.open('GET', url, true);
    xhr.onload = function() {
      var newUserId = JSON.parse(xhr.responseText);
      console.log("New user given ID: "+ newUserId);
      sessionStorage.setItem('userId', newUserId);
    }
    xhr.send();
  }
}

/*
presetTypeFilters - set media type buttons to match users preferences
*/

function presetTypeFilters(){
  var
  userId = sessionStorage.getItem('userId'),
  url = '/getFilters?',
  xhr = new XMLHttpRequest();

  url += "userId="+userId;
  xhr.open('GET', url, true);
  xhr.onload = function() {
    var filters = JSON.parse(xhr.responseText).filters;
    for (var i=0;i<filters.length;i++){
      var
      elName = filters[i].name + '_filter_button',
      buttonEl = document.getElementById(elName);
      if (filters[i].weight == 1){
        buttonEl.textContent = capitalizeFirstLetter(filters[i].name) + ": Selected";
      }
      else{
        buttonEl.textContent = capitalizeFirstLetter(filters[i].name) + ": Hidden";
      }
    }
  }
  xhr.send();
}
/*
toggleCategories - toggle button text from hidden to selected and vice versa

Params:
  elButton - button element to toggle
*/

function toggleCategories(elButton){
  if (elButton.textContent.includes('Hidden')){
    elButton.textContent = elButton.textContent.replace('Hidden','Selected');
  }else{
    elButton.textContent = elButton.textContent.replace('Selected','Hidden');
  }
}
/*
leaveCate - add new categorey filters to user

Params:
  url - url to redirect user to when categories has been updated
*/

function leaveCate(url){

  var elParent = document.getElementById('buttonHolder'),
  userId = sessionStorage.getItem('userId');

  for (var i=1;i<elParent.childNodes.length;i++){
    console.log(elParent.childNodes[i]);


    var
    elButton = elParent.childNodes[i],
    funcUrl = '/addFilter?',
    xhr = new XMLHttpRequest(),
    cateId = elButton.id.split('_')[0],
    type = 'category',
    weight;

    if (elButton.textContent.includes('Hidden')){
      weight = 0;
    }else{
      weight = 1;
    }

    funcUrl += 'userId='+userId;
    funcUrl += '&type='+type;
    funcUrl += '&cateId='+cateId;
    funcUrl += '&weight='+weight;

    xhr.open('POST', funcUrl, true);
    xhr.send();
  }

  redirect(url);
}
/*
getCategories - populate the page with 4 new random categories from server
*/

function getCategories(){
  var
  userId = sessionStorage.getItem('userId'),
  url = '/getCategory?',
  xhr = new XMLHttpRequest();

  url += "userId="+userId;
  xhr.open('GET', url, true);
  xhr.onload = function() {
    var categories = JSON.parse(xhr.responseText),
    elParent = document.getElementById('buttonHolder');
    for (var i=0;i<categories.length;i++){
      var elName = categories[i].cate_id + '_category_button',
      elButton = document.createElement('button');

      elButton.id = elName;
      elButton.classList.add('half_threeEight_button');
      elButton.textContent = capitalizeFirstLetter(categories[i].cate_name)+': Hidden';

      elButton.onclick = function(){
        toggleCategories(this);
      }

      elParent.appendChild(elButton);
    }
  }
  xhr.send();
}

/*
capitalizeFirstLetter - capitalize the first letter of the passed string
*/

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

window.addEventListener('load', function() {
  var urlEnding = location.href.split('/').pop();
  switch(urlEnding){
    case '':
      //if connection without a userId in session data then create a new user
      addUser();
      break;
    case 'mediaDisplay':
      //get media from server and display it on the page
      getMedia();
      break;
    case 'mediaChoice':
      //set the pages filter button to match the users current or default preferences
      presetTypeFilters();
      break;
    case 'category':
      //populate the page with 4 new random categories
      getCategories();
      break;
    default:
      break;

  }
});
