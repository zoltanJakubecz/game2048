let board = [
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0]
]

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
