const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geoCode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

// Setup handlebars engine and views location
app.set('views', viewsPath)
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath)

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Mehak'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Mehak'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'This is a help message',
        title: 'Help',
        name: 'Mehak'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: "Address not provided! Please provide an address"
        })
    }

    geoCode(req.query.address, (error, {location, latitude, longitude} = {}) => {
        if(error){
            return res.send({Error: error});
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({Error: error})
            }
            res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address
            })
        })
    })    

})

app.get('/products', (req,res) => {
    if(!req.query.search){
        return res.send({
            error: "Search value not provided"
        })
    }

    res.send({
        products: []
    })
})

app.get('/help/*',(req, res) => {
    res.render('404', {
        title: '404',
        name: 'Mehak', 
        message: 'Help article not found!!'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Mehak',
        message: 'Page not found!!!'
    })
})

app.listen('3000', ()=>{
    console.log('Server is running!')
})