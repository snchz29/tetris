function createField(){
    let tetris = document.createElement('div')
    tetris.classList.add('tetris')
    for (let i = 0; i < width * height; i++) {
        let cell = document.createElement('div')
        cell.classList.add('cell')
        tetris.appendChild(cell)
    }

    let main = document.getElementsByClassName('main')[0]
    main.appendChild(tetris)

    let cell = document.getElementsByClassName('cell')
    let i = 0

    for (let y = height; y > 0; y--) {
        for (let x = 1; x <= width; x++) {
            cell[i].setAttribute('posx', x)
            cell[i].setAttribute('posy', y)
            ++i;
        }
    }
}

function createNextArea(){
    let nextArea = document.getElementsByClassName("next")[0]
    for (let i = 0; i < 3 * 4; i++) {
        let cell = document.createElement('div')
        cell.classList.add('nextCell')
        nextArea.appendChild(cell)
    }
    let cell = document.getElementsByClassName('nextCell')
    let i = 0
    for (let y = 4; y > 0; y--) {
        for (let x = 1; x <= 3; x++) {
            cell[i].setAttribute('pos_x', x)
            cell[i].setAttribute('pos_y', y)
            ++i;
        }
    }
}