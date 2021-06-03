const express = require('express')
const app = express()
const path = require('path');

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'))

const comments = [
    {
        id: 1,
        username: `Lucas`,
        comment: `Wow. Cool, brah.`
    },
    {
        id: 2,
        username: `Jay`,
        comment: `Really? Nice, brah.`
    },
    {
        id: 3,
        username: `William`,
        comment: `Ugh. Not cool, brah.`
    },
]

// INDEX ROUTE
app.get(`/comments`, (req,res) => {
    res.render(`comments/index`, { comments })
})

app.get(`/comments/new`, (req,res) => {
    res.render(`comments/new`)
})

app.post(`/comments`, (req, res) => {
    const { username, comment } = req.body
    comments.push({ username, comment })
    res.redirect(`/comments`)
})

app.get(`/comments/:id`, (req,res) => {
    const {id} = req.params
    const comment = comments.find(c => c.id === parseInt(id))
    res.render(`comments/show`, {comment})
    console.log(comment)
})

app.get('/', (req,res) => {
    res.send("GET / Tacos response")
})

app.post('/tacos', (req,res) => {
    const { type, amount } = req.body
    console.log(type, amount)
    console.log(req.body)
    res.send(`You sent ${amount} ${type}`)
})

app.listen(3000, () => {
    console.log('Port 3000')
})