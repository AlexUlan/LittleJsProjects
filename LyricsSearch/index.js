const apiURL = "https://api.lyrics.ovh";
const herokuCorsAcsees = "https://cors-anywhere.herokuapp.com";
const form = document.querySelector("#form"),
  searchFild = document.querySelector("#search"),
  resultEl = document.querySelector("#result"),
  moreSongs = document.querySelector("#more");

async function searchSong(term) {
  const res = await fetch(`${apiURL}/suggest/${term}`);
  const data = await res.json();
  showSongs(data);
}

async function getSongs(url) {
  const res = await fetch(`${herokuCorsAcsees}/${url}`);
  const data = await res.json();
  showSongs(data);
}

async function getLyrics(artist, titleSong) {
  // Либо повесить обрботчик на контаинер  result
  artist = artist.trim();
  titleSong = titleSong.trim();
  const res = await fetch(`${apiURL}/v1/${artist}/${titleSong}`);
  const data = await res.json();
  const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, "<br>");
  resultEl.innerHTML = `<h2>
      <strong>${artist}</strong> - ${titleSong}
      </h2>
      <span>${lyrics}</span>;
      `;

  moreSongs.innerHTML = "";
}

function showSongs(data) {
  resultEl.innerHTML = `
  <ul class="songs">
    ${data.data
      .map((song) => {
        return `<li> 
        <span><strong>${song.title}</strong> - ${song.artist.name}</span>
        <button 
        class="btn" 
        data-song-artist='${song.artist.name}' 
        data-song-name = '${song.title}' 
        onclick = "getLyrics('${song.artist.name}','${song.title}')">
        Get Lyrics
        </button>
      </li> `;
      })
      .join("")}
  </ul>
  `;
  moreSongs.innerHTML = `
  <div class="centered">
  ${
    data.prev
      ? `<button class='btn' onclick="getSongs('${data.prev}')">Prev</button>`
      : ""
  }
  ${
    data.next
      ? `<button class='btn' onclick="getSongs('${data.next}')">Next</button>`
      : ""
  }
  </div>
  `;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const valueRequest = searchFild.value.trim();
  if (!valueRequest) {
    alert("Please type in a search term");
  } else {
    searchSong(valueRequest);
  }
});
