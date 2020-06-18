const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const path = require('path');
const express = require('express');
const hbs = require('hbs');

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicPathDirectory = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialPath);

// setup static directory to serve
app.use(express.static(path.join(__dirname, '../public')));

// app.get('/help', (req, res) => {
//     res.send(`<a href="/">Home</a>
//     <a href="/help">Help</a>
//     <a href="/about">About</a>
//     <a href="/weather">Weather</a>`);
// });

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Jana'
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        });
    }

    geocode(req.query.address, (error, data) => {
        if (error) {
            return res.send({
                error: error
            });
        }

        forecast(data.latitude, data.longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error: error
                });
            }

            res.send({
                forecast: `The current temperature of ${data.location} is ${forecastData.body.current.temperature}F`,
                location: data.location,
                address: req.query.address
            });
        });
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Peter'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Jana'
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Error',
        errorMessage: 'Article not found.',
        name: 'Jana'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Error',
        errorMessage: 'Page not found.',
        name: 'Jana'
    });
});

app.listen(port, () => {
    console.log('Server is up on port ' + port);
});