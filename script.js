let order = [];
let clickedOrder = [];
let score = -1;
let gameStarted = 0;
let gameOver = 0;

// 0 - verde 1- vermelho 2- amarelo 4 - azul

const blue = document.querySelector('.blue-button');
const red = document.querySelector('.red-button');
const yellow = document.querySelector('.yellow-button');
const green = document.querySelector('.green-button');
const startButton = document.querySelector('#start-button');

function shuffleOrder() {
    let colorOrder = Math.floor(Math.random() * 4);
    order[order.length] = colorOrder;
    clickedOrder = [];

    for (let number in order) {
        let elementColor = createColorElement(order[number]);
        lightColor(elementColor, Number(number) + 1);
    }
}

function lightColor(element, number) {
    number = number * 500;

    setTimeout(() => {
        element.classList.add('selected');
    }, number - 250);

    setTimeout(() => {
        element.classList.remove('selected');
    }, number);
}

function checkOrder() {
    for (let index in clickedOrder) {
        if (clickedOrder[index] != order[index]) {
            console.log('clicou errado');
            loseGame();
            break;
        }
    }

    if (clickedOrder.length == order.length && gameOver == 0) {
        nextLevel();
    }
}

function clickMouse(color) {
    if (gameStarted != 1) {
        document.getElementById("score-game").innerHTML = "Start the game to interact";
    }
    else {
        clickedOrder[clickedOrder.length] = color;
        createColorElement(color).classList.add('selected');

        setTimeout(() => {
            createColorElement(color).classList.remove('selected');
            checkOrder();
        }, 250);
    }
}

function createColorElement(color) {
    if (color == 0) {
        return green;
    } else if (color == 1) {
        return red;
    } else if (color == 2) {
        return yellow;
    }
    else if (color == 3) {
        return blue;
    }
}

function nextLevel() {
    score++;
    document.getElementById("score-game").innerHTML = "Score: " + score;
    shuffleOrder();
}

function loseGame() {
    document.getElementById("score-game").innerHTML = "Score: " + score + " You lose :(";
    order = [];
    clickedOrder = [];
    gameStarted = 0;
    gameOver = 1;
    startButton.disabled = false;
}

function startGame() {
    score = -1;
    order = [];
    clickedOrder = [];
    gameStarted = 1;
    gameOver = 0;
    document.getElementById("score-game").innerHTML = "Score: " + score;
    startButton.disabled = true;

    nextLevel();
}

green.onclick = () => clickMouse(0);
red.onclick = () => clickMouse(1);
yellow.onclick = () => clickMouse(2);
blue.onclick = () => clickMouse(3);

startButton.onclick = () => startGame();
