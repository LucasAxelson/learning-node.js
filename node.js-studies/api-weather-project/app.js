const express = require(`express`)
const app = express()
const https = require("https")

app.get("/", (req,res) => {
    const url = "https://api.openweathermap.org/data/2.5/weather?q=bournemouth&appid=cc79675c37df8e7c527e593d5c160495&units=metric"
    https.get(url, function (response) {
        response.on("data", function(data) {
            const weatherData = JSON.parse(data)
            // Necessary data
            const name = weatherData.name
            const temperature = weatherData.main.temp + " " + "Celsius"
            const feels_like = weatherData.main.feels_like + " " + "Celsius"
            // Collecting and foratting the weather description
            const description = weatherData.weather[0].description.replace("-", " ")
            // Icons
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