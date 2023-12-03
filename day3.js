const fs = require("fs");

const data = fs.readFileSync("day3.txt", "utf8").trim().split("\n");

const nums = /[0-9]/;

const day3= ()=> {
    let part1 = 0;
    let part2 = 0;
    for(let i = 0; i < data.length; i++) {
        for(let j = 0; j < data[i].length; j++) {
            if(data[i][j] !== "." && !data[i][j].match(nums)) {
                temp = match_numbers(i,j).map(x => Number.parseInt(x));
                if(temp.length != 0) {
                    part1 += temp.reduce((a,b)=>a+b);
                }
            }

            if(data[i][j] === "*") {
                temp = match_numbers(i,j).map(x => Number.parseInt(x));
                if(temp.length == 2) {
                    part2 += temp.reduce((a,b)=>a*b);
                }
            }
        }
    }

    return {"part 1": part1, "part 2": part2};
}

const match_numbers = (x,y) => {
    const numbers = [];
    for(let i = x - 1; i <= x + 1; i++) {
        if(!data[i][y].match(nums)) {
            let num = ["",""];
            for(let t = -1; t>-4; t--) {
                if(data[i][y+t].match(nums)) {
                    num[0] = data[i][y+t] + num[0];
                } else {
                    break;
                }
            }
            for(let t = 1; t<4; t++) {
                if(data[i][y+t].match(nums)) {
                    num[1] = num[1] + data[i][y+t];
                } else {
                    break;
                }
            }
            numbers.push(num[0],num[1]);
        }
        else {
            let num = data[i][y];
            for(let t = -1; t>-3; t--) {
                if(data[i][y+t].match(nums)) {
                    num = data[i][y+t] + num;
                } else {
                    break;
                }
            }
            for(let t = 1; t<3; t++) {
                if(data[i][y+t].match(nums)) {
                    num = num + data[i][y+t];
                } else {
                    break;
                }
            }
            numbers.push(num);
        }
    }
    return numbers.filter(x => x!="");
}
module.exports = day3;
