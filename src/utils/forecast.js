const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const weatherURL = `http://api.weatherstack.com/current?access_key=762838e19eb1af49a622a34db8ce52e7&query=${latitude},${longitude}&units=f`;
    request({ url: weatherURL, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to weather services', undefined);
        } else if (response.body.error) {
            callback('Invalid latitude and longitude', undefined);
        } else {
            callback(undefined, response);
        }
    });
}

module.exports = forecast;