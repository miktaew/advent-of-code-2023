const fs = require("fs");
const day1 = ()=> {
    const data = fs.readFileSync("day1.txt", "utf8").trim().split("\n");

    const part2 = data.map(x => x.replaceAll("one", "o1e").replaceAll("two", "t2o").replaceAll("three", "t3e")
                                 .replaceAll("four", "f4r").replaceAll("five", "f5e").replaceAll("six", "s6x")
                                 .replaceAll("seven", "s7n").replaceAll("eight", "e8t").replaceAll("nine","n9e"));
                                 
    return {"part 1": to_num(data), "part 2": to_num(part2)};
}

const to_num = (arr) => {
    return arr.map(x => x.replace(/[A-Za-z]/g, "")).map(x => Number.parseInt(x[0]+x[x.length-1])).reduce((a,b)=>a+b)
}

module.exports = day1;
