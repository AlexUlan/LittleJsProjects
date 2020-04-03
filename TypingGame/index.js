const word = document.querySelector("#word"),
  typingWord = document.querySelector("#text"),
  scoreEl = document.querySelector("#score"),
  timeEl = document.querySelector("#time"),
  endGameContainer = document.querySelector("#end-game-container"),
  settingsBtn = document.querySelector("#settings-btn"),
  settingsContainer = document.querySelector("#settings"),
  difficultyEl = document.querySelector("#difficulty");

const words = [
  "sigh",
  "tense",
  "airplane",
  "ball",
  "pies",
  "juice",
  "warlike",
  "bad",
  "north",
  "dependent",
  "steer",
  "silver",
  "highfalutin",
  "superficial",
  "quince",
  "eight",
  "feeble",
  "admit",
  "drag",
  "loving",
];

let randomWord;
let score = 0;

let time = 10;

let tickTime = setInterval(() => {
  time--;
  if (time < 0) {
    endGame();
  }
  timeEl.innerHTML = time;
}, 1000);

let difficulty = localStorage.getItem("difficulty")
  ? localStorage.getItem("difficulty")
  : "medium";

function upScore() {
  score++;
  scoreEl.innerHTML = score;
}

function getRandomWord() {
  randomWord = words[Math.floor(Math.random() * words.length)];
  word.innerHTML = randomWord;
}

function chekWord(e) {
  if (e.target.value.trim().toLowerCase() === randomWord) {
    getRandomWord();
    upScore();
    switch (difficulty) {
      case "easy":
        time += 10;
        break;
      case "medium":
        time += 6;
        break;
      case "hard":
        time += 3;
        break;
    }

    e.target.value = "";
  }
}

function endGame() {
  clearInterval(tickTime);
  endGameContainer.style.display = "flex";
  endGameContainer.innerHTML = `
    <h1>Time out</h1>
    <p>You score: ${score} </p>
    <button autofocus  onclick="location.reload()">Start over</button>
  `;
}

typingWord.addEventListener("input", chekWord);

function initGame() {
  typingWord.focus();
  getRandomWord();
  difficultyEl.value = difficulty;
}

settingsBtn.addEventListener("click", () => {
  settingsContainer.classList.toggle("hide");
});

difficultyEl.addEventListener("change", e => {
  localStorage.setItem("difficulty", e.target.value);
});

initGame();
