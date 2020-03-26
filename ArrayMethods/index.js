const main = document.querySelector("#main");
const addUserBtn = document.querySelector("#add-user");
const doubleMoneyBtn = document.querySelector("#double");
const showMillionairesBtn = document.querySelector("#show-millionaires");
const sortByMoneyBtn = document.querySelector("#sort");
const calculateWealthBtn = document.querySelector("#calculate-wealth");

let data = [];

async function fetchNewUser() {
  const res = await fetch("https://uinames.com/api/");
  const user = await res.json();
  let newUser = {
    name: `${user.name} ${user.surname}`,
    money: Math.floor(Math.random() * 1000000),
  };
  addUser(newUser);
}

function addUser(user) {
  data.push(user);
  updateDOM();
}

function updateDOM() {
  main.innerHTML = " <h2><strong>Люди</strong> Cбережения</h2>";

  data.forEach(item => {
    let newElement = document.createElement("div");
    newElement.classList.add("person");
    newElement.innerHTML = `<strong>${item.name}</strong> ${convertMoney(
      item.money,
    )}`;
    main.appendChild(newElement);
  });
}

function convertMoney(item) {
  return `$ ${item.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}`;
}

fetchNewUser();

function doubleMoney() {
  data = data.map(item => {
    return { ...item, money: item.money * 2 };
  });
  updateDOM();
}

function sortByWealth() {
  data.sort((a, b) => {
    return b.money - a.money;
  });
  updateDOM();
}

function filterMilloners() {
  data = data.filter(item => {
    return +item.money > 1000000;
  });
  updateDOM();
}

function sumWealt() {
  const wealt = data.reduce((amount, item) => {
    return (amount += +item.money);
  }, 0);

  console.log(wealt);
  const wealtEl = document.createElement("div");
  wealtEl.innerHTML = `<h3><strong>Общие накопление:</strong> ${convertMoney(
    wealt,
  )} </h3>`;
  main.appendChild(wealtEl);
}

doubleMoneyBtn.addEventListener("click", doubleMoney);
addUserBtn.addEventListener("click", fetchNewUser);
sortByMoneyBtn.addEventListener("click", sortByWealth);
showMillionairesBtn.addEventListener("click", filterMilloners);
calculateWealthBtn.addEventListener("click", sumWealt);

/* fetchNewUser();
fetchNewUser(); */
