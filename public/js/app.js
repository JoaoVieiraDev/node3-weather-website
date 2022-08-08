// Client side JS

fetch('http://puzzle.mead.io/puzzle').then((response) => {
    response.json().then((data) => {
        //console.log(data)
    })
})

const fetch_weather = (location) => {
    fetch('http://localhost:3000/weather?address="' + location +'"').then((response) => {
        response.json().then((data) => {
            if(data.error){
                document.getElementById("#location_p").innerText = "Error: " + data.error
                document.getElementById("#forecast_p").innerText = ""
                return
            }

            document.getElementById("location_p").innerText = data.location
            document.getElementById("forecast_p").innerText = data.forecast
        })
    })
}


document.getElementById("search_form").addEventListener("submit", (event) => {
    event.preventDefault()
    
    const search = document.getElementById("search_param").value
    fetch_weather(search)
})

// fetch("https://api.mapbox.com/geocoding/v5/mapbox.places/!.json?access_token=pk.eyJ1Ijoiam9hb3ZpZWlyYWxpbmsiLCJhIjoiY2w2ZXZzbHl4MGUwaTNicDUyODlkcjB1cyJ9.pGgnNXpsHVYCMTDmx87jcw").then((response) => {
//     response.json().then((data, error) => {
//         if(error){
//             return console.log(error)
//         }

//         console.log(data)

//         const lat = data.features[0].center[0]
//         const lon = data.features[0].center[1]
//         const location =data.features[0].place_name

//         fetch('http://api.weatherstack.com/current?access_key=e86f772cc542fea84dfbb4c4d979bfdb&query=' + lon + ',' + lat).then((response) => {
//             response.json().then((data, error) => {
//                 if(error){
//                     return console.log(error)
//                 }

//                 const description = data.current.weather_descriptions[0]
//                 const temperature = data.current.temperature
//                 const precip = data.current.precip

//                 console.log(location + ": " + description + ". It is currently " + temperature + " degrees out. There is a " + precip + "% chance of rain.",)
//             })
//         })
//     })
// })