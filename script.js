
async function ApiRequest(){
    let API_KEY = "FXyXePEFG09BA88Z0B0rpC9XnMAaezAs00qeacRe";
    let response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&count=5`);

    let fulldata = response.url;

    fetch(fulldata)
    .then(res => res.json())
    .then((out) => {
     console.log(out);
    useApiData(out);
      
    })
    .catch(err => { throw err });

}

function useApiData(data){

  document.querySelector("#content1").innerHTML =
  `
  ${data[0].title}
  <img class="card-img-top" src="${data[0].hdurl}">
  <div class="card-body">
    <p>Picture Of The Day: <b>${data[0].date}</b></p>
    <p class="card-text"> ${data[0].explanation}</p>
  </div>
  `;

  document.querySelector("#content2").innerHTML =
  `
  ${data[1].title}
  <img class="card-img-top" src="${data[1].hdurl}">
  <div class="card-body">
    <p>Picture Of The Day: <b>${data[1].date}</b></p>
    <p class="card-text"> ${data[1].explanation}</p>
  </div>
  `;

  // document.querySelector("#content3").innerHTML =
  // `
  // ${data[2].title}
  // <img class="card-img-top" src="${data[2].hdurl}">
  // <div class="card-body">
  //   <p>Picture Of The Day: <b>${data[2].date}</b></p>
  //   <p class="card-text"> ${data[2].explanation}</p>
  // </div>
  // `;
  // document.querySelector("#content4").innerHTML =
  // `
  // ${data[3].title}
  // <img class="card-img-top" src="${data[3].hdurl}">
  // <div class="card-body">
  //   <p>Picture Of The Day: <b>${data[3].date}</b></p>
  //   <p class="card-text"> ${data[3].explanation}</p>
  // </div>
  // `;

}
