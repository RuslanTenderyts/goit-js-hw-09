const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
let timerId = null;

stopBtn.disabled = true;

startBtn.addEventListener("click", () => {
  timerId = setInterval(() => {
    startBtn.disabled = true;
    stopBtn.disabled = false;
    console.log('start change backgroundColor for body')
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
});


stopBtn.addEventListener("click", () => {
  clearInterval(timerId);
  startBtn.disabled = false;
  stopBtn.disabled = true;
  console.log(`Interval with id ${timerId} has stopped!`);
});


function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }