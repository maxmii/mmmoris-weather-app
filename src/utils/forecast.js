const request = require('postman-request')


const forecast = (location, callback) => {
    const encodeURL = encodeURIComponent(location)
    const url = 'http://api.weatherstack.com/current?access_key=fc81667595cb035fb2e3030d89b26512&query=' + encodeURL

    request({url, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service', undefined)
        } else if(body.error) {
            callback('Unable to find location', undefined)
        } else {
            const temp = body.current.temperature 
            const feelsLikeTemp = body.current.feelslike
            callback(undefined, `It is currently ${temp} degrees out. It feels like ${feelsLikeTemp} degrees out`, undefined)            
        }
    })
}

module.exports = forecast