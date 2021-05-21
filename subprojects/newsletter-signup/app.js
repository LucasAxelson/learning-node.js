const request = require(`request`)
const express = require(`express`)
const bodyParser = require(`body-parser`)
const app = express()

app.listen(4040, () => {
    console.log(`Online`)
})

app.get("/", (req,res) => {
    res.sendFile(__dirname + `/signup.html`)
})

