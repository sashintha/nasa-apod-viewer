const btn = document.querySelector("#submitInput");
btn.addEventListener("click", ApiRequest);
const loader = document.querySelector("#loading");
let doneLoading = false;

function displayLoading() {
  loader.classList.add("display");
  setTimeout(() => {
      loader.classList.remove("display");
  }, 10000);
}

function hideLoading(button) {
  loader.classList.remove("display");
}

async function ApiRequest(){
    if(doneLoading == false){
      displayLoading();
    }

    let API_KEY = "FXyXePEFG09BA88Z0B0rpC9XnMAaezAs00qeacRe";
    let response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&count=18`);
    let fulldata = response.url;

    fetch(fulldata)
    .then(res => res.json())
    .then((out) => {
      hideLoading()
      doneLoading = true;
      useApiData(out);
      window.scrollTo(0,900);
    })
    .catch(err => { throw err });
}

function useApiData(data){
  for(let i = 0; i < 17; i++){
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

