import { getFileContents } from '../tools/import-file.mjs';

export default () => {
    const contents = getFileContents('./day-08/.input');
    // const contents = getFileContents('./day-08/test.input');
    // const contents = getFileContents('./day-08/test2.input');
    // const contents = getFileContents('./day-08/test3.input');

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

    const part1 = () => {
        let current = nodes.AAA;
        let counter = 0;
        while (current.key !== 'ZZZ') {
            counter++;
            current = nodes[current.destination];
        }

        const answer = counter * instruction.length;
        console.log('day 7 part 1:', answer);
    }
    // part1();
    // test output - 2
    // test2 output - 6
    // answer - 20221

    const part2 = () => {
        const gcd = (x, y) => (y === 0 ? x : gcd(y, x % y));
        const lcm = (...n) => n.reduce((x, y) => (x * y) / gcd(x, y));

        let paths = Object.keys(nodes)
            .filter(x => x.endsWith('A'))
            .map(key => nodes[key]);

        // this only works because there are exactly 6 destinations
        // if there were multiple destinations that an individual node could reach and one was a red herring, this wouldn't work
        const counters = paths.map((node) => {
            let current = node;
            let counter = 0;
            while (!current.key.endsWith('Z')) {
                counter++;
                current = nodes[current.destination];
            }
            return counter;
        });
        counters.log();

        const answer = lcm(...counters) * instruction.length;
        console.log('day 7 part 2:', answer);
    }
    part2();
    // test3 output - 6
    // answer - 14616363770447
};
