const methodOverride = require(`method-override`)
const path = require('path');
const bodyParser = require(`body-parser`)
const express = require(`express`)
const app = express()
const {v4: uuidv4} = require(`uuid`)
uuidv4()

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.json())

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'))

app.get(`/`, (req,res) => {
    res.render(`users/index`)
})

app.listen(5050, () => {
    console.log(`Port 5050`)
})
