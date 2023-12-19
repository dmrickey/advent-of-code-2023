import { getFileContents } from '../tools/import-file.mjs';

export default () => {
    const contents = getFileContents('./day-11/.input');
    // const contents = getFileContents('./day-11/test.input');

    class StarChart {
        /** @type {string[][]} */
        #galaxy;

        constructor() {
            this.#galaxy = contents.map((row) => row.split(''));
        }

        expand() {
            for (let y = this.#galaxy.length - 1; y >= 0; y--) {
                const row = this.#galaxy[y];

                if (row.every(c => c === '.')) {
                    this.#galaxy.splice(y, 0, Array.from('.'.repeat(row.length)));
                }
            }

            for (let x = this.#galaxy[0].length - 1; x >= 0; x--) {
                const isSpace = this.#galaxy.reduce((acc, cur) => acc &&= (cur[x] === '.'), true);

                if (isSpace) {
                    this.#galaxy.forEach((r) => r.splice(x, 0, '.'));
                }
            }
        }

        logGalaxyChart(label) {
            if (label) console.log(label);
            this.#galaxy.forEach(row => console.log(row.join('')));
        }

        /** @returns {{x: number, y: number}[]} */
        get galaxies() {
            const galaxies = [];
            for (let y = 0; y < this.#galaxy.length; y++) {
                const row = this.#galaxy[y];
                for (let x = 0; x < row.length; x++) {
                    const node = row[x];
                    if (node === '#') {
                        galaxies.push({ x, y, });
                    }
                }
            }
            return galaxies;
        }
    }

    const part1 = () => {
        const chart = new StarChart();
        // chart.logGalaxyChart();
        chart.expand();
        // chart.logGalaxyChart('Expanded:');

        let { galaxies } = chart;

        let totalDistance = 0;
        while (galaxies.length >= 2) {
            const current = galaxies.shift();
            galaxies.forEach((g) => totalDistance += Math.abs(current.x - g.x) + Math.abs(current.y - g.y));
        }

        const answer = totalDistance;
        console.log('day 11 part 1:', answer);
    }
    part1();
    // test output - 374
    // answer - 9233514

    const part2 = () => {
        // console.log('day 10 part 2:', answer);
    }
    // part2();
    // test output - 
    // answer - 
};
