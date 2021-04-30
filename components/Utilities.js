class Utilities {
    constructor() {

    }

    findNotEmptyRoom(rooms) {
        for (const room of rooms) {
            if (room.players.length < 4) {
                return room
            }
        }
        return false
    }

    findPlayerById(rooms, id) {
        for (const room of rooms) {
            for (const player of room.players) {
                if (player.id == id)
                    return player
            }
        }
        return undefined
    }

    findRoomById(rooms, id) {
        for (const room of rooms) {
            for (const player of room.players) {
                if (player.id == id)
                    return room
            }
        }
    }

    findPlayersInRoomByPlayerId(rooms, id) {
        let tab = []
        for (const room of rooms) {
            if (room.players.includes(this.findPlayerById(rooms, id))) {
                for (const player of room.players) {
                    tab.push({
                        nick: player.nick,
                        ready: player.ready
                    })
                }
            }
        }
        return tab
    }

    findIfGameCanStart(rooms, id) {
        let room = this.findRoomById(rooms, id)
        let sum = 0
        for (const player of room.players) {
            if (player.ready)
                sum++
        }
        if (sum == room.players.length && sum >= 2) {
            return true
        }
        return false
    }

    findActivePlayer(rooms, id) {
        let room = this.findRoomById(rooms, id)
        for (const player of room.players) {
            if (player.active)
                return player
        }
    }
}

module.exports = Utilities