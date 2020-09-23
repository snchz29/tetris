import Game from "./src/game.js"
import View from "./src/view.js"
import Controller from "./src/controller.js"

const canvas = document.querySelector('.main')
const game = new Game()
const view = new View(canvas, 250, 500, 10, 20)
const controller = new Controller(game, view)
Cookie.setLeaderBoard()
window.game = game
window.view = view
window.controller = controller
