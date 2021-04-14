const express = require("express")
const app = express()
// console.dir(app)

app.use((req, res) => {
    console.log(`New request.`)
    // console.dir(req)
    // console.dir(res)
    res.send(`Request received.`)
})

app.listen(8080, () => console.log(`Listening. Port 8080.`))