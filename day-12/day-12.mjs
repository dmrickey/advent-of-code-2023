import { getFileContents } from '../tools/import-file.mjs';

export default () => {
    const contents = getFileContents('./day-12/.input');
    // const contents = getFileContents('./day-12/test.input');
    // const contents = getFileContents('./day-12/test2.input');

    /**
     * @param {string} data 
     * @param {number[]} values 
     */
    const allArrangements = (data, values) => {
        const length = data.length;
        const minimum = values.sum() + values.length - 1;
        const golden = values.map(x => Array.from('#'.repeat(x)).join('')).join('.');

        const diff = length - minimum;
        let output = [golden];
        for (let i = 0; i < diff; i++) {
            const temp = output;
            output = [];
            for (var word of temp) {
                output.push(`.${word}`);
                output.push(`${word}.`);
                word.split('').forEach((c, i) => {
                    const tempWord = word.split('');
                    if (c === '.') {
                        tempWord.splice(i, 0, '.');
                        output.push(tempWord.join(''));
                    }
                });
                output = [...new Set(output)];
            }
        }

        return output;
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

        // const answer = contents.map(calculateRow).flatMap(x => x).length;
        console.log('day 11 part 1:', answer);
    }
    part1();
    // test output - 21
    // answer - 7460

    const part2 = () => {
        console.log('  PART 2');




        // console.log('day 11 part 1:', answer);
    }
    // part2();
    // test output - 
    // answer - 363293506944
};
