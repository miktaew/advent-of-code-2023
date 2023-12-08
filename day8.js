const fs = require("fs");

const data = fs.readFileSync("day8.txt", "utf8").trim().split("\n");

const day8 = ()=> {
    const directions = data[0];
    const network = {};
    for(let i = 2; i < data.length; i++) {
        const node = data[i].replace(/[()]/g, "").split(" = ");
        network[node[0]] = {L: node[1].split(", ")[0], R: node[1].split(", ")[1]};
        
    }

    let part1 = 0;
    
    let next = "AAA";
    for(let i = 0; i <= directions.length; i++) {
        if(i == directions.length) {
            i=0;
        }
        part1++;
        next = network[next][directions[i]];
        if(next === "ZZZ") {
            break;
        }
    }
    
    const nexts = [];
    Object.keys(network).forEach(key => {
        if(key[2] === "A") {
            nexts.push(key);
        }
    });

    let steps = [];
    let distances = [];

    for(let j = 0; j < nexts.length; j++) {
        steps.push(0);
        for(let i = 0; i <= directions.length; i++) {
            if(i == directions.length) {
                i=0;
            }
            steps[j]++;
            nexts[j] = network[nexts[j]][directions[i]];
            if(nexts[j][2] === "Z") {
                distances.push(steps[j]/directions.length);
                break;
            }
        }
    }
    
    return {"part 1": part1, "part 2": LCM(distances)*directions.length};
}

const LCM = (nums) => {
    const factors = {};
    for(let i = 0; i < nums.length; i++) {
        x = 2;
        while(x <= nums[i]) {
            while(nums[i]%x == 0) {
                nums[i] = nums[i]/x;
                factors[x] =  (factors[x] + 1) || 1;
            }
            x++;
        }
    }

    let LCM = 1;
    Object.keys(factors).forEach(factor => {
        LCM = LCM * Number.parseInt(factor)**factors[factor]; 
    });
    return LCM;
}

module.exports = day8;
