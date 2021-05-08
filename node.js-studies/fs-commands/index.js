// https://nodejs.org/dist/latest-v16.x/docs/api/
// Functions based within node, not requiring any external modules.
// Affects Client's computer. Useful is applications and computer programs.
// https://nodejs.org/api/fs.html

const fs = require(`fs`)

fs.copyFileSync(`getit.txt`, `getit2.txt`)