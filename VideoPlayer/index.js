const video = document.querySelector("#video");
const play = document.querySelector("#play");
const stop = document.querySelector("#stop");
const progress = document.querySelector("#progress");
const timestamp = document.querySelector("#timestamp");

function togglevideoStatus() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

function updatePlayIcon() {
  if (video.paused) {
    play.innerHTML = '<i class="fas fa-play"></i>';
  } else {
    play.innerHTML = '<i class="fas fa-pause"></i>';
  }
}

function updateProgtess() {
  progress.value = (video.currentTime / video.duration) * 100;

  let min = Math.floor(video.currentTime / 60);
  if (min < 10) {
    min = "0" + String(min);
  }

  let sec = Math.floor(video.currentTime % 60);

  if (sec < 10) {
    sec = "0" + String(sec);
  }
  timestamp.innerHTML = `${min}:${sec} `;
}

function setVideoProgress() {
  video.currentTime = (+progress.value * video.duration) / 100;
}
function stopVideo() {
  video.currentTime = 0;
  video.pause();
}
video.addEventListener("click", togglevideoStatus);
video.addEventListener("pause", updatePlayIcon);
video.addEventListener("play", updatePlayIcon);
video.addEventListener("timeupdate", updateProgtess);

play.addEventListener("click", togglevideoStatus);
stop.addEventListener("click", stopVideo);

progress.addEventListener("change", setVideoProgress);
