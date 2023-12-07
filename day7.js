const fs = require("fs");
const day7 = ()=> {
    const data = fs.readFileSync("day7.txt", "utf8").trim().split("\n").map(x => x.split(" "));

    const part1 = data.map(hand => get_hash(hand, false)).sort((handA, handB) => sort_hands(handA, handB)).map((hand, index) => hand[1]*(index+1)).reduce((a,b) => a+b);

    const part2 = data.map(hand => get_hash(hand, true)).sort((handA, handB) => sort_hands(handA, handB)).map((hand, index) => hand[1]*(index+1)).reduce((a,b) => a+b);
    
    return {"part 1": part1, "part 2": part2};
}

const card_values = {
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    T: 10,
    J: 11,
    Q: 12,
    K: 13,
    A: 14
}

const card_values_J = {
    J: 0,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    T: 10,
    Q: 11,
    K: 12,
    A: 13
}

const get_hash = (hand, jokers) => {
    const bid = hand[1];
    const cards = hand[0].split("").map(x => jokers?card_values_J[x]:card_values[x]);
    const count = {};
    for(let i = 0; i < 5; i++) {
        count[cards[i]] = count[cards[i]]+1 || 1;
    }

    let j;

    if(jokers) {
        j = count[0];
        delete count[0];
    }

    const hash = Object.values(count).sort((a,b)=>b-a);

    if(hash.length == 0) {
        hash.push(0);
    } 

    hash[0] += jokers?(j || 0):0;

    return [hash.concat(cards), bid];
}

const sort_hands = (handA, handB) => {
    for(let i = 0; i < handA[0].length; i++) {
        if(handA[0][i] !== handB[0][i]) {
            return handA[0][i]-handB[0][i];
        }
    }
    return 0;
}

module.exports = day7;
