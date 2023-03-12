// Элементы упрвления
let audio = document.getElementById('audio');
let time = document.querySelector('.time');
let play = document.querySelector('.play');
let pause = document.querySelector('.pause');
let prev = document.querySelector('.prev');
let next = document.querySelector('.next');

// Массив с названиями песен
let playlist = ['treck1.mp3', 'treck2.mp3'];

let treck; // Переменная с индексом трека

// Событие перед загрузкой страницы
window.onload = function () {
    treck = 0; // Присваиваем переменной ноль
};

function switchTreck(numTreck) {
    audio.src = './audio/' + playlist[numTreck];
    audio.currentTime = 0;
    audio.play();
}

play.addEventListener('click', function () {
    audio.play();
    audioPlay = setInterval(function () {
        let audioTime = Math.round(audio.currentTime);
        let audioLength = Math.round(audio.duration);
        time.style.width = (audioTime * 100) / audioLength + '%';
        if (audioTime == audioLength && treck < 2) {
            treck++;
            switchTreck(treck);
        } else if (audioTime == audioLength && treck >= 2) {
            treck = 0;
            switchTreck(treck);
        }
    }, 10);
});

pause.addEventListener('click', function () {
    audio.pause();
    clearInterval(audioPlay);
});

prev.addEventListener('click', function () {
    if (treck > 0) {
        treck--;
        switchTreck(treck);
    } else {
        treck = 3;
        switchTreck(treck);
    }
});

next.addEventListener('click', function () {
    if (treck < 3) {
        treck++;
        switchTreck(treck);
    } else {
        treck = 0;
        switchTreck(treck);
    }
});
