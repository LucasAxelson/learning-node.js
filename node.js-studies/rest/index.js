const express = require('express')
const methodOverride = require(`method-override`)
const app = express()
const path = require('path');
const {v4: uuidv4} = require(`uuid`)
uuidv4()

app.use(methodOverride(`_method`))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'))

const comments = [
    {
        id: uuidv4(),
        username: `Lucas`,
        comment: `Wow. Cool, brah.`
    },
    {
        id: uuidv4(),
        username: `Jay`,
        comment: `Really? Nice, brah.`
    },
    {
        id: uuidv4(),
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
    comments.push({ username, comment, id: uuidv4() })
    res.redirect(`/comments`)
})

app.get(`/comments/:id`, (req,res) => {
    const {id} = req.params
    const comment = comments.find(c => c.id === id)
    res.render(`comments/show`, {comment})
})

app.get(`/comments/:id/edit`, (req,res) => {
    const {id} = req.params
    const comment = comments.find(c => c.id === id)
    res.render(`comments/edit`, {comment})
})

app.patch(`/comments/:id`, (req,res) => {
    const {id} = req.params
    const newCommentText = req.body.comment 
    const oldComment = comments.find(c => c.id === id)
    oldComment.comment = newCommentText
    res.redirect(`/comments`)
})

app.listen(3000, () => {
    console.log('Port 3000')
})