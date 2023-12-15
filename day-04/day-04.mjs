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
            const [sWinningNumbers, sNumbers] = second.split('|');
            this.numbers = sNumbers.split(' ').filter(truthiness).map(x => +x.trim());
            this.winningNumbers = sWinningNumbers.split(' ').filter(truthiness).map(x => +x.trim());
        }

        /** @returns {number} */
        get points() {
            return this.matches
                ? Math.pow(2, this.matches - 1)
                : 0;
        }

        /** @returns {number} */
        get matches() {
            const values = intersection(this.numbers, this.winningNumbers);
            return values.length;
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
        const cards = contents.map(x => new Card(x));
        const actualPoints = [...new Array(cards.length)];

        for (let i = cards.length - 1; i >= 0; i--) {
            const card = cards[i];
            const matches = card.matches;
            let cardQty = 1;
            for (let j = 1; j <= matches; j++) {
                cardQty += actualPoints[i + j] || 0;
            }
            actualPoints[i] = cardQty;
        }

        const answer = actualPoints.sum();
        console.log('day 4 part 2:', answer);
    }
    part2();
    // test output - 30
    // answer - 14427616
};
