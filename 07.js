import { readFileSync } from 'fs'
const args = process.argv.slice(2)

const data = (readFileSync(args[0], 'utf8'))
const lines = data.split('\n')

let field = []
lines.forEach(line => field.push(line.split('')))

const x = lines[0].indexOf('S')
const calc = calcbeam(x, 1)
console.log(`Part 1: `, calc)

const beams = []
beams[x] = 1
const times = calctimes()
let part2 = times
console.log(`Part 2: `, part2)

function calcbeam(x,y) {
    let splits = 0

    while (y < field.length) {
        if (field[y][x] === '.') {
            field[y][x] = '|'
        } else if (field[y][x] === '^') {
            splits++
            splits += calcbeam(x - 1, y + 1)
            splits += calcbeam(x + 1, y + 1)
            break
        }  else if (field[y][x] === '|') {   
            break
        }
        y++
    }
    return splits
}

function calctimes() {
    for (let y = 0; y < field.length; y++) {
        for (let x = 0; x < field[y].length; x++) {
            if (beams[x] === undefined || beams[x] === 0) continue

            if (field[y][x] === '^') {
             //   console.log(`Beam at (${x},${y}) splits ${beams[x]} times`)
                if (beams[x - 1] === undefined) beams[x - 1] = 0
                if (beams[x + 1] === undefined) beams[x + 1] = 0
                beams[x - 1] += beams[x]
                beams[x + 1] += beams[x]
                beams[x] = 0 // döda strålen här
            }
        }
    }
    return beams.reduce((a,b) => a + b, 0)
}

function printfield(field) {
    field.forEach(line => {
        console.log(line.join(''))
    })
}
