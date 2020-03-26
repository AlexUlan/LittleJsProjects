const current_one = document.querySelector("#currency-one");
const amount_one = document.querySelector("#amount-one");

const current_two = document.querySelector("#currency-two");
const amount_two = document.querySelector("#amount-two");

const swap = document.querySelector("#rate");
const swapBtn = document.querySelector("#rateBtn");

function caclulate() {
  let currentValue_one = current_one.value;
  let currentValue_two = current_two.value;
  fetch(`https://api.exchangeratesapi.io/latest?base=${currentValue_one}`)
    .then(res => res.json())
    .then(data => {
      let rate = data.rates[currentValue_two];
      swap.innerHTML = `1 ${currentValue_one} = ${rate} ${currentValue_two} `;
      amount_two.value = +(amount_one.value * rate).toFixed(4);
    });
}

current_one.addEventListener("change", caclulate);
amount_one.addEventListener("input", caclulate);
current_two.addEventListener("change", caclulate);
amount_two.addEventListener("input", caclulate);

swapBtn.addEventListener("click", () => {
  let temp = current_one.value;
  current_one.value = current_two.value;
  current_two.value = temp;

  caclulate();
});

caclulate();
