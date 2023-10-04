"use strict";
const score = {
  wins: 0,
  losses: 0,
};

const rps = document.querySelector(".rps");
const startBtn = document.querySelector(".rps__status-start-btn");
const statusTxt = document.querySelector("#statusTxt");

startBtn.addEventListener("click", start);

const hiddenElements = document.querySelectorAll(".hidden");
const positionShiftedElems = rps.querySelectorAll("[data-shifted]");

const buttonsContainer = document.querySelector(".rps__buttons-container");
buttonsContainer.addEventListener("click", pickNextMove);

function start() {
  function changeUI() {
    for (let ele of hiddenElements) {
      ele.classList.remove("hidden");
    }
    startBtn.classList.add("hidden");
    statusTxt.textContent = "Choose your next move!";

    setTimeout(() => {
      for (let elem of positionShiftedElems) {
        elem.dataset.shifted='false';
      }
    }, 10);
  }
  changeUI();
}

function pickNextMove(e) {
  const button = e.target.closest("button");
  if (!button) return;
  if (!button.contains(e.target)) return;

  playOneRound(button.dataset.move);
}

function playOneRound(input) {
  function getComputerChoice() {
    const choices = ["rock", "paper", "scissors"];
    return choices[Math.floor(3 * Math.random())];
  }
  const computerChoice = getComputerChoice();

  const statusTxtPlayer = document.querySelector("#statusTxtPlayer");
  const statusTxtPc = document.querySelector("#statusTxtPc");
  statusTxtPlayer.textContent = `You chose ${input}`;
  statusTxtPc.textContent = `The computer chose ${computerChoice}`;

  if (input === computerChoice) {
    return updateScore("draw");
  } else if (input === "rock" && computerChoice === "scissors") {
    return updateScore("victory");
  } else if (input === "paper" && computerChoice === "rock") {
    return updateScore("victory");
  } else if (input === "scissors" && computerChoice === "paper") {
    return updateScore("victory");
  } else {
    return updateScore("defeat");
  }
}
function updateScore(result) {
  const scorePlayer = document.querySelector("#scorePlayer");
  const scorePc = document.querySelector("#scorePc");
  switch (result) {
    case "draw":
      statusTxt.textContent = "It's a draw!";
      break;
    case "victory":
      score.wins++;
      statusTxt.textContent = "You won the round!";
      break;
    case "defeat":
      score.losses++;
      statusTxt.textContent = "You lost the round!";
      break;
  }
  scorePlayer.textContent = score.wins;
  scorePc.textContent = score.losses;

  if (score.losses === 5 && score.wins === 5) {
    buttonsContainer.removeEventListener("click", pickNextMove);
    setTimeout(() => gameOver("draw"), 1000);
  } else if (score.wins === 5) {
    buttonsContainer.removeEventListener("click", pickNextMove);
    setTimeout(() => gameOver("victory"), 1000);
  } else if (score.losses === 5) {
    buttonsContainer.removeEventListener("click", pickNextMove);
    setTimeout(() => gameOver("loss"), 1000);
  }
}

function gameOver(status) {
  for (let elem of positionShiftedElems) {
    elem.dataset.shifted = "true";
  }
  switch (status) {
    case "victory":
      statusTxt.textContent = `Congratulations! You won the game with the score of ${score.wins} to ${score.losses}`;
      break;
    case "loss":
      statusTxt.textContent = `Unfortunately you lost the game with the score of ${score.wins} to ${score.losses}`;
      break;
    case "draw":
      statusTxt.textContent = `The game ended with a draw with the score of ${score.wins} to ${score.losses}`;
      break;
  }
}
