import { getFileContents } from '../tools/import-file.mjs';

let contents = getFileContents('./day-01/1.input');
// contents = [
//     'two1nine',
//     'eightwothree',
//     'abcone2threexyz',
//     'xtwone3four',
//     '4nineeightseven2',
//     'zoneight234',
//     '7pqrstsixteen',
// ];

const part1 = () => {
    const numbers = contents.map(x => x.replace(/\D+/g, ''));
    // console.log(numbers);

    const parsed = numbers.map(x => +`${x[0]}${x[x.length - 1]}`);
    // console.log(parsed);
    const answer = parsed.reduce((x, y) => x + y, 0);
    console.log('day 1.1:', answer);
    // 52974
};
// part1();

const filterOutLetters = x => x.replace(/\D+/g, '');
const toFirstAndLastNumber = x => +`${x[0]}${x[x.length - 1]}`;
const part1Refactored = () => {
    const answer = contents
        .map(filterOutLetters)
        .map(toFirstAndLastNumber)
        .reduce((x, y) => x + y, 0);
    console.log('day 1.1:', answer);
};
// part1Refactored();

const part2 = () => {
    const keys = {
        'one': 1,
        'two': 2,
        'three': 3,
        'four': 4,
        'five': 5,
        'six': 6,
        'seven': 7,
        'eight': 8,
        'nine': 9,
    };

    /**
     * @param {string} x 
     * @returns {string}
     */
    const replaceStringToNumber = x => {
        const chars = x.split('');
        let output = '';
        chars.forEach((c, i) => {
            if (/\d/.test(c)) {
                output += c;
            }
            else {
                Object.keys(keys).forEach((key) => {
                    const sub = x.substring(i, i + key.length);
                    if (key === sub) {
                        output += keys[key];
                    }
                })
            }
        });
        return output;
    };

    const answer = contents
        .map(replaceStringToNumber)
        // .log()
        .map(toFirstAndLastNumber)
        // .log()
        .reduce((x, y) => x + y, 0);
    console.log('day 1.2:', answer);
};
part2();
