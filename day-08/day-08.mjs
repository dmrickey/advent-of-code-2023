import { getFileContents } from '../tools/import-file.mjs';

export default () => {
    const contents = getFileContents('./day-08/.input');
    // const contents = getFileContents('./day-08/test.input');
    // const contents = getFileContents('./day-08/test2.input');

    const part1 = () => {
        const instruction = contents[0];

        const nodes = {};
        for (let i = 2; i < contents.length; i++) {
            const row = contents[i];
            const [node, dests] = row.split(' = ');
            const [left, right] = dests.slice(1, -1).split(', ');
            nodes[node] = { key: node, L: left, R: right };
        }

        Object.keys(nodes).forEach((node) => {
            let current = nodes[node];
            instruction.split('').forEach((dir) => {
                current = nodes[current[dir]];
            });
            nodes[node].destination = current.key;
        });

        let current = nodes.AAA
        let counter = 0;
        while (current.key !== 'ZZZ') {
            counter++;
            current = nodes[current.destination];
        }

        const answer = counter * instruction.length;
        console.log('day 7 part 1:', answer);
    }
    part1();
    // test output - 2
    // test2 output - 6
    // answer - 20221

    const part2 = () => {
        console.log('day 7 part 2:', answer);
    }
    // part2();
    // test output - 
    // answer - 
};
