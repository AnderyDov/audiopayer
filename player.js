// Элементы упрвления
const audio = document.getElementById('audio');
const info = document.querySelector('.info');
const time = document.querySelector('.time');
const play = document.querySelector('.play');
const pause = document.querySelector('.pause');
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');
const file = document.querySelector('.file');
const listbut = document.querySelector('.listbut');
const list = document.querySelector('.list');

// Состояние приложения
let treckList = [];

file.onchange = () => {
    for (const i in file.files) {
        if (typeof file.files[i] === 'object') {
            treckList.push(file.files[i]);
        }
    }
    console.log(treckList);
    treckList.forEach((el) => {
        const li = document.createElement('li');
        const span = document.createElement('span');
        const but = document.createElement('button');
        but.innerHTML = 'del';
        span.innerHTML = el.name;
        li.append(span);
        li.append(but);
        list.append(li);
    });
    audio.src = URL.createObjectURL(treckList[treckList.length - 1]);
    file.value = null;
};
// console.log(audio.src);
// console.log(audio.controlsList);
// console.log(audio.crossOrigin);
// console.log(audio.currentSrc);
// console.log(audio.currentTime);
// console.log(audio.disableRemotePlayback);
// console.log(audio.duration);
// console.log(audio.ended);
// console.log(audio.textTracks);
// console.log(audio.srcObject);
// console.log(audio.volume);

play.onclick = (e) => {
    if (treckList.length) {
        const t = e.currentTarget;
        t.firstElementChild.classList.toggle('hide');
        t.lastElementChild.classList.toggle('hide');
        if (
            t.firstElementChild.classList.contains('hide') &&
            !t.lastElementChild.classList.contains('hide')
        ) {
            audio.play();
        } else {
            audio.pause();
        }
    } else {
        info.innerHTML = 'Невыбрано не одного аудио файла';
    }
};

listbut.onclick = () => {
    list.classList.toggle('listhide');
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
