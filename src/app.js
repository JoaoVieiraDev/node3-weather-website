const geocode = require('./utils/geocode')
const weather = require('./utils/weather')
const path = require('path')
const express = require('express')
const hbs = require('hbs')

// Initializing express
const app = express()

// Define paths for express config
const publicDirectory = path.join(__dirname, '../public')
const partialsPath = path.join(__dirname, '../views/partials')

// Setup handlebars engine
app.set('view engine', 'hbs')
// Setup the partials for hbs
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectory))

 
// Routes
app.get('', (req, res) => {
    // Rendering from views
    res.render('index', {
        title: 'Weather',
        name: 'João Vieira'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        name: 'João Vieira'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About page',
        name: 'João Vieira'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: "You must provide a location"
        })
    }

    geocode(req.query.address, (error, {lat, lon, location} = {}) => {
        if(error){
            return res.send({ error })
        }
    
        weather(lat, lon, (error, {description, temperature, precip} = {}) => {
            if(error){
                return res.send({ error })
            }
    
            res.send({
                address: req.query.address,
                location,
                forecast: description + ". It is currently " + temperature + " degrees out. There is a " + precip + "% chance of rain."
            })
        })
    })
})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('help', {
        title: '404',
        name: 'João Vieira',
        message: 'Help entry not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'João Vieira',
        message: 'Page not found'
    })
})

// running the aplication on port 3000
app.listen(3000, () => {
    console.log('Server is running on port 3000!')
})