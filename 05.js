import { readFileSync } from 'fs'
const args = process.argv.slice(2)

const data = (readFileSync(args[0], 'utf8'))
const lines = data.split('\n')

let part1 = 0
let ranges = []
let ingredients = []
lines.forEach(line => {
    const rangematch = line.match(/(\d+)-(\d+)/)
    const ingredmatch = line.match(/(\d+)/)
    if (rangematch) ranges.push({ min: parseInt(rangematch[1]), max: parseInt(rangematch[2]) })
    else if (ingredmatch) ingredients.push(parseInt(ingredmatch[1]))
})
ranges.sort((a, b) => a.min - b.min)
ingredients.forEach(ingredient => {
    for (let i = 0; i < ranges.length; i++) {
        const range = ranges[i]
        if (ingredient >= range.min && ingredient <= range.max) {
            part1++
            break
        }
    }
})

console.log(`Part 1: `, part1)
