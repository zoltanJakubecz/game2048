let board = [
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0]
];

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

function mergeNumbers(given_board) {
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
    return given_board;
}

function organizeNumbers(direction, boardToProcess) {
    if (direction == 'left') {
        let row;
        for (row of boardToProcess) {
            //Skip equal rows
            if (!(row.every((val, i, arr) => val === arr[0]))) {
                for (let pos = 0; pos < 4; pos++) {
                    if (row[pos] !== 0) {
                        continue;
                    }
                    for (let runs = 0; runs < 4; runs++) {
                        let nextColumn = pos + 1;
                        if (nextColumn < 4) {
                            if (row[nextColumn] !== 0) {
                                row[pos] = row[nextColumn];
                                row[nextColumn] = 0;
                            } else {
                                continue;
                            }
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
        board = [
            [0,4,2,4],
            [0,2,0,2],
            [0,8,0,8],
            [8,4,4,8]
        ];

        //FOR DEBUG
        console.log(board);
        drawBoard();
        //FOR DEBUG

        mergedBoard = mergeNumbers(board);

        //FOR DEBUG
        console.log(mergedBoard);
        //organizeNumbers('left', mergedBoard);
        //FOR DEBUG

        finishedBoard = organizeNumbers('left', mergedBoard);
        console.log(finishedBoard);
    }
    else if (code == '39') {
       // Right

    }
  //  board = finishedBoard;
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
            cells[i].textContent = arrBoard[i];
        } else {
            cells[i].textContent = '';
        }
    }

}

function randomStartNumbers(){
    return (Math.floor(Math.random() * 100 > 80 ? 4 : 2));
}

function starterBoard(){
    const container = document.querySelector('.container');

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
    board[coordinates1[0]][coordinates1[1]] = 2;
    board[coordinates2[0]][coordinates2[1]] = randomStartNumbers();

}

function main() {
    document.addEventListener('keydown', catchMove);
    starterBoard();
    drawBoard();
    }

main();