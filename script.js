'use strict';
// Jogadores
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
//Score de cada jogador acumulado
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
//Score ATUAL
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
//Botões:
const diceEl = document.querySelector('.dice'); //Imagem do dado
const btnNew = document.querySelector('.btn--new'); //Botão novo jogo
const btnRoll = document.querySelector('.btn--roll'); //Botão rolar dado
const btnHold = document.querySelector('.btn--hold'); //Botão segurar pontos pra trocar de player
//condições iniciais
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');
//função pra trocar de jogador
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

let scores, currentScore, activePlayer, playing;
//condições iniciais
const init = function () {
  scores = [0, 0]; //score de cada jogador
  currentScore = 0; // para o cálculo do score atual
  activePlayer = 0;
  playing = true;

  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  diceEl.classList.add('hidden');
};
init(); //rodar a função

//Giro do dado
btnRoll.addEventListener('click', function () {
  if (playing) {
    //1. Gerar número aleatorio do dado:
    const dice = Math.trunc(Math.random() * 6) + 1;
    //2. Display o dado:
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    //3. Checar se o dado é 1. Se for, muda pro prox player:
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});
// Segurar os valores
btnHold.addEventListener('click', function () {
  if (playing) {
    //1. adicionar o valor atual do score ao player
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //2. checar se o score é 100 para finalizar
    if (scores[activePlayer] >= 20) {
      //para terminar o jogo:
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
    //3. Ou mudar para o próximo player
    switchPlayer();
  }
});
btnNew.addEventListener('click', init);
