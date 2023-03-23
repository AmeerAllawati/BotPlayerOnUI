var cells = document.getElementsByClassName('cell');
var botPlayed = false;
var mark = 'X';
var board = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
var winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
];
var gameOver = false;

function checkWin() {
    for (var i = 0; i < winningCombos.length; i++) {
        var combo = winningCombos[i];
        var a = combo[0], b = combo[1], c = combo[2];
        if ((board[a] != ' ') && (board[a] == board[b]) && (board[b] == board[c])) {
            // We have a winner!
            gameOver = true;
            alert(board[a] + " wins!");
            break;
        }
    }
    if (!gameOver && (board.every((val) => val != ' '))) {
        // It's a draw!
        gameOver = true;
        alert("It's a draw!");
    }
}

document.getElementById("myButton").addEventListener("click", function () {
    const url = "http://localhost:8080/"; // Replace with the URL you want to send the request to
    const data = { // Replace with the data you want to send in the request body
        grid: [[board[0], board[1], board[2]], [board[3], board[4], board[5]], [board[6], board[7], board[8]]],
        player1: "X",
        player2: "O"
    };
    const options = { // Define the options for the fetch() method
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    };
    fetch(url, options)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            var position = data.row*3 + data.col;
            board[position] = mark;
            document.getElementById(position).innerHTML = mark;
            document.getElementById(position).style.fontFamily = 'Comic Sans MS';
            document.getElementById(position).style.fontSize = '30px';
            document.getElementById(position).style.textAlign = 'center';
            document.getElementById(position).style.verticalAlign = 'middle';
            checkWin();
            if (mark == 'X') {
                mark = 'O';
            } else {
                mark = 'X';
            }
        })
        .catch(error => console.error(error));
    

});

for (var i = 0; i < cells.length; ++i) {

    cells[i].addEventListener('mouseover', function () {
        this.style.backgroundColor = 'red';
    });

    cells[i].addEventListener('mouseout', function () {
        // Change the background color of the cell back to white
        this.style.backgroundColor = 'white';
    });

    cells[i].addEventListener('click', function () {
        if (!gameOver && this.innerHTML == '' && !botPlayed) {
            this.innerHTML = mark;
            this.style.fontFamily = 'Comic Sans MS';
            this.style.fontSize = '30px';
            this.style.textAlign = 'center';
            this.style.verticalAlign = 'middle';

            board[this.id] = mark;
            checkWin();
        
            if (mark == 'X') {
                mark = 'O';
            } else {
                mark = 'X';
            }
        }
    });
}


