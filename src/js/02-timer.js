import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const dataDays = document.querySelector('[data-days]');
const inputTime = document.querySelector('datetime-picker');
const dataHours = document.querySelector('[data-hours]');
const dataMinutes = document.querySelector('[data-minutes]');
const dataSeconds = document.querySelector('[data-seconds]');
const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector('button[data-stop]');

let countdownInterval;
// let selectedDate = null;
// let currentDate = null;
// btnStart.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];

    if (selectedDate > Date.now()) {
      btnStart.removeAttribute('disabled');
    } else {
      Notify.failure('Please choose a date in the future');
    }
  },
};

const calendar = flatpickr(inputTime, options);

btnStart.addEventListener('click', () => {
  const selectedDate = calendar.selectedDates[0];

  if (selectedDate > Date.now()) {
    const difference = selectedDate - Date.now();
    startCountdown(difference);

    btnStart.setAttribute("disabled", true);
    btnStop.removeAttribute("disabled"); 
  } else {
    Notify.failure('Please choose a date in the future');
  }
});

btnStop.addEventListener('click', () => {
  stopCountdown();

  btnStart.removeAttribute("disabled"); 
  btnStop.setAttribute("disabled", true);
});



function startCountdown(ms) {
  countdownInterval = setInterval(() => {
    const { days, hours, minutes, seconds } = convertMs(ms);
            dataDays.textContent = addLeadingZero(days);
            dataHours.textContent = addLeadingZero(hours);
            dataMinutes.textContent = addLeadingZero(minutes);
            dataSeconds.textContent = addLeadingZero(seconds);
        if (ms <= 0) {
      clearInterval(countdownInterval);
      alert("Countdown has finished!");
    } else {
      ms -= 1000; 
    }
  }, 1000);
}
    function stopCountdown() {
      clearInterval(countdownInterval);
  
      dataDays.textContent = '00';
      dataHours.textContent = '00';
      dataMinutes.textContent = '00';
      dataSeconds.textContent = '00';
}

    function convertMs(ms) {
        const second = 1000;
        const minute = second * 60;
        const hour = minute * 60;
        const day = hour * 24;
  
        const days = Math.floor(ms / day);
        const hours = Math.floor((ms % day) / hour);
        const minutes = Math.floor(((ms % day) % hour) / minute);
        const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
        return { days, hours, minutes, seconds };
    }
function addLeadingZero(value) {
  return value < 10 ? `0${value}` : value.toString();
}
