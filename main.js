"use strict";
const score = {
  wins: 0,
  losses: 0,
};
const startBtn = document.querySelector("#start-btn");
const statusTxt = document.querySelector("#statusTxt");
const elemsHiddenAtStart = document.querySelectorAll(".hidden");
const buttonsContainer = document.querySelector(".rps__buttons-container");
const statusTxtPlayer = document.querySelector("#statusTxtPlayer");
const statusTxtPc = document.querySelector("#statusTxtPc");
const scorePlayer = document.querySelector("#scorePlayer");
const scorePc = document.querySelector("#scorePc");

startBtn.addEventListener("click", start);

function start() {
  function changeUI() {
    for (let ele of elemsHiddenAtStart) {
      ele.classList.remove("hidden");
    }
    startBtn.classList.add("hidden");
    statusTxt.textContent = "Choose your next move!";

    setTimeout(() => {
      for (let ele of elemsHiddenAtStart) {
        ele.dataset.shifted = "false";
      }
    }, 10);
  }

  score.wins = 0;
  score.losses = 0;
  statusTxtPlayer.textContent = "";
  statusTxtPc.textContent = "";
  scorePlayer.textContent = "0";
  scorePc.textContent = "0";
  buttonsContainer.addEventListener("click", pickNextMove);
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
  const result = {
    result: null,
    computerChoice: getComputerChoice(),
    playerChoice: input,
  };
  if (input === result.computerChoice) {
    result.result = "draw";
  } else if (input === "rock" && result.computerChoice === "scissors") {
    result.result = "victory";
  } else if (input === "paper" && result.computerChoice === "rock") {
    result.result = "victory";
  } else if (input === "scissors" && result.computerChoice === "paper") {
    result.result = "victory";
  } else {
    result.result = "defeat";
  }
  return updateUI(result);
}

function updateUI({ result, computerChoice, playerChoice } = param) {
  statusTxtPlayer.textContent = `You chose ${playerChoice}`;
  statusTxtPc.textContent = `The computer chose ${computerChoice}`;
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

  if (score.wins === 5 || score.losses === 5) {
    buttonsContainer.removeEventListener("click", pickNextMove);
    return setTimeout(
      () => gameOver(score.wins === 5 ? "victory" : "loss"),
      1000
    );
  }
}

function gameOver(status) {
  for (let elem of elemsHiddenAtStart) {
    elem.dataset.shifted = "true";
  }
  setTimeout(() => {
    for (let elem of elemsHiddenAtStart) {
      elem.classList.add("hidden");
    }

    statusTxt.textContent = `Congratulations! You won the game with the score of ${score.wins} to ${score.losses}`;
    if (status === "loss") {
      statusTxt.textContent = `Unfortunately you lost the game with the score of ${score.wins} to ${score.losses}`;
    }
    startBtn.textContent = "Play again?";
    startBtn.classList.toggle("hidden");
  }, 400);
}
