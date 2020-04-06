const main = document.querySelector("main"),
  textBox = document.querySelector("#text-box"),
  tooglebtn = document.querySelector("#toggle"),
  closeBtn = document.querySelector("#close"),
  voicesEl = document.querySelector("#voices"),
  selectListVoices = document.querySelector("#voices"),
  saybtn = document.querySelector("#read"),
  selfText = document.querySelector("#text");
const synth = speechSynthesis;

const data = [
  {
    image: "./img/drink.jpg",
    text: "I'm Thirsty",
  },
  {
    image: "./img/food.jpg",
    text: "I'm Hungry",
  },
  {
    image: "./img/tired.jpg",
    text: "I'm Tired",
  },
  {
    image: "./img/hurt.jpg",
    text: "I'm Hurt",
  },
  {
    image: "./img/happy.jpg",
    text: "I'm Happy",
  },
  {
    image: "./img/angry.jpg",
    text: "I'm Angry",
  },
  {
    image: "./img/sad.jpg",
    text: "I'm Sad",
  },
  {
    image: "./img/scared.jpg",
    text: "I'm Scared",
  },
  {
    image: "./img/outside.jpg",
    text: "I Want To Go Outside",
  },
  {
    image: "./img/home.jpg",
    text: "I Want To Go Home",
  },
  {
    image: "./img/school.jpg",
    text: "I Want To Go To School",
  },
  {
    image: "./img/grandma.jpg",
    text: "I Want To Go To Grandmas",
  },
];

//init obj speak
const message = new SpeechSynthesisUtterance();

function createBox(item) {
  const { image, text } = item;
  const box = document.createElement("div");
  box.classList.add("box");
  box.innerHTML = `
    <figure>
        <img src='${image}' alt=${text}>
        <figcaption class="info">${text}</figcaption>
    </figure>
  `;
  main.appendChild(box);

  box.addEventListener("click", () => {
    setTextSpeech(text);
    sayText();
    box.classList.add("active");
    setTimeout(() => {
      box.classList.remove("active");
    }, 1000);
  });
}

function setTextSpeech(text) {
  message.text = text;
}

function sayText() {
  speechSynthesis.speak(message);
}

function toogleTextBox() {
  textBox.classList.toggle("show");
}

closeBtn.addEventListener("click", toogleTextBox);

tooglebtn.addEventListener("click", toogleTextBox);

let voices = [];

function getVoices() {
  // Т.к. в виндовс задержка получение голосов
  setTimeout(
    () => {
      voices = synth.getVoices();
      voices.forEach((voice) => {
        const option = document.createElement("option");
        option.innerHTML = `${voice.name} `;
        voicesEl.appendChild(option);
      });
    },

    100,
  );
}
getVoices();

synth.addEventListener("voiceschanged", getVoices);

function changeVoices(e) {
  message.voice = voices.find((voice) => e.target.value === voice.name);
}

selectListVoices.addEventListener("change", changeVoices);

function pronounceSelfText() {
  setTextSpeech(selfText.value);
  sayText();
}

saybtn.addEventListener("click", pronounceSelfText);

data.forEach(createBox);
