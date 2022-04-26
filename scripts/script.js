const validPLays = ['rock', 'paper', 'scissors'];
  
const NumToPlay = {
  1 : "rock",
  2 : "paper",
  3 : "scissors"
};

function computerPlay() {
  return NumToPlay[Math.floor(Math.random() * 3) + 1];
}

// function playStats(n = 100) {
//   let stat= {
//     "rock" : 0,
//     "paper" : 0,
//     "scissors" : 0
//   };

//   for (let i = 0; i < n; ++i) {
//     stat[computerPlay()]++;
//   }

//   console.log("rock: " + stat["rock"]);
//   console.log("paper: " + stat["paper"]);
//   console.log("scissors: " + stat["scissors"]);
// }

function determineRoundOutcome(playerSelection, computerSelection) {

  if (playerSelection === computerSelection) {
    return 'tie'
  }

  if ((playerSelection === 'rock' && computerSelection === 'paper') ||
      (playerSelection === 'paper' && computerSelection === 'scissors') ||
      (playerSelection === 'scissors' && computerSelection === 'rock')) {

    return 'lose'
  }

  return 'win'
}


function playRound(playerSelection, computerSelection) {

  const outcome = determineRoundOutcome(playerSelection, computerSelection);
  
  {
    let roundMsg = '';

    if (outcome === 'tie') {
      roundMsg = `Tie! ${playerSelection} against ${computerSelection}.`
    } else if (outcome === 'lose') {
      roundMsg = `You Lose! ${computerSelection} beats ${playerSelection}.`;
    } else if (outcome === 'win') {
      roundMsg = `You win! ${playerSelection} beats ${computerSelection}.`;
    } else {
      roundMsg = `Something went wrong! (player: ${playerSelection}, computer: ${computerSelection}).`
    }

    console.log(roundMsg);
  }

  return outcome;
}

function game() {
  let playerScore = 0;
  let computerScore = 0;
  let outcomeText = '';

  for (let i = 0; i < 5; ++i) {
    
    let playerSelection = ''
    let validInput = false;

    let prefix = `Round ${i + 1}. Score [ ${playerScore} : ${computerScore} ]\n`;
    while (!validInput) {
      playerSelection = prompt(outcomeText + prefix + "Rock, Paper, Scissors?");
      if (playerSelection === null || playerSelection === undefined) { return; }
      playerSelection = playerSelection.toLowerCase();

      validInput = validPLays.includes(playerSelection);
    }

    const computerSelection = computerPlay();

    let outcome = playRound(playerSelection, computerSelection);

    if (outcome === 'lose') {
      ++computerScore;
      outcomeText = 'You lost!\n';
    } else if (outcome === 'win') {
      ++playerScore;
      outcomeText = 'You won!!!\n';
    } else {
      outcomeText = 'Tie!!\n';
    }

  }
  
  console.log(`Player Score: ${playerScore}, Computer Score: ${computerScore}`);

  if (playerScore == computerScore) {
    alert(`You tied! (${playerScore} : ${computerScore})`);
  } else if (playerScore > computerScore) {
    alert(`You beat the most advanced AI in civilization! (${playerScore} : ${computerScore})`);
  } else {
    alert(`You lost to the all mighty AI. (${playerScore} : ${computerScore})`);
  }
}

// start program:
// let continuePlaying = false;
// do {
//     game()
//     continuePlaying = confirm("Play again?");
// } while (continuePlaying)

function increaseRoundNumber() {

  const round = document.querySelector("#round .round-number");
  round.textContent = Number(round.textContent) + 1;
}

function increasePlayerScore() {

  const player = document.querySelector('#player-score .score-number');
  player.textContent = Number(player.textContent) + 1;
}

function increaseComputerScore() {

  const computer = document.querySelector('#computer-score .score-number');
  computer.textContent = Number(computer.textContent) + 1;
}

function updateResultWindow(message, textColor, backgroundColor='#707070') {

  const result = document.querySelector('#match-result');

  result.style.color = textColor;
  result.style.fontWeight = 'bold';
  result.style.fontSize = '30px';
  result.style.backgroundColor = backgroundColor;
  result.textContent = message;
}

function getUserScore() {
  return Number(document.querySelector('#player-score .score-number').textContent);
}

function getComputerScore() {
  return Number(document.querySelector('#computer-score .score-number').textContent);
}

function isGameOver() {
  const numberOfMatches = 5;
  const scoreToWin = Math.floor(numberOfMatches / 2) + 1;

  if ((getUserScore() >= scoreToWin) || (getComputerScore() >= scoreToWin)) {
    return true;
  }

  return false;
}

function resetScoreBoard() {
  const round = document.querySelector("#round .round-number");
  round.textContent = 1;

  const player = document.querySelector('#player-score .score-number');
  player.textContent = 0;

  const computer = document.querySelector('#computer-score .score-number');
  computer.textContent = 0;
}

function createStartOverButton() {

  const gameArea = document.querySelector('#game-area');
  const buttonArea = document.querySelector('#button-area');
  buttonArea.style.display = "none";

  const startOverDiv = document.createElement('div');
  const startOverButton = document.createElement('button');
  startOverButton.textContent = "Start Over";
  startOverButton.classList.add('play-button');

  startOverButton.addEventListener('click', () => {
    buttonArea.style.display = "inline";
    startOverDiv.remove();
    resetScoreBoard();
    updateResultWindow("First to score 3. Click Below", "white", "black");
  });

  startOverDiv.appendChild(startOverButton);
  gameArea.append(startOverDiv);

}

function finishGame() {
  const playerScore = getUserScore();
  const computerScore = getComputerScore();

  if (playerScore == computerScore) {
    updateResultWindow(`You tied! (${playerScore} : ${computerScore})`, 'white');
  } else if (playerScore > computerScore) {
    updateResultWindow(`You won the game! (${playerScore} : ${computerScore})`, 'chartreuse', 'black');
  } else {
    updateResultWindow(`You lost the game! (${playerScore} : ${computerScore})`, 'crimson', 'black');
  }

  createStartOverButton();
}

function play(e) {
  const playerSelection = e.target.id;

  if (!validPLays.includes(playerSelection))
  {
    alert("something went wrong: invalid selection");
  }

  const computerSelection = computerPlay();

  let outcome = playRound(playerSelection, computerSelection);

  if (outcome === 'lose') {
    increaseComputerScore();
    updateResultWindow("You Lost!", 'black', 'crimson')
    outcomeText = 'You lost!\n';
  } else if (outcome === 'win') {
    increasePlayerScore();
    updateResultWindow("You Won!", 'black', 'chartreuse')
    outcomeText = 'You won!!!\n';
  } else {
    updateResultWindow("You Tied!", 'white', 'black')
    outcomeText = 'Tie!!\n';
  }

  if (isGameOver()) {
    finishGame();
  } else {
    increaseRoundNumber();
  }
}

const rock = document.querySelector('#rock');
rock.addEventListener('click', play);

const paper = document.querySelector('#paper');
paper.addEventListener('click', play);

const scissors = document.querySelector('#scissors');
scissors.addEventListener('click', play);

function startGame() {
  updateResultWindow("First to score 3. Click Below", "white", "black");
}

startGame();