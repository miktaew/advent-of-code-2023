const fs = require("fs");
const day2 = ()=> {
    const data = fs.readFileSync("day2.txt", "utf8").trim().split("\n").map(x=>x.split(":")).map(x => x[1].split(/[;,]/).map(z => z.trim().split(" ")));

    const cubes = {red: 12, green: 13, blue: 14}
    let part1 = 0;
    const powers = [];
    
    for(let i = 0; i < data.length; i++) {
        let lowest = {red: 0, blue: 0, green: 0};
        let impossible = false;
        for(let j = 0; j < data[i].length; j++) {
            if(Number.parseInt(data[i][j][0]) > cubes[data[i][j][1]]) {
                impossible = true;
            }

            lowest[data[i][j][1]] = Math.max(lowest[data[i][j][1]], Number.parseInt(data[i][j][0]));
        }
        if(!impossible) {
            part1 += i+1;
        }
        powers.push(lowest.red*lowest.blue*lowest.green);
    }

    return {"part 1": part1, "part 2": powers.reduce((a,b)=>a+b)};
}

module.exports = day2;
