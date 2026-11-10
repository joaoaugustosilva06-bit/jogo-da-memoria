(() => {
  "use strict";

  const symbols = ["🚀", "🎧", "🌈", "🍕", "🐱", "⚽", "🎮", "🍉"];
  const board = document.getElementById("board");
  const timer = document.getElementById("timer");
  const movesLabel = document.getElementById("moves");
  const pairsLabel = document.getElementById("pairs");
  const progressBar = document.getElementById("progressBar");
  const message = document.getElementById("message");
  const modal = document.getElementById("winModal");

  let firstCard = null;
  let secondCard = null;
  let locked = false;
  let moves = 0;
  let pairs = 0;
  let elapsed = 0;
  let intervalId = null;
  let mismatchTimeout = null;
  let hasStarted = false;

  function formatTime(totalSeconds) {
    const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
    const seconds = String(totalSeconds % 60).padStart(2, "0");
    return minutes + ":" + seconds;
  }

  function startTimer() {
    if (hasStarted) return;
    hasStarted = true;
    intervalId = window.setInterval(() => {
      elapsed += 1;
      timer.textContent = formatTime(elapsed);
    }, 1000);
  }

  function updateScore() {
    movesLabel.textContent = String(moves);
    pairsLabel.textContent = pairs + "/" + symbols.length;
    progressBar.style.width = (pairs / symbols.length * 100) + "%";
  }

  function finishGame() {
    window.clearInterval(intervalId);
    document.getElementById("resultTime").textContent = formatTime(elapsed);
    document.getElementById("resultMoves").textContent = String(moves);
    message.textContent = "Você encontrou todos os pares!";
    window.setTimeout(() => {
      modal.hidden = false;
      document.getElementById("playAgain").focus();
    }, 350);
  }

  function handleCardClick(card) {
    if (locked || card === firstCard || card.disabled || card.classList.contains("flipped")) return;

    startTimer();
    card.classList.add("flipped");
    card.setAttribute("aria-label", "Carta revelada: " + card.dataset.symbol);

    if (firstCard === null) {
      firstCard = card;
      message.textContent = "Agora escolha a segunda carta.";
      return;
    }

    secondCard = card;
    moves += 1;
    updateScore();

    if (firstCard.dataset.symbol === secondCard.dataset.symbol) {
      firstCard.classList.add("matched");
      secondCard.classList.add("matched");
      firstCard.disabled = true;
      secondCard.disabled = true;
      firstCard.setAttribute("aria-label", "Par encontrado: " + firstCard.dataset.symbol);
      secondCard.setAttribute("aria-label", "Par encontrado: " + secondCard.dataset.symbol);
      firstCard = null;
      secondCard = null;
      pairs += 1;
      updateScore();
      message.textContent = "Muito bem! Você encontrou um par.";
      if (pairs === symbols.length) finishGame();
      return;
    }

    locked = true;
    message.textContent = "Não formou um par. Tente outra vez!";
    mismatchTimeout = window.setTimeout(() => {
      firstCard.classList.remove("flipped");
      secondCard.classList.remove("flipped");
      firstCard.setAttribute("aria-label", "Carta fechada");
      secondCard.setAttribute("aria-label", "Carta fechada");
      firstCard = null;
      secondCard = null;
      locked = false;
      mismatchTimeout = null;
      message.textContent = "Escolha uma carta para continuar.";
    }, 900);
  }

  function shuffle(items) {
    for (let index = items.length - 1; index > 0; index -= 1) {
      const randomIndex = Math.floor(Math.random() * (index + 1));
      [items[index], items[randomIndex]] = [items[randomIndex], items[index]];
    }
    return items;
  }

  function startNewGame() {
    window.clearInterval(intervalId);
    window.clearTimeout(mismatchTimeout);
    intervalId = null;
    mismatchTimeout = null;
    firstCard = null;
    secondCard = null;
    locked = false;
    moves = 0;
    pairs = 0;
    elapsed = 0;
    hasStarted = false;
    timer.textContent = "00:00";
    message.textContent = "Escolha uma carta para começar.";
    modal.hidden = true;
    updateScore();
    board.replaceChildren();

    const deck = shuffle(symbols.concat(symbols));
    deck.forEach((symbol, index) => {
      const card = document.createElement("button");
      card.type = "button";
      card.className = "card";
      card.dataset.symbol = symbol;
      card.setAttribute("aria-label", "Carta fechada");
      card.innerHTML = '<span class="card-inner"><span class="face back" aria-hidden="true">✦</span><span class="face front" aria-hidden="true"></span></span>';
      card.querySelector(".front").textContent = symbol;
      card.addEventListener("click", () => handleCardClick(card));
      board.appendChild(card);
    });
  }

  document.getElementById("restart").addEventListener("click", startNewGame);
  document.getElementById("playAgain").addEventListener("click", startNewGame);
  startNewGame();
})();