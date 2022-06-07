//dados iniciais
let square = {
    a1: '',
    a2: '',
    a3: '',
    b1: '',
    b2: '',
    b3: '',
    c1: '',
    c2: '',
    c3: ''
}

let playerTurn = ''
let warning = ''
let playing = false

reset()

//Eventos
document.querySelector('.reset').addEventListener('click', reset)

document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('click', itemClick)
})

//Funções

function itemClick(event) {
    let item = event.target.getAttribute('data-item')

    if (playing && square[item] === '') {
        square[item] = playerTurn
        renderSquare()
        togglePlayer()
    }
}

function reset() {
    warning = ''
    let random = Math.floor(Math.random() * 2)
    if (random == 0) {
        playerTurn = 'X'
    } else {
        playerTurn = 'O'
    }

    for (let i in square) {
        square[i] = ''
    }

    playing = true

    renderSquare()
    renderInfo()
}

function renderSquare() {
    for (let i in square) {
        let item = document.querySelector(`div[data-item=${i}]`)
        if (square[i] !== '') {
            item.innerHTML = square[i]
        } else {
            item.innerHTML = ''
        }
    }
    checkGame()
}

function renderInfo() {
    document.querySelector('.vez').innerHTML = playerTurn
    document.querySelector('.resultado').innerHTML = warning
}

function togglePlayer() {
    if (playerTurn == 'X') playerTurn = 'O'
    else playerTurn = 'X'
    renderInfo()
}

function checkGame() {
    if (checkWinnerFor('X')) {
        warning = 'O jogador X venceu'
        playing = false
    } else if (checkWinnerFor('O')) {
        warning = 'O jogador O venceu'
        playing = false
    } else if (isFull()) {
        warning = 'Deu empate'
        playing = false
    }
}

function checkWinnerFor(playerTurn) {
    let pos = [
        'a1,a2,a3',
        'b1,b2,b3',
        'c1,c2,c3',
        'a1,b1,c1',
        'a2,b2,c2',
        'a3,b3,c3',
        'a1,b2,c3',
        'a3,b2,c1'
    ]

    for (let w in pos) {
        let pArray = pos[w].split(',')
        let hasWon = pArray.every(option => {
            if (square[option] == playerTurn) {
                return true
            } else {
                return false
            }
        })
        if (hasWon) {
            return true
        }
    }
    return false
}

function isFull() {
    for (let i in square) {
        if (square[i] == '') {
            return false
        }
    }
    return true
}
