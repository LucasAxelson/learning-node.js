const methodOverride = require(`method-override`)
const path = require('path');
const express = require(`express`)
const app = express()
const {v4: uuidv4} = require(`uuid`);
const e = require('express');
uuidv4()

app.use(methodOverride(`_method`))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'))

let _date = new Date() 

const Utils = {
    removeUsernameSpacing (username) {
        return username.replace(` `, ``)
    },
    calculateAge (birthday) {
        let month = parseInt(birthday.slice(3, 5))
        let monthTest = month - _date.getMonth()
        if(monthTest < 0) {
            return _date.getFullYear() - parseInt(birthday.slice(-4))
        } else if (monthTest >= 0) {
            return _date.getFullYear() - parseInt(birthday.slice(-4)) - 1
        }
    },
    correctProfessionCasing (profession) {
        const lowerCasing = profession.toLowerCase().slice(1)
        const upperCasing = profession.charAt(0).toUpperCase()
        return upperCasing + lowerCasing
    },    
    birthdayLength (day, month, year) {
        day = day.replace(`-`,``)
        month = month.replace(`-`,``)

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
}

const Verification = {
    negativeNumbers(birthday) {
        birthday = birthday.replace(`-`, ``)
        birthday = birthday.replace(`-`, ``)
        birthday = birthday.replace(`-`, ``)

        return birthday
    },
    realisticDates (day, month) {
        if (day < 1 || day > 31) {
            return undefined
        }

        if (month < 1 || month > 12) {
            return undefined
        }

        return true
    },
    birthYearVerify(year) {    
        if (year <= (_date.getFullYear() - 150) || year > _date.getFullYear()) {
            return false
        } else { return true }
    }    
}

 
let users = [
    {
        id: uuidv4(),
        username: `LucasAxelson`,
        birthday: `31/08/2000`,
        age:  function() {
            return Utils.calculateAge(this.birthday)
        },
        profession: `Programmer`
    },
    {
        id: uuidv4(),
        username: `MikeyWilliams`,
        birthday: `25/03/1978`,
        age:  function() {
            return Utils.calculateAge(this.birthday)
        },
        profession: `Carer`
    },
    {
        id: uuidv4(),
        username: `AlexTyler`,
        birthday: `28/02/1998`,
        age:  function() {
            return Utils.calculateAge(this.birthday)
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

    let user = {
        username: Utils.removeUsernameSpacing(username), 
        birthday: Utils.birthdayLength(day, month, year),
        profession: Utils.correctProfessionCasing(profession), 
        id: uuidv4(), 
        age: function() {
            return Utils.calculateAge(this.birthday)
        }
    }
    // If birthday date is negative, transform values into positives.
    user.birthday = Verification.negativeNumbers(user.birthday)
    // If day or month is invalid, return undefined
    let birthdayCheck = Verification.realisticDates(day, month)
    // Verify birth year is less than current year and less than 150 years ago.
    let birthyearCheck = Verification.birthYearVerify(year)

    if (birthdayCheck === undefined || !birthyearCheck) {
        res.render(`users/new`)
    } else {
        users.push(user)
        res.redirect(`/`)
    }

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

    // If day or month is invalid, return undefined
    let birthdayCheck = Verification.realisticDates(day, month)
    // Verify birth year is less than current year and less than 150 years ago.
    let birthyearCheck = Verification.birthYearVerify(year)
    if (birthdayCheck === undefined || !birthyearCheck) {
        res.redirect(`/users/${id}/edit`)
    }
    
    let birthday = Utils.birthdayLength(day, month, year)
    birthday = Verification.negativeNumbers(birthday)
    user.birthday = birthday

    user.username = Utils.removeUsernameSpacing(username)
    user.profession = Utils.correctProfessionCasing(profession)

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
