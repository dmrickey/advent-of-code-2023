import { getFileContents } from '../tools/import-file.mjs';

export default () => {
    // const contents = getFileContents('./day-12/.input');
    const contents = getFileContents('./day-12/test.input');
    // const contents = getFileContents('./day-12/test2.input');

    /**
     * @param {string} data 
     * @param {number[]} values 
     * @returns {string[]}
     */
    const allArrangements = (data, values) => {
        const length = data.length;
        const minimum = values.sum() + values.length - 1;
        const golden = values.map(x => Array.from('#'.repeat(x)).join('')).join('.');

        const diff = length - minimum;
        /** @type {{[key: string]: string}} */
        let output = { [golden]: '' };
        for (let i = 0; i < diff; i++) {
            const temp = output;
            output = {};
            for (var word of Object.keys(temp)) {
                output[`.${word}`] = '';
                output[`${word}.`] = '';
                for (let i = 0; i < word.split('').length; i++) {
                    const tempWord = word.split('');
                    const c = tempWord[i];
                    if (c === '.') {
                        while (tempWord[i + 1] === '.') {
                            i++;
                        }
                        tempWord.splice(i, 0, '.');
                        output[tempWord.join('')] = '';
                    }

                }
            }
        }

        return Object.keys(output);
    }

    /**
     * @param {string} data 
     * @param {number[]} values 
     */
    const calculateRow = (data, values) => {
        const all = allArrangements(data, values);
        // all.log('all');
        const regex = data.replaceAll('.', '\\.').replaceAll('?', '.');
        // regex.log('regex')
        const output = all.filter(a => a.match(regex));
        // output.log('possible output');
        return output;
    };

    const part1 = () => {
        console.log('  PART 1');

        let answer = 0;
        contents.forEach(row => {
            const [str, nums] = row.split(' ');
            const counts = nums.split(',').map(x => +x);
            answer += calculateRow(str, counts).length;
        });

        console.log('day 11 part 1:', answer);
    }
    part1();
    // test output - 21
    // answer - 7460

    const part2 = () => {
        console.log('  PART 2');

        let answer = 0;
        contents.forEach(row => {
            const [str, nums] = row.split(' ');
            const counts = nums.split(',').map(x => +x);

            const str2 = Array.from(str.repeat(5)).join('?');
            const counts2 = [...Array(5).keys()].map(x => counts).flatMap(x => x);
            answer += calculateRow(str2, counts2).length;
        });

        console.log('day 11 part 1:', answer);
    }
    part2();
    // test output - 
    // answer - 
};
