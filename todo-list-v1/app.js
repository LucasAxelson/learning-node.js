const express = require(`express`)
const path = require(`path`)
const bodyParser = require(`body-parser`)

const app = express()


app.set(`view engine`, `ejs`)
app.set(`views`, path.join(__dirname + `/views`))

app.get(`/`, (req,res) => {
    const _date = new Date()
    const currentDay = _date.getDay()
    let day = ""
    let kindOfDay = ""

    switch (currentDay) {
        case 0:
            day = `Sunday`
            break
        case 1:
            day = `Monday`
            break
        case 2:
            day = `Tuesday`
            break
        case 3:
            day = `Wednesday`
            break
        case 4:
            day = `Thursday`
            break
        case 5:
            day = `Friday`
            break
        case 6:
            day = `Saturday`
            break
        default:
            console.log(`Error: Current day is equal to` + currentDay)
        }

    if(currentDay === 6 || currentDay === 0) {
        kindOfDay = "Weekend"
    } else {
        kindOfDay = "Weekday"
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