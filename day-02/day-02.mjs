import { getFileContents } from '../tools/import-file.mjs';

export default () => {
    class Game {
        /** @type {number} */
        id;

        /** @type {Pull[]} */
        pulls;

        /** @type {number} */ blueMax;
        /** @type {number} */ greenMax;
        /** @type {number} */ redMax;

        /**
         *  @param {string} str 
         *  @param {object} obj 
         *  @param {number} [obj.blueMax] 
         *  @param {number} [obj.greenMax] 
         *  @param {number} [obj.redMax] 
         */
        constructor(str, { blueMax, greenMax, redMax } = { blueMax: 0, greenMax: 0, redMax: 0 },) {
            const [sGames, sPulls] = str.split(':');
            this.id = +sGames.split(' ')[1];
            this.pulls = sPulls.split(';').map(x => new Pull(x.trim()));

            this.blueMax = blueMax;
            this.greenMax = greenMax;
            this.redMax = redMax;
        }

        get isPossible() {
            return this.pulls.every((pull) => pull.red <= this.redMax && pull.green <= this.greenMax && pull.blue <= this.blueMax);
        }

        /** @returns {number} */
        get power() {
            const blueMin = Math.max(...this.pulls.map(x => x.blue));
            const greenMin = Math.max(...this.pulls.map(x => x.green));
            const redMin = Math.max(...this.pulls.map(x => x.red));

            return blueMin * greenMin * redMin;
        }
    }

    class Pull {
        /** @type {number} */
        red = 0;
        /** @type {number} */
        green = 0;
        /** @type {number} */
        blue = 0;

        /** @param {string} str */
        constructor(str) {
            str.split(',')
                .map(x => x.trim())
                .forEach(x => {
                    const [i, color] = x.split(' ');
                    this[color] = +i;
                });
        }
    }

    const contents = getFileContents('./day-02/2.input');
    // const contents = getFileContents('./day-02/test.input');

    const part1 = () => {
        const blueMax = 14;
        const greenMax = 13;
        const redMax = 12;

        const games = contents.map(x => new Game(x, { blueMax, greenMax, redMax }));

        const answer = games
            .filter(x => x.isPossible)
            .map(x => x.id)
            .sum();

        console.log('day 2 part 1:', answer);
    }
    // part1();
    // 2551

    const part2 = () => {
        const games = contents.map(x => new Game(x));

        const answer = games
            .map(x => x.power)
            .sum();

        console.log('day 2 part 2:', answer);
    }
    // part2();
    // 62811
};
