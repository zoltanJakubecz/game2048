const board = [
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0]
];

function moveNumbers() {

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
    starterBoard();
    drawBoard();
    }

main();