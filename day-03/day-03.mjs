import { getFileContents } from '../tools/import-file.mjs';

export default () => {

    const contents = getFileContents('./day-03/.input');
    // const contents = getFileContents('./day-03/test.input');

    const part1 = () => {
        const validNumbers = [];
        for (let i = 0; i < contents.length; i++) {
            const row = contents[i];

            const nums = [...row.matchAll(/\d+/g)];

            const previous = i === 0
                ? undefined
                : contents[i - 1].replace(/\d/g, '.');
            const current = contents[i].replace(/\d/g, '.');
            const next = i === contents.length - 1
                ? undefined
                : contents[i + 1].replace(/\d/g, '.');
            nums.forEach(match => {
                const [num] = match;
                const { index } = match;
                const normalizedIndex = Math.max(index - 1, 0);
                const len = num.length;
                const normalizedLength = index === normalizedIndex ? (len + 1) : (len + 2);
                const end = normalizedIndex + normalizedLength;

                if (previous) {
                    const sub = previous.substring(normalizedIndex, end);
                    const replaced = sub.replaceAll('.', '');
                    if (replaced.length) {
                        validNumbers.push(+num);
                        return;
                    }
                }

                if (next) {
                    const sub = next.substring(normalizedIndex, end);
                    const replaced = sub.replaceAll('.', '');
                    if (replaced.length) {
                        validNumbers.push(+num);
                        return;
                    }
                }

                const sub = current.substring(normalizedIndex, end);
                const replaced = sub.replaceAll('.', '');
                if (replaced.length) {
                    validNumbers.push(+num);
                    return;
                }
            });
        }
        // validNumbers.log('valid numbers');

        const answer = validNumbers.sum();

        console.log('day 3 part 1:', answer);
    }
    // part1();
    // 527144

    const part2 = () => {
        const gears = [];
        for (let i = 0; i < contents.length; i++) {
            const row = contents[i];
            if (!row.includes('*')) {
                continue;
            }

            const isGear = match => {
                const { index } = match;

                const previous = i === 0
                    ? undefined
                    : contents[i - 1].replace(/\D/g, '.');
                const current = contents[i].replace(/\D/g, '.');
                const next = i === contents.length - 1
                    ? undefined
                    : contents[i + 1].replace(/\D/g, '.');

                const getAdjacentNumbers = (_row) => {
                    const nums = [..._row.matchAll(/\d+/g)];
                    return nums.filter((m) => {
                        const found = m[0];
                        const foundIndex = m.index;
                        const foundEndIndex = foundIndex + found.length - 1;

                        if (foundIndex <= index - 1) {
                            return foundEndIndex >= index - 1;
                        }
                        else {
                            return foundIndex <= index + 1;
                        }
                    }).map(x => +x[0]);
                }

                let totalAdjacent = 0;
                const adjacentNumbers = [];
                if (previous) {
                    adjacentNumbers.push(...getAdjacentNumbers(previous));
                }
                if (next) {
                    adjacentNumbers.push(...getAdjacentNumbers(next));
                }
                {
                    adjacentNumbers.push(...getAdjacentNumbers(current));
                }

                return adjacentNumbers.length === 2 ? adjacentNumbers[0] * adjacentNumbers[1] : 0;
            }

            const matches = [...row.matchAll(/\*/g)];
            matches.forEach(x => {
                const gear = isGear(x);
                if (isGear(x)) {
                    gears.push(gear);
                }
            })
        }

        const answer = gears.sum();

        console.log('day 3 part 1:', answer);
    }
    part2();
    // test output - 467835
    // answer - 81463996
};
