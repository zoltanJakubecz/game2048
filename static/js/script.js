let board = [
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0]
];

function isGameOver(){
    // board = [
    //     [1,2,3,4],
    //     [5,6,6,8],
    //     [9,8,4,5],
    //     [7,4,3,1]
    // ];
    for(let i = 0; i < 4; i++){
        for(let j = 0; j < 4; j++){
            if(board[i][j] == 2048){
                return true;
            }
            if(!board[i][j]){
                return false;
            }
            if(i < 3 && board[i][j] == board[i+1][j]){
                return false;
            }
            if(j < 3 && board[i][j] == board[i][j+1]){
                return false;
            }
        }
    }
    return true;
}


function randomPosition(){
    // board = [
    //     [0,2,3,0],
    //     [5,6,0,8],
    //     [9,8,0,5],
    //     [7,4,3,0]
    // ];
    let possiblePosition = [];
    for(let i = 0; i < 4; i++){
        for(let j = 0; j < 4; j++){
            if(board[i][j] == 0){
                possiblePosition.push([i,j]);
            }
        }
    }
    console.log(possiblePosition);
    let coordinates = possiblePosition[Math.floor(Math.random() * possiblePosition.length)];
    console.log(coordinates);
    board[coordinates[0]][coordinates[1]] = randomStartNumbers();

let shiftedboard = [
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0]
];

function shiftArray() {
    for(let row = 0; row < 4; row++) {
        for(let column = 0; column < 4; column++) {
            shiftedboard[column][row] = board[row][column];
        }
    }
}

function mergeNumbers(direction, given_board) {
    if (direction === 'left') {
        let row;
        for (row of given_board) {
            if(((row[0] === row[1]) || (row[2] === row[3])) && (row[0] !== 0 && row[2] !== 0)) {
                if((row[0] === row[1]) && row[0] !== 0) {
                    //LEFT TWO
                    row[0] += row[1];
                    row[1] = 0;
                }
                if((row[2] === row[3]) && row[2] !== 0) {
                    //RIGHT TWO
                    row[2] += row[3];
                    row[3] = 0;
                }
            } else if((row[1] === row[2]) && row[1] !== 0) {
                //MIDDLE TWO
                row[1] += row[2];
                row[2] = 0;
            } else if((row[0] === row[2]) && row[0] !== 0 && row[1] === 0) {
                //1,3
                row[0] += row[2];
                row[2] = 0;
            } else if((row[0] === row[3]) && row[0] !== 0 && row[1] === 0 && row[2] === 0) {
                //1,4
                row[0] += row[3];
                row[3] = 0;
            } else if((row[1] === row[3]) && row[1] !== 0 && row[2] === 0) {
                //2,4
                row[1] += row[3];
                row[3] = 0;
            }
        }
    }
    return given_board;
}

function organizeNumbers(direction, boardToProcess) {
    if (direction == 'left') {
        let row;
        for (row of boardToProcess) {
            if ((!(row.every((val, i, arr) => val === arr[0]))) && row.includes(0)) {
                for (let pos = 0; pos < 4; pos++) {
                    if ((row[pos] !== 0)) {
                        continue;
                    }
                    for (let runs = 0; runs < 3-pos; runs++) {
                        let nextColumn = pos + runs + 1;
                        if (row[nextColumn] !== 0) {
                            row[pos] = row[nextColumn];
                            row[nextColumn] = 0;
                            break;
                        }
                    }
                }
            }
        }
    }
    return boardToProcess;
}

function catchMove(event) {
    let code = event.which || event.keyCode;
    if (code == '38') {
        shiftArray();
        // Up

    }
    else if (code == '40') {
        shiftArray();
        // Down
    }
    else if (code == '37') {
        // Left
        mergedBoard = mergeNumbers('left', board);
        finishedBoard = organizeNumbers('left', mergedBoard);
    }
    else if (code == '39') {
       // Right
        mergedBoard = mergeNumbers('right', board);
        finishedBoard = organizeNumbers('right', mergedBoard);
    }
    drawBoard();
}

function randomStartCoordinates(){
    let x = Math.floor(Math.random() * 4);
    let y = Math.floor(Math.random() * 4);
    return [x,y];
}

function drawBoard(){
    const cells = document.querySelectorAll('.cell');
    let arrBoard = board.flat();
    for(let i=0; i<cells.length; i++){
        if(arrBoard[i]){
            if(arrBoard[i] / 100 >= 1){
                if(arrBoard[i] / 1000 >= 1){
                    cells[i].classList.add('four-digit-size');
                } else {
                    cells[i].classList.add('three-digit-size');
                }
            } else {
                cells[i].classList.remove('three-digit-size');
                cells[i].classList.remove('four-digit-size');
            }
            cells[i].textContent = arrBoard[i];
            cells[i].classList.add('number');
        } else {
            cells[i].textContent = '';
            cells[i].classList.remove(('number'));
        }
    }

}

function randomStartNumbers(){
    return (Math.floor(Math.random() * 100 > 80 ? 4 : 2));
}

function starterBoard(){
    const container = document.querySelector('.game-container');

    for(let row = 0; row < 4; row++){
        for(let column = 0; column < 4; column++){
            let newCell = document.createElement('div');
            newCell.setAttribute('class', 'cell');
            container.appendChild(newCell);
        }
    }

    let coordinates1 = randomStartCoordinates();
    let coordinates2 = randomStartCoordinates();
    while(JSON.stringify(coordinates1)==JSON.stringify(coordinates2)){
        coordinates2 = randomStartCoordinates();
    }
    board[coordinates1[0]][coordinates1[1]] = 2048;
    board[coordinates2[0]][coordinates2[1]] = randomStartNumbers();

}

function main() {
    document.addEventListener('keydown', catchMove);
    starterBoard();
    drawBoard();
    console.log(isGameOver());
    }

main();

//FOR DEBUG
board = [
    [0,4,2,4],
    [0,2,2,2],
    [0,8,0,8],
    [8,4,4,8]
];
drawBoard();
//FOR DEBUG