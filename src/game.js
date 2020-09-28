export default class Game {
    constructor() {
        Cookie.setLeaderBoard()
    }
    static columns = 10
    static rows = 20
    static points = {
        0: 0,
        1: 10,
        2: 40,
        3: 100,
        4: 500
    }
    name = Cookie.getName()
    score = 0
    lines = 0
    topOut = false
    playfield = this.createPlayfield()
    activePiece = this.createPiece()
    nextPiece = this.createPiece()

    get level() {
        return ~~(this.lines / 10) + 1
    }

    createPlayfield() {
        const playfield = []
        for (let y = 0; y < Game.rows + 2; y++) {
            playfield[y] = []
            for (let x = 0; x < Game.columns; x++) {
                playfield[y][x] = 0
            }
        }
        return playfield
    }

    createPiece() {
        const index = ~~(Math.random() * 7)
        const type = "IJLOSTZ"[index]
        const piece = {}
        switch (type) {
            case 'I':
                piece.blocks = [
                    [0, 0, 0, 0],
                    ['I', 'I', 'I', 'I'],
                    [0, 0, 0, 0],
                    [0, 0, 0, 0]
                ]
                break
            case 'J':
                piece.blocks = [
                    ['J', 0, 0],
                    ['J', 'J', 'J'],
                    [0, 0, 0]
                ]
                break
            case 'L':
                piece.blocks = [
                    [0, 0, 'L'],
                    ['L', 'L', 'L'],
                    [0, 0, 0]
                ]
                break
            case 'O':
                piece.blocks = [
                    [0, 0, 0, 0],
                    [0, 'O', 'O', 0],
                    [0, 'O', 'O', 0],
                    [0, 0, 0, 0]
                ]
                break
            case 'S':
                piece.blocks = [
                    [0, 'S', 'S'],
                    ['S', 'S', 0],
                    [0, 0, 0]
                ]
                break
            case 'T':
                piece.blocks = [
                    [0, 'T', 0],
                    ['T', 'T', 'T'],
                    [0, 0, 0]
                ]
                break
            case 'Z':
                piece.blocks = [
                    ['Z', 'Z', 0],
                    [0, 'Z', 'Z'],
                    [0, 0, 0]
                ]
                break
        }
        piece.x = ~~((10 - piece.blocks[0].length) / 2)
        piece.y = 0
        return piece
    }

    updatePieces() {
        this.activePiece = this.nextPiece
        this.nextPiece = this.createPiece()
    }

    getState() {
        const {x: pieceX, y: pieceY, blocks} = this.activePiece
        const playfield = []
        for (let y = 0; y < this.playfield.length; y++) {
            playfield[y] = []
            for (let x = 0; x < this.playfield[y].length; x++) {
                playfield[y][x] = this.playfield[y][x]
            }
        }
        for (let y = 0; y < blocks.length; y++) {
            for (let x = 0; x < blocks[y].length; x++) {
                if (blocks[y][x]) {
                    playfield[y + pieceY][x + pieceX] = blocks[y][x]
                }
            }
        }
        return {
            name: this.name,
            score: this.score,
            level: this.level,
            lines: this.lines,
            nextPiece: this.nextPiece,
            playfield,
            isGameOver: this.topOut
        }
    }

    movePieceLeft() {
        this.activePiece.x -= 1
        if (this.hasCollision()) {
            this.activePiece.x += 1
        }
    }

    movePieceRight() {
        this.activePiece.x += 1
        if (this.hasCollision()) {
            this.activePiece.x -= 1
        }
    }

    movePieceDown() {
        if (this.topOut) return
        this.activePiece.y += 1
        if (this.hasCollision()) {
            this.activePiece.y -= 1
            this.lockPiece()
            this.clearLines()
            this.updatePieces()
        }
        if (this.hasCollision()) {
            this.topOut = true
            Cookie.addLeader(this.name, this.score)
        }
    }

    rotatePiece() {
        const blocks = this.activePiece.blocks
        const len = this.activePiece.blocks.length
        const tmp = []
        for (let i = 0; i < len; i++) {
            tmp[i] = new Array(i)
        }
        for (let y = 0; y < len; y++) {
            for (let x = 0; x < len; x++) {
                tmp[y][x] = blocks[len - x - 1][y]
            }
        }
        this.activePiece.blocks = tmp
        if (this.hasCollision()) {
            this.activePiece.blocks = blocks
        }
        return this.activePiece.blocks
    }

    hasCollision() {
        const playfield = this.playfield
        const {x: pieceX, y: pieceY, blocks} = this.activePiece
        for (let y = 0; y < blocks.length; y++) {
            for (let x = 0; x < blocks[y].length; x++) {
                if (
                    blocks[y][x] &&
                    ((playfield[pieceY + y] === undefined || playfield[pieceY + y][pieceX + x] === undefined) ||
                        playfield[pieceY + y][pieceX + x])
                ) {
                    return true
                }
            }
        }
        return false
    }

    lockPiece() {
        const {x: pieceX, y: pieceY, blocks} = this.activePiece
        for (let y = 0; y < blocks.length; y++) {
            for (let x = 0; x < blocks[y].length; x++) {
                if (blocks[y][x]) {
                    this.playfield[pieceY + y][pieceX + x] = blocks[y][x]
                }
            }
        }
    }

    updateScore(cleared) {
        this.score += Game.points[cleared] * this.level
        this.lines += cleared
    }

    clearLines() {
        let lines = []
        for (let y = this.playfield.length - 1; y >= 0; y--) {
            let countBlocks = 0
            for (let x = 0; x < Game.columns; x++) {
                if (this.playfield[y][x]) {
                    countBlocks++
                }
            }
            if (countBlocks === 0) {
                break
            } else if (countBlocks === Game.columns) {
                lines.unshift(y)
            }
        }
        for (let i of lines) {
            this.playfield.splice(i, 1)
            this.playfield.unshift(new Array(10).fill(0))
        }
        this.updateScore(lines.length)
    }
}