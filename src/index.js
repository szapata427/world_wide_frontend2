const mapLocation = document.getElementById('map')
const countryContainer = document.getElementById('liked-countries')


   function initMap(){
    let map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 33, lng: 65},
      zoom: 4
    });
    fetch('http://localhost:3000/countries')
    .then(res => res.json())
    .then(function(json){
      console.log(json)

      json.forEach(function(country){
        let image = {
          url: country.flag,
          // This marker is 20 pixels wide by 32 pixels high.
          size: new google.maps.Size(40, 30),
          origin: new google.maps.Point(0, 0),
           // The anchor for this image is the base of the flagpole at (0, 32).
           anchor: new google.maps.Point(0, 32),
           scaledSize: new google.maps.Size(30, 30)
        };
        //Adding Marker
        let marker = new google.maps.Marker({
          position:{lat: country['location_lat'] ,lng: country['location_lng'] },
          map:map,
          //size: new google.maps.Size(2, 3),
          icon: image
        });
        let infoWindow = new google.maps.InfoWindow({
          content: `<h4 style="color: red">${country["name"]}<h4>
                   <p>Native Name: ${country["native_name"]}</p>
                   <p>Population: ${country["population"]}</p>
                   <p>Official Language: ${country["language"]}</p>
                   <p>Capital: ${country["capital"]}</p>
                   <p> Currency: ${country["currency_name"]} <span>${country["currency_symbol"]} </span> </p>
                   <a href="https://en.wikipedia.org/wiki/${country["native_name"]}"> More Info </a> <span><button data-id="${country["id"]}" id="like_btn" class="btn btn-primary"> Like </button></span>
          `
        })
         //console.log(country["latlng"][0])
        //Added Marker?
        marker.addListener('click', function() {
          infoWindow.open(map, marker);})
      }
    )
  })
}

//iterating through favorite_countries database and pushing the liked country_ids to the array
let likedCountriesArray = []

fetch(`http://localhost:3000/favorite_countries`).then(response => response.json())
.then(json => {
  json.forEach(country => {
    likedCountriesArray.push(country.country_id)
  })
})

fetch(`http://localhost:3000/countries`).then(response => response.json())
.then(json => {
  json.forEach(country => {
    if (likedCountriesArray.includes(country.id)){
      countryContainer.innerHTML += `<div class="country-flag"><h2 class="country-name">${country.name}</h2><img  width="200px" src="${country.flag}"></div>`
    }
  })
})






//Add an Event addListener
mapLocation.addEventListener('click', event => {
  event.preventDefault()

  if(event.target.id === "like_btn"){
    // deb  ugger
    let countryId = parseInt(event.target.dataset.id)

    fetch(`http://localhost:3000/favorite_countries`, {
      method: 'POST',
      headers: {
        'Content-type': "application/json",
        Accepts: 'application/json'
      },
      body: JSON.stringify({
        user_id: 1,
        country_id: countryId
      })
    })

    fetch(`http://localhost:3000/countries`).then(response => response.json())
    .then(json => {
      json.find(country => {
        if (country.id === countryId) {
          countryContainer.innerHTML += `<div class="country-flag"><h2 class="country-name">${country.name}</h2><img  width="200px" src="${country.flag}"></div>`
       }
      })
    })

  }
})
