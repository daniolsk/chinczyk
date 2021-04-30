const Coords = require('./Coords')
const Pawn = require('./Pawn')

class GameLogic {
    constructor() {
        this.coords = new Coords()
    }

    addPawns(player) {
        const color = player.color
        for (let i = 0; i < 4; i++) {
            player.pawns.push(new Pawn(
                this.coords[color].startPositions[i].x,
                this.coords[color].startPositions[i].y,
                this.coords[color].startPositionIndex
            ))
        }
    }

    retrievePawnsThatCanMove(player, move) {
        const color = player.color
        let tab = []

        for (const pawn of player.pawns) {
            let endI = this.coords[color].enterEndPositionIndex,
                newI = pawn.i + move
            if (!this.checkIfPawnLeftStart(pawn, color)) {
                if (move == 1 || move == 6) {
                    tab.push({
                        next: {
                            x: this.coords.boardCoords[pawn.i].x,
                            y: this.coords.boardCoords[pawn.i].y,
                            i: this.coords[color].startPositionIndex
                        },
                        house: false
                    })
                } else {
                    tab.push({
                        next: undefined
                    })
                }
            } else if (this.checkIfPawnIsInHouse(pawn, color)[0]) {
                let houseI = this.checkIfPawnIsInHouse(pawn, color)[1]
                if (this.checkIfHouseIndexIsEmpty(player.pawns, color, houseI + move)) {
                    tab.push({
                        next: {
                            x: this.coords[color].endPositions[houseI + move].x,
                            y: this.coords[color].endPositions[houseI + move].y,
                            i: houseI + move
                        },
                        house: true
                    })
                } else {
                    tab.push({
                        next: undefined
                    })
                }
            } else if (pawn.i <= endI && newI > endI) {
                if (newI > (endI + 4)) {
                    tab.push({
                        next: undefined
                    })
                } else {
                    let houseI = newI - endI - 1
                    if (this.checkIfHouseIndexIsEmpty(player.pawns, color, houseI)) {
                        tab.push({
                            next: {
                                x: this.coords[color].endPositions[houseI].x,
                                y: this.coords[color].endPositions[houseI].y,
                                i: houseI
                            },
                            house: true
                        })
                    } else {
                        tab.push({
                            next: undefined
                        })
                    }
                }
            } else {
                if (newI > 39)
                    newI = newI - 40
                tab.push({
                    next: {
                        x: this.coords.boardCoords[newI].x,
                        y: this.coords.boardCoords[newI].y,
                        i: newI
                    },
                    house: false
                })
            }
        }
        return tab
    }

    checkIfPawnLeftStart(pawn, color) {
        for (const pos of this.coords[color].startPositions) {
            if (pos.x == pawn.x && pos.y == pawn.y)
                return false
        }
        return true
    }

    checkIfHouseIndexIsEmpty(pawns, color, i) {
        if (i > 3) return false
        const pos = this.coords[color].endPositions[i]
        for (const pawn of pawns) {
            if (pawn.x == pos.x && pawn.y == pos.y)
                return false
        }
        return true
    }

    checkIfPawnIsInHouse(pawn, color) {
        const pos = this.coords[color].endPositions
        for (let i = 0; i < 4; i++) {
            if (pos[i].x == pawn.x && pos[i].y == pawn.y)
                return [true, i]
        }
        return [false]
    }

    checkIfMovesAreEmpty(moves) {
        for (const move of moves) {
            if (move.next != undefined)
                return false
        }
        return true
    }

    killAllPawnsOnTile(pawn, room, color) {
        if (this.checkIfPawnIsInHouse(pawn, color)[0]) return

        for (let player of room.players) {
            if (player.color != color) {
                for (let i = 0; i < 4; i++) {
                    if (this.checkIfPawnIsInHouse(player.pawns[i], player.color)[0]) continue
                    if (player.pawns[i].i == pawn.i) {
                        player.pawns[i].x = this.coords[player.color].startPositions[i].x
                        player.pawns[i].y = this.coords[player.color].startPositions[i].y
                        player.pawns[i].i = this.coords[player.color].startPositionIndex
                    }
                }
            }
        }
    }

    checkIfPlayerWon(player, room) {
        let pawnsInHouse = 0
        for (const pawn of player.pawns) {
            if (this.checkIfPawnIsInHouse(pawn, player.color)[0]) pawnsInHouse++
        }
        if (pawnsInHouse == 4)
            room.endGame(player.nick)
        return
    }
}

module.exports = GameLogic