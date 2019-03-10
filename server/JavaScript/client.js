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

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

//if connection without a user_id in session data then create a new user
window.addEventListener('load', function() {
  var
  userId,
  url = '/addUser',
  xhr = new XMLHttpRequest();

  userId = sessionStorage.getItem('user_id');
  console.log(userId);
  if (userId == null){
    xhr.open('GET', url, true);
    xhr.onload = function() {
      console.log(xhr.responseText);
      var user_id = JSON.parse(xhr.responseText);
      sessionStorage.setItem('user_id', user_id);
    }
    xhr.send();
  }
});
