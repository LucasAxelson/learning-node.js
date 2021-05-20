const express = require(`express`)
const app = express()
const https = require("https")

app.get("/", (req,res) => {
    const url = "https://api.openweathermap.org/data/2.5/weather?q=bournemouth&appid=cc79675c37df8e7c527e593d5c160495&units=metric"
    https.get(url, function (response) {
        console.log(response.statusCode)
        console.log(response.headers)

        response.on("data", function(data) {
            const weatherData = JSON.parse(data)
            const temperature = weatherData.main.temp + " " + "Celsius"
            const feels_like = weatherData.main.feels_like + " " + "Celsius"
            // Collecting and foratting the weather description
            const temp = weatherData.weather[0].description.replace("-", " ")
            const description = temp[0].toUpperCase() + temp.slice(1)

            console.log(description)
        })
    })
    res.send("Server is up")
})
 
app.listen(3000, () => {
    console.log(`Server running on Port 3000`)
})