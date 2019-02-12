function redirect (url){
  location.href = url;
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
