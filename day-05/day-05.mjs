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

    // does not work
    const part2 = () => {
        const seedNumbers = contents[0].split(': ')[1].split(' ').map(x => +x);
        const seedValues = []

        for (let i = 0; i < seedNumbers.length; i += 2) {
            const seeds = [];
            const seedStart = seedNumbers[i];
            const seedRange = seedNumbers[i + 1];
            for (let j = 0; j < seedRange; j++) {
                seeds.push(j + seedStart);
            }
            const value = seeds.map((seed) =>
                humidityToLocation.getDestinationMapping(
                    temperatureToHumidity.getDestinationMapping(
                        lightToTemperature.getDestinationMapping(
                            waterToLight.getDestinationMapping(
                                fertilizerToWater.getDestinationMapping(
                                    soilToFertilizer.getDestinationMapping(
                                        seedToSoil.getDestinationMapping(seed)
                                    )
                                ))))));
            seedValues.push(value);
        }

        const answer = Math.min(...seedValues);
        console.log('day 5 part 2:', answer);
    }
    part2();
    // test output - 46
    // answer - 
};
