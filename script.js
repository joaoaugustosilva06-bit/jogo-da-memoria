(() => {
  const symbols = ["🚀", "🎧", "🌈", "🍕", "🐱", "⚽", "🎮", "🍉"];
  const board = document.querySelector("#board");
  const timerDisplay = document.querySelector("#timer");
  const movesDisplay = document.querySelector("#moves");
  const matchesDisplay = document.querySelector("#matches");
  const progress = document.querySelector("#progress");
  const status = document.querySelector("#status");
  const modal = document.querySelector("#winModal");
  let first = null, second = null, locked = false;
  let moves = 0, matches = 0, seconds = 0, clock = null, started = false;

  const formatTime = value => String(Math.floor(value / 60)).padStart(2, "0") + ":" + String(value % 60).padStart(2, "0");
  function startClock() {
    if (started) return;
    started = true;
    clock = setInterval(() => {
      seconds++;
      timerDisplay.textContent = formatTime(seconds);
    }, 1000);
  }
  function updateStats() {
    movesDisplay.textContent = moves;
    matchesDisplay.textContent = matches + "/" + symbols.length;
    progress.style.width = (matches / symbols.length * 100) + "%";
  }
  function finish() {
    clearInterval(clock);
    document.querySelector("#finalTime").textContent = formatTime(seconds);
    document.querySelector("#finalMoves").textContent = moves;
    status.textContent = "Todos os pares encontrados!";
    window.setTimeout(() => { modal.hidden = false; document.querySelector("#playAgain").focus(); }, 500);
  }
  function choose(card) {
    if (locked || card === first || card.classList.contains("matched") || card.classList.contains("flipped")) return;
    startClock();
    card.classList.add("flipped");
    card.setAttribute("aria-label", "Carta " + card.dataset.symbol);
    if (!first) {
      first = card;
      status.textContent = "Agora encontre o par!";
      return;
    }
    second = card;
    moves++;
    updateStats();
    if (first.dataset.symbol === second.dataset.symbol) {
      first.classList.add("matched");
      second.classList.add("matched");
      first.disabled = true;
      second.disabled = true;
      matches++;
      first = second = null;
      updateStats();
      status.textContent = "Boa! Você encontrou um par.";
      if (matches === symbols.length) finish();
    } else {
      locked = true;
      status.textContent = "Não foi dessa vez. Tente novamente!";
      window.setTimeout(() => {
        [first, second].forEach(item => {
          item.classList.remove("flipped");
          item.setAttribute("aria-label", "Carta fechada");
        });
        first = second = null;
        locked = false;
        status.textContent = "Sua vez! Escolha uma carta.";
      }, 850);
    }
  }
  function shuffle(items) {
    for (let i = items.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [items[i], items[j]] = [items[j], items[i]];
    }
    return items;
  }
  function newGame() {
    clearInterval(clock);
    first = second = null;
    locked = false;
    moves = matches = seconds = 0;
    started = false;
    timerDisplay.textContent = "00:00";
    status.textContent = "Sua vez! Escolha uma carta.";
    modal.hidden = true;
    updateStats();
    const deck = shuffle([...symbols, ...symbols]);
    board.innerHTML = "";
    deck.forEach((symbol, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "card";
      button.dataset.symbol = symbol;
      button.setAttribute("aria-label", "Carta fechada");
      button.innerHTML = '<span class="card-inner"><span class="card-face card-back" aria-hidden="true">✦</span><span class="card-face card-front" aria-hidden="true">' + symbol + '</span></span>';
      button.addEventListener("click", () => choose(button));
      board.appendChild(button);
    });
  }
  document.querySelector("#restart").addEventListener("click", newGame);
  document.querySelector("#playAgain").addEventListener("click", newGame);
  newGame();
})();