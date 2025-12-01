const fs = require('fs')
const args = process.argv.slice(2)

const data = fs.readFileSync(args[0], 'utf8')
const lines = data.split('\n')
console.log(`Read ${lines.length} lines from ${args[0]}`)

let dial = 50
let zeroed = 0
lines.forEach(line => {
    const match = line.match(/(L|R)(\d+)/)
    if (match) {
        const dir = match[1]
        const dist = parseInt(match[2])
        if (dir === 'L') {
            for (let i = dist; i > 0; i--) {
                if ((dial - 1) < 0) {
                    dial = 99
                } else dial -= 1
                if (dial === 0) zeroed += 1
            }
        }
        else {
            for (let i = dist; i > 0; i--) {
                if ((dial + 1) > 99) {
                    dial = 0
                } else dial += 1
                if (dial === 0) zeroed += 1
            }
        }
        console.log(`After ${line.trim()}, dial is at: ${dial}, zeroed: ${zeroed}`)
    }
})

console.log(`Dial ended at: ${dial}`)
console.log(`Dial hit zero ${zeroed} times`)