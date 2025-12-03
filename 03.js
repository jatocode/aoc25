const fs = require('fs')
const args = process.argv.slice(2)

const data = (fs.readFileSync(args[0], 'utf8'))
const banks = data.split('\n')

let totalJoltage = 0
let totalJoltage2 = 0
banks.forEach(bank => {
    const jolts = bank.split('')
    let max = 0
    for (let i = 0; i < jolts.length; i++) {
        for (let j = i + 1; j < jolts.length; j++) {
            const joltage = parseInt(jolts[i] + jolts[j])
            if (joltage > max) max = joltage
        }
    }
    totalJoltage += max

    let max2 = 0
    for (let i = 0; i < jolts.length; i++) {
        let joltage = jolts[i]
        for (let j = i + 1; j < jolts.length; j++) {
            var next = jolts[j + 1]
            if(next && parseInt(next) > parseInt(joltage)) {
                joltage += next
            } else {
                joltage += jolts[j]
            }
            const joltage2 = parseInt(joltage)
            if (joltage2 > max2) max2 = joltage2
        }
    }
    totalJoltage2 += max2
    console.log(`Bank ${bank} max joltage: ${max2} total so far: ${totalJoltage2}`)
})

console.log('Del 1:', totalJoltage)
console.log('Del 2:', totalJoltage2)

987654321111111
987654321111
811111111111119
811111111119
244234234234278
434234234278
818181911112111
888911112111