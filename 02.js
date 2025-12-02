const fs = require('fs')
const args = process.argv.slice(2)

const data = (fs.readFileSync(args[0], 'utf8'))
const lines = data.split('\n')

const ranges = lines[0].split(',').map(r => {
    const match = r.match(/(\d+)-(\d+)/)
    if (match) {
        const min = match[1]
        const max = match[2]
        return { min, max }
    }
    return { min: '', max: '' }
})

ranges.forEach(range => {
    const min = parseInt(range.min)
    const max = parseInt(range.max)
    const rangeLength = max - min
    for (let i = 0; i <= rangeLength; i++) {
        const num = i.toString()
        const seq1 = num.substring(0, num.length / 2)
        const seq2 = num.slice(-num.length / 2)
        if(seq1 === seq2) {
            console.log(`Found matching sequence: ${num} in range ${range.min}-${range.max}`)
        }
    }
})
