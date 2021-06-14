const express = require(`express`)
const path = require(`path`)
const bodyParser = require(`body-parser`)
const app = express()
const methodOverride = require(`method-override`)
const { v4: uuid } = require(`uuid`)
uuid()

app.set(`view engine`, `ejs`)
app.set(`views`, path.join(__dirname + `/views`))
app.use(express.static(__dirname + "/public"))
app.use(bodyParser.urlencoded({extended: true}))

const listItems = [
    {
        id: uuid(),
        title: `Buy a car`,
        description: `BMW, 4x4 drive`
    },
    {
        id: uuid(),
        title: `Fix the car`,
        description: `Change the suspension and the brakes.`
    }
]

app.get(`/`, (req,res) => {
    const _date = new Date()
    let kindOfDay = ""

    const options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    }

    const day = _date.toLocaleDateString("en-UK", options)

    if (_date.getDay() === 0 || _date.getDay() === 6) {
        kindOfDay = "weekend"
    } else {
        kindOfDay = "weekday"
    }

    res.render(`days/list`, 
    {
        kindOfDay,
        day,
        listItems
    })
})

app.post(`/`, (req,res) => {
    const { title, description } = req.body
    console.log(title, description)

    let item = {
        id: uuid(),
        title: title,
        description: description,
    }

    listItems.push(item)

    res.redirect(`/`)
})

app.listen(3000, () => {
    console.log(`Port 3000`)
})