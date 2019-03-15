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

        el.id = media.med_id;
        elParent.appendChild(el);
        break;
      case "video":
        var elSrc = document.createElement('source');
        el = document.createElement('video');
        elSrc.src = media.med_filepath;
        elSrc.type = "video/"+media.med_filepath.split('.').pop();
        el.textContent = media.med_alt;
        el.controls = ' ';

        el.id = media.med_id;
        el.appendChild(elSrc);
        elParent.appendChild(el);
        break;
      case "audio":
        el = document.createElement('audio');
        el.src = media.med_filepath;
        el.controls = ' ';

        el.id = media.med_id;
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

function nextMedia(){
  var medId = document.getElementById('mediaHolder').childNodes[1].id,
  userId = sessionStorage.getItem('user_id'),
  url = '/viewedMedia?',
  xhr = new XMLHttpRequest();
/*
  console.log(document.getElementById('mediaHolder'));
  console.log(document.getElementById('mediaHolder').childNodes);
  console.log(document.getElementById('mediaHolder').childNodes[1]);
  console.log(document.getElementById('mediaHolder').childNodes[1].id);
*/
  url += 'userId='+userId+'&medId='+medId;
  xhr.open('POST', url, true);
  xhr.onload = function() {
    redirect('/mediaDisplay');
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
  else if (urlEnding == 'mediaChoice') {
    var
    userId = sessionStorage.getItem('user_id'),
    url = '/getFilters?',
    xhr = new XMLHttpRequest();

    url += "user="+userId;
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
});
