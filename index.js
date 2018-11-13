const mapLocation = document.getElementById('map')


   function initMap(){
    let map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 33, lng: 65},
      zoom: 8
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
                   <p>Official Laguage: ${country["language"]}</p>
                   <p>Capital ${country["capital"]}</p>
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
//Add an Event addListener
mapLocation.addEventListener('click', event => {
  event.preventDefault()
  if(event.target.id === "like_btn"){
    console.log("I,liked this")
  }
})
