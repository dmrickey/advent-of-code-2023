import { getFileContents } from '../tools/import-file.mjs';

export default () => {

    // const contents = getFileContents('./day-06/.input');
    const contents = getFileContents('./day-06/test.input');

    class BoatRaceData {
        /** @type {number} */ time;
        /** @type {number} */ furthestDistance;

        constructor(t, d) {
            this.time = t;
            this.furthestDistance = d;

            this.#buildCurve();
        }

        /** @type {number[]} */
        data = [];

        #buildCurve() {
            for (let i = 0; i <= this.time; i++) {
                this.data[i] = i * (this.time - i);
            }
        }

        /** @type {number} */
        get winningQty() {
            return this.data.filter(x => x > this.furthestDistance).length;
        }
    }

    const part1 = () => {
        const times = contents[0].split(':')[1].trim().split(/\s+/);
        const distances = contents[1].split(':')[1].trim().split(/\s+/);

        const answer = times
            .map((t, i) => new BoatRaceData(t, distances[i]))
            .map(x => x.winningQty)
            .product();
        console.log('day 6 part 1:', answer);
    }
    // part1();
    // test output - 288
    // answer - 1731600

    const part2 = () => {
        const getNumber = i => +contents[i].split(':')[1].trim().replaceAll(/\s+/g, '');
        const time = getNumber(0);
        const distance = getNumber(1);

        const raceData = new BoatRaceData(time, distance);
        const answer = raceData.winningQty;

        console.log('day 6 part 2:', answer);
    }
    part2();
    // test output - 71503
    // answer - 40087680
    console.log('\x1b[36m', 'sometext', '\x1b[0m');
};
