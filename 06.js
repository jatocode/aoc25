import { readFileSync } from 'fs'
const args = process.argv.slice(2)

const data = (readFileSync(args[0], 'utf8'))
const lines = data.split('\n')

console.log(`Part 1: `, del1(lines))
console.log(`Part 2: `, del2(lines))

function del1(lines) {
    let lastline = lines[lines.length - 1]
    let ops = lastline.trim().split(/\s+/)
        .map(c => {
            if (c === '+') return add()
            if (c === '*') return multiply()
        })
    let columns = []
    for (let i = 0; i < lines.length - 1; i++) {
        const data = lines[i].trim().split(/\s+/).map(n => parseInt(n))
        for (let j = 0; j < data.length; j++) {
            if (!columns[j]) columns[j] = 0
            columns[j] = ops[j](columns[j], data[j])
        }
    }
    return columns.reduce((a, b) => a + b, 0)
}

function del2(lines) {
    let lastline = lines[lines.length - 1].split('')
    let currentop = ''
    let problem = 0
    let problems = []
    for (let i = 0; i < lastline.length; i++) {
        const curr = getColumn(lines, i)
        if (curr > 0) {
            if (lastline[i] === '+') currentop = add()
            else if (lastline[i] === '*') currentop = multiply()
            problem = currentop(problem, curr)
        } else {
            problems.push(problem)
            problem = 0
        }
    }
    problems.push(problem)
    return problems.reduce((a, b) => a + b, 0)
}

function getColumn(lines, index) {
    let column = []
    for (let i = 0; i < lines.length - 1; i++) {
        const row = lines[i].split('')
        const digit = parseInt(row[index])
        if (digit > 0) column.push(digit)
    }
    return parseInt(column.join(''))
}

function add() {
    return (a, b) => a + b
}

function multiply() {
    return (a, b) => {
        a = a === 0 ? 1 : a
        b = b === 0 ? 1 : b
        return a * b
    }
}


