class Dice {
    constructor() {
        this.rolls = 8
    }

    generateDiceSequence() {
        let sequence = []
        for (let i = 0; i < this.rolls; i++) {
            let roll = this.rollD6()
            if (i != 0) {
                do {
                    roll = this.rollD6()
                }
                while (roll == sequence[i - 1])
            }
            sequence.push(roll)
        }
        return sequence
    }

    rollD6() {
        return Math.floor(Math.random() * 6) + 1
    }
}

module.exports = Dice