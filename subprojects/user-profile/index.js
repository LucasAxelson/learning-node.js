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


let users = [
    {
        id: uuidv4(),
        username: `LucasAxelson`,
        birthday: `31/08/2000`,
        age: function () {
            let _date = new Date() 
            let month = parseInt(this.birthday.slice(3, 5))
            let monthTest = month - _date.getMonth()
            if(monthTest < 0) {
                return _date.getFullYear() - parseInt(this.birthday.slice(-4))
            } else if (monthTest >= 0) {
                return _date.getFullYear() - parseInt(this.birthday.slice(-4)) - 1
            }
        },
        profession: `Programmer`
    },
    {
        id: uuidv4(),
        username: `MikeyWilliams`,
        birthday: `25/03/1978`,
        age: function () {
            let _date = new Date() 
            let month = parseInt(this.birthday.slice(3, 5))
            let monthTest = month - _date.getMonth()
            if(monthTest < 0) {
                return _date.getFullYear() - parseInt(this.birthday.slice(-4))
            } else if (monthTest >= 0) {
                return _date.getFullYear() - parseInt(this.birthday.slice(-4)) - 1
            }
        },
        profession: `Carer`
    },
    {
        id: uuidv4(),
        username: `AlexTyler`,
        birthday: `28/02/1998`,
        age: function () {
            let _date = new Date() 
            let month = parseInt(this.birthday.slice(3, 5))
            let monthTest = month - _date.getMonth()
            if(monthTest < 0) {
                return _date.getFullYear() - parseInt(this.birthday.slice(-4))
            } else if (monthTest >= 0) {
                return _date.getFullYear() - parseInt(this.birthday.slice(-4)) - 1
            }
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
        birthday: `${day}/${month}/${year}`, 
        profession, 
        id: uuidv4(), 
        age: function () {
            let _date = new Date() 
            let month = parseInt(this.birthday.slice(3, 5))
            let monthTest = month - _date.getMonth()
            if(monthTest < 0) {
                return _date.getFullYear() - parseInt(this.birthday.slice(-4))
            } else if (monthTest >= 0) {
                return _date.getFullYear() - parseInt(this.birthday.slice(-4)) - 1
            }
        },
    })

    res.redirect(`/`)
})

app.get(`/users/:id`, (req,res) => {
    const { id } = req.params
    const user  = users.find(u => u.id === id)
    res.render(`users/show`, {user})
})

app.listen(5050, () => {
    console.log(`Port 5050`)
})
