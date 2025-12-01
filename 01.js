const fs = require('fs')
const args = process.argv.slice(2)

const data = fs.readFileSync(args[0], 'utf8')
const lines = data.split('\n')

let dial = 50
let zeroed = 0
let part1 = 0
lines.forEach(line => {
    const match = line.match(/(L|R)(\d+)/)
    if (match) {
        const dir = match[1]
        const dist = parseInt(match[2])
        if (dir === 'L') {
            for (let i = dist; i > 0; i--) {
                (dial - 1) < 0 ? dial = 99 : dial -= 1
                if (dial === 0) zeroed += 1
            }
        }
        else {
            for (let i = dist; i > 0; i--) {
                (dial + 1) > 99 ? dial = 0 : dial += 1
                if (dial === 0) zeroed += 1
            }
        }
        if (dial == 0) part1++
//      console.log(`After ${line.trim()}, dial is at: ${dial}, zeroed: ${zeroed}`)
    }
})

console.log(`Part 1: ${part1}`)
console.log(`Part 2: ${zeroed}`) // totally made up multiplier