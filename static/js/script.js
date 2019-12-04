let board = [
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0]
];

function moveKeys(event) {
    let code = event.which || event.keyCode;
    if(code == '37'){
        console.log('bal');
    } else if(code == '38'){
        console.log('fel');
    } else if(code == '39'){
        console.log('jobb');
    } else if(code == '40'){
        console.log('le');
    }
}

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
    document.addEventListener('keydown', moveKeys);
    starterBoard();
    drawBoard();
    console.log(isGameOver());
    }

main();
