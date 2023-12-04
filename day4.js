const fs = require("fs");
const day4 = ()=> {
    const data = fs.readFileSync("day4.txt", "utf8").trim().split("\n").map(x => x.split(/[:|]/g).map(y => y.replace(" ","").split(" ").filter(x => x)));

    let part1 = 0;
    const cards = {};
    for(let i = 0; i < data.length; i++) {
        cards[i] = {count: 1, winners: data[i][1], numbers: data[i][2]}
        const win_num = get_win_num(data[i][1], data[i][2]);
        part1 += win_num?1*(2**(win_num-1)):0;
    }

    let part2 = 0;
    Object.keys(cards).forEach(key => {
        const matches = get_win_num(cards[key].winners, cards[key].numbers);
        for(let i = Number.parseInt(key)+1; i < matches+Number.parseInt(key)+1; i++) {
            cards[i].count += cards[key].count;
        }
        part2 += cards[key].count;
    });

    return {"part 1": part1, "part 2": part2};
}

const get_win_num = (winners, numbers) => {
    let num = 0;
    for(let j = 0; j < numbers.length; j++) {
        if(winners.includes(numbers[j])) {
            num++;
        }
    }
    return num;
}

module.exports = day4;
