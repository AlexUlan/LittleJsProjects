const balance = document.querySelector("#balance"),
  moneyPlus = document.querySelector("#money-plus"),
  moneyMinus = document.querySelector("#money-minus"),
  transitionList = document.querySelector("#list"),
  textTransition = document.querySelector("#text"),
  amountTransition = document.querySelector("#amount"),
  addBtn = document.querySelector("#addBtn");

/* const dummyTransactions = [
  { id: 1, text: "Flower", amount: -20 },
  { id: 2, text: "Salary", amount: 300 },
  { id: 3, text: "Book", amount: -10 },
  { id: 4, text: "Camera", amount: 150 },
  { id: 5, text: "Camera", amount: 150 },
]; */

let tranistionsFromLocalStorage = JSON.parse(
  localStorage.getItem("tranistions"),
);

let transactions =
  localStorage.getItem("tranistions") !== null
    ? tranistionsFromLocalStorage
    : [];

function upDateLocalStorage() {
  localStorage.setItem("tranistions", JSON.stringify(transactions));
}

// Добавление эл в список расходов-доходов

function addTransitionBd(e) {
  e.preventDefault();
  if (
    textTransition.value.trim() === "" ||
    amountTransition.value.trim() === ""
  ) {
    alert("Enter text and amount tranistion");
  } else {
    const newTransition = {
      id: Math.floor(Math.random() * 100000),
      text: textTransition.value,
      amount: +amountTransition.value,
    };

    transactions.push(newTransition);
    upDateLocalStorage();
    textTransition.value = "";
    amountTransition.value = "";

    init();
  }
}

function deleteTransition(idTrn) {
  transactions = transactions.filter(trn => idTrn !== trn.id);
  upDateLocalStorage();
  init();
}

function addTrantionDOM(transition) {
  const sign = transition.amount > 0 ? "+" : "-";

  let element = document.createElement("li");
  element.classList.add(transition.amount > 0 ? "plus" : "minus");
  element.innerHTML = `
  ${transition.text}<span> ${sign} ${Math.abs(
    transition.amount,
  )}$</span><button class="delete-btn" onClick="deleteTransition(${
    transition.id
  })">X</button>
  `;
  transitionList.appendChild(element);
}

// Инициализация приложения

function updateValues() {
  const total = transactions.reduce((acc, amount) => (acc += amount.amount), 0);

  const income = transactions
    .filter(tr => tr.amount > 0)
    .reduce((acc, amount) => (acc += amount.amount), 0)
    .toFixed(2);

  const expense =
    transactions
      .filter(tr => tr.amount < 0)
      .reduce((acc, amount) => (acc += amount.amount), 0)
      .toFixed(2) * -1;

  balance.innerText = `$${total} `;
  moneyPlus.innerText = `$${income}`;
  moneyMinus.innerText = `$${expense}`;
}

function init() {
  transitionList.innerHTML = "";
  transactions.forEach(addTrantionDOM);
  updateValues();
}

addBtn.addEventListener("click", addTransitionBd);

init();
