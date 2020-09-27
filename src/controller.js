export default class Controller {
    constructor(game, view) {
        this.game = game
        this.view = view
        this.isPlaying = false
        this.intervalID = null
        document.addEventListener("keydown", this.handleKeyDown.bind(this))
        document.addEventListener("keyup", this.handleKeyUp.bind(this))
        this.view.renderStartScreen()
    }

    update() {
        this.game.movePieceDown()
        this.updateView()
    }

    play() {
        this.isPlaying = true
        this.startTimer()
        this.updateView()
    }

    pause() {
        this.isPlaying = false
        this.stopTimer()
        this.updateView()
    }

    updateView() {
        const state = this.game.getState()
        if (state.isGameOver){
            this.stopTimer()
            alert(`Game over! Your score: ${state.score}.`)
        }

        this.view.renderMainScreen(this.game.getState())
    }

    startTimer() {
        const speed = 1000 - this.game.getState().level * 100
        if (!this.intervalID) {
            this.intervalID = setInterval(() => {
                this.update()
            }, speed > 0 ? speed : 100)
        }
    }

    stopTimer() {
        if (this.intervalID) {
            clearInterval(this.intervalID)
            this.intervalID = null
        }
    }

    handleKeyDown(event) {
        switch (event.keyCode) {
            case 13:
                if (this.isPlaying) {
                    this.pause()
                } else {
                    this.play()
                }
                break
            case 37:
                if (this.isPlaying) {
                    this.game.movePieceLeft()
                }
                break
            case 38:
                if (this.isPlaying) {
                    this.game.rotatePiece()
                }
                break
            case 39:
                if (this.isPlaying) {
                    this.game.movePieceRight()
                }
                break
            case 40:
                if (this.isPlaying) {
                    this.stopTimer()
                    this.game.movePieceDown()
                }
                break
        }
        this.updateView()
    }

    handleKeyUp(event){
        if (event.keyCode == 40){
            this.startTimer()
        }
    }
}