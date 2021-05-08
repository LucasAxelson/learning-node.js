// https://nodejs.org/dist/latest-v16.x/docs/api/
// Functions based within node, not requiring any external modules.
// Affects Client's computer. Useful is applications and computer programs.
// https://nodejs.org/api/fs.html

const fs = require(`fs`)
// fs.copyFileSync(`getit.txt`, `getit2.txt`)

const superheroes = require("superheroes")
const supervillains = require("supervillains")
const mySuperheroes = superheroes.random()
const mySupervillains = supervillains.random()

const randomChance = () => {
    return Math.floor(Math.random() * 3) + 1 
}

const battle = (hero, villain) => {
    console.log(`${hero} vs ${villain}`)

    if(randomChance() >= 2) {
        console.log(`The ${hero} won! Hurrah!`)
    } else {
        console.log(`The ${villain} won! Oh no!`)
    }
}

battle(mySuperheroes, mySupervillains)

