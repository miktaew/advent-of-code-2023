const fs = require("fs");
const day5 = ()=> {
    const data = fs.readFileSync("day5.txt", "utf8").trim().split("\n\n").map(x => x.split("\n"));

    const ranges = [];
    const seeds = data[0][0].replace("seeds: ", "").split(" ").map(x => Number.parseInt(x));
    for(let i = 1; i < data.length; i++) {
        ranges.push(data[i].slice(1,data[i].length).map(x=>x.split(" ").map(y => Number.parseInt(y))));
    }

    const part1 = find_smallest_locations(seeds, ranges).sort((a,b)=>a-b)[0];
    return {"part 1": part1, "part 2": ""};
}

const find_smallest_locations = (seeds, ranges) => {
    const locations = [];
    for(let i = 0; i < seeds.length; i++) {
        let next = seeds[i];
        for(let j = 0; j < ranges.length; j++) {
            for(let k = 0; k < ranges[j].length; k++) {
                if(next >= ranges[j][k][1] && next < ranges[j][k][1]+ranges[j][k][2]) {
                    next = ranges[j][k][0]+(next-ranges[j][k][1]);
                    break;
                }
            }
        }
        locations.push(next);
    }
    return locations;
}
module.exports = day5;
