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

        #p;

        constructor(p, x, y) {
            this.#p = p;
            switch (p) {
                case '-': this.west = true; this.east = true; break;
                case 'L': this.north = true; this.east = true; break;
                case '|': this.north = true; this.south = true; break;
                case 'F': this.east = true; this.south = true; break;
                case '7': this.west = true; this.south = true; break;
                case 'J': this.west = true; this.north = true; break;
                case 'S': this.north = true; this.west = true; this.east = true; this.south = true; this.isStart = true; break;
                default: /** do nothing */ break;
            }
            this.x = x;
            this.y = y;
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
            this.pipes = contents
                .map((row, y) => row.split('').map((r, x) => {
                    const pipe = new Pipe(r, x, y);
                    if (r === 'S') {
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
            this.current = this.north;
        }
        goSouth() {
            this.previous = this.current;
            this.current = this.south;
        }
        goEast() {
            this.previous = this.current;
            this.current = this.east;
        }
        goWest() {
            this.previous = this.current;
            this.current = this.west;
        }

        #reset() {
            this.current = this.start;
            this.previous = undefined;
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
    }

    const part1 = () => {
        const field = new Field(contents);
        const totalDistance = field.getCircuitPath();
        const answer = Math.ceil(totalDistance / 2);
        console.log('day 10 part 1:', answer);
    }
    part1();
    // test output - 4
    // test2 output - 8
    // answer - 6714

    const part2 = () => {
        console.log('day 10 part 2:', answer);
    }
    // part2();
    // test output - 
    // answer - 
};
