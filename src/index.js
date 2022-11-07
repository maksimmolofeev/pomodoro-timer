import { nanoid } from "nanoid";

import "./index.scss";

const ChangeTimeSession = document.querySelector('.js-setting-session');
const ChangeTimeBreak = document.querySelector('.js-setting-break');
const timeSession = document.querySelector('.js-session');
const timeBreak = document.querySelector('.js-break');
const outputTimeMinutes = document.querySelector('.container__time-minut');
const outputTimeSecond = document.querySelector('.container__time-second');
//const timerStart = document.querySelector('.container__start');
//const timerReset = document.querySelector('.container__reset');
const btn = document.querySelector('.container__button');
const title = document.querySelector('.container__sub-title');

if (JSON.parse(localStorage.getItem('minutesBreak')) == null
    || JSON.parse(localStorage.getItem('minutesSession')) == null) {
        localStorage.setItem("minutesBreak", JSON.stringify(5));
        localStorage.setItem("minutesSession", JSON.stringify(25));
    }

timeBreak.innerHTML = JSON.parse(localStorage.getItem('minutesBreak'));
timeSession.innerHTML = JSON.parse(localStorage.getItem('minutesSession'))
outputTimeMinutes.innerHTML = JSON.parse(localStorage.getItem('minutesSession'))

let second = 59;
let minutes = Number(JSON.parse(localStorage.getItem('minutesSession'))) - 1;
let countIteration = 0;
let startTimer = false;
let isTimerActive = false;
let timerActive = '';

// Настрайка времени break, кнопки + и -

ChangeTimeBreak.addEventListener('click', (event) => {
    const { target } = event;
    let timeMinutes = Number(timeBreak.textContent);
    if (target.textContent === '+') {
        timeMinutes += 1;
        timeBreak.innerHTML = timeMinutes;
        localStorage.setItem("minutesBreak", JSON.stringify(timeBreak.textContent));
    }

    if (target.textContent === '-') {
        timeMinutes -= 1;
        timeBreak.innerHTML = timeMinutes;
        localStorage.setItem("minutesBreak", JSON.stringify(timeBreak.textContent));
    }
})

// Настрайка времени session, кнопки + и -

ChangeTimeSession.addEventListener('click', (event) => {
    const { target } = event;
    if (target.textContent === '+') {
        minutes += 1;
        timeSession.innerHTML = minutes + 1;
        outputTimeMinutes.innerHTML = minutes + 1;
        localStorage.setItem("minutesSession", JSON.stringify(timeSession.textContent));
    }

    if (target.textContent === '-') {
        minutes -= 1;
        timeSession.innerHTML = minutes + 1;
        outputTimeMinutes.innerHTML = minutes + 1;
        localStorage.setItem("minutesSession", JSON.stringify(timeSession.textContent));
    }
})

// Вывод времени

const timer = () => {
    if (String(minutes).length != 2) {
        minutes = '0' + minutes;
    }
    
    if (String(second).length != 2) {
        second = '0' + second;
    }
    
    outputTimeMinutes.innerHTML = (`${minutes}`);
    outputTimeSecond.innerHTML = (`${second}`);

    second -= 1;
    if (second < 0) {
        minutes -= 1;
        second = 59;
        if (minutes < 0 ) {
            countIteration++
            if (countIteration % 2 === 0) {
                minutes = Number(timeSession.textContent) - 1;
                second = 59;
                title.innerHTML = 'session';
            } else {
                minutes = Number(timeBreak.textContent) - 1;
                second = 59;
                title.innerHTML = 'break';
            };
        };
    };
};

// Старт таймера

btn.addEventListener('click', (event) => {
    const { target } = event;
    if (target.textContent === 'Start' && !startTimer) {
        startTimer = true;
        timerActive = setInterval(timer, 1000);
    } else if (target.textContent === 'Reset') {
        clearInterval(timerActive);
        outputTimeMinutes.innerHTML = timeSession.innerHTML
        outputTimeSecond.innerHTML = '00';
        title.innerHTML = 'session'
        second = 59
        startTimer = false;
    };
});