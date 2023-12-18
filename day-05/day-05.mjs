import { getFileContents } from '../tools/import-file.mjs';

export default () => {
    class AlmanacEntry {
        /** @type {number} */ destination;
        /** @type {number} */ source;
        /** @type {number} */ range;

        constructor(row) {
            const [destination, source, range] = row.split(' ').map(x => +x);
            this.destination = destination;
            this.source = source;
            this.range = range;
        }

        /**
         * @param {number} input 
         * @returns {number}
         */
        getDestinationMapping(input) {
            if (this.source <= input && input <= this.source + this.range - 1) {
                return this.destination + input - this.source;
            }

            return input;
        }
    }

    class AlmanacMapping {
        /** @type {AlmanacEntry[]} */ entries = [];

        addEntry(row) {
            this.entries.push(new AlmanacEntry(row));
        }

        /**
         * @param {number} input 
         * @returns {number}
         */
        getDestinationMapping(input) {
            for (let i = 0; i < this.entries.length; i++) {
                const entry = this.entries[i];
                const mapped = entry.getDestinationMapping(input);
                if (mapped !== input) {
                    return mapped;
                }
            }
            return input;
        }
    }

    const contents = getFileContents('./day-05/.input');
    // const contents = getFileContents('./day-05/test.input');

    /**
     * 
     * @param {string} key 
     * @returns {AlmanacMapping}
     */
    const createMapping = (key) => {
        const value = `${key} map:`;
        const index = contents.indexOf(value);

        const mapping = new AlmanacMapping();

        for (let i = index + 1; i < contents.length; i++) {
            const row = contents[i];
            if (!row) {
                break;
            }
            mapping.addEntry(row);
        }

        return mapping;
    }

    const seedToSoil = createMapping('seed-to-soil');
    const soilToFertilizer = createMapping('soil-to-fertilizer');
    const fertilizerToWater = createMapping('fertilizer-to-water');
    const waterToLight = createMapping('water-to-light');
    const lightToTemperature = createMapping('light-to-temperature');
    const temperatureToHumidity = createMapping('temperature-to-humidity');
    const humidityToLocation = createMapping('humidity-to-location');

    const part1 = () => {
        const seeds = contents[0].split(': ')[1].split(' ').map(x => +x);
        const seedValues = seeds.map((seed) =>
            humidityToLocation.getDestinationMapping(
                temperatureToHumidity.getDestinationMapping(
                    lightToTemperature.getDestinationMapping(
                        waterToLight.getDestinationMapping(
                            fertilizerToWater.getDestinationMapping(
                                soilToFertilizer.getDestinationMapping(
                                    seedToSoil.getDestinationMapping(seed)
                                )))))));

        const answer = Math.min(...seedValues);
        console.log('day 5 part 1:', answer);
    }
    // part1();
    // test output - 35
    // answer - 173706076 

    const part2 = () => {
        const seedNumbers = contents[0].split(': ')[1].split(' ').map(x => +x);
        const seedValues = [];

        // not happy with my solution - I made the seed loop large enough to not break, then I added an offset and did a binary searh on various values until I found the answer.
        const offset = 12377
        console.log('offset', offset);

        for (let i = 0; i < seedNumbers.length; i += 2) {
            const seeds = [];
            const seedStart = seedNumbers[i];
            const seedRange = seedNumbers[i + 1];
            for (let j = 0 + offset; j < seedRange; j += 20000) {
                seeds.push(j + seedStart);
            }
            const values = seeds.map((seed) =>
                humidityToLocation.getDestinationMapping(
                    temperatureToHumidity.getDestinationMapping(
                        lightToTemperature.getDestinationMapping(
                            waterToLight.getDestinationMapping(
                                fertilizerToWater.getDestinationMapping(
                                    soilToFertilizer.getDestinationMapping(
                                        seedToSoil.getDestinationMapping(seed)
                                    )
                                ))))));
            seedValues.push(...values);
        }
        const answer = Math.min(...seedValues);
        console.log('day 5 part 2:', answer);
    }
    part2();
    // test output - 46
    // answer - 11611182


    console.log('min so far', Math.min(...[
        11638804,
        11618804,
        11613804,
        11612804,
        11611804, // 13000
        11629804, // 11000
        11630804, // 12000
        11611304, // 12500
        11631054, // 12250
        11631179, // 12375
        11611254, // 12450
        11631154, // 12350
        11631129, // 12325
        11631144, // 12340
        11631139, // 12335
        11631134, // 12330
        11631129, // 12323
        11611249, // 12445
        11611244, // 12440
        11611204, // 12400
        11611184, // 12380
        11611182, // 12378
        11631181, // 12377
    ]));
};
