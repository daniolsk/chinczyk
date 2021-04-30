export default class Updater {
    constructor() {
        this.board = document.querySelector('#board')
        this.red = document.querySelectorAll('.red')
        this.green = document.querySelectorAll('.green')
        this.blue = document.querySelectorAll('.blue')
        this.yellow = document.querySelectorAll('.yellow')
        this.shadow = document.querySelector('.grey')
    }

    updatePlayers(players) {
        if (players.length == 0) {
            document.cookie = "id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
            location.reload()
            return
        }
        let elements = document.querySelectorAll('.player')
        for (let i = 0; i < players.length; i++) {
            elements[i].innerText = players[i].nick
            if (players[i].ready) {
                elements[i].classList.add('ready')
            } else {
                elements[i].classList.remove('ready')
            }
        }
    }

    updateRoom(room) {
        if (!room.state) return

        let ready = document.querySelector('#ready')
        ready.checked = true
        ready.onclick = () => {}

        let status = document.querySelector('#status')
        status.innerHTML = `Tura gracza: <b>${room.activePlayer.nick}</b>`

        let timer = document.querySelector('#timer')
        timer.innerText = `${room.timeLeft}`

        let roll = room.activePlayer.roll
        if (roll.expires <= Date.now()) {
            this.clearListeners()
            return
        }
        if (roll.value != 0 && (Date.now() - roll.time) > 1440){
            status.innerHTML = `<b>${room.activePlayer.nick}</b> wylosował ${roll.value}`;
        }
    }

    updatePawns(pawnsObj) {
        const pawns = pawnsObj.currentPositions
        for (let i = 0; i < 4; i++) {
            if (pawns.red != undefined) {
                this.red[i].style.left = `${pawns.red[i].x + this.board.offsetLeft}px`
                this.red[i].style.top = `${pawns.red[i].y + this.board.offsetTop}px`
            }
            if (pawns.green != undefined) {
                this.green[i].style.left = `${pawns.green[i].x + this.board.offsetLeft}px`
                this.green[i].style.top = `${pawns.green[i].y + this.board.offsetTop}px`
            }
            if (pawns.blue != undefined) {
                this.blue[i].style.left = `${pawns.blue[i].x+ this.board.offsetLeft}px`
                this.blue[i].style.top = `${pawns.blue[i].y+ this.board.offsetTop}px`
            }
            if (pawns.yellow != undefined) {
                this.yellow[i].style.left = `${pawns.yellow[i].x + this.board.offsetLeft}px`
                this.yellow[i].style.top = `${pawns.yellow[i].y + this.board.offsetTop}px`
            }
        }
    }

    clearListeners() {
        for (let el of this.red) {
            el.classList.remove('blink')
            el.onclick = () => {}
            el.onmouseenter = () => {}
            el.onmouseleave = () => {}
        }
        for (let el of this.green) {
            el.classList.remove('blink')
            el.onclick = () => {}
            el.onmouseenter = () => {}
            el.onmouseleave = () => {}
        }
        for (let el of this.blue) {
            el.classList.remove('blink')
            el.onclick = () => {}
            el.onmouseenter = () => {}
            el.onmouseleave = () => {}
        }
        for (let el of this.yellow) {
            el.classList.remove('blink')
            el.onclick = () => {}
            el.onmouseenter = () => {}
            el.onmouseleave = () => {}
        }
        this.shadow.style.left = `-50px`
        this.shadow.style.top = `0px`
    }

    showVictoryScreen(nick) {
        let div = document.createElement('div')
        div.classList.add('victory')
        div.innerText = `${nick} wygrywa!`
        document.querySelector('#main').append(div)
    }
}