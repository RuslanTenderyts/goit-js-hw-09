import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const datetimePicker = document.querySelector('input#datetime-picker')
const btn = document.querySelector('[data-start]')
const daysEl = document.querySelector('[data-days]')
const hoursEl = document.querySelector('[data-hours]')
const minutesEl = document.querySelector('[data-minutes]')
const secondsEl = document.querySelector('[data-seconds]') 

let timerId = null;
let clickTime = 0;

btn.disabled = true;
btn.addEventListener('click', onClick);

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: Date.now(),
    minuteIncrement: 1,
    onClose([selectedDates]) {
        clickTime = selectedDates.getTime();
        let isTime = clickTime <= Date.now();
        btn.disabled = isTime;

        if (isTime) {
            Notiflix.Notify.failure("Please choose a date in the future")
        } 
    },
    onChange(){
        clearInterval(timerId)
    }
  };

  flatpickr(datetimePicker, options);

function onClick() {
    btn.disabled = true;
    timerId = setInterval(() => {
        let countdownTime = convertMs(remainingTime(clickTime));
        setTimerValues(countdownTime);
              
        if (remainingTime(clickTime) < 1000) {
            clearInterval(timerId)
        };

    }, 1000)
}

function remainingTime(time) {
    return  (time - Date.now());
}

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}

function setTimerValues({days, hours, minutes, seconds}) {
    daysEl.textContent = addLeadingZero(days);
    hoursEl.textContent = addLeadingZero(hours);
    minutesEl.textContent = addLeadingZero(minutes);
    secondsEl.textContent = addLeadingZero(seconds);
}

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
  }


// const namesOfDay = ['Неділя', "Понеділок", "Вівторок", "Середа", "Четвер", "Пятниця", "Субота"];
// const namesOfMonth = ['Січень', "Лютий", "Березень", "Квітень", "Травень", "Червень", "Липень", "Серпень", "Вересень", "Жовтень", "Листопад", "Грудень"];
