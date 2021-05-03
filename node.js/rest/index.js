const express = require('express')
const app = express()

app.get('http://localhost:3000/tacos', (req,res) => {
    res.send("GET / Tacos response")
})

app.post('http://localhost:3000/tacos', (req,res) => {
    res.send("POST  Tacos response")
})

app.listen(3000, () => {
    console.log('Port 3000')
})