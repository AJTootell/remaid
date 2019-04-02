/*
██████  ███████ ██████  ██ ██████  ███████  ██████ ████████
██   ██ ██      ██   ██ ██ ██   ██ ██      ██         ██
██████  █████   ██   ██ ██ ██████  █████   ██         ██
██   ██ ██      ██   ██ ██ ██   ██ ██      ██         ██
██   ██ ███████ ██████  ██ ██   ██ ███████  ██████    ██
redirect - changes the url of the page

Params:
  url - new url to call
*/

function redirect (url){
  location.href = url;
}

/*
███████ ██████  ██████   ██████  ██████
██      ██   ██ ██   ██ ██    ██ ██   ██
█████   ██████  ██████  ██    ██ ██████
██      ██   ██ ██   ██ ██    ██ ██   ██
███████ ██   ██ ██   ██  ██████  ██   ██/
error - Add error message to given parent element

Params:
  elParent - Parent element to add error, if empty add to body*
  err - error message to add
*/

function error(elParent, err){
  console.log(err)
  if (!elParent){
    var elParent = document.body
  }
  var el = document.createElement('h1');
  el.textContent = err;
  elParent.appendChild(el);
}

/*
 █████  ██████  ██████  ███    ███ ███████ ██████  ██  █████  ███████ ██ ██   ████████ ███████ ██████
██   ██ ██   ██ ██   ██ ████  ████ ██      ██   ██ ██ ██   ██ ██      ██ ██      ██    ██      ██   ██
███████ ██   ██ ██   ██ ██ ████ ██ █████   ██   ██ ██ ███████ █████   ██ ██      ██    █████   ██████
██   ██ ██   ██ ██   ██ ██  ██  ██ ██      ██   ██ ██ ██   ██ ██      ██ ██      ██    ██      ██   ██
██   ██ ██████  ██████  ██      ██ ███████ ██████  ██ ██   ██ ██      ██ ███████ ██    ███████ ██   ██
addMediaFilter - Adds a new filters for users for given media type

Params:
  mediaType - type of media to filter out
*/

function addMediaFilter(buttonEl){
  var
  userId = sessionStorage.getItem('userId'),
  mediaType = buttonEl.id.split('_')[0]
  url = '/addFilter?',
  xhr = new XMLHttpRequest(),
  weight = 0;

  if (buttonEl.textContent.includes('Selected')) {
    weight = 0;
  }
  else{
    weight = 1;
  }
  toggleButton(buttonEl);

  url += "userId="+userId+"&";
  url += "type="+mediaType+"&";
  url += "weight="+weight;
  console.log(url);
  xhr.open('POST', url, true);
  xhr.send();
}
/*
 █████  ██████  ██████  ████████ ██ ███    ███ ███████ ███████ ██ ██   ████████ ███████ ██████
██   ██ ██   ██ ██   ██    ██    ██ ████  ████ ██      ██      ██ ██      ██    ██      ██   ██
███████ ██   ██ ██   ██    ██    ██ ██ ████ ██ █████   █████   ██ ██      ██    █████   ██████
██   ██ ██   ██ ██   ██    ██    ██ ██  ██  ██ ██      ██      ██ ██      ██    ██      ██   ██
██   ██ ██████  ██████     ██    ██ ██      ██ ███████ ██      ██ ███████ ██    ███████ ██   ██
addTimeFilter - todo
*/

function addTimeFilter(){

}
/*
 █████  ██████  ██████   ██████  █████  ████████ ███████  ██████   ██████  ██████  ██    ██
██   ██ ██   ██ ██   ██ ██      ██   ██    ██    ██      ██       ██    ██ ██   ██  ██  ██
███████ ██   ██ ██   ██ ██      ███████    ██    █████   ██   ███ ██    ██ ██████    ████
██   ██ ██   ██ ██   ██ ██      ██   ██    ██    ██      ██    ██ ██    ██ ██   ██    ██
██   ██ ██████  ██████   ██████ ██   ██    ██    ███████  ██████   ██████  ██   ██    ██
addCategory - todo
*/

function addCategory(){

}
/*
 ██████  ███████ ████████ ███    ███ ███████ ██████  ██  █████
██       ██         ██    ████  ████ ██      ██   ██ ██ ██   ██
██   ███ █████      ██    ██ ████ ██ █████   ██   ██ ██ ███████
██    ██ ██         ██    ██  ██  ██ ██      ██   ██ ██ ██   ██
 ██████  ███████    ██    ██      ██ ███████ ██████  ██ ██   ██
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
    var media,
    el,
    elParent = document.getElementById('mediaHolder');
    if (xhr.responseText == ''){
      error(elParent, "No media left to view");
      return;
    }
    media = JSON.parse(xhr.responseText);
    var
    headerHolder = document.getElementsByTagName('description')[0],
    headerEl = document.createElement('h1');
    headerEl.textContent = media.med_alt;
    headerHolder.appendChild(headerEl);
    //el.class = 'media';
    switch(media.med_type){
      case "photo":
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
        error(elParent, "Media type not supported");
        break;
    }
  }
  xhr.send();
}

/*
██      ██ ██   ██ ███████ ███    ███ ███████ ██████  ██  █████
██      ██ ██  ██  ██      ████  ████ ██      ██   ██ ██ ██   ██
██      ██ █████   █████   ██ ████ ██ █████   ██   ██ ██ ███████
██      ██ ██  ██  ██      ██  ██  ██ ██      ██   ██ ██ ██   ██
███████ ██ ██   ██ ███████ ██      ██ ███████ ██████  ██ ██   ██
likeMedia - Increase weight of all relevant categories
*/

function likeMedia(){
  var
  funcUrl = '/increWeight?',
  xhr = new XMLHttpRequest(),
  userId = sessionStorage.getItem('userId'),
  elParent = document.getElementById('mediaHolder'),
  medId = elParent.childNodes[1].id;

  funcUrl += 'userId='+userId;
  funcUrl += '&medId='+medId;

  xhr.open('POST', funcUrl, true);
  xhr.onload = function() {
    redirect('/mediaDisplay');
  }
  xhr.send();

}

/*
 █████  ██████  ██████  ██    ██ ███████ ███████ ██████
██   ██ ██   ██ ██   ██ ██    ██ ██      ██      ██   ██
███████ ██   ██ ██   ██ ██    ██ ███████ █████   ██████
██   ██ ██   ██ ██   ██ ██    ██      ██ ██      ██   ██
██   ██ ██████  ██████   ██████  ███████ ███████ ██   ██
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
██████  ██████  ███████ ███████ ███████ ████████ ████████ ██    ██ ██████  ███████ ███████ ██ ██   ████████ ███████ ██████  ███████
██   ██ ██   ██ ██      ██      ██         ██       ██     ██  ██  ██   ██ ██      ██      ██ ██      ██    ██      ██   ██ ██
██████  ██████  █████   ███████ █████      ██       ██      ████   ██████  █████   █████   ██ ██      ██    █████   ██████  ███████
██      ██   ██ ██           ██ ██         ██       ██       ██    ██      ██      ██      ██ ██      ██    ██      ██   ██      ██
██      ██   ██ ███████ ███████ ███████    ██       ██       ██    ██      ███████ ██      ██ ███████ ██    ███████ ██   ██ ███████
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
      if (filters[i].weight == 0){
        toggleButton(buttonEl);
      }
    }
  }
  xhr.send();
}
/*
████████  ██████   ██████   ██████  ██      ███████  ██████  █████  ████████ ███████  ██████   ██████  ██████  ██ ███████ ███████
   ██    ██    ██ ██       ██       ██      ██      ██      ██   ██    ██    ██      ██       ██    ██ ██   ██ ██ ██      ██
   ██    ██    ██ ██   ███ ██   ███ ██      █████   ██      ███████    ██    █████   ██   ███ ██    ██ ██████  ██ █████   ███████
   ██    ██    ██ ██    ██ ██    ██ ██      ██      ██      ██   ██    ██    ██      ██    ██ ██    ██ ██   ██ ██ ██           ██
   ██     ██████   ██████   ██████  ███████ ███████  ██████ ██   ██    ██    ███████  ██████   ██████  ██   ██ ██ ███████ ███████
toggleButton - toggle button text from hidden to selected and vice versa

Params:
  elButton - button element to toggle
*/

function toggleButton(elButton){
  if (elButton.innerHTML.includes('Hidden')){
    elButton.innerHTML = elButton.innerHTML.replace('Hidden','Selected');
  }else{
    elButton.innerHTML = elButton.innerHTML.replace('Selected','Hidden');
  }
}

/*
███████ ███████ ████████ ██    ██ ██████  ███████ ██      ██ ██████  ███████ ██████
██      ██         ██    ██    ██ ██   ██ ██      ██      ██ ██   ██ ██      ██   ██
███████ █████      ██    ██    ██ ██████  ███████ ██      ██ ██   ██ █████   ██████
     ██ ██         ██    ██    ██ ██           ██ ██      ██ ██   ██ ██      ██   ██
███████ ███████    ██     ██████  ██      ███████ ███████ ██ ██████  ███████ ██   ██
setupSlider
*/

function setupSlider(){
  var slider = document.getElementById('slider');

  noUiSlider.create(slider, {
    start: [10, 90],
    range: {
        'min': [0],
        'max': [100]
    },
    connect: [false, true, false]
  });

  slider.style.height = '25px';
  slider.style.width = '90%';
  slider.style.margin = '0 auto 10px';
  // When the slider value changes, update the input and span
  slider.noUiSlider.on('update', function (values, handle) {
    console.log(handle);
    changeTime("slider"+handle, values[handle]);
  });
}

/*
 ██████ ██   ██  █████  ███    ██  ██████  ███████ ████████ ██ ███    ███ ███████
██      ██   ██ ██   ██ ████   ██ ██       ██         ██    ██ ████  ████ ██
██      ███████ ███████ ██ ██  ██ ██   ███ █████      ██    ██ ██ ████ ██ █████
██      ██   ██ ██   ██ ██  ██ ██ ██    ██ ██         ██    ██ ██  ██  ██ ██
 ██████ ██   ██ ██   ██ ██   ████  ██████  ███████    ██    ██ ██      ██ ███████
changeTime
params:
  id -
  value -
*/

function changeTime(id, value){
  switch(id){
    case "slider0":
      document.getElementById('min').value = 1900+parseInt(value);
      break;
    case "slider1":
      document.getElementById('max').value = 1900+parseInt(value);
      break;
    case "min":

    case "max":

    default:
      break;
  }
}

/*
██      ███████  █████  ██    ██ ███████ ████████ ██ ███    ███ ███████
██      ██      ██   ██ ██    ██ ██         ██    ██ ████  ████ ██
██      █████   ███████ ██    ██ █████      ██    ██ ██ ████ ██ █████
██      ██      ██   ██  ██  ██  ██         ██    ██ ██  ██  ██ ██
███████ ███████ ██   ██   ████   ███████    ██    ██ ██      ██ ███████
leaveTime
params:
  url -
*/

function leaveTime(url){
  var
  userId = sessionStorage.getItem('userId'),
  url = '/addFilter?',
  xhr = new XMLHttpRequest(),
  type = "time",
  startDate = document.getElementById('min').value,
  endDate = document.getElementById('max').value;

  url += "userId="+userId;
  xhr.open('GET', url, true);

  funcUrl += 'userId='+userId;
  funcUrl += '&type='+type;
  funcUrl += '&startDate='+startDate;
  funcUrl += '&endDate='+endDate;

  xhr.send();

  redirect(url);
}

/*
██      ███████  █████  ██    ██ ███████  ██████  █████  ████████ ███████
██      ██      ██   ██ ██    ██ ██      ██      ██   ██    ██    ██
██      █████   ███████ ██    ██ █████   ██      ███████    ██    █████
██      ██      ██   ██  ██  ██  ██      ██      ██   ██    ██    ██
███████ ███████ ██   ██   ████   ███████  ██████ ██   ██    ██    ███████
leaveCate - add new categorey filters to user

Params:
  url - url to redirect user to when categories has been updated
*/

function leaveCate(url){

  var elParent = document.getElementById('categoryHolder'),
  userId = sessionStorage.getItem('userId');
  console.log('0');
  for (var i=1;i<elParent.childNodes.length;i++){
//    console.log(elParent.childNodes[i]);
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
    console.log("Category: " + cateId + " set to: "+weight);
    if (cateId != ''){
      xhr.open('POST', funcUrl, false);
      xhr.send();
    }
  }

  redirect(url);
}
/*
 ██████  ███████ ████████  ██████  █████  ████████ ███████  ██████   ██████  ██████  ██ ███████ ███████
██       ██         ██    ██      ██   ██    ██    ██      ██       ██    ██ ██   ██ ██ ██      ██
██   ███ █████      ██    ██      ███████    ██    █████   ██   ███ ██    ██ ██████  ██ █████   ███████
██    ██ ██         ██    ██      ██   ██    ██    ██      ██    ██ ██    ██ ██   ██ ██ ██           ██
 ██████  ███████    ██     ██████ ██   ██    ██    ███████  ██████   ██████  ██   ██ ██ ███████ ███████
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
    elParent = document.getElementById('categoryHolder');
    if (categories.length == 0){
      error(elParent, "No categories left to view");
    }
    else {
      for (var i=0;i<categories.length;i++){
        console.log(categories[i].cate_icon_url);
        var elName = categories[i].cate_id + '_category_button',
        elButton = document.createElement('button'),
        re = new RegExp('_', 'g'),
        cate_name = categories[i].cate_name.replace(re,' '),
        icon = document.createElement('i'),
        text = document.createElement('p');

        elButton.id = elName;
        elButton.classList.add('half_threeEight_button');

        icon.setAttribute("class", categories[i].cate_icon_url)
        elButton.appendChild(icon);

        text.textContent = capitalizeFirstLetter(cate_name)+': Hidden ';
        elButton.appendChild(text);

        elButton.onclick = function(){
          toggleButton(this);
        }

        elParent.appendChild(elButton);
      }
    }
  }
  xhr.send();
}

/*
 ██████  █████  ██████  ██ ████████  █████  ██      ██ ███████ ███████ ███████ ██ ██████  ███████ ████████ ██      ███████ ████████ ████████ ███████ ██████
██      ██   ██ ██   ██ ██    ██    ██   ██ ██      ██    ███  ██      ██      ██ ██   ██ ██         ██    ██      ██         ██       ██    ██      ██   ██
██      ███████ ██████  ██    ██    ███████ ██      ██   ███   █████   █████   ██ ██████  ███████    ██    ██      █████      ██       ██    █████   ██████
██      ██   ██ ██      ██    ██    ██   ██ ██      ██  ███    ██      ██      ██ ██   ██      ██    ██    ██      ██         ██       ██    ██      ██   ██
 ██████ ██   ██ ██      ██    ██    ██   ██ ███████ ██ ███████ ███████ ██      ██ ██   ██ ███████    ██    ███████ ███████    ██       ██    ███████ ██   ██
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
    case 'time':
      setupSlider();
      break;
    default:
      break;

  }
});
