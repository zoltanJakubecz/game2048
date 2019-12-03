const board = [
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0]
]

function randomStartCoordinates(){
    let x = Math.floor(Math.random() * 15) + 1;
    let y = Math.floor(Math.random() * 15) + 1;
    return [x,y];
}

function starterBoard(){
    let coordinates = randomStartCoordinates();

    while (coordinates[0] == coordinates[1]){
        coordinates = randomStartCoordinates();
    }
    console.log(coordinates);
    const cells = document.querySelectorAll('.cell');
    cells[coordinates[0]].textContent = '16';
    cells[coordinates[1]].textContent = '4';

}

function main() {
    const container = document.querySelector('.container');
    for(let row = 0; row < 4; row++){
        for(let column = 0; column < 4; column++){
            let newCell = document.createElement('div');
            newCell.setAttribute('class', 'cell')
            container.appendChild(newCell)
        }
    }
    starterBoard();
    }

main();
