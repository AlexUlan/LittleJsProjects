const cardsContainer = document.querySelector("#cards-container"),
  currentTextEl = document.querySelector("#current"),
  nextBtn = document.querySelector("#next"),
  prevBtn = document.querySelector("#prev"),
  hideBtn = document.querySelector("#hide"),
  addContainer = document.querySelector("#add-container"),
  showBtn = document.querySelector("#show"),
  addCardBtn = document.querySelector("#add-card"),
  questionFild = document.querySelector("#question"),
  answerFild = document.querySelector("#answer"),
  removeCard = document.querySelector("#clear");

const cardsData = getGards();

let currentCard = 0;

// Store DOM cards
const cardsEl = [];

function getGards() {
  const cards = JSON.parse(localStorage.getItem("cards"));
  return cards || [];
}

function createCards() {
  cardsData.forEach((card, index) => {
    crateCard(card, index);
  });
  updateCurrentText();
  updateDisableBtn();
}

function crateCard(data, index) {
  const { question, answer } = data;
  const card = document.createElement("div");
  card.classList.add("card");
  if (index === 0) {
    card.classList.add("active");
  }
  card.innerHTML = `
      <div class="inner-card">
      <div class="inner-card-front">
        <p>${question}</p>
      </div>
      <div class="inner-card-back">
        <p>${answer}</p>
      </div>
    </div>
  `;
  card.addEventListener("click", () => {
    card.classList.toggle("show-answer");
  });
  cardsEl.push(card);
  cardsContainer.appendChild(card);
}

function updateCurrentText() {
  currentTextEl.innerText = cardsEl.length
    ? `${currentCard + 1}/${cardsEl.length} `
    : "-";
}

function updateDisableBtn() {
  nextBtn.className =
    currentCard === cardsEl.length - 1 || !cardsData.length
      ? "nav-button disableBtn"
      : "nav-button";
  prevBtn.className =
    currentCard === 0 ? "nav-button disableBtn" : "nav-button";
}

nextBtn.addEventListener("click", function () {
  if (currentCard < cardsEl.length - 1) {
    cardsEl[currentCard].className = "card left ";
    currentCard += 1;
    cardsEl[currentCard].className = "card active";
  }
  updateDisableBtn();
  updateCurrentText();
});

prevBtn.addEventListener("click", () => {
  if (currentCard !== 0) {
    cardsEl[currentCard].className = "card";
    currentCard -= 1;
    cardsEl[currentCard].className = "card active";
  }
  updateDisableBtn();
  updateCurrentText();
});

function toogleShowAddContainer() {
  addContainer.classList.toggle("show");
}

hideBtn.addEventListener("click", toogleShowAddContainer);
showBtn.addEventListener("click", toogleShowAddContainer);

function pushStorageCards() {
  localStorage.setItem("cards", JSON.stringify(cardsData));
  window.location.reload();
}

function createNewCard() {
  const question = questionFild.value;
  const answer = answerFild.value;
  if (question.trim() && answer.trim()) {
    const newCard = { question, answer };
    cardsData.push(newCard);
    pushStorageCards();
  }
}

addCardBtn.addEventListener("click", createNewCard);

function removeCardStorage() {
  /* 
  const { question, answer } = cardsData[currentCard]; */
  cardsData.splice(currentCard, 1);
  cardsEl.splice(currentCard, 1);

  pushStorageCards();
}

removeCard.addEventListener("click", removeCardStorage);

createCards();
