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
let currentTreck = null;

file.onchange = () => {
    for (const i in file.files) {
        if (typeof file.files[i] === 'object') {
            obj = file.files[i];
            obj.id = Math.random();
            treckList.push(file.files[i]);
        }
    }
    console.log(treckList);
    list.innerHTML = '';
    treckList.forEach((el, index) => {
        const li = document.createElement('li');
        const span = document.createElement('span');
        const del = document.createElement('button');
        del.innerHTML = 'del';
        del.onclick = (e) => {
            e.currentTarget.parentElement.remove();
            treckList = treckList.filter((el) => {
                return el.id !== +e.currentTarget.parentElement.id;
            });
            console.log(treckList);
        };
        span.innerHTML = el.name;
        li.id = el.id;
        li.classList.add('li');
        li.append(span);
        li.append(del);
        li.onclick = (e) => {
            document.querySelectorAll('.li').forEach((el) => {
                el.classList.remove('active');
            });
            currentTreck = index;
            audio.src = URL.createObjectURL(treckList[currentTreck]);
            console.log(currentTreck);
            e.currentTarget.classList.add('active');
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
        };
        list.append(li);
    });
    currentTreck = treckList.length ? treckList.length - 1 : 0;
    audio.src = URL.createObjectURL(treckList[currentTreck]);
    file.value = null;
    play.firstElementChild.classList.remove('hide');
    play.lastElementChild.classList.add('hide');
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
