const fs = require("fs");
const day6 = ()=> {
    const data = fs.readFileSync("day6.txt", "utf8").trim().split("\n").map(x => x.split(" ").filter(x => x));

    const times = data[0].slice(1,5);
    const distances = data[1].slice(1,5);
    const part1 = get_ways(times.map(x => Number.parseInt(x)), distances.map(x => Number.parseInt(x)+1)).reduce((a,b)=>a*b);

    const part2 = get_ways([Number.parseInt(times.reduce((a,b)=>a+b))], [Number.parseInt(distances.reduce((a,b)=>a+b))+1]);

    return {"part 1": part1, "part 2": part2};
}

const get_ways = (times, distances) => {
    
    let ways = [];
    for(let i = 0; i < times.length; i++) {
        const maximum = Math.floor((times[i] + ((times[i]**2 - 4 * distances[i])**0.5))/2);
        const minimum = Math.ceil((times[i] - ((times[i]**2 - 4 * distances[i])**0.5))/2);
        ways.push(maximum - minimum + 1);
    }
    return ways;
}

module.exports = day6;
