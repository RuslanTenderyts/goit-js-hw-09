const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
let timerId = null;

stopBtn.disabled = true;

startBtn.addEventListener("click", onStartBtnClick);
stopBtn.addEventListener("click", onStopBtnClick);

function onStartBtnClick() {
  timerId = setInterval(() => {
    chamgeBtnDisabled(true, false);
    console.log('start change backgroundColor for body')
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
};

function onStopBtnClick() {
  clearInterval(timerId);
  chamgeBtnDisabled( false, true);
  console.log(`Interval with id ${timerId} has stopped!`)
};

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }

function chamgeBtnDisabled (start, stop) {
  startBtn.disabled = start;
  stopBtn.disabled = stop;
}