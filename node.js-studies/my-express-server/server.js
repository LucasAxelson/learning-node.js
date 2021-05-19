const express = require(`express`)
const app = express()

app.get(`/`, function (req,res) {
    res.send(`<h1>Hello, World. Welcome.</h1>`)
})

app.listen(3000, () => {
    console.log(`Port 3000`)
})

app.get(`/about`, (req,res) => {
    res.send(`
    <h1>Welcome to the about page of Lucas Axelson </h1>
    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facere laboriosam quidem, exercitationem velit nisi molestiae sunt suscipit incidunt beatae, dolorum, ipsa itaque? Perferendis totam culpa incidunt temporibus quod provident necessitatibus.</p>
    `)
})

