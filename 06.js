import { readFileSync } from 'fs'
const args = process.argv.slice(2)

const data = (readFileSync(args[0], 'utf8'))
const lines = data.split('\n')


let lastline = lines[lines.length - 1]
let ops = lastline.trim().split(/\s+/)
    .map(c => {
        if (c === '+') return (a, b) => a + b
        if (c === '*') return (a, b) => {
            a = a === 0 ? 1 : a
            b = b === 0 ? 1 : b
            return a * b
        }
})
let columns = []
for(let i = 0; i < lines.length-1; i++) {
    const data = lines[i].trim().split(/\s+/).map(n => parseInt(n))
    for(let j = 0; j < data.length; j++) {
        if(!columns[j]) columns[j] = 0
        columns[j] = ops[j](columns[j], data[j])
    }
}
let part1 = columns.reduce((a,b) => a + b, 0)

console.log(`Part 1: `, part1)
//console.log(`Part 2: `, part2)

