class Figure {
    constructor() {
        this.coordinates = []
        this.rotate = 0
        this.rotateVariants = []
    }
    turn() {
        let ret = this.rotateVariants[this.rotate]
        this.rotate = (++this.rotate) % 4
        return ret
    }
}

class Stick extends Figure {
    constructor() {
        super();
        this.coordinates = [[0, 1], [0, 2], [0, 3]]
        this.rotateVariants = [[[-1, 1], [0, 0], [1, -1], [2, -2]], [[1, -1], [0, 0], [-1, 1], [-2, 2]], [[-1, 1], [0, 0], [1, -1], [2, -2]], [[1, -1], [0, 0], [-1, 1], [-2, 2]]]
    }
}

class L_Figure1 extends Figure {
    constructor() {
        super();
        this.coordinates = [[1, 0], [0, 1], [0, 2]]
        this.rotateVariants = [[[0, 1], [-1, 0], [1, 0], [2, -1]], [[1, 1], [0, 2], [0, 0], [-1, -1]], [[0, -1], [1, 0], [-1, 0], [-2, 1]], [[-1, -1], [0, -2], [0, 0], [1, 1]]]
    }
}

class L_Figure2 extends Figure {
    constructor() {
        super();
        this.coordinates = [[1, 0], [1, 1], [1, 2]]
        this.rotateVariants = [[[0, 2], [-1, 1], [0, 0], [1, -1]], [[1, 0], [0, 1], [-1, 0], [-2, -1]], [[0, -2], [1, -1], [0, 0], [-1, 1]], [[-1, 0], [0, -1], [1, 0], [2, 1]]]
    }
}

class S_Figure1 extends Figure {
    constructor() {
        super();
        this.coordinates = [[1, 0], [1, 1], [2, 1]]
        this.rotateVariants = [[[1, 0], [0, 1], [-1, 0], [-2, 1]], [[-1, 0], [0, -1], [1, 0], [2, -1]], [[1, 0], [0, 1], [-1, 0], [-2, 1]], [[-1, 0], [0, -1], [1, 0], [2, -1]]]
    }
}

class S_Figure2 extends Figure {
    constructor() {
        super();
        this.coordinates = [[0, 1], [1, 1], [1, 2]]
        this.rotateVariants = [[[0, 1], [1, 0], [0, -1], [1, -2]], [[0, -1], [-1, 0], [0, 1], [-1, 2]], [[0, 1], [1, 0], [0, -1], [1, -2]], [[0, -1], [-1, 0], [0, 1], [-1, 2]]]
    }
}

class T_Figure extends Figure {
    constructor() {
        super();
        this.coordinates = [[1, 0], [2, 0], [1, 1]]
        this.rotateVariants = [[[1, 2], [0, 1], [-1, 0], [1, 0]], [[1, -1], [0, 0], [-1, 1], [-1, -1]], [[-1, -1], [0, 0], [1, 1], [-1, 1]], [[-1, 0], [0, -1], [1, -2], [1, 0]]]
    }
}

class Square extends Figure {
    constructor() {
        super();
        this.coordinates = [[1, 0], [0, 1], [1, 1]]
        this.rotateVariants = []
    }

    turn() {
        return [[0, 0], [0, 0], [0, 0], [0, 0]]
    }
}

function Factory(rand) {
    switch (rand) {
        case 0:
            return new Stick()
        case 1:
            return new L_Figure1()
        case 2:
            return new L_Figure2()
        case 3:
            return new S_Figure1()
        case 4:
            return new S_Figure2()
        case 5:
            return new T_Figure()
        case 6:
            return new Square()
    }
}