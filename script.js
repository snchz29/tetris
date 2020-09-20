let tetris = document.createElement('div')
tetris.classList.add('tetris')
document.getElementsByTagName("input")[0].value = getName()
const width = 10
const height = 24
var moveInterval = 15000000

createField()
let x = Math.floor(width / 2), y = height - 14
let curFigure = 0
let figureBody = 0
let rotate = 0

function create() {
    function getRandom() {
        return Math.round(Math.random() * (6))
    }
    rotate = 0
    curFigure = Factory(getRandom())
    console.log(curFigure)
    figureBody = [
        document.querySelector(`[posx = "${x}"][posy = "${y}"]`),
        document.querySelector(`[posx = "${x + curFigure.coordinates[0][0]}"][posy = "${y + curFigure.coordinates[0][1]}"]`),
        document.querySelector(`[posx = "${x + curFigure.coordinates[1][0]}"][posy = "${y + curFigure.coordinates[1][1]}"]`),
        document.querySelector(`[posx = "${x + curFigure.coordinates[2][0]}"][posy = "${y + curFigure.coordinates[2][1]}"]`)
    ]
    console.log(figureBody)
    for (let i = 0; i < figureBody.length; i++) {
        figureBody[i].classList.add('figure')
        // figureBody[i].classList.add(curFigure.color)

    }
}

create()

function moveDown() {
    let moveFlag = true
    let coordinates = []
    for (let i = 0; i < 4; ++i) {
        coordinates.push([figureBody[i].getAttribute("posx"), figureBody[i].getAttribute("posy")])
    }
    for (let i = 0; i < coordinates.length; ++i) {
        if (coordinates[i][1] == 1 ||
            document.querySelector(`[posx = "${coordinates[i][0]}"][posy = "${coordinates[i][1] - 1}"]`).classList.contains('set')) {
            moveFlag = false
            break
        }
    }
    if (moveFlag == true) {
        for (let i = 0; i < figureBody.length; ++i) {
            figureBody[i].classList.remove("figure")
        }
        figureBody = [
            document.querySelector(`[posx = "${coordinates[0][0]}"][posy = "${coordinates[0][1] - 1}"]`),
            document.querySelector(`[posx = "${coordinates[1][0]}"][posy = "${coordinates[1][1] - 1}"]`),
            document.querySelector(`[posx = "${coordinates[2][0]}"][posy = "${coordinates[2][1] - 1}"]`),
            document.querySelector(`[posx = "${coordinates[3][0]}"][posy = "${coordinates[3][1] - 1}"]`)
        ]
        for (let i = 0; i < figureBody.length; ++i) {
            figureBody[i].classList.add("figure")
        }
    } else {
        for (let i = 0; i < figureBody.length; ++i) {
            figureBody[i].classList.remove("figure")
            figureBody[i].classList.add("set")
        }
        for (let y = 1; y < 21; ++y) {
            let countSet = 0
            for (let x = 1; x <= width; ++x) {
                if (document.querySelector(`[posx = "${x}"][posy = "${y}"]`).classList.contains("set")) {
                    countSet++
                    if (countSet == width) {
                        for (let m = 1; m <= width; ++m) {
                            document.querySelector(`[posx = "${m}"][posy = "${y}"]`).classList.remove("set")
                        }
                        let allSets = document.querySelectorAll(`.set`)
                        let newSets = []
                        for (let s = 0; s < allSets.length; ++s) {
                            let setCoordinates = [allSets[s].getAttribute(`posx`), allSets[s].getAttribute(`posy`)]
                            if (setCoordinates[1] > y) {
                                allSets[s].classList.remove(`set`)
                                newSets.push(document.querySelector(`[posx = "${setCoordinates[0]}"][posy = "${setCoordinates[1] - 1}"]`))
                            }
                        }
                        for (let add = 0; add < newSets.length; ++add) {
                            newSets[add].classList.add(`set`)
                        }
                        --y
                    }
                }
            }
        }
        for (let i = 1; i <= width; ++i){
            if (document.querySelector(`[posx = "${i}"][posy = "${21}"]`).classList.contains("set")){
                clearInterval(interval)
                alert("Game over :((")
                break;
            }
        }
        create()
    }
}


let interval = setInterval(() => {
    moveDown()
}, moveInterval)

window.addEventListener("keydown", function (e) {
    let coordinates = [
        [figureBody[0].getAttribute("posx"), figureBody[0].getAttribute("posy")],
        [figureBody[1].getAttribute("posx"), figureBody[1].getAttribute("posy")],
        [figureBody[2].getAttribute("posx"), figureBody[2].getAttribute("posy")],
        [figureBody[3].getAttribute("posx"), figureBody[3].getAttribute("posy")]
    ]

    function getNewState(a) {
        let flag = true
        let figureNew = [
            document.querySelector(`[posx = "${+coordinates[0][0] + a}"][posy = "${coordinates[0][1]}"]`),
            document.querySelector(`[posx = "${+coordinates[1][0] + a}"][posy = "${coordinates[1][1]}"]`),
            document.querySelector(`[posx = "${+coordinates[2][0] + a}"][posy = "${coordinates[2][1]}"]`),
            document.querySelector(`[posx = "${+coordinates[3][0] + a}"][posy = "${coordinates[3][1]}"]`)
        ]
        for (let i = 0; i < figureBody.length; ++i) {
            if (!figureNew[i] || figureNew[i].classList.contains("set")) {
                flag = false
            }
        }
        if (flag) {
            for (let i = 0; i < figureBody.length; ++i) {
                figureBody[i].classList.remove("figure")
            }
            figureBody = figureNew
            for (let i = 0; i < figureBody.length; ++i) {
                figureBody[i].classList.add("figure")
            }
        }
    }

    function turnFigure() {
        let flag = true
        let tFig = curFigure.turn()
        let figureNew = [
            document.querySelector(`[posx = "${+coordinates[0][0] + tFig[0][0]}"][posy = "${+coordinates[0][1] + tFig[0][1]}"]`),
            document.querySelector(`[posx = "${+coordinates[1][0] + tFig[1][0]}"][posy = "${+coordinates[1][1] + tFig[1][1]}"]`),
            document.querySelector(`[posx = "${+coordinates[2][0] + tFig[2][0]}"][posy = "${+coordinates[2][1] + tFig[2][1]}"]`),
            document.querySelector(`[posx = "${+coordinates[3][0] + tFig[3][0]}"][posy = "${+coordinates[3][1] + tFig[3][1]}"]`),
        ]
        for (let i = 0; i < figureBody.length; ++i) {
            if (!figureNew[i] || figureNew[i].classList.contains("set")) {
                flag = false
            }
        }
        if (flag) {
            for (let i = 0; i < figureBody.length; ++i) {
                figureBody[i].classList.remove("figure")
            }
            figureBody = figureNew
            for (let i = 0; i < figureBody.length; ++i) {
                figureBody[i].classList.add("figure")
            }
        }else{
            curFigure.rotate = (curFigure.rotate + 3) % 4
        }
    }

    console.log(e.key)
    if (e.key == "ArrowLeft") {
        getNewState(-1)
    } else if (e.key == "ArrowRight") {
        getNewState(1)
    } else if (e.key == "ArrowDown") {
        moveDown()
    } else if (e.key == "ArrowUp") {
        turnFigure()
    }
})