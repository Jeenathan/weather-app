const request = require('request');

const geocode = (address, callback) => {
    const geoURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiamFuYWd1ZXZlcmEwNyIsImEiOiJja2JjbTBpeW4wM2FnMnNvYXhwajBia3gyIn0.zwjInJ9UYMi37Kfl53cIbA&limit=1`;
    request({ url: geoURL, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to location service', undefined);
        } else if (response.body.features.length === 0) {
            callback('No location found', undefined);
        } else {
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            });
        }
    });
}

module.exports = geocode;
