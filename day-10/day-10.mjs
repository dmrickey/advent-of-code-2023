import { getFileContents } from '../tools/import-file.mjs';

export default () => {
    const contents = getFileContents('./day-10/.input');
    // const contents = getFileContents('./day-10/test.input');
    // const contents = getFileContents('./day-10/test2.input');

    class Pipe {
        x; y;

        north = false;
        south = false;
        east = false;
        west = false;

        isStart = false;
        isWall = false;

        /** @type {'north' | 'south' | 'east' | 'west' | undefined} */
        entrance;
        /** @type {'north' | 'south' | 'east' | 'west' | undefined} */
        exit;

        /** @type {string} */ #p;

        isSolution = false;

        get coloredWallSegment() {
            switch (this.#p) {
                case '-': return '\x1b[31m─\x1b[0m';
                case 'L': return '\x1b[31m└\x1b[0m';
                case '|': return '\x1b[31m│\x1b[0m';
                case 'F': return '\x1b[31m┌\x1b[0m';
                case '7': return '\x1b[31m┐\x1b[0m';
                case 'J': return '\x1b[31m┘\x1b[0m';
                case 'S': return '\x1b[31m┼\x1b[0m';
                default: return '·';
            }
        }

        /** @return {number} */
        get wallValue() {
            let value = 0;
            if (this.entrance === 'south') value += .5;
            if (this.entrance === 'north') value -= .5;
            if (this.exit === 'south') value -= .5;
            if (this.exit === 'north') value += .5;
            return value;
        }

        constructor(p, x, y) {
            this.#p = p;
            switch (p) {
                case '-': this.isWall = true; this.west = true; this.east = true; break;
                case 'L': this.isWall = true; this.north = true; this.east = true; break;
                case '|': this.isWall = true; this.north = true; this.south = true; break;
                case 'F': this.isWall = true; this.east = true; this.south = true; break;
                case '7': this.isWall = true; this.west = true; this.south = true; break;
                case 'J': this.isWall = true; this.west = true; this.north = true; break;
                case 'S': this.isWall = true; this.north = true; this.west = true; this.east = true; this.south = true; this.isStart = true; break;
                default: /** do nothing */ break;
            }
            this.x = x;
            this.y = y;
        }

        /**
         * @param {number | undefined} wallCount
         * @returns {boolean} 
         **/
        isInsideHole(wallCount) {
            if (wallCount === undefined) return false;
            return !!(wallCount % 2);
        }

        connects(pipe) {
            if (!pipe) return false;
            // (0, 0) is top left
            return (this.north && pipe.south && this.x === pipe.x && this.y === pipe.y + 1)
                || (this.south && pipe.north && this.x === pipe.x && this.y === pipe.y - 1)
                || (this.east && pipe.west && this.x === pipe.x - 1 && this.y === pipe.y)
                || (this.west && pipe.east && this.x === pipe.x + 1 && this.y === pipe.y);
        }
    }

    class Field {
        /** @type {Pipe[][]} */
        pipes;

        /** @type {Pipe} */
        start;
        /** @type {Pipe} */
        previous;
        /** @type {Pipe} */
        current;

        constructor(rows) {
            this.pipes = rows
                .map((row, y) => row.split('').map((p, x) => {
                    const pipe = new Pipe(p, x, y);
                    if (p === 'S') {
                        this.start = pipe;
                    }
                    return pipe;
                }));
            this.current = this.start;
        }

        // (0, 0) is top left
        get north() { return this.pipes[this.current.y - 1]?.[this.current.x]; }
        get south() { return this.pipes[this.current.y + 1]?.[this.current.x]; }
        get east() { return this.pipes[this.current.y][this.current.x + 1]; }
        get west() { return this.pipes[this.current.y][this.current.x - 1]; }

        get canGoNorth() { return this.current.connects(this.north); }
        get canGoSouth() { return this.current.connects(this.south); }
        get canGoEast() { return this.current.connects(this.east); }
        get canGoWest() { return this.current.connects(this.west); }

        goNorth() {
            this.previous = this.current;
            this.previous.exit = 'north';
            this.current = this.north;
            this.current.entrance = 'south';
            this.current.isSolution = true;
        }
        goSouth() {
            this.previous = this.current;
            this.previous.exit = 'south';
            this.current = this.south;
            this.current.entrance = 'north';
            this.current.isSolution = true;
        }
        goEast() {
            this.previous = this.current;
            this.previous.exit = 'east';
            this.current = this.east;
            this.current.entrance = 'west';
            this.current.isSolution = true;
        }
        goWest() {
            this.previous = this.current;
            this.previous.exit = 'west';
            this.current = this.west;
            this.current.entrance = 'east';
            this.current.isSolution = true;
        }

        #reset() {
            this.current = this.start;
            this.previous = this.start;
            this.pipes.forEach(row => row.forEach(p => p.isSolution = false));
            this.start.isSolution = true;
        }

        getCircuitPath() {
            const travel = () => {
                let paths = 1;
                while (this.current !== this.start) {
                    paths++;
                    this.travelFromCurrent();
                }
                return paths;
            }

            try {
                this.#reset();
                if (this.canGoNorth) {
                    this.goNorth();
                    return travel();
                }
            }
            catch {
                // don't care
            }
            try {
                this.#reset();
                if (this.canGoSouth) {
                    this.goSouth();
                    return travel();
                }
            }
            catch {
                // don't care
            }
            try {
                this.#reset();
                if (this.canGoEast) {
                    this.goEast();
                    return travel();
                }
            }
            catch {
                // don't care
            }

            throw new Error('I dun screwed up');
        }

        travelFromCurrent() {
            if (this.canGoEast && this.east !== this.previous) {
                this.goEast();
            }
            else if (this.canGoWest && this.west !== this.previous) {
                this.goWest();
            }
            else if (this.canGoNorth && this.north !== this.previous) {
                this.goNorth();
            }
            else if (this.canGoSouth && this.south !== this.previous) {
                this.goSouth();
            }
            else {
                throw new Error("Can't go this way");
            }
        }

        draw() {
            for (let y = 0; y < this.pipes.length; y++) {
                const row = this.pipes[y];
                let text = '';
                let wallCount = undefined;
                for (let x = 0; x < row.length; x++) {
                    const pipe = row[x];
                    if (wallCount !== undefined || pipe.wallValue) {
                        wallCount ||= 0;
                        wallCount += pipe.wallValue;
                    }
                    text += pipe.isSolution
                        ? pipe.coloredWallSegment
                        : wallCount !== undefined && pipe.isInsideHole(wallCount)
                            ? '\x1b[33m·\x1b[0m'
                            : '\x1b[35m·\x1b[0m';
                }
                console.log(text);
            }
        }

        /** @returns {number} */
        countInteriorSegments() {
            let count = 0;
            for (let y = 0; y < this.pipes.length; y++) {
                const row = this.pipes[y];
                let wallCount = undefined;
                for (let x = 0; x < row.length; x++) {
                    const pipe = row[x];
                    if (wallCount !== undefined || pipe.wallValue) {
                        wallCount ||= 0;
                        wallCount += pipe.wallValue;
                    }
                    count += pipe.isSolution
                        ? 0
                        : wallCount !== undefined && pipe.isInsideHole(wallCount)
                            ? 1
                            : 0;
                }
            }
            return count;
        }
    }

    const part1 = () => {
        const field = new Field(contents);
        const totalDistance = field.getCircuitPath();
        const answer = Math.ceil(totalDistance / 2);
        console.log('day 10 part 1:', answer);
    }
    // part1();
    // test output - 4
    // test2 output - 8
    // answer - 6714

    const part2 = () => {
        const field = new Field(contents);
        field.getCircuitPath();
        field.draw();

        const answer = field.countInteriorSegments();
        console.log('day 10 part 2:', answer);
    }
    part2();
    // test output - 
    // answer - 429
};
