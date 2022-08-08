const request = require('request')

const weather = (lat, lon, callback) => {
    const weather_url = 'http://api.weatherstack.com/current?access_key=e86f772cc542fea84dfbb4c4d979bfdb&query=' + lon + ',' + lat

    const weather_options = {
        url: weather_url,
        json: true,
    }

    request( weather_options, (error, response) => {
        if(error){
            callback('Unable to connect', undefined)
        } else if(response.body.error){
            callback('Unable to find location', undefined)
        } else {
            data = {
                description: response.body.current.weather_descriptions[0],
                temperature: response.body.current.temperature,
                precip: response.body.current.precip
            }
            callback(undefined, data)
        }
    })
}

module.exports = weather