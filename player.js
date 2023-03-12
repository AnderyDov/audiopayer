// Элементы упрвления
const audio = document.querySelector('.audio');
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
let currentTreck = null;
let palyed = false;

play.onclick = () => {
    palyed = !palyed;
    treckStartPause(palyed);
};
listbut.onclick = showTreckList;
file.onchange = changeAudioFiles;
prev.onclick = handlePrevTreck;
next.onclick = handleNextTreck;

// Обработчик добавления аудио файлов
function changeAudioFiles() {
    for (const i in file.files) {
        if (typeof file.files[i] === 'object') {
            obj = file.files[i];
            obj.id = Math.random();
            treckList.push(file.files[i]);
        }
    }
    list.innerHTML = '';
    treckList.forEach((el, index) => {
        const li = document.createElement('li');
        const span = document.createElement('span');
        const del = document.createElement('button');
        del.innerHTML = 'del';
        del.onclick = handleTrackDelet;
        span.innerHTML = el.name;
        li.id = el.id;
        li.classList.add('li');
        li.append(span);
        li.append(del);
        li.onclick = () => handleChangeTreck(index);
        list.append(li);
    });
    currentTreck = treckList.length ? treckList.length - 1 : 0;
    audio.src = URL.createObjectURL(treckList[currentTreck]);
    file.value = null;
    play.firstElementChild.classList.remove('hide');
    play.lastElementChild.classList.add('hide');
    document.querySelectorAll('.li').forEach((el, i) => {
        el.classList.remove('active');
        if (i === currentTreck) {
            el.classList.add('active');
        }
    });
}

// Обработчик начала и паузы проигрывания трека
function treckStartPause(variant) {
    if (treckList.length) {
        if (variant === true) {
            play.firstElementChild.classList.add('hide');
            play.lastElementChild.classList.remove('hide');
        } else {
            play.firstElementChild.classList.remove('hide');
            play.lastElementChild.classList.add('hide');
        }
        info.innerHTML = treckList[currentTreck].name;
        document.querySelectorAll('.li').forEach((el, i) => {
            el.classList.remove('active');
            if (i === currentTreck) {
                el.classList.add('active');
            }
        });
        audio.src = URL.createObjectURL(treckList[currentTreck]);
        if (
            play.firstElementChild.classList.contains('hide') &&
            !play.lastElementChild.classList.contains('hide')
        ) {
            audio.play();
        } else {
            audio.pause();
        }
    } else {
        info.innerHTML = 'Невыбрано не одного аудио файла';
        return false;
    }
}

// Обработчик выбора трека в списке воспроизведения
function handleChangeTreck(index) {
    currentTreck = index;
    treckStartPause(palyed);
}
//  Обработчик скарытия показа списка воспроизведения
function showTreckList() {
    list.classList.toggle('listhide');
}

// Обработчик удаления трека
function handleTrackDelet(e) {
    e.stopPropagation();
    e.currentTarget.parentElement.remove();
    treckList = treckList.filter((el) => {
        return el.id !== +e.currentTarget.parentElement.id;
    });
    currentTreck = 0;
    palyed = false;
    treckStartPause(false);
}

// Обработчик переключения трека назад
function handlePrevTreck() {
    if (treckList.length && treckList[currentTreck - 1]) {
        --currentTreck;
        audio.src = URL.createObjectURL(treckList[currentTreck]);
        treckStartPause(palyed);
    } else if (treckList.length && !treckList[currentTreck - 1]) {
        currentTreck = treckList.length - 1;
        audio.src = URL.createObjectURL(treckList[currentTreck]);
        treckStartPause(palyed);
    } else {
        info.innerHTML = 'Невыбрано не одного аудио файла';
        return false;
    }
}

// Обработчик переключения трека вперёд
function handleNextTreck() {
    if (treckList.length && treckList[currentTreck + 1]) {
        ++currentTreck;
        audio.src = URL.createObjectURL(treckList[currentTreck]);
        treckStartPause(palyed);
    } else if (treckList.length && !treckList[currentTreck + 1]) {
        currentTreck = 0;
        audio.src = URL.createObjectURL(treckList[currentTreck]);
        treckStartPause(play);
    } else {
        info.innerHTML = 'Невыбрано не одного аудио файла';
        return false;
    }
}

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
