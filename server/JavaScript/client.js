function redirect (url){
  location.href = url;
}

function addMediaFilter(mediaType){
  var
  userId = sessionStorage.getItem('user_id'),
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

  url += "user="+userId+"&";
  url += "type="+mediaType+"&";
  url += "weight="+weight;
  console.log(url);
  xhr.open('POST', url, true);
  xhr.send();

}

function addTimeFilter(){

}

function addCategory(){

}

function getMedia(){
  var userId,
  url = '/getMedia',
  xhr = new XMLHttpRequest();

  userId = sessionStorage.getItem('user_id');
  url += '?user='+userId;

  console.log(url);

  xhr.open('GET', url, true);
  xhr.onload = function() {
    var media = JSON.parse(xhr.responseText),
    el,
    elParent = document.getElementById('mediaHolder');
    switch(media.med_type){
      case "photo":
        console.log("photo");
        el = document.createElement('image');
        el.src = media.med_filepath;
        el.alt = media.med_alt;
        document.body.appendChild(el);
        break;
      case "video":
        el = document.createElement('video');
        break;
      case "audio":
        el = document.createElement('audio');
        break;
      default:
        console.log("Media type not supported")
        break;
    }
    console.log(el);
    /*
    {{#if isPhoto}}
      <image class="media" src="{{{mediaUrl}}}" alt="{{{mediaAlt}}}"></image>
    {{else if isVideo}}
      <video><source src="{{{mediaUrl}}}" type="video/webm">{{{mediaAlt}}}</video>
    {{else}}
      <audio controls src="{{{mediaUrl}}}"></audio>
    {{/if}}
    */
  }
  xhr.send();
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

//if connection without a user_id in session data then create a new user
window.addEventListener('load', function() {
  var urlEnding = location.href.split('/').pop();
  console.log('%'+urlEnding+'%');
  if (urlEnding == ''){
    var
    userId,
    url = '/addUser',
    xhr = new XMLHttpRequest();
    console.log('checking user id');
    userId = sessionStorage.getItem('user_id');
    if (userId == null){
      xhr.open('GET', url, true);
      xhr.onload = function() {
        var user_id = JSON.parse(xhr.responseText);
        console.log("New user given ID: "+ user_id);
        sessionStorage.setItem('user_id', user_id);
      }
      xhr.send();
    }
  }
  else if (urlEnding == 'mediaDisplay') {
    getMedia();
  }
});
