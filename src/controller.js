import Game from "./game.js"
import View from "./view.js"
export default class Controller {
    constructor() {
        const canvas = document.querySelector('.main')
        this.view = new View(canvas, 250, 500, 10, 20)
        this.startGame()
        document.addEventListener("keydown", this.handleKeyDown.bind(this))
        document.addEventListener("keyup", this.handleKeyUp.bind(this))
    }
    startGame(){
        this.game = new Game()
        this.isPlaying = false
        this.isOver = false
        this.intervalID = null
        this.view.renderStartScreen(this.game.getState())
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
        this.view.renderStartScreen(this.game.getState())
    }

    updateView() {
        const state = this.game.getState()
        if (state.isGameOver) {
            this.view.renderEndScreen(this.game.getState())
            this.isOver = true
            this.stopTimer()
            Cookie.setLeaderBoard()
        }else if (!this.isPlaying){
            this.view.renderStartScreen(this.game.getState())
        } else {
            this.view.renderMainScreen(this.game.getState())
        }
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
        if (this.isOver) {
            switch (event.keyCode) {
                case 13:
                    this.startGame()
                    break
            }
        }
        else {
            switch (event.keyCode) {
                case 13:
                    if (this.isPlaying) {
                        this.pause()
                        this.view.renderStartScreen(this.game.getState())
                    } else {
                        this.play()
                        this.updateView()
                    }
                    break
                case 37:
                    if (this.isPlaying) {
                        this.game.movePieceLeft()
                        this.updateView()
                    }
                    break
                case 38:
                    if (this.isPlaying) {
                        this.game.rotatePiece()
                        this.updateView()
                    }
                    break
                case 39:
                    if (this.isPlaying) {
                        this.game.movePieceRight()
                        this.updateView()
                    }
                    break
                case 40:
                    if (this.isPlaying) {
                        this.stopTimer()
                        this.game.movePieceDown()
                        this.updateView()
                    }
                    break
            }
        }
    }

    handleKeyUp(event){
        if (event.keyCode == 40){
            this.startTimer()
        }
    }
}