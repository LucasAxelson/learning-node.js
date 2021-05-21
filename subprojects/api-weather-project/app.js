const express = require(`express`)
const app = express()
const https = require("https")
const bodyParser = require("body-parser")

app.use(bodyParser.urlencoded({extended: true}))

app.get("/", function (req,res) {
    res.sendFile(__dirname + `/index.html`)
})

app.post("/", function (req,res) {
    const query = req.body.cityName
    const apiKey = `cc79675c37df8e7c527e593d5c160495`
    let unit = req.body.unitType    
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit

    https.get(url, function (response) {
        response.on("data", function(data) {
            const weatherData = JSON.parse(data)
            
            if (unit == `imperial`) {
                unit = `Farenheit`
            } else if (unit = `metric`) {
                unit = `Celsius`
            } else {
                unit = `Kelvin`
            }

            // Necessary data
            const name = weatherData.name
            const temperature = weatherData.main.temp + " " + unit
            const feels_like = weatherData.main.feels_like + " " + unit
            // Collecting and foratting the weather description
            const description = weatherData.weather[0].description.replace("-", " ")
            // Icon
            const iconId = weatherData.weather[0].icon
            const icon = "http://openweathermap.org/img/wn/" + iconId + "@2x.png"
            
            // Send to server
            res.write(`<div style="display:flex;">
            <h1>The weather in ${name} is ${description}. </h1> <img src="${icon}">
            </div>`)
            res.write(`<h2> The temperature is ${temperature}, but it feels like ${feels_like}</h2>`)
            res.send()
        })
    })

})
 
app.listen(3000, () => {
    console.log(`Server running on Port 3000`)
})

// const query = `London`
// const apiKey = `cc79675c37df8e7c527e593d5c160495`
// const unit = `metric`    

