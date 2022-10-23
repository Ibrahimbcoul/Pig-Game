'use strict';
// CALLING
const diceImg = document.querySelector('.dice');
const newBtn = document.querySelector('.btn--new');
const rollBtn = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');
const activePlayer0 = document.querySelector(`.player--0`);
const activePlayer1 = document.querySelector(`.player--1`);
const score0 = document.getElementById('score--0');
const score1 = document.getElementById('score--1');
const currentScore0 = document.getElementById('current--0');
const currentScore1 = document.getElementById('current--1');
const player0 = document.getElementById('name--0');
const player1 = document.getElementById('name--1');
const maxScore = 10;

let activePlayer = 0;
let currentScore = 0;
let roll;
// ROLL DICE
rollBtn.addEventListener('click', function () {
  if (
    Number(score0.textContent) < maxScore &&
    Number(score1.textContent) < maxScore
  ) {
    // Generate random number
    roll = Math.trunc(Math.random() * 6 + 1);
    //   Display Dice image
    diceImg.classList.remove('hidden');
    document.querySelector('img').src = `dice-${roll}.png`;
    //   Check for roll 1
    if (roll !== 1) {
      // Add to current score
      currentScore += roll;
      document.getElementById(`current--${activePlayer}`).textContent =
        Number(currentScore);
      holdBtn.textContent = `📥 Hold`;
    } else {
      // Switch to next player
      currentScore = 0;
      document.getElementById(`current--${activePlayer}`).textContent =
        Number(currentScore);
      activePlayer = activePlayer === 0 ? 1 : 0;
      activePlayer0.classList.toggle('player--active');
      activePlayer1.classList.toggle('player--active');
    }
  }
});

// HOLD
holdBtn.addEventListener('click', function () {
  // Hide Dice
  diceImg.classList.add('hidden');
  // Set Score if less than 100
  if (roll !== 1) {
    if (
      Number(score0.textContent) < maxScore &&
      Number(score0.textContent) < maxScore
    ) {
      document.getElementById(`score--${activePlayer}`).textContent =
        Number(document.getElementById(`score--${activePlayer}`).textContent) +
        Number(document.getElementById(`current--${activePlayer}`).textContent);
    }
    //   Set winner when score reach 100
    if (
      Number(score0.textContent) > Number(score1.textContent) &&
      Number(score0.textContent) >= maxScore
    ) {
      player0.textContent = `Player 1 Wins`;
      activePlayer0.classList.add('player--winner');
    } else if (
      Number(score1.textContent) > Number(score0.textContent) &&
      Number(score1.textContent) >= maxScore
    ) {
      player1.textContent = `Player 2 Wins`;
      activePlayer1.classList.add('player--winner');
    }
    // Set current score to 0
    currentScore = 0;
    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore;
    //   Switch player if score is less than 100
    if (
      Number(score0.textContent) < maxScore &&
      Number(score1.textContent) < maxScore
    ) {
      activePlayer = activePlayer === 0 ? 1 : 0;
      activePlayer0.classList.toggle('player--active');
      activePlayer1.classList.toggle('player--active');
    }
  } else if (roll === 1 || roll === roll) {
    holdBtn.textContent = `👆 roll the dice`;
  }
});

// RESET GAME
newBtn.addEventListener('click', function () {
  // Hide dice
  diceImg.classList.add('hidden');
  // Reset to player 1
  activePlayer = 0;
  activePlayer0.classList.add('player--active');
  activePlayer1.classList.remove('player--active');
  // Reset scores
  currentScore = 0;
  score0.textContent = 0;
  score1.textContent = 0;
  currentScore0.textContent = 0;
  currentScore1.textContent = 0;
  //   Reset Hold button
  holdBtn.textContent = `📥 Hold`;
  //   Reset player
  player0.textContent = 'Player 1';
  player1.textContent = 'Player 2';
  //   Reset winner
  activePlayer0.classList.remove('player--winner');
  activePlayer1.classList.remove('player--winner');
});
