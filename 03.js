const fs = require('fs')
const args = process.argv.slice(2)

const data = (fs.readFileSync(args[0], 'utf8'))
const lines = data.split('\n')
