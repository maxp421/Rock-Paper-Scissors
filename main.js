'strict mode'
function getComputerChoice() {
    const choices = ['rock', 'paper', 'scissors'];
    return choices[Math.floor(3 * Math.random())]
}

function singleRound() {
    let playerChoice;
    while (1) {
        playerChoice = prompt('Please choose between rock, paper or scissors').toLowerCase();
        if (playerChoice === 'rock' || playerChoice === 'paper' || playerChoice === 'scissors') {
            break;
        }
    }
    console.log(`You chose ${playerChoice}`);

    let computerChoice = getComputerChoice();
    console.log(`The computer chose ${computerChoice}`)

    if (playerChoice === computerChoice) {
        console.log(`It's a draw!`);
        return 'draw';
    }
    else if (playerChoice === 'rock' && computerChoice == 'scissors') {
        console.log('You won the round.');
        return 'victory';
    }
    else if (playerChoice === 'paper' && computerChoice == 'rock') {
        console.log('You won the round.');
        return 'victory';
    }
    else if (playerChoice === 'scissors' && computerChoice == 'paper') {
        console.log('You won the round.');
        return 'victory';
    }
    else {
        console.log('You lost the round.');
        return 'defeat';
    }
}

function game() {
    let score = {
        wins: 0,
        losses: 0
    }

    for (let i = 0; i < 5; i++) {
        let result = singleRound()
        if (result === 'draw') {
            score.wins++;
            score.losses++;
        }
        if (result === 'victory') {
            score.wins++;
        }
        if (result === 'defeat') {
            score.losses++;
        }
        console.log(score);
    }
}

game();
