const fs = require("fs");
const day2 = ()=> {
    const data = fs.readFileSync("day2.txt", "utf8").trim().split("\n").map(x=>x.split(":")).map(x => x[1].split(/[;,]/).map(z => z.trim().split(" ")));

    const cubes = {red: 12, green: 13, blue: 14}

    let part1 = 0;
    let impossible;
    for(let i = 0; i < data.length; i++) {
        impossible = false;
        for(let j = 0; j < data[i].length; j++) {
            if(Number.parseInt(data[i][j][0]) > cubes[data[i][j][1]]) {
                impossible = true;
                break;
            }
        }
        if(!impossible) {
            part1 += i+1;
        }
    }

    const powers = [];
    let lowest = {};
    for(let i = 0; i < data.length; i++) {
        lowest = {red: 0, blue: 0, green: 0}
        for(let j = 0; j < data[i].length; j++) {
            const num = Number.parseInt(data[i][j][0]);
            lowest[data[i][j][1]] = Math.max(lowest[data[i][j][1]], num);
        }
        powers.push(lowest.red*lowest.blue*lowest.green);
    }

    return {"part 1": part1, "part 2": powers.reduce((a,b)=>a+b)};
}

module.exports = day2;
