import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const datetimePicker = document.querySelector('#datetime-picker')
const btn = document.querySelector('[data-start]')
const timerEl = document.querySelector('.timer');
let timerId;

const day = document.querySelector('[data-days]')
const hours = document.querySelector('[data-hours]')
const minutes = document.querySelector('[data-minutes]')
const seconds = document.querySelector('[data-seconds]') 


// const namesOfDay = ['Неділя', "Понеділок", "Вівторок", "Середа", "Четвер", "Пятниця", "Субота"];
// const namesOfMonth = ['Січень', "Лютий", "Березень", "Квітень", "Травень", "Червень", "Липень", "Серпень", "Вересень", "Жовтень", "Листопад", "Грудень"];

let clickTime;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        clickTime = selectedDates[0];
        if (clickTime > new Date() ) {
            btn.disabled = false;
            
        } else {
            btn.disabled = true;
            Notiflix.Notify.failure("Please choose a date in the future")
        }
      console.log(clickTime);
    },
    onChange(){
        clearInterval(timerId)
    }
  };

const calendar = flatpickr(datetimePicker, options)

btn.disabled = true;
btn.addEventListener('click', countdown);


function countdown() {
    let remainingTime;
    btn.disabled = true;
    timerId = setInterval(() => {
        const currentTime = new Date();
        remainingTime = clickTime - currentTime;
        let countdownTime = convertMs(remainingTime);
        addLeadingZero(countdownTime);
        
        if (remainingTime < 1000) {
            clearInterval(timerId)
        };
        
    }, 1000)
}

function addLeadingZero(value) {
    const timeDay = value.days;
    const timeHours = value.hours;
    const timeMinutes = value.minutes;
    const timeSeconds = value.seconds;
    console.log( timeDay.toString().padStart(2, '0'), timeHours.toString().padStart(2, '0'), timeMinutes.toString().padStart(2, '0'), timeSeconds.toString().padStart(2, '0'));

    day.textContent = timeDay.toString().padStart(2, '0');
    hours.textContent = timeHours.toString().padStart(2, '0');
    minutes.textContent = timeMinutes.toString().padStart(2, '0');
    seconds.textContent = timeSeconds.toString().padStart(2, '0');
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


