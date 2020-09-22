export default class View {
    static colors = {
        "I": 'red',
        "J": 'orange',
        "L": 'yellow',
        "O": 'green',
        "S": 'cyan',
        "T": 'blue',
        "Z": 'indigo'
    }

    constructor(element, width, height, columns, rows) {
        this.element = element
        this.width = width
        this.height = height

        this.canvas = document.createElement('canvas')
        this.canvas.width = this.width
        this.canvas.height = this.height
        this.context = this.canvas.getContext('2d')
        this.element.appendChild(this.canvas)
        this.nextPieceCanvas = document.querySelector('canvas.next')
        this.nextPieceCanvas.width = 100
        this.nextPieceCanvas.height = 100

        this.blockWidth = this.width / columns
        this.blockHeight = this.height / rows

    }

    renderMainScreen(state) {
        this.clearScreen()
        this.renderPlayfield(state)
        this.renderPanel(state)
        this.renderNextPiece(state)
    }

    renderStartScreen(){
        this.context.fillStyle = 'white'
        this.context.font = 'Press Start 2P'
        this.context.textAlign = 'center'
        this.context.textBaseline = 'middle'
        // this.context.fillText('Нажмите ENTER', this.width/2, )
    }

    renderPanel({name, score, level, lines}) {
        const textArea = document.querySelector('textarea')
        let text = name + "\n"
        text += 'Очки: ' + score + "\n"
        text += 'Уровень: ' + level + "\n"
        text += 'Линии: ' + lines
        textArea.value = text
    }

    renderNextPiece({nextPiece}) {
        const blocks = nextPiece.blocks
        const context = this.nextPieceCanvas.getContext('2d')
        const offsetX = ~~((this.nextPieceCanvas.width - (blocks[0].length * this.blockWidth)) / 2)
        const offsetY = ~~((this.nextPieceCanvas.height - (blocks.length * this.blockHeight)) / 2)
        this.clearScreen(context)
        for (let y = 0; y < blocks.length; y++) {
            for (let x = 0; x < blocks[y].length; x++) {
                if(blocks[y][x]) {
                    this.renderBlock(offsetX+x * this.blockWidth, offsetY+y * this.blockHeight, this.blockWidth, this.blockHeight, View.colors[blocks[y][x]], context)
                }
            }
        }
    }

    clearScreen(context = this.context) {
        context.clearRect(0, 0, this.width, this.height)
    }

    renderPlayfield({playfield}) {
        for (let y = 0; y < playfield.length-2; y++) {
            const line = playfield[y+2]
            for (let x = 0; x < line.length; x++) {
                const block = line[x]
                if (block) {
                    this.renderBlock(x * this.blockWidth, y * this.blockHeight, this.blockWidth, this.blockHeight, View.colors[block])
                }
            }
        }
    }

    renderBlock(x, y, width, height, color, context = this.context) {
        context.fillStyle = color
        context.strokeStyle = 'black'
        context.lineWidth = 2
        context.fillRect(x, y, width, height)
        context.strokeRect(x, y, width, height)
    }
}