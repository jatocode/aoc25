const fs = require('fs')
const args = process.argv.slice(2)

const data = (fs.readFileSync(args[0], 'utf8'))
const banks = data.split('\n')

let totalJoltage = 0
banks.forEach(bank => {
    const jolts = bank.split('')
    let max = 0
    for(let i = 0; i < jolts.length; i++) {
        for(let j = i + 1; j < jolts.length; j++) {
            const joltage = parseInt(jolts[i] + jolts[j])
            if(joltage > max) max = joltage
        }
    }
    totalJoltage += max
})

console.log('Del 1:', totalJoltage)