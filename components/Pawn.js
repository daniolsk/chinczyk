class Pawn {
    constructor(x, y, i) {
        this.x = x
        this.y = y
        this.i = i
    }

    moveSelf(move) {
        this.x = move.next.x
        this.y = move.next.y
        this.i = move.next.i
    }

}

module.exports = Pawn