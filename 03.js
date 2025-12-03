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

    let joltage2 = bank.split('')
    while (joltage2.length > 12) {
        let removed = false
        for (let i = 0; i < joltage2.length; i += 1) {
            let curr = parseInt(joltage2[i])
            let next = parseInt(joltage2[i + 1])
            if (curr < next) {
                joltage2.splice(i, 1)
               // console.log(joltage2.join(''))
                removed = true
                break
            }
        }

        if (!removed) {
            joltage2 = joltage2.slice(0, 12)
            break
        }
    }
    const joltageFinal = parseInt(joltage2.join(''))
    // console.log('Bank', bank, joltageFinal, joltage2.length)
    totalJoltage2 += parseInt(joltageFinal)
})

console.log('Del 1:', totalJoltage)
console.log('Del 2:', totalJoltage2)
