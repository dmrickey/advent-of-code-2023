import { getFileContents } from '../tools/import-file.mjs';

export default () => {
    const contents = getFileContents('./day-09/.input');
    // const contents = getFileContents('./day-09/test.input');

    const part1 = () => {
        console.log('day 9 part 1:', answer);
    }
    // part1();
    // test output - 6440
    // answer - 247823654

    const part2 = () => {
        console.log('day 9 part 2:', answer);
    }
    // part2();
    // test output - 5905
    // answer - 245461700
};
