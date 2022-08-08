const request = require('request')

const geocode = (location, callback) => {
    const geo_url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(location) + ".json?access_token=pk.eyJ1Ijoiam9hb3ZpZWlyYWxpbmsiLCJhIjoiY2w2ZXZzbHl4MGUwaTNicDUyODlkcjB1cyJ9.pGgnNXpsHVYCMTDmx87jcw"
    const geo_options = {
        url: geo_url,
        json: true,
    }

    request(geo_options, (error, response) => {
        if(error){
            callback('Unable to connect', undefined)
        } else if(response.body.features.length === 0){
            callback('Unable to find location ' + location, undefined)
        } else {
            const data = {
                lat: response.body.features[0].center[0],
                lon: response.body.features[0].center[1],
                location: response.body.features[0].place_name
            }
            callback(undefined, data)
        }
    })
}

module.exports = geocode