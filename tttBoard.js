var cells = document.getElementsByClassName('cell');
var mark = 'X';
var board = ['', '', '', '', '', '', '', '', ''];
var winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
];
var gameOver = false;

for(var i = 0; i < cells.length; ++i) {

    cells[i].addEventListener('mouseover', function(){
        this.style.backgroundColor = 'red';
    });

    cells[i].addEventListener('mouseout', function() {
        // Change the background color of the cell back to white
        this.style.backgroundColor = 'white';
    });

    cells[i].addEventListener('click', function(){
        if(!gameOver && this.innerHTML == '') {
            this.innerHTML = mark;
            this.style.fontFamily = 'Comic Sans MS';
            this.style.fontSize = '30px';
            this.style.textAlign = 'center';
            this.style.verticalAlign = 'middle';

            board[this.id] = mark;
            checkWin();

            if(mark == 'X') {
                mark = 'O';
            } else {
                mark = 'X';
            }
        }
    });
}

function checkWin() {
    for(var i = 0; i < winningCombos.length; i++) {
        var combo = winningCombos[i];
        var a = combo[0], b = combo[1], c = combo[2];
        if((board[a] != '') && (board[a] == board[b]) && (board[b] == board[c])) {
            // We have a winner!
            gameOver = true;
            alert(board[a] + " wins!");
            break;
        }
    }
    if(!gameOver && (board.every((val) => val != ''))) {
        // It's a draw!
        gameOver = true;
        alert("It's a draw!");
    }
}
