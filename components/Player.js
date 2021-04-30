class Player {
    constructor(nick, id, color) {
        this.nick = nick
        this.id = id
        this.color = color
        this.pawns = []
        this.active = false
        this.ready = false
        this.roll = {
            value: 0,
            time: Date.now(),
            expires: Date.now()
        }
        this.pawns = []
    }
}

module.exports = Player