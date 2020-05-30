const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const weather = require('./utils/weather')
require('./utils/polyfills').default
const app = express()

// Define paths for Express config 
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        details: 'The app can show current and daily forecast',
        author: 'Imam Hossain'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        author: 'Imam Hossain'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Section',
        query: 'Your Questions Goes Here',
        author: 'Imam Hossain'
    })
})
app.get('/weather/?*', (req, res) => {
    if(!req.query.address){
        return res.send({error: 'Address is not provided'})
    }
    geocode(req.query.address, function geoCodeCallback(error, response){

        if(error){
            return res.send({error})
        }
        //console.log(data)
       let  {latitude, longitude, location} = response
    
        weather(latitude, longitude, function weatherCallback(error, response){
            if(error){
                return res.send({error})
            }

            let {body: weatherData} = response
            
            let timezone = weatherData.timezone
            let myObject = {
                    latitude,
                    longitude,
                    time : new Date().formatTime(timezone),
                    date : new Date().formatDate(timezone),
                    updateTime: new Date(weatherData.current.dt * 1000).formatTime(timezone), 
                    location,
                    sunrise: new Date(weatherData.current.sunrise * 1000).formatTime(timezone),
                    sunset: new Date(weatherData.current.sunset * 1000).formatTime(timezone), 
                    temp: weatherData.current.temp,
                    feelsLike: weatherData.current.feels_like,
                    condition: weatherData.current.weather[0].description.toTitleCase(),
            }
            let result = {...weatherData, ...myObject}
            
            res.send(result)
        })
    
    })
    // res.send({
    //     forecast: 'Its raining',
    //     address: req.query.address
    // })
    
})
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        message: 'Help article not found!',
        author: 'Imam Hossain'
    })
})
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        message: 'Page not found!',
        author: 'Imam Hossain'
    })
})

let allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Headers', "*");
    next();
}
app.use(allowCrossDomain);

app.listen(9000, ()=>{
    console.log('Server is up on port 9000.')
})
