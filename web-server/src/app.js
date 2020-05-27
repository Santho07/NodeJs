const path = require('path')
const express = require('express')
const hbs = require('hbs')

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
app.get('/weather', (req, res) => {
    res.send({
        forcast: 20,
        location: 'Dhaka Bangladesh'
    })
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
app.listen(9000, ()=>{
    console.log('Server is up on port 9000.')
})
