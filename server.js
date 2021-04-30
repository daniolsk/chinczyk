let path = require("path");
let express = require("express");
let app = express();

const { v4: uuidv4 } = require('uuid');

let PORT = process.env.PORT || 3000;
let cookieParser = require('cookie-parser');

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const Player = require('./components/Player');
const Room = require('./components/Room');
const Utilities = require('./components/Utilities');
const Dice = require('./components/Dice');
const GameLogic = require('./components/GameLogic');

app.use(express.static("static"));

let rooms = [];

const util = new Utilities();
const dice = new Dice();
const logic = new GameLogic();

app.get('/', (req, res) => {
    const id = req.cookies.id;
    if (id != undefined) {
        res.sendFile(path.join(__dirname + '/static/html/game.html'));
    } else {
        res.redirect('/login');
    }
})

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname + '/static/html/login.html'));
})

app.post('/login', (req, res) => {
    if (req.cookies.id != undefined) {
        res.redirect('/');
        return
    }
    let room = util.findNotEmptyRoom(rooms)
    if (room == false) {
        room = new Room();
        rooms.push(room);
    }
    let player = new Player(req.body.nick, uuidv4(), room.giveColor());
    room.addPlayerToRoom(player);
    res.cookie('id', player.id, {
        maxAge: 1000 * 60 * 60 * 4
    })
    logic.addPawns(player);
    res.redirect('/');
})

app.get('/rollTheDice', (req, res) => {
    const id = req.cookies.id;

    if (!util.findRoomById(rooms, id).active) return res.end();

    if (id != util.findActivePlayer(rooms, id).id) return res.end();

    let player = util.findPlayerById(rooms, id);

    if (player.roll.expires > Date.now()) return res.end();

    const rolls = dice.generateDiceSequence();
    player.roll = {
        value: rolls[dice.rolls - 1],
        time: Date.now(),
        expires: 0
    }

    let room = util.findRoomById(rooms, id);
    let timeLeft = Math.floor(((1000 * room.turnTime) - (Date.now() - room.turnStart)) / 1000);
    let pawnMoves = logic.retrievePawnsThatCanMove(player, rolls[dice.rolls - 1]);

    if (logic.checkIfMovesAreEmpty(pawnMoves)) {
        player.roll.expires = player.roll.time + (dice.rolls * 180)
        setTimeout(() => {
            room.clearGameInterval();
        }, dice.rolls * 180)
    } else {
        player.roll.expires = player.roll.time + timeLeft * 1000 + 1000
    }
    res.send(JSON.stringify({
        rolls: rolls,
        pawnMoves: pawnMoves,
        color: player.color
    }));
})

app.get('/getUpdates', (req, res) => {
    const id = req.cookies.id
    let currentPlayers = util.findPlayersInRoomByPlayerId(rooms, id),
        room = util.findRoomById(rooms, id),
        state = false,
        activePlayer = {},
        timeLeft = 10,
        pawns = {},
        finished = false,
        winner = undefined
    if (room != undefined) {
        state = room.active
        finished = room.finished
        winner = room.winner
        timeLeft = Math.floor(((1000 * room.turnTime) - (Date.now() - room.turnStart)) / 1000)
        let player = util.findActivePlayer(rooms, id)
        if (player != undefined) {
            activePlayer = {
                nick: player.nick,
                id: player.id,
                roll: player.roll
            }
        }
        pawns = room.retrieveAllPawns();
    }

    res.send(JSON.stringify({
        players: currentPlayers,
        room: {
            state: state,
            activePlayer: activePlayer,
            timeLeft: timeLeft,
            finished: finished,
            winner: winner
        },
        pawns: {
            currentPositions: pawns
        }
    }))

    res.end();
})

app.post('/changeReady', (req, res) => {
    let player = util.findPlayerById(rooms, req.cookies.id)
    player.ready = req.body.state
    if (util.findIfGameCanStart(rooms, req.cookies.id)) {
        let room = util.findRoomById(rooms, req.cookies.id)
        room.startGame()
    };

    res.end();
})

app.post('/move', (req, res) => {
    const id = req.cookies.id;
    if (id != util.findActivePlayer(rooms, id).id) return res.end();
    const i = req.body.i;
    let player = util.findPlayerById(rooms, id);
    const room = util.findRoomById(rooms, id);
    const moves = logic.retrievePawnsThatCanMove(player, player.roll.value);
    let pawn = player.pawns[i];
    pawn.moveSelf(moves[i]);
    player.roll.expires = Date.now();
    room.clearGameInterval();
    logic.killAllPawnsOnTile(pawn, room, player.color);
    logic.checkIfPlayerWon(player, room);

    res.end();
})

app.listen(PORT, () => {
    console.log("Server started at port 3000...");
});