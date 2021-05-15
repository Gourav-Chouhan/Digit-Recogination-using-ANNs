let nn;
let input;
let board = [];
let box;

function setup() {
    createCanvas(28 * 15, 28 * 15);
    background(51);
    box = width / 28;
    clearBoard();
    nn = new Network([784, 800, 10]);
    // console.log(nn.weights);
}


function draw() {
    for (let i = 0; i < 28; i++) {
        for (let j = 0; j < 28; j++) {
            fill(255 - board[i][j]);
            // stroke(random(40, 244));
            noStroke();
            rect(box * j, box * i, box, box);
        }
    }
    // noLoop();
}

function mouseDragged() {
    let x = map(mouseX, 0, width, 0, 28);
    let y = map(mouseY, 0, height, 0, 28);
    x = floor(x);
    y = floor(y);
    board[y][x] = 255;
    board[y][x + 1] = 200;
    board[y + 1][x + 1] = 223;
    // board[y - 1][x] = 222;
    board[y + 1][x + 1] = 225;
    // console.log(x, nn.feed_forward(input).matrix[0][0]);
}

function clearBoard() {
    for (let i = 0; i < 28; i++) {
        board[i] = [];
        for (let j = 0; j < 28; j++) {
            board[i][j] = 0;
        }
    }
}

function reshape(list) {
    let g = [];

    let count = 0;
    list = list.split(",");

    for (let i = 0; i < 28; i++) {
        g[i] = [];
        for (let j = 0; j < 28; j++) {
            g[i][j] = 255 - parseInt(list[count++]);
        }
    }

    return g;
}

function predict() {
    let inputs = new Matrix(784, 1);
    let count = 0;
    for (let i = 0; i < 28; i++) {
        for (let j = 0; j < 28; j++) {
            inputs.matrix[count++][0] = (board[i][j] + 0.001) / 255 - 0.002;
        }
    }
    let outputs = nn.feed_forward(inputs);
    let maxi;
    let m = -10;
    for (let i = 0; i < 10; i++) {
        if (outputs.matrix[i][0] > m) {
            maxi = i;
            m = outputs.matrix[i][0];
        }
    }
    document.getElementById("status").innerHTML = "I think its " + (maxi);
    console.log(outputs);
    clearBoard();
}