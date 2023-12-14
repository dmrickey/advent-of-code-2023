import { intersection } from '../tools/array-intersects.mjs';
import { getFileContents } from '../tools/import-file.mjs';
import { truthiness } from '../tools/truthiness.mjs';

export default () => {

    class Card {
        /** @type {number[]} */ winningNumbers;
        /** @type {number[]} */ numbers;
        /** @type {number} */ id;

        constructor(str) {
            const [first, second] = str.split(':');
            this.id = +first.split(' ')[1];
            const [sWinngingNumbers, sNumbers] = second.split('|');
            this.numbers = sNumbers.split(' ').filter(truthiness).map(x => +x.trim());
            this.winngingNumbers = sWinngingNumbers.split(' ').filter(truthiness).map(x => +x.trim());
        }

        _points;
        get points() {
            return this._points ??= (() => {
                const values = intersection(this.numbers, this.winngingNumbers);
                return values.length
                    ? Math.pow(2, values.length - 1)
                    : 0;
            })();
        }
    }

    const contents = getFileContents('./day-04/.input');
    // const contents = getFileContents('./day-04/test.input');

    const part1 = () => {
        const answer = contents
            .map(x => new Card(x))
            .map(x => x.points)
            .sum();

        console.log('day 4 part 1:', answer);
    }
    part1();
    // test output - 13
    // answer = 25004

    const part2 = () => {

        console.log('day 4 part 1:', answer);
    }
    // part2();
    // test output - 30
    // answer - 
};
