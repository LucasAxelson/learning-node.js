const methodOverride = require(`method-override`)
const path = require('path');
const bodyParser = require(`body-parser`)
const express = require(`express`)
const app = express()
const {v4: uuidv4} = require(`uuid`)
uuidv4()

app.use(methodOverride(`_method`))
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.json())

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'))

let _date = new Date() 

function calculateAge (birthday) {
    let month = parseInt(birthday.slice(3, 5))
    let monthTest = month - _date.getMonth()
    if(monthTest < 0) {
        return _date.getFullYear() - parseInt(birthday.slice(-4))
    } else if (monthTest >= 0) {
        return _date.getFullYear() - parseInt(birthday.slice(-4)) - 1
    }
}

function correctCasing (profession) {
    const lowerCasing = profession.toLowerCase().slice(1)
    const upperCasing = profession.charAt(0).toUpperCase()
    return upperCasing + lowerCasing
}



function birthdayVerify (day, month, year) {
    // if (day <= 0 || month <= 0 || year <= 0) {
    //     console.log(`Verify provided dates. Use positive numbers e.g. 12/02/2020`)
    // } 
    
    // if (day > 31 || month > 12) {
    //     console.log(`Please verify the provided day and month.`)
    // }
    
    // if (year <= (_date.getFullYear - 150) || year > _date.getFullYear) {
    //     console.log(`Please verify your year of birth.`)
    // }

    let birthday = `${day}/${month}/${year}`

    if(day.length == 1) {
        day = `0` + day
        birthday = `${day}/${month}/${year}`
    }
    
    if(month.length == 1) {
        month = `0` + month
        birthday = `${day}/${month}/${year}`
    } 
    
    return birthday
}
 
let users = [
    {
        id: uuidv4(),
        username: `LucasAxelson`,
        birthday: `31/08/2000`,
        age:  function() {
            return calculateAge(this.birthday)
        },
        profession: `Programmer`
    },
    {
        id: uuidv4(),
        username: `MikeyWilliams`,
        birthday: `25/03/1978`,
        age:  function() {
            return calculateAge(this.birthday)
        },
        profession: `Carer`
    },
    {
        id: uuidv4(),
        username: `AlexTyler`,
        birthday: `28/02/1998`,
        age:  function() {
            return calculateAge(this.birthday)
        },
        profession: `Admin`
    },

]

app.get(`/`, (req,res) => {
    res.render(`users/index`, {users})
})

app.get(`/users/new`, (req,res) => {
    res.render(`users/new`)
})

app.post(`/`, (req,res) => {
    const { username, day, month, year, profession } = req.body

    users.push({
        username, 
        birthday: birthdayVerify(day, month, year),
        profession: correctCasing(profession), 
        id: uuidv4(), 
        age: function() {
            return calculateAge(this.birthday)
        },
    })

    res.redirect(`/`)
})

app.get(`/users/:id`, (req,res) => {
    const { id } = req.params
    const user  = users.find(u => u.id === id)
    res.render(`users/show`, {user})
})

app.get(`/users/:id/edit`, (req,res) => {
    const { id } = req.params
    const user  = users.find(u => u.id === id)
    res.render(`users/edit`, {user})    
})

app.patch(`/users/:id`, (req,res) => {
    const { id } = req.params
    const user  = users.find(u => u.id === id)
    const {username, profession, day, month, year} = req.body

    user.birthday = birthdayVerify(day, month, year),
    user.username = username
    user.profession = correctCasing(profession)

    res.redirect(`/`)
})

app.delete(`/users/:id`, (req,res) => {
    const { id } = req.params
    users  = users.filter(u => u.id !== id)
    
    res.redirect(`/`)
})

app.listen(5050, () => {
    console.log(`Port 5050`)
})
