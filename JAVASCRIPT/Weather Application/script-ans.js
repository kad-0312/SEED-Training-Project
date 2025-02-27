let weather = document.getElementById('weather');
let locationShow = document.getElementById('location_show');
let temperature = document.getElementById('temperature');
let placeSearch = document.getElementById('place_input');
let placeSearchBtn = document.getElementById('place_input_btn');

placeSearchBtn.addEventListener('click', function () {
  //console.log(placeSearch.value);
  fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${placeSearch.value}`)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    //console.log(data);
    locationShow.innerHTML = data.results[0].name;
    let templink = `https://api.open-meteo.com/v1/forecast?latitude=${data.results[0].latitude}&longitude=${data.results[0].longitude}&current_weather=true`;
    fetch(templink)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        temperature.innerHTML = data.current_weather.temperature + '°C';
      })
  });
 });