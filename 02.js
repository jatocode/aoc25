const fs = require('fs')
const args = process.argv.slice(2)

const data = (fs.readFileSync(args[0], 'utf8'))
const lines = data.split('\n')
const ranges = lines[0].split(',').map(r => {
    const match = r.split('-')
    return { min: match[0], max: match[1] }
})

let part1 = 0
ranges.forEach(range => {
    const min = parseInt(range.min)
    const max = parseInt(range.max)
    for (let i = min; i <= max; i++) {
        const num = i.toString()
        const seq1 = num.substring(0, num.length / 2)
        const seq2 = num.slice(-num.length / 2)
        // console.log(`Comparing ${num} ${seq1} to ${seq2}`)

        // Bara jämna annars blir det jättedåligt
        if(seq1 === seq2 && num.length % 2 === 0) {
          //  console.log(`Found matching sequence: ${num} in range ${range.min}-${range.max}`)
            part1 += i
        }
    }
})

console.log(`Part 1: ${part1}`)
