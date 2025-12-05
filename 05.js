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

const mergedRanges = mergeRanges(ranges)
console.log('Merged Ranges left:', mergedRanges.length)
let part2 = 0
mergedRanges.forEach(range => {
    part2 += (range.max - range.min + 1)
})

function mergeRanges(ranges) {
    if (ranges.length === 0) return []

    let merged = []
    let currmin = ranges[0].min
    let currmax = ranges[0].max

    for (let i = 1; i < ranges.length; i++) {
        if(ranges[i].min <= currmax) {
            currmax = Math.max(currmax, ranges[i].max)
        } else {
            merged.push({ min: currmin, max: currmax })
            currmin = ranges[i].min
            currmax = ranges[i].max
        }
    }
    merged.push({ min: currmin, max: currmax })
    return merged
}

console.log(`Part 1: `, part1)
console.log(`Part 2: `, part2)

