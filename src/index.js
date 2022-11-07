import { nanoid } from "nanoid";

import "./index.scss";

const ChangeTimeSession = document.querySelector('.js-setting-session');
const ChangeTimeBreak = document.querySelector('.js-setting-break');
const timeSession = document.querySelector('.js-session');
const timeBreak = document.querySelector('.js-break');
const outputTimeMinutes = document.querySelector('.container__time-minut');
const outputTimeSecond = document.querySelector('.container__time-second');
const timerStart = document.querySelector('.container__start');
const timerReset = document.querySelector('.container__reset');
const title = document.querySelector('.container__sub-title');

timeBreak.innerHTML = JSON.parse(localStorage.getItem('minutesBreak'));
timeSession.innerHTML = JSON.parse(localStorage.getItem('minutesSession'))
outputTimeMinutes.innerHTML = JSON.parse(localStorage.getItem('minutesSession'))

let second = 59;
let minutes = Number(timeSession.textContent) - 1;
let countIteration = 0;
let startTimer = false;

// Настрайка времени break, кнопки + и -

ChangeTimeBreak.addEventListener('click', (event) => {
    const { target } = event;
    let timeMinutes = Number(timeBreak.textContent);
    if(target.textContent === '+') {
        timeMinutes += 1;
        timeBreak.innerHTML = timeMinutes;
        localStorage.setItem("minutesBreak", JSON.stringify(timeBreak.textContent));
    }

    if(target.textContent === '-') {
        timeMinutes -= 1;
        timeBreak.innerHTML = timeMinutes;
        localStorage.setItem("minutesBreak", JSON.stringify(timeBreak.textContent));
    }
})

// Настрайка времени session, кнопки + и -

ChangeTimeSession.addEventListener('click', (event) => {
    const { target } = event;
    if(target.textContent === '+') {
        minutes += 1;
        timeSession.innerHTML = minutes + 1;
        outputTimeMinutes.innerHTML = minutes + 1;
        localStorage.setItem("minutesSession", JSON.stringify(timeSession.textContent));
    }

    if(target.textContent === '-') {
        minutes -= 1;
        timeSession.innerHTML = minutes + 1;
        outputTimeMinutes.innerHTML = minutes + 1;
        localStorage.setItem("minutesSession", JSON.stringify(timeSession.textContent));
    }
})

// Вывод времени

function timer() {
    const countSecond = setInterval(() => {
        if(String(minutes).length != 2) {
            while(String(minutes).length != 2) {
                minutes = '0' + minutes;
            }
        }
        
        if(String(second).length != 2) {
            while(String(second).length != 2) {
                second = '0' + second;
            }
        }
        
        outputTimeMinutes.innerHTML = (`${minutes}`);
        outputTimeSecond.innerHTML = (`${second}`);
    
        second -= 1;
        if(second < 0) {
            minutes -= 1;
            second = 59;
            if(minutes < 0 ) {
                countIteration++
                if(countIteration % 2 === 0) {
                    minutes = Number(timeSession.textContent) - 1;
                    second = 59;
                    title.innerHTML = 'session';
                } else {
                    minutes = Number(timeBreak.textContent) - 1;
                    second = 59;
                    title.innerHTML = 'break';
                }
            }
        }
    
        timerReset.addEventListener('click', () => {
            clearInterval(countSecond);
            outputTimeMinutes.innerHTML = timeSession.innerHTML
            outputTimeSecond.innerHTML = '00';
            title.innerHTML = 'session'
            second = 59
            startTimer = false;
        })
    
    }, 1000);
}


// Функция запуска звукового сигнала

//function soundEnd() {
//    const audio = new Audio();
//    audio.src = 'dzin.MP3';
//    audio.autoplay = true;
//}

// Старт таймера

timerStart.addEventListener('click', () => {
    if(!startTimer) {
        startTimer = true;
        timer()
    }
})