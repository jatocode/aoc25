const fs = require('fs')
const args = process.argv.slice(2)

const data = (fs.readFileSync(args[0], 'utf8'))
const lines = data.split('\n')

let part1 = 0
let grid = []
lines.forEach(line => {
    grid.push(line.split(''))
})

for(let y = 0; y < grid.length; y++) {
    for(let x = 0; x < grid[y].length; x++) {
        if(grid[y][x] !== '@') continue
        const neighs = neighbours(x,y, grid).filter(n => n == '@')
        //console.log(x,y, neighs.length)
        if(neighs.length < 4) part1++
    }
}

console.log(`Part 1: `, part1)

function neighbours(x,y, grid) {
    const deltas = [
        [-1, -1], [0, -1], [1, -1],
        [-1, 0],           [1, 0],
        [-1, 1],  [0, 1],  [1, 1],
    ]
    let neighs = []
    deltas.forEach(delta => {
        const nx = x + delta[0]
        const ny = y + delta[1]
        //console.log('  ', nx, ny, grid[ny] ? grid[ny][nx] : null)
        if(grid[ny] && grid[ny][nx] !== undefined) {
            neighs.push(grid[ny][nx])
        }
    })
    return neighs
}