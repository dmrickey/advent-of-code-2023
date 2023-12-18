import { getFileContents } from '../tools/import-file.mjs';

export default () => {
    const contents = getFileContents('./day-09/.input');
    // const contents = getFileContents('./day-09/test.input');

    const part1 = () => {
        const findNext = (arr) => {
            if (arr.every(x => x === 0)) {
                return 0;
            }

            const subtracted = [];
            for (let i = 1; i < arr.length; i++) {
                subtracted.push(arr[i] - arr[i - 1]);
            }
            return arr.at(-1) + findNext(subtracted);
        }

        const answer = contents
            .map(x => x.split(' ').map(y => +y))
            .map(findNext)
            .sum();
        console.log('day 9 part 1:', answer);
    }
    // part1();
    // test output - 114
    // answer - 1904165718

    const part2 = () => {
        const findPrevious = (arr) => {
            if (arr.every(x => x === 0)) {
                return 0;
            }

            const subtracted = [];
            for (let i = 1; i < arr.length; i++) {
                subtracted.push(arr[i] - arr[i - 1]);
            }
            return arr[0] - findPrevious(subtracted);
        }

        const answer = contents
            .map(x => x.split(' ').map(y => +y))
            .map(findPrevious)
            .sum();
        console.log('day 9 part 2:', answer);
    }
    part2();
    // test output - 2
    // answer - 964
};
