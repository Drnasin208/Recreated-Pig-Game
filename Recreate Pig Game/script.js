'use strict';

//Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const name0El = document.querySelector('.name--0');
const name1El = document.querySelector('.name--1');

const current11 = document.getElementById('current11');
const current22 = document.getElementById('current22');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');

const btnNew = document.querySelector('.btn--new');
const btnSwitch = document.querySelector('.btn--switch');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnGoal = document.querySelector('.btn--goal');

let scores, currentScore, activePlayer, activeName, playing;

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  activeName = 0;
  name0El.textContent = 'Player 1';
  name1El.textContent = 'Player 2';
  name0El.classList.remove('winner');
  name1El.classList.remove('winner');
  current11.classList.remove('hidden');
  current22.classList.remove('hidden');
  current0El.classList.remove('hidden');
  current1El.classList.remove('hidden');
  current0El.textContent = 0;
  current1El.textContent = 0;

  playing = true;
  score0El.textContent = 0;
  score1El.textContent = 0;

  btnSwitch.style.opacity = '1';
  btnRoll.style.zIndex = '10';
  btnRoll.style.marginTop = '-120px';
  btnRoll.classList.remove('hidden');
  btnHold.classList.remove('hidden');
  btnGoal.classList.remove('hidden');
  btnNew.style.transform = 'scale(1)';
  btnNew.style.border = '2px solid yellow';
  btnNew.style.marginTop = '20px';
   btnNew.style.marginLeft = '-76px';
  btnNew.style.background = 'white';
  btnNew.style.paddingRight = '3px';

  // diceEl.classList.add('hidden');

  diceEl.classList.remove('fadeout');
  //diceEl.style.marginLeft = `2%`;
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  player1El.classList.remove('hidden');
  player0El.classList.remove('hidden');
};
init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

btnSwitch.addEventListener('click', function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
});

//Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // Generating a random dice roll
    const diceNumber = Math.trunc(Math.random() * 6) + 1;
    const boja = Math.trunc(Math.random() * 250) + 1;
    const boja2 = Math.trunc(Math.random() * 250) + 1;
    const boja3 = Math.trunc(Math.random() * 250) + 1;
    const ugao = Math.trunc(Math.random() * 90) + 1;

    // Display dice
    diceEl.classList.remove('hidden');

    diceEl.src = `dice-${diceNumber}.png`;
    diceEl.style.border = `12px double rgba(${boja},${boja2},${boja3})`;
    diceEl.style.borderRadius = `10px`;
    diceEl.style.transform = `rotate(${ugao}deg)`;
    diceEl.style.boxShadow = ` 5px 8px 3px #30f8f8`;
    //  diceEl.style.position = `absolute`;
    diceEl.style.marginLeft = `-16%`;

    // Check for rolled 1:if true,
    if (diceNumber !== 1) {
      // Add dice to current score
      currentScore = currentScore + diceNumber;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // Add current score to active's player score
    scores[activePlayer] += currentScore; //scores[1] = scores[1]+currentScore

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // Check if player's score >= 100
    if (scores[activePlayer] >= 60) {
      // finish the game
      playing = false;
      /*setTimeout(function(){
        diceEl.classList.add('hidden');
          },2000);*/
      diceEl.classList.remove('fadein');
      diceEl.classList.add('fadeout');
      btnSwitch.style.opacity = '0';
      btnRoll.style.opacity = '1';
      btnHold.style.opacity = '1';

      btnNew.style.transform = 'scale(1.2)';
      btnNew.style.border = '2px solid white';
      btnNew.style.padding = '2px';
      btnNew.style.marginTop = '360px';
      btnNew.style.transition = '3s';
      btnNew.style.fontWeight = '900';
      btnNew.style.background = 'gold';

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');

      if (activePlayer === 0) {
        activeName = 0;
        document.querySelector(`.name--${activeName}`).textContent =
          'WINNER PLAYER 1';
        document.querySelector(`.name--${activeName}`).classList.add('winner');

        player1El.classList.add('hidden');
        current22.classList.add('hidden');
        current11.classList.add('hidden');
        btnRoll.classList.add('hidden');
        btnHold.classList.add('hidden');
        btnGoal.classList.add('hidden');
      } else {
        activeName = 1;
        document.querySelector(`.name--${activeName}`).textContent =
          'WINNER PLAYER 2';
        document.querySelector(`.name--${activeName}`).classList.add('winner');

        player0El.classList.add('hidden');
        current22.classList.add('hidden');
        current11.classList.add('hidden');
        btnRoll.classList.add('hidden');
        btnHold.classList.add('hidden');
        btnGoal.classList.add('hidden');
      }
      current0El.textContent = '0';
      current1El.textContent = '0';

      /*document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');*/
    } else {
      // switch to the next player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
