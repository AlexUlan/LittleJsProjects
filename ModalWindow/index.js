const toggle = document.querySelector("#toggle");
const open = document.querySelector("#open");
const modal = document.querySelector("#modal");
const close = document.querySelector("#close");

// Toogle nav
toggle.addEventListener("click", () => {
  document.body.classList.toggle("show-nav");
});

// Open modal
open.addEventListener("click", () => {
  modal.classList.add("show-modal");
});

//close modal
close.addEventListener("click", () => {
  modal.classList.remove("show-modal");
});

window.addEventListener("click", e => {
  e.target === modal ? modal.classList.remove("show-modal") : false;
});
