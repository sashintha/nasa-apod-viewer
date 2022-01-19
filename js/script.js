const btn = document.querySelector("#submitInput");
const loader = document.querySelector("#loading");
let doneLoading = false;
let loadExtra = false;
let wait = false;
btn.addEventListener("click", redirectFunc);

//show loading icon
function displayLoading() {
  loader.classList.add("display");
}

//hide loading icon
function hideLoading() {
  loader.classList.remove("display");
}

//extra function to prevent loading new data after initial click and loading extra data from scrolling to bottom.
function redirectFunc(){
  if(doneLoading == false){
    ApiRequest();
  }
}

async function ApiRequest(){
  if(doneLoading == false||loadExtra == true){ //calls on initial click of button or scrolling to bottom ONLY
    doneLoading = true;
    displayLoading();
    let API_KEY = "FXyXePEFG09BA88Z0B0rpC9XnMAaezAs00qeacRe";
    // send request to api to retrieve data
    let response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&count=6`);
    let fulldata = response.url;
    //fetch data set from json
    fetch(fulldata)
    .then(res => res.json())
    .then((out) => {
      hideLoading()
      useApiData(out);
      if(doneLoading == false){
        window.scrollTo(0,900);
      }
    }) // catch error if request is timed out
    .catch(err => { 
      alert("Unable to retrieve data, please try again.");
      throw err  
    });
  }
}

function useApiData(data){
  //display data images in html
  for(let i = 0; i < 6; i++){
  document.querySelector("#main").innerHTML +=
    `
    <div class="fullCard">
      <div class="card" style="width: 60rem;">
        <img class="card-img-top" src="${data[i].url}" alt="${data[i].title}">
        <div class="card-body">
            <h5 class="card-title">${data[i].title}</h5>
            <h6 class="card-title">${data[i].date}</h6>
            <p class="card-text">${data[i].explanation}</p>
            <button type="button" class="btn likeBtn animateBtn${i}" style="background-color: white" id="btn${i}" onclick="likeClick(${i})">&#128420;</button>
        </div>
      </div>
    </div>
    `;
  }
  wait = false;
}

//like button animation
function likeClick(btnID){
  if(document.getElementById("btn" + btnID).style.backgroundColor == "white"){
    $("#btn" + btnID).addClass('animated');
    setTimeout(function() {
          $("#btn" + btnID).removeClass('animated');
    }, 1500);
    document.getElementById("btn" + btnID).innerHTML = `&#10084;`;
    document.getElementById("btn" + btnID).style.backgroundColor = "pink";
  }
  else{
    document.getElementById("btn" + btnID).style.backgroundColor = "white";
    document.getElementById("btn" + btnID).innerHTML = `&#128420;`;
  }
}

window.onscroll = function() {
  if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
    loadExtra = true;
    if(wait == false){ //wait variable to prevent spamming scrolling up and down at the very bottom of page leading to spamming api request
      wait = true;
      ApiRequest();
    }
  }
};

