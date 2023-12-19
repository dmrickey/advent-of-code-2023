import { getFileContents } from '../tools/import-file.mjs';

export default () => {
    const contents = getFileContents('./day-11/.input');
    // const contents = getFileContents('./day-11/test.input');

    class StarChart {
        /** @type {string[][]} */
        #galaxy;

        #voidDistance;

        constructor(voidDistance = 2) {
            this.#galaxy = contents.map((row) => row.split(''));
            this.#voidDistance = voidDistance;
        }

        /** @type {number[]} */
        voidRows = [];
        /** @type {number[]} */
        voidColumns = [];

        expand() {
            for (let y = this.#galaxy.length - 1; y >= 0; y--) {
                const row = this.#galaxy[y];

                if (row.every(c => c === '.')) {
                    this.voidRows.push(y);
                }
            }

            for (let x = this.#galaxy[0].length - 1; x >= 0; x--) {
                const isSpace = this.#galaxy.reduce((acc, cur) => acc &&= (cur[x] === '.'), true);

                if (isSpace) {
                    this.voidColumns.push(x);
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

        /** @returns {number} */
        get totalDistance() {
            let { galaxies } = this;

            let totalDistance = 0;
            while (galaxies.length >= 2) {
                const current = galaxies.shift();
                galaxies.forEach((g) => {
                    let dx = Math.abs(current.x - g.x);
                    this.voidColumns.forEach(x => {
                        if ((current.x < x && x < g.x) || (g.x < x && x < current.x)) {
                            dx += this.#voidDistance - 1;
                        }
                    });

                    let dy = Math.abs(current.y - g.y);
                    this.voidRows.forEach(y => {
                        if ((current.y < y && y < g.y) || (g.y < y && y < current.y)) {
                            dy += this.#voidDistance - 1;
                        }
                    });
                    totalDistance += dx + dy;
                });
            }

            return totalDistance;
        }
    }

    const part1 = () => {
        const chart = new StarChart();
        // chart.logGalaxyChart();
        chart.expand();
        // chart.logGalaxyChart('Expanded:');

        const answer = chart.totalDistance;
        console.log('day 11 part 1:', answer);
    }
    part1();
    // test output - 374
    // answer - 9233514

    const part2 = () => {
        const chart = new StarChart(1000000);
        chart.expand();

        const answer = chart.totalDistance;
        console.log('day 11 part 1:', answer);
    }
    part2();
    // test output - 
    // answer - 363293506944
};
