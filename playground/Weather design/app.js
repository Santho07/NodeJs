

const weatherForm = document.querySelector('#weather-form-1')
let search = document.querySelector('#search-text-1')
// function convertToHTML(...args){
//     let html = ""
//     args.forEach(e => {
//         html += (args + '<br/>')
//     })
//     return html; 
// }
var timeFormat = { hour: '2-digit', minute: '2-digit' }
var dateFormat = { year: 'numeric', month: 'long', day: 'numeric' }
let time = new Date().toLocaleTimeString('en-US', timeFormat);
let date = new Date().toLocaleDateString('en-US', dateFormat);
let timeSelector = document.querySelector(".time")
timeSelector.innerHTML = `<p>Time: ${time}</p>
                         <p>Date: ${date}</p>`

weatherForm.addEventListener("submit", (e) => {
    e.preventDefault()

    let location = search.value
    console.log(location)
    fetch(`http://localhost:9000/weather?address=${location}`)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                let main = document.querySelector(".weather")
                main.innerHTML = `<p class="error">${data.error}</p>`;
            }
            else {
                let url = `http://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png`;
                let place = document.querySelector("#place")
                console.log(place)
                place.innerHTML = `<b>${data.location.split(',')[0]}</b>`;

                // para1.innerHTML = data.time + '<br/>' + data.date + '<br/>' + data.location + '<br/>' + 'Latitude: ' + data.latitude + '<br/>' + 'Longitude: ' + data.longitude
                // divImg.innerHTML = <img src=${url}>;
                // para2.innerHTML = 'Update Time: ' + data.updateTime + '<br/>' + 'Temperature: ' + data.temp + '\u2103' + '<br/>' + 'Feels like: ' + data.feelsLike + '\u2103' + '<br/>' + 'Description: ' + data.condition + '<br/>' +
                //     'Sunrise: ' + data.sunrise + '<br/>' + 'Sunset : ' + data.sunset + '<br/>'
            }
        })
})