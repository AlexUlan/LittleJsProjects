const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.querySelector("#count");
const price = document.querySelector("#price");
const movieSelect = document.querySelector("#movie");

popilationUI();

let ticketPrice = +movieSelect.value;

function popilationUI() {
  const selectedSeats = JSON.parse(localStorage.getItem("listSelectSeats"));

  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add("select");
      }
    });
  }

  const selectionMovi = localStorage.getItem("indexSelectedMovie");
  movieSelect.selectedIndex = selectionMovi;
}

function updateSelectedMovies(indexSelectedMovie, costSelectedMovie) {
  localStorage.setItem("indexSelectedMovie", indexSelectedMovie);
  localStorage.setItem("costSelectedMovie", costSelectedMovie);
}

movieSelect.addEventListener("change", e => {
  ticketPrice = e.target.value;
  updateSelectCount();
  updateSelectedMovies(e.target.selectedIndex, e.target.value);
});

container.addEventListener("click", e => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    e.target.classList.toggle("select");
    updateSelectCount();
  }
});

function updateSelectCount() {
  const selectedSeat = container.querySelectorAll(".select");
  const selectedSeatCount = selectedSeat.length;
  count.innerText = selectedSeatCount;
  price.innerText = selectedSeatCount * ticketPrice;

  const seatsSelectIndex = [...selectedSeat].map(item => {
    return Array.from(seats).indexOf(item);
  });
  localStorage.setItem("listSelectSeats", JSON.stringify(seatsSelectIndex));
}

updateSelectCount();
