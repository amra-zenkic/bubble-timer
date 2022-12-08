//const startingMinutes = 3600; // u sekundama radimo
//let time = startingMinutes;

let startingHours = 1;
let startingMinutes = 0;
let startingSeconds = 0;
let time = 3600;

let timerStarted = 0;
let timerPaused = 0;

let myInterval;

window.focus();

var window_focus;

$(window).focus(function() {
    window_focus = true;
});

$(window).focusout(function() {
    window_focus = false;
    console.log("out of focus");
    window.focus();
})


function mainTimer(a, b = 0) {
    if (b == 0) {
        if (a == 'S') {
            document.querySelector('#pause-btn').disabled = false;
            startingHours = document.getElementById('hours').value;
            startingMinutes = document.getElementById('minutes').value;
            startingSeconds = document.getElementById('seconds').value;

            time = startingSeconds % 60 + startingHours * 3600 + startingMinutes * 60;
            console.log(time);
            clearInterval(myInterval);
            myInterval = setInterval(updateCountdown, 1000);
        }

        const countdownEl = document.getElementById('timer');

        if (timerStarted == 0 || timerPaused == 1) {
            clearInterval(myInterval);
            myInterval = setInterval(updateCountdown, 1000);
        }

        function updateCountdown() {
            let hours = Math.floor((time / 3600) % 60);
            let minutes = Math.floor((time / 60) % 60);
            let seconds = time % 60;


            seconds = seconds < 10 ? '0' + seconds : seconds;
            minutes = minutes < 10 ? '0' + minutes : minutes;
            hours = hours < 10 ? '0' + hours : hours;

            countdownEl.innerHTML = `${hours}:${minutes}:${seconds}`;
            if(hours == 0 && minutes == 0 && seconds == 0) {
                document.getElementById('mySound').play();
                timerStarted = 0;
                timerPaused = 0;
                clearInterval(myInterval);
            }

            time--;
            timerStarted = 1;
        }

    }
    if (b == 1) {
        clearInterval(myInterval);
        timerStarted = 0;
        timerPaused = 1;
    }
}


function startTimer() {
    mainTimer('S');
}

function pauseTimer() {
    mainTimer('P', 1);
}

function resumeTimer() {
    mainTimer('R');
}

