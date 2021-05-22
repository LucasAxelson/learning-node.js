const request = require(`request`)
const express = require(`express`)
const bodyParser = require(`body-parser`)
const { json } = require("body-parser")
const app = express()
const https = require(`https`)
const { post } = require("request")

app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended: true}))

app.get("/", (req,res) => {
    res.sendFile(__dirname + `/signup.html`)
})

app.post("/", (req,res) => {
    const fName = req.body.fNameInput
    const lName = req.body.lNameInput
    const email = req.body.emailInput

    const data = {
        members: [
            {
                email_address: email,
                status: `subscribed`,
                merge_fields: {
                    FNAME: fName,
                    LNAME: lName,
                }
            }
        ]
    }
    const jsonData = JSON.stringify(data)
    const url = `https://us6.api.mailchimp.com/3.0/lists/` + listId

    const options = {
        method: "POST",
        auth: "lucas:6f6e6b324552eb2e98170466dc318702-usX"
    }


    const request = https.request(url, options, (response) => {
        response.on("data", (data) => {
            if(response.statusCode === 200) {
                res.sendFile(__dirname + `/success.html`)
            } else {
                // res.send(response.statusCode)
                res.sendFile(__dirname + `/failure.html`)
            }
        })
    })
    request.write(jsonData)
    request.end()
})

app.post("/failure", (req,res) => {
    res.redirect("/")
})

app.listen(process.env.PORT || 4040, () => {
    console.log(`Online`)
})

const listId = `027e106090`