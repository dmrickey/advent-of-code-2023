import { getFileContents } from '../tools/import-file.mjs';

export default () => {
    const contents = getFileContents('./day-13/.input');
    // const contents = getFileContents('./day-13/test.input');
    // const contents = getFileContents('./day-13/test2.input');

    class Mirror {
        /** @type {string[]} */
        field;

        isHorizontalMirror = false;
        #value = 0;

        get value() {
            return (this.isHorizontalMirror ? 100 : 1) * this.#value;
        }

        /**
         * @param {string[]} rows 
         */
        constructor(rows) {
            this.field = rows;
        }

        calculate() {
            const value = this.#findReflectionIndex(this.field);
            if (value) {
                this.#value += 100 * value;
            }

            const value2 = this.#findVerticalReflection() || 0;
            if (value2) {
                this.#value += value2;
            }

            // safety just in case
            if (!this.#value || (value && value2)) {
                this.field.log();
                debugger;
            }
        }

        #findVerticalReflection() {
            const temp = [...new Array(this.field[0].length)].map(_ => '');
            this.field.forEach((f) => {
                f.split('').forEach((c, i) => temp[i] += c);
            });
            return this.#findReflectionIndex(temp);
        }

        #findReflectionIndex = (f) => {
            for (let y = 0; y < f.length - 1; y++) {
                const element = f[y];
                let indices = f.multiIndexOf(element).filter(idx => idx > y);

                if (!indices.length) {
                    continue;
                }

                if (y !== 0) {
                    indices = [indices.at(-1)];
                }

                if (y !== 0 && indices.at(-1) !== f.length - 1) {
                    continue;
                }

                for (var index of indices) {
                    if (!((index - y) % 2)) continue;
                    let match = true;
                    for (let j = 1; j < index / 2; j++) {
                        const left = f[y + j];
                        const right = f[index - j];
                        match &&= !left || !right || left === right;
                    }
                    if (match) {
                        const i = index - Math.ceil((index - y) / 2) + 1;
                        return i;
                    }
                }
            }
        };
    }

    const part1 = () => {
        console.log('  PART 1');

        const fields = [];
        for (let i = 0; i < contents.length; i++) {
            const rows = [];
            let row = contents[i];
            while (!!row) {
                rows.push(row);
                row = contents[++i];
            }
            fields.push(new Mirror(rows));
        }

        fields.forEach(x => x.calculate());
        const answer = fields.map(x => x.value).log(false).sum();
        console.log('day 13 part 1:', answer);
    }
    part1();
    // test output - 405
    // answer - 33122

    const part2 = () => {
        console.log('  PART 2');



        // console.log('day 13 part 1:', answer);
    }
    // part2();
    // test output - 
    // answer - 
};
