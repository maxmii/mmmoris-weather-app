const request = require('postman-request')
//Geocoding
//Address -> Lat/Long -> Weather

const geocode = (address, callback) => {
    const encodeURL = encodeURIComponent(address)
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURL}.json?access_token=pk.eyJ1IjoibWF4YW1paSIsImEiOiJja3g1MzBiZTEwYmZpMm9uem9qYzVoajZlIn0.0jY0T2LpLNcBD9MdR_fdWA`

    request({url, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (body.features.length  === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode