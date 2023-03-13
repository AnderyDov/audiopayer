// Элементы упрвления
const audio = document.querySelector('.audio');
const track = document.querySelector('.track');
const info = document.querySelector('.info');
const volume = document.querySelector('.volume');
const prev = document.querySelector('.prev');
const play = document.querySelector('.play');
const next = document.querySelector('.next');
const time = document.querySelector('.time');
const hour = document.querySelector('.hour');
const min = document.querySelector('.min');
const sec = document.querySelector('.sec');
const file = document.querySelector('.file');
const listbut = document.querySelector('.listbut');
const list = document.querySelector('.list');

// Состояние приложения
let treckList = [];
let currentTreck = null;
let currentTimeInTrack = 0;
let palyed = false;

// Функционал приложения
play.onclick = (e) => {
    palyed = !palyed;
    treckStartPause(palyed);
};
listbut.onclick = showTreckList;
file.onchange = changeAudioFiles;
prev.onclick = handlePrevTreck;
next.onclick = handleNextTreck;
audio.onended = handleNextTreck;

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
        del.classList.add('del');
        del.innerHTML = '✘';
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
    list.classList.remove('listhide');
    if (treckList.length) {
        info.innerHTML = treckList[treckList.length - 1].name;
    }
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
            audio.currentTime = currentTimeInTrack;
            audio.play();
        } else {
            audio.pause();
        }
    } else {
        audio.src = '';
        play.firstElementChild.classList.remove('hide');
        play.lastElementChild.classList.add('hide');
        info.innerHTML = 'Невыбрано не одного аудио файла';
        return false;
    }
}

// Обработчик выбора трека в списке воспроизведения
function handleChangeTreck(index) {
    currentTimeInTrack = 0;
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
    currentTimeInTrack = 0;
    currentTreck = 0;
    palyed = false;
    treckStartPause(false);
}

// Обработчик переключения трека назад
function handlePrevTreck() {
    currentTimeInTrack = 0;
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
    currentTimeInTrack = 0;
    if (treckList.length && treckList[currentTreck + 1]) {
        ++currentTreck;
        audio.src = URL.createObjectURL(treckList[currentTreck]);
        treckStartPause(palyed);
    } else if (treckList.length && !treckList[currentTreck + 1]) {
        currentTreck = 0;
        audio.src = URL.createObjectURL(treckList[currentTreck]);
        treckStartPause(palyed);
    } else {
        info.innerHTML = 'Невыбрано не одного аудио файла';
        return false;
    }
}

// Форматировщик числа
function format(num) {
    if (num < 10) {
        return (num = '0' + num);
    } else {
        return num.toString();
    }
}

// Обработчик изменения проложения трекера
setInterval(() => {
    const currentTime = audio.currentTime;
    const duration = audio.duration;
    const value = ((currentTime / duration) * 100).toFixed(2);
    console.log(value);

    if (value !== 'NaN') {
        track.onchange = () => {
            console.log(audio.duration);
            console.log(audio.currentTime);
            if (audio.duration !== NaN) {
                console.log(audio.duration);
                audio.currentTime = Math.floor(
                    (+track.value / 100) * audio.duration,
                );
            }
        };
        hour.innerHTML = format(Math.floor((duration - currentTime) / 3600));
        min.innerHTML = format(Math.floor((duration - currentTime) / 60));
        sec.innerHTML = format(Math.floor((duration - currentTime) % 60));
        currentTimeInTrack = currentTime;
        track.value = value;
    }
}, 1000);

// console.log(audio.volume);
