const weatherForm = document.querySelector("#weather-form-1");
const search = document.querySelector("#search-text-1");

const timeFormat = { hour: "2-digit", minute: "2-digit" };
const dateFormat = { year: "numeric", month: "long", day: "numeric" };
let time = new Date().toLocaleTimeString("en-US", timeFormat);
let date = new Date().toLocaleDateString("en-US", dateFormat);
let timeSelector = document.querySelector(".time");
timeSelector.innerHTML = `<p>Time: ${time}</p>
                         <p>Date: ${date}</p>`;

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let location = search.value;
  let locationBar = document.querySelector(".location-bar");
  locationBar.innerHTML = `<p>Loading: please wait.......</p>`;
  //console.log(location);

  fetch(`/weather?address=${location}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        let main = document.querySelector(".weather");
        timeSelector.innerHTML = `<p>Time: ${time}</p>
                         <p>Date: ${date}</p>`;
        locationBar.innerHTML = `</p>Location: Location not found!</p>`;
        main.innerHTML = `<div class="error">
                                  <p>${data.error}</p>
                                  <p> Please try again! </p> </div>`;
      } else {
        let imageUrl = `http://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png`;
        let place = data.location.split(",")[0];
        timeSelector.innerHTML = `<p>Time: ${data.time}</p>
                         <p>Date: ${data.date}</p>`;
        let location = `<p>Location: ${data.location}</p>
                                <p>Latitude: ${data.latitude}</p>
                                <p>Longitude: ${data.longitude}</p>`;
        locationBar.innerHTML = location;

        let html = ` <section class="current">
                <section class="current-weather">
                    <div class="current-location">
                        <h2><b id="place">${place}</b></h2>
                        <h2>Weather</h2>
                    </div>

                    <div class="current-icon">
                        <img id="image1" src=${imageUrl}>
                    </div>

                    <div class="current-condition">
                        <div class="temp">${data.temp}\u2103</div>
                        <div class="summary">${data.condition}</div>
                    </div>
                </section>
                <section class="current-info">
                    <ul class="info-list">
                        <li>Feels Like: ${data.current.feels_like}\u2103</li>
                        <li>humidity: ${data.current.humidity}%</li>
                        <li>wind: ${data.current.wind_speed}m/s</li>
                        <li>cloud cover: ${data.current.clouds}%</li>
                        <li>visibility: ${data.current.visibility / 1000}km</li>
                    
                    </ul>
                </section>
            </section>
            <section class="summary">
                <div class="forecast-summary">
                    <h2>Next 24 hours:</h2>
                    <p>&nbsp;${data.forecast}</p>
                </div>
                <div class="other-info">
                    <p>Sunrise: ${data.sunrise}</p>
                    <p>Sunset: ${data.sunset}</p>
                    <p>Day Max: ${data.daily[0].temp.max}\u2103</p>
                    <p>Day Min: ${data.daily[0].temp.min}\u2103</p>
                </div>
            </section>`;
        document.querySelector(".weather").innerHTML = html;
      }
    });
});
