const express = require(`express`)
const path = require(`path`)
const bodyParser = require(`body-parser`)
const app = express()

app.set(`view engine`, `ejs`)
app.set(`views`, path.join(__dirname + `/views`))
app.use(express.static(__dirname + "/public"))

app.get(`/`, (req,res) => {
    const _date = new Date()
    let kindOfDay = ""

    const options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    }

    const list = [
        {
            title: `fix car`,
            description: `change suspension and brakes.`
        },
    ]

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
    })
})

app.listen(3000, () => {
    console.log(`Port 3000`)
})