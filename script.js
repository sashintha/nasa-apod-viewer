
async function ApiRequest(){
    let API_KEY = "FXyXePEFG09BA88Z0B0rpC9XnMAaezAs00qeacRe";
    let response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&count=6`);
    let fulldata = response.url;

    fetch(fulldata)
    .then(res => res.json())
    .then((out) => {
    useApiData(out);
    })
    .catch(err => { throw err });
}

function useApiData(data){
  for(let i = 0; i < 5; i+=3){
  document.querySelector("#main").innerHTML +=
    `
      <div class="row row-cols-1 row-cols-md-3 g-4">

          <div class="col inCard">
            <div class="card h-100">
              <img src="${data[i].url}" class="card-img-top">
              <div class="card-body">
                <h5 class="card-title">${data[i].title}</h5>
                <p class="card-text">${data[i].explanation}</p>
              </div>
            </div>
          </div>

          <div class="col inCard">
            <div class="card h-100">
              <img src="${data[i+1].url}" class="card-img-top">
              <div class="card-body">
                <h5 class="card-title">${data[i+1].title}</h5>
                <p class="card-text">${data[i+1].explanation}</p>
              </div>
            </div>
          </div>

          <div class="col inCard">
            <div class="card h-100">
              <img src="${data[i+2].url}" class="card-img-top">
              <div class="card-body">
                <h5 class="card-title">${data[i+2].title}</h5>
                <p class="card-text">${data[i+2].explanation}</p>
              </div>
            </div>
          </div>
      </div>
    `;
  }
}
