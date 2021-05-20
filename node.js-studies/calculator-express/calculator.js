const bodyParser = require("body-parser")
const express = require("express")
const app = express()

function BMIcalc(mass, height) {
    let BMI = mass / height ** 2
    return BMI.toFixed(2)
}

app.use(bodyParser.urlencoded({extended: true}))

app.get("/", (req,res) => {
    res.sendFile(__dirname + "/index.html")
})

app.get("/bmi", (req,res) => {
    res.sendFile(__dirname + "/bmiCalculator.html")
})

app.post("/bmicalculator", (req,res) => {
    const weight = req.body.weight
    const height = req.body.height

    const BMI = BMIcalc(weight, height)
    res.send("Your BMI is: " + BMI)
})

app.post("/", (req,res) => {
    let num1 = Number(req.body.num1)
    let num2 = Number(req.body.num2)
    let result = num1 + num2
    res.send(`The result to your calculation is: ` + result)
})

app.listen(3000, () => {
    console.log("Server is running on Port 3000")
})