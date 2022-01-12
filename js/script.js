const btn = document.querySelector("#submitInput");
btn.addEventListener("click", ApiRequest);
const loader = document.querySelector("#loading");
let doneLoading = false;

//show loading icon
function displayLoading() {
  loader.classList.add("display");
  setTimeout(() => {
      loader.classList.remove("display");
      if(doneLoading == false){
        //notify if request takes too long to try again
        alert("Unable to retrieve data, please try again.");
      }
  }, 30000);
}

//hide loading icon
function hideLoading() {
  loader.classList.remove("display");
}

async function ApiRequest(){
    if(doneLoading == false){
      displayLoading();
    }

    let API_KEY = "FXyXePEFG09BA88Z0B0rpC9XnMAaezAs00qeacRe";
    // send request to api to restrieve data
    let response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&count=10`);
    let fulldata = response.url;

    //fetch data set from json
    fetch(fulldata)
    .then(res => res.json())
    .then((out) => {
      hideLoading()
      doneLoading = true;
      useApiData(out);
      window.scrollTo(0,900);
    }) // catch error if request is timed out
    .catch(err => { 
      alert("Unable to retrieve data, please try again.");
      throw err  
    });
}

function useApiData(data){
  //display data images in html
  for(let i = 0; i < 9; i++){
  document.querySelector("#main").innerHTML +=
    `
    <div class="fullCard">
      <div class="card" style="width: 60rem;">
        <img class="card-img-top" src="${data[i].url}" alt="${data[i].title}">
        <div class="card-body">
            <h5 class="card-title">${data[i].title}</h5>
            <p class="card-text">${data[i].explanation}</p>
            <button type="button" class="btn likeBtn animateBtn${i}" style="background-color: white" id="btn${i}" onclick="likeClick(${i})">&#128420;</button>
        </div>
      </div>
    </div>
    `;
  }
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


