function createField(){
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