const fs = require('fs')
const args = process.argv.slice(2)

const data = (fs.readFileSync(args[0], 'utf8'))
const lines = data.split('\n')
const ranges = lines[0].split(',').map(r => {
    const match = r.split('-')
    return { min: match[0], max: match[1] }
})

let part1 = 0
let part2 = 0
let invalids = []
ranges.forEach(range => {
    const min = parseInt(range.min)
    const max = parseInt(range.max)
    for (let i = min; i <= max; i++) {
        const num = i.toString()
        const seq1 = num.substring(0, num.length / 2)
        const seq2 = num.slice(-num.length / 2)

        // Del 1
        // Bara jämna annars blir det jättedåligt
        if(seq1 === seq2 && num.length % 2 === 0) {
            part1 += i
        }

        // Del 2
        const maxSeqLength = Math.ceil(num.length / 2)
        for(let seqLength = 1; seqLength <= maxSeqLength; seqLength++) {
            const seq = num.substring(0, seqLength)
            let regex = new RegExp("^(?:" + seq + ")+$", "g");
            const found = regex.test(num);
            if(found && num.length > 1 && !invalids[num]) invalids[num] = true
        }
    }
})

console.log(`Part 1: ${part1}`)

part2 = Object.keys(invalids).reduce((sum, key) => sum + parseInt(key), 0)
console.log(`Part 2: ${part2}`)