const express = require("express")
const app = express()
// console.dir(app)

// app.use((req, res) => {
//     console.log(`New request.`)
//     // console.dir(req)
//     // console.dir(res)
//     res.send(`Request received.`)
//     // res.send({color: red})
// })

app.get('/', (req, res) => {
    res.send(`Home page`)
    console.log(`/ request`)
})

app.get('/r/:subreddit', (req, res) => {
    console.log(req.params)
    const { subreddit } = req.params
    res.send(`<h1>This is the ${subreddit} subreddit.</h1>`)
})

app.post(`/cats`, (res, req) => {
    res.send(`Post request to /cats`)
})

app.get('/cats', (req, res) => {
    res.send(`Meow`)
    console.log(`Cat request!`)
})

app.get('/dogs', (req, res) => {
    res.send(`Woof`)
    console.log(`Dog request!`)
})

app.get('/search', (req, res) => {
    console.log(req.query)
    const { q } = req.query
if (!q) {
    res.send(`Nothing was found.`)
}
res.send(`Search results for: ${q}`)
    })

app.get('*', (req, res) => {
    res.send(`Cannot find that path`)
})

app.listen(8080, () =>  {
    console.log(`Listening. Port 8080.`) 
})
