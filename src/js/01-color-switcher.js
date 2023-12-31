const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');
const bodyColor = document.querySelector('body');

let timerId = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

btnStart.addEventListener("click", (element) => {
  timerId = setInterval(() => {
  bodyColor.style.backgroundColor = getRandomHexColor();
  }, 1000);
  btnStart.disabled = true;
  btnStop.disabled = false;
});

btnStop.addEventListener("click", (element) => {
  clearInterval(timerId);
  btnStart.disabled = false;
  btnStop.disabled = true;
});





