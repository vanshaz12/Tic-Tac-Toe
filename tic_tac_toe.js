
var cells = document.querySelectorAll("td");
var turn = document.querySelector("#turn");
var winner = document.querySelector("#winner");



var player = prompt("Choose X or O:") || "X";
while (player !== "X" && player !== "O") {
  player = prompt("Invalid choice! Choose X or O:") || "X";
}
var count = 0;
var gameEnded = false;
var board = ["", "", "", "", "", "", "", "", ""];


function checkGameEnded() {
  var possibleWins = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (var i = 0; i < possibleWins.length; i++) {
    var [a, b, c] = possibleWins[i];
    if (board[a] !== "" && board[a] === board[b] && board[b] === board[c]) {
      return board[a];
    }
  }

  for (var i = 0; i < board.length; i++) {
    if (board[i] === "") {
      return false;
    }
  }

  return "tie";
}

function handleMove(event) {

  var index = event.target.id.split("-")[1];


  if (board[index] !== "" || gameEnded) {
    return;
  }


  board[index] = player;
  event.target.textContent = player;
  count++;


  var result = checkGameEnded();
  if (result) {
    gameEnded = true;
    if (result === "tie") {
      winner.textContent = "It's a tie!";
    } else {
      winner.textContent = 'Player ' + player + ' win';
    }
  } else {

    if (player === "X") {
      player = "O";
    } else {
      player = "X";
    }
    turn.textContent = 'Player ' + player + "'s turn";
  }
}


for (var i = 0; i < cells.length; i++) {
  cells[i].addEventListener("click", handleMove);
}


function restartGame() {
  player = prompt("Choose X or O:") || "X";
  while (player !== "X" && player !== "O") {
    player = prompt("Invalid choice! Choose X or O:") || "X";
  }
  count = 0;
  gameEnded = false;
  board = ["", "", "", "", "", "", "", "", ""];
  winner.textContent = "";
  turn.textContent = 'Player ' + player + "'s turn";
  for (var i = 0; i < cells.length; i++) {
    cells[i].textContent = "";
  }
}


var newGameBtn = document.querySelector("#new-game");
newGameBtn.addEventListener("click", restartGame);


turn.textContent = 'Player ' + player + "'s turn";
