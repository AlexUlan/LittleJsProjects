const textBreath = document.querySelector("#text");
const containerCircle = document.querySelector("#container");

const totalTime = 7500;
const breatheTime = (totalTime / 5) * 2;
const holdTime = totalTime / 5;

breathAnimation();

function breathAnimation() {
  containerCircle.className = "container grow";
  textBreath.innerText = "Breathe In!";
  setTimeout(() => {
    textBreath.innerText = "Hold!";
    setTimeout(() => {
      containerCircle.className = "container shrink";
      textBreath.innerText = "Breathe Out!";
      setTimeout(breathAnimation, breatheTime);
    }, holdTime);
  }, breatheTime);
}
