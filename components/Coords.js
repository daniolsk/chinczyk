class Coords {
    constructor() {
        this.boardCoords = [{
                x: 23,
                y: 224
            },
            {
                x: 73,
                y: 224
            },
            {
                x: 124,
                y: 224
            },
            {
                x: 174,
                y: 224
            },
            {
                x: 224,
                y: 224
            },
            {
                x: 224,
                y: 174
            },
            {
                x: 224,
                y: 123
            },
            {
                x: 224,
                y: 73
            },
            {
                x: 224,
                y: 23
            },
            {
                x: 275,
                y: 23
            },
            {
                x: 325,
                y: 23
            },
            {
                x: 325,
                y: 73
            },
            {
                x: 325,
                y: 123
            },
            {
                x: 325,
                y: 174
            },
            {
                x: 325,
                y: 224
            },
            {
                x: 376,
                y: 224
            },
            {
                x: 426,
                y: 224
            },
            {
                x: 477,
                y: 224
            },
            {
                x: 527,
                y: 224
            },
            {
                x: 527,
                y: 275
            },
            {
                x: 527,
                y: 325
            },
            {
                x: 477,
                y: 325
            },
            {
                x: 426,
                y: 325
            },
            {
                x: 376,
                y: 325
            },
            {
                x: 325,
                y: 325
            },
            {
                x: 325,
                y: 376
            },
            {
                x: 325,
                y: 426
            },
            {
                x: 325,
                y: 477
            },
            {
                x: 325,
                y: 527
            },
            {
                x: 275,
                y: 527
            },
            {
                x: 224,
                y: 527
            },
            {
                x: 224,
                y: 477
            },
            {
                x: 224,
                y: 426
            },
            {
                x: 224,
                y: 376
            },
            {
                x: 224,
                y: 325
            },
            {
                x: 174,
                y: 325
            },
            {
                x: 123,
                y: 325
            },
            {
                x: 73,
                y: 325
            },
            {
                x: 23,
                y: 325
            },
            {
                x: 23,
                y: 275
            }
        ]
        this.red = {
            startPositions: [{
                    x: 23,
                    y: 23
                },
                {
                    x: 73,
                    y: 23
                },
                {
                    x: 23,
                    y: 73
                },
                {
                    x: 73,
                    y: 73
                }
            ],
            endPositions: [{
                    x: 73,
                    y: 275
                },
                {
                    x: 123,
                    y: 275
                },
                {
                    x: 174,
                    y: 275
                },
                {
                    x: 224,
                    y: 275
                }
            ],
            startPositionIndex: 0,
            enterEndPositionIndex: 39
        }
        this.green = {
            startPositions: [{
                    x: 477,
                    y: 477
                },
                {
                    x: 527,
                    y: 477
                },
                {
                    x: 477,
                    y: 527
                },
                {
                    x: 527,
                    y: 527
                }
            ],
            endPositions: [{
                    x: 477,
                    y: 275
                },
                {
                    x: 426,
                    y: 275
                },
                {
                    x: 376,
                    y: 275
                },
                {
                    x: 325,
                    y: 275
                }
            ],
            startPositionIndex: 20,
            enterEndPositionIndex: 19
        }
        this.blue = {
            startPositions: [{
                    x: 477,
                    y: 23
                },
                {
                    x: 527,
                    y: 23
                },
                {
                    x: 477,
                    y: 73
                },
                {
                    x: 527,
                    y: 73
                }
            ],
            endPositions: [{
                    x: 275,
                    y: 73
                },
                {
                    x: 275,
                    y: 123
                },
                {
                    x: 275,
                    y: 174
                },
                {
                    x: 275,
                    y: 224
                }
            ],
            startPositionIndex: 10,
            enterEndPositionIndex: 9
        }
        this.yellow = {
            startPositions: [{
                    x: 23,
                    y: 477
                },
                {
                    x: 73,
                    y: 477
                },
                {
                    x: 23,
                    y: 527
                },
                {
                    x: 73,
                    y: 527
                }
            ],
            endPositions: [{
                    x: 275,
                    y: 477
                },
                {
                    x: 275,
                    y: 426
                },
                {
                    x: 275,
                    y: 376
                },
                {
                    x: 275,
                    y: 325
                }
            ],
            startPositionIndex: 30,
            enterEndPositionIndex: 29
        }
    }
}

module.exports = Coords