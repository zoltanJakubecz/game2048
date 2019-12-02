function main() {
    const container = document.querySelector('.container');
    for(let row = 0; row < 4; row++){
        for(let column = 0; column < 4; column++){
            let newCell = document.createElement('div');
            newCell.setAttribute('class', 'cell')
            container.appendChild(newCell)
        }
    }
}

main();
