// Элементы упрвления
let audio = document.getElementById('audio');
let time = document.querySelector('.time');
let play = document.querySelector('.play');
let pause = document.querySelector('.pause');
let prev = document.querySelector('.prev');
let next = document.querySelector('.next');

// Массив с названиями песен
let playlist = ['treck2.mp3', 'treck2.mp3'];

play.onclick = (e) => {
    const t = e.currentTarget;
    t.firstElementChild.classList.toggle('hide');
    t.lastElementChild.classList.toggle('hide');
    audio.src = './audio/' + playlist[0];
    if (
        t.firstElementChild.classList.contains('hide') &&
        !t.lastElementChild.classList.contains('hide')
    ) {
        audio.play();
    } else {
        audio.pause();
    }
};

// pause.addEventListener('click', function () {
//     // clearInterval(audioPlay);
// });

// prev.addEventListener('click', function () {
//     if (treck > 0) {
//         treck--;
//         switchTreck(treck);
//     } else {
//         treck = 3;
//         switchTreck(treck);
//     }
// });

// next.addEventListener('click', function () {
//     if (treck < 3) {
//         treck++;
//         switchTreck(treck);
//     } else {
//         treck = 0;
//         switchTreck(treck);
//     }
// });
