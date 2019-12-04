let board = [
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0]
];

function RandomCoordinates() {
    let x = Math.floor(Math.random() * 4) + 1;
    let y = Math.floor(Math.random() * 4) + 1;
    return [x,y];
}

function starterBoard() {
    let coordinates1 = RandomCoordinates();
    let coordinates2 = RandomCoordinates();
    while(coordinates1 == coordinates2) {
        coordinates1 = RandomCoordinates();
        coordinates2 = RandomCoordinates();
    }
    const cells = document.querySelectorAll('.cell');
    cells[coordinates1[0][1]].textContent = '2';
    cells[coordinates2[0][1]].textContent = '4';
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
