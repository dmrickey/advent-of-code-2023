import { getFileContents } from '../tools/import-file.mjs';

export default () => {

    class Card {
        values = {
            'A': 13,
            'K': 12,
            'Q': 11,
            'J': 10,
            'T': 9,
            '9': 8,
            '8': 7,
            '7': 6,
            '6': 5,
            '5': 4,
            '4': 3,
            '3': 2,
            '2': 1,
        }
        face;
        isWild;
        get value() { return this.isWild ? 0 : this.values[this.face]; }

        constructor(f, isWild = false) {
            this.face = f;
            this.isWild = isWild;
        }

        compareTo(card) {
            return this.value - card.value;
        }
    }

    const HandTypes = {
        "Five of a kind": 7,
        "Four of a kind": 6,
        "Full house": 5,
        "Three of a kind": 4,
        "Two pair": 3,
        "One pair": 2,
        "High card": 1,
    }

    class Hand {
        /** @type {Card[]} */ cards = [];
        /** @type {number} */ bid;

        /** @type {string} */
        #rawHand;

        /** @type {number} */
        handType;

        constructor(row, useWild = false) {
            const [cards, bid] = row.split(' ');
            this.#rawHand = cards;
            this.cards = cards.split('').map(c => new Card(c, useWild && c === 'J'));
            this.bid = +bid;

            if (useWild) {
                this.#calculateHandTypeWithWilds();
            }
            else {
                this.#calculateHandType();
            }
        }

        #calculateHandType() {
            const cards = [...new Set(this.#rawHand.split(''))];

            switch (cards.length) {
                case 1:
                    this.handType = HandTypes['Five of a kind'];
                    break;
                case 2:
                    const r = new RegExp(cards[0], 'g');
                    const occurrences = (this.#rawHand.match(r) || []).length;
                    this.handType = (occurrences === 1 || occurrences === 4)
                        ? HandTypes['Four of a kind']
                        : HandTypes['Full house'];
                    break;
                case 3:
                    const maxOccurence = Math.max(...cards.map((c) => {
                        const r = new RegExp(c, 'g');
                        const occurrences = (this.#rawHand.match(r) || []).length;
                        return occurrences;
                    }));
                    this.handType = maxOccurence === 3
                        ? HandTypes['Three of a kind']
                        : HandTypes['Two pair'];
                    break;
                case 4:
                    this.handType = HandTypes['One pair'];
                    break;
                case 5:
                    this.handType = HandTypes['High card'];
                    break;
            }
        }

        #calculateHandTypeWithWilds() {
            const jokerQty = (this.#rawHand.match(/J/g) || []).length;
            const cards = [...new Set(this.#rawHand.replace(/J/g, '').split(''))];

            switch (cards.length || 1) {
                case 1:
                    this.handType = HandTypes['Five of a kind'];
                    break;
                case 2:
                    if (jokerQty) {
                        const hasTwoPair = cards.map((c) => {
                            const r = new RegExp(c, 'g');
                            const occurrences = (this.#rawHand.match(r) || []).length;
                            return occurrences;
                        }).every(x => x === 2);

                        this.handType = hasTwoPair
                            ? HandTypes['Full house']
                            : HandTypes['Four of a kind'];
                    }
                    else {
                        const r = new RegExp(cards[0], 'g');
                        const occurrences = (this.#rawHand.match(r) || []).length;
                        this.handType = (occurrences === 1 || occurrences === 4)
                            ? HandTypes['Four of a kind']
                            : HandTypes['Full house'];
                    }
                    break;
                case 3:
                    if (jokerQty) {
                        this.handType = HandTypes['Three of a kind'];
                    }
                    else {
                        const maxOccurence = Math.max(...cards.map((c) => {
                            const r = new RegExp(c, 'g');
                            const occurrences = (this.#rawHand.match(r) || []).length;
                            return occurrences;
                        }));
                        this.handType = maxOccurence === 3
                            ? HandTypes['Three of a kind']
                            : HandTypes['Two pair'];
                    }
                    break;
                case 4:
                    this.handType = HandTypes['One pair'];
                    break;
                case 5:
                    this.handType = jokerQty
                        ? HandTypes['One pair']
                        : HandTypes['High card'];
                    break;
            }
        }

        compareTo(hand) {
            const compared = this.handType - hand.handType;
            if (compared) return compared;

            for (let i = 0; i < this.cards.length; i++) {
                const card = this.cards[i];

                const comparedCard = card.compareTo(hand.cards[i]);
                if (comparedCard) return comparedCard;
            }

            return 0;
        }

        static compareFn(left, right) {
            return left.compareTo(right);
        }
    }

    const contents = getFileContents('./day-07/.input');
    // const contents = getFileContents('./day-07/test.input');

    const part1 = () => {
        const hands = contents.map(row => new Hand(row));
        hands.sort(Hand.compareFn);
        const answer = hands
            .map((h, i) => (i + 1) * h.bid)
            .sum();
        console.log('day 7 part 1:', answer);
    }
    // part1();
    // test output - 6440
    // answer - 247823654

    const part2 = () => {
        const hands = contents.map(row => new Hand(row, true));
        hands.sort(Hand.compareFn);
        const answer = hands
            .map((h, i) => (i + 1) * h.bid)
            .sum();
        console.log('day 7 part 2:', answer);
    }
    // part2();
    // test output - 5905
    // answer - 245461700
};
