const currentYear = new Date().getFullYear();
const days = document.querySelector("#days"),
  hours = document.querySelector("#hours"),
  minutes = document.querySelector("#minutes"),
  seconds = document.querySelector("#seconds"),
  spinner = document.querySelector("#loading"),
  countdown = document.querySelector("#countdown");
const newYearTime = new Date(`January 01 ${currentYear + 1} 00:00:00`);

function updateCountdown() {
  const currentTime = new Date();
  const dif = newYearTime - currentTime;
  const s = Math.floor(dif / 1000) % 60;
  const m = Math.floor(dif / 1000 / 60) % 60;
  const h = Math.floor(dif / 1000 / 60 / 60) % 24;
  const d = Math.floor(dif / 1000 / 60 / 60 / 24);
  days.innerText = d;
  hours.innerText = h < 10 ? "0" + h : h;
  minutes.innerText = m < 10 ? "0" + m : m;
  seconds.innerText = s < 10 ? "0" + s : s;
}

setTimeout(() => {
  spinner.remove();
  countdown.style.display = "flex";
}, 1000);

setInterval(updateCountdown, 1000);
