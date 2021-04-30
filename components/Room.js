class Room {
    constructor() {
        this.players = []
        this.colors = ['red', 'yellow', 'blue', 'green']
        this.active = false
        this.i = 0
        this.turnTime = 31
        this.turn = 1
        this.turnStart = 0
        this.finished = false
        this.winner = undefined
    }

    addPlayerToRoom(player) {
        if (this.players.length != 4) this.players.push(player)
    }

    giveColor() {
        const i = Math.floor(Math.random() * this.colors.length)
        const color = this.colors[i]
        this.colors.splice(i, 1)
        return color
    }

    startGame() {
        this.active = true
        this.players[this.i].active = true
        this.turnStart = Date.now()
        this.setGameInterval()
    }

    setGameInterval() {
        this.interval = setInterval(() => {
            this.turnStart = Date.now()
            this.players[this.i].active = false
            this.i++
            if (this.i == this.players.length) this.i = 0
            this.players[this.i].active = true
            this.turn++
        }, this.turnTime * 1000)
    }

    clearGameInterval() {
        clearInterval(this.interval)
        this.turnStart = Date.now()
        this.players[this.i].active = false
        this.i++
        if (this.i == this.players.length) this.i = 0
        this.players[this.i].active = true
        this.turn++
        this.setGameInterval()
    }

    retrieveAllPawns() {
        let obj = {}
        for (const player of this.players) {
            obj[player.color] = player.pawns
        }
        return obj
    }

    endGame(nick) {
        clearInterval(this.interval)
        this.finished = true
        this.winner = nick
    }

}

module.exports = Room