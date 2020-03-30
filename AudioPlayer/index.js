const titleMusic = document.querySelector("#title"),
  progress = document.querySelector("#progress"),
  progressContainer = document.querySelector("#progress-container"),
  audio = document.querySelector("#audio"),
  cover = document.querySelector("#cover"),
  prev = document.querySelector("#prev"),
  play = document.querySelector("#play"),
  next = document.querySelector("#next"),
  musicContainer = document.querySelector("#music-container");

const musicHeader = ["I Want To Hold Your Hand", "Let It Be", "Yesterday"];
let selectedMusic = 0;

function changeAudioStatus() {
  const songIsPlaying = musicContainer.classList.contains("play");
  if (songIsPlaying) {
    stopAudio();
  } else {
    playAudio();
  }

  /*   if (audio.paused) {
    playAudio();
    musicContainer.classList.add("play");
  } else {
    stopAudio();
    musicContainer.classList.remove("play");
  } */
}

function playAudio() {
  audio.play();
  /*   play.innerHTML = `
  <i class="fa fa-pause"></i>
  `; */
  play.querySelector("i.fa").classList.remove("fa-play");
  play.querySelector("i.fa").classList.add("fa-pause");
  musicContainer.classList.add("play");
}

function stopAudio() {
  audio.pause();
  /*   play.innerHTML = `
  <i class="fa fa-play"></i>
  `; */
  play.querySelector("i.fa").classList.remove("fa-pause");
  play.querySelector("i.fa").classList.add("fa-play");
  musicContainer.classList.remove("play");
}

play.addEventListener("click", changeAudioStatus);

function initAudio() {
  titleMusic.innerText = `${musicHeader[selectedMusic]}`;
  audio.src = `./music/${musicHeader[selectedMusic]}.mp3`;
  cover.src = `./img/${musicHeader[selectedMusic]}.jpg`;
}

function prevSong() {
  if (selectedMusic === 0) {
    selectedMusic = musicHeader.length - 1;
  } else {
    selectedMusic--;
  }
  initAudio();
  playAudio();
}
function nextSong() {
  if (selectedMusic >= musicHeader.length - 1) {
    selectedMusic = 0;
  } else {
    selectedMusic++;
  }
  initAudio();
  playAudio();
}

prev.addEventListener("click", prevSong);
next.addEventListener("click", nextSong);

function progredWidth(e) {
  let { duration, currentTime } = e.target;
  progress.style.width = `${(currentTime / duration) * 100}% `;
}

audio.addEventListener("timeupdate", progredWidth);

function setCurrentTime(e) {
  const widthEl = this.clientWidth;
  const positionCurrent = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (positionCurrent / widthEl) * duration;
}

audio.addEventListener("ended", nextSong);

progressContainer.addEventListener("click", setCurrentTime);

initAudio();
