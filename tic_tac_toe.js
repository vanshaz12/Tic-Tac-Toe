// Get the HTML elements
var cells = document.querySelectorAll(".cell");
var turn = document.getElementById("turn");
var winner = document.getElementById("winner");


// Initialize the game
var player = "X";
var count = 0;
var gameEnded = false;
var board = ["", "", "", "", "", "", "", "", ""];

// Function to check if the game is over
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
    var a = possibleWins[i][0];
    var b = possibleWins[i][1];
    var c = possibleWins[i][2];
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

// Function to handle the player's move
function handleMove(event) {
  // Get the index of the clicked board
  var index = event.target.id.split("-")[1];

  // Check if the board is already occupied or if the game is over
  if (board[index] !== "" || gameEnded) {
    return;
  }

  // Update the board and the HTML
  board[index] = player;
  event.target.textContent = player;
  count++;

  // Check if the game is over
  var result = checkGameEnded();
  if (result) {
    gameEnded = true;
    if (result === "tie") {
      winner.textContent = "It's a tie!";
    } else {
      winner.textContent = 'Player ' + result + ' win!';
      var winningCombination;
      for (var i = 0; i < possibleWins.length; i++) {
        var combination = possibleWins[i];
        if (board[combination[0]] === result && board[combination[1]] === result && board[combination[2]] === result) {
          winningCombination = combination;
          break;
        }
        boardElements[winningCombination[0]].classList.add("win");
        boardElements[winningCombination[1]].classList.add("win");
        boardElements[winningCombination[2]].classList.add("win");
}

    }
  } else {
    // Switch to the other player's turn
    player = player === "X" ? "O" : "X";
    turn.textContent = 'Player ' + player + 's turn';
  }
}

// Add event listeners to the board
for (var i = 0; i < board.length; i++) {
  board[i].addEventListener("click", handleMove);
}

// Restart the game
function restartGame() {
  player = "X";
  count = 0;
  gameEnded = false;
  board = ["", "", "", "", "", "", "", "", ""];
  winner.textContent = "";
  turn.textContent = 'Player ' + player + 's turn';
  for (var i = 0; i < board.length; i++) {
    board[i].textContent = "";
  }
}

// Add event listener to the "New Game" button
var newGameBtn = document.getElementById("new-game");
newGameBtn.addEventListener("click", restartGame);

// Initialize the game
turn.textContent = 'Player ' + player + 's turn';
