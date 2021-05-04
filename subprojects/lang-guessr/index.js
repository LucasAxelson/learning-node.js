const franc = require("franc")
const langs = require("langs")
const colors = require("colors")
const input = process.argv[2]
const langCode = franc(input)

if (langCode === `und`) {
    console.log(`Language undetermined. I require another sample`)
} else if (langCode == `sco`) {

} else {
    const language = langs.where("3", langCode)
    console.log(
        `This was your input: ${input},
Our best guess is: ${language.name}`
        )
}


// console.log(franc(`Hello. How are you? That is really nice.`))
// console.log(langs.names(true))

