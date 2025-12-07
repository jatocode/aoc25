import { readFileSync } from 'fs'
const args = process.argv.slice(2)

const data = (readFileSync(args[0], 'utf8'))
const lines = data.split('\n')

let field = []
lines.forEach(line => {
    field.push(line.split(''))
})
const start = { x: lines[0].indexOf('S'), y: 1 }
const part1 = calcbeam(start.x, start.y)
//printfield()
console.log(`Part 1: `, part1)

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
        } else if (field[y][x] === '|') {   
            break
        }
        y++
    }
    return splits
}

function printfield() {
    field.forEach(line => {
        console.log(line.join(''))
    })
}
