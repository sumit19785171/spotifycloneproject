// Initialize the variable
let songindex = 0;
let audioElement = new Audio('songs/Animal.song.mp3');
let masterplay = document.getElementById('masterplay');
let myprogreesbar = document.getElementById('myprogreesbar');
let gif = document.getElementById('gif');
let songitems = Array.from(document.getElementsByClassName('song-item'));
let volumeIcon = document.getElementById('volumeIcon');
let volumeBar = document.getElementById('volumeBar');
let next = document.getElementById('next');
let previous = document.getElementById('previous');
let currentTimeElem = document.getElementById("currentTime");
let totalTimeElem = document.getElementById("totalTime");

let songs = [
    { songsName: "Animal.song.mp3", filepath: "songs/Animal.song.mp3", coverpath: "coverimge/image4.png" },
    { songsName: "Badri_Ki_Dulhania.mp3", filepath:"songs/Badri_Ki_Dulhania.mp3", coverpath:"coverimge/image1.png"},
    { songsName: "Balam_Pichkari_.mp3", filepath: "songs/Balam_Pichkari_.mp3", coverpath: "coverimge/image2.png" },
    { songsName: "Barbaadiyan.mp3", filepath: "songs/Barbaadiyan.mp3", coverpath: "coverimge/image6.png" },
    { songsName: "Bhool_Bhulaiyaa_2.mp3", filepath:"songs/Bhool_Bhulaiyaa_2.mp3", coverpath: "coverimge/image5.png" },
    { songsName: "Bhool_Bhulaiyaa_3.mp3", filepath: "songs/Bhool_Bhulaiyaa_3.mp3", coverpath: "coverimge/image5.png" },
    { songsName: "BOLLYWOOD_HOLI.mp3", filepath: "songs/BOLLYWOOD_HOLI.mp3", coverpath: "coverimge/image8.png" },
    { songsName: "Bom_Diggy_Diggy.mp3", filepath: "songs/Bom_Diggy_Diggy___VIDEO_.mp3", coverpath: "coverimge/image7.png" },
    { songsName: "DIL KAHATA HAI.mp3", filepath: "songs/DIL KAHATA HAI.mp3", coverpath: "coverimge/image9.png" },
    { songsName: "KHATU VALE KA JANMDIN AAY HAI", filepath: "songs/khatuvale ka janmdinaaya hai.mp3", coverpath: "coverimge/image10.png" },
];

songitems.forEach((element, i) => {
    element.getElementsByTagName('img')[0].src = songs[i].coverpath;
    element.getElementsByClassName('songName')[0].innerHTML = songs[i].songsName;
});

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songitemplay')).forEach((element) => {
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    });
}

Array.from(document.getElementsByClassName('songitemplay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        makeAllPlays();
        songindex = parseInt(e.target.id);

        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');

        audioElement.src = songs[songindex].filepath;
        audioElement.currentTime = 0;
        audioElement.play();

        masterplay.classList.remove('fa-circle-play');
        masterplay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
    })
})

// Handle play/pause click
masterplay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterplay.classList.remove('fa-circle-play');
        masterplay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        masterplay.classList.remove('fa-circle-pause');
        masterplay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
    }
})
volumeBar.addEventListener('input', () => {
    audioElement.volume = volumeBar.value / 100;

    if (audioElement.volume === 0) {
        volumeIcon.classList.remove('fa-volume-high');
        volumeIcon.classList.add('fa-volume-xmark');
    } else {
        volumeIcon.classList.remove('fa-volume-xmark');
        volumeIcon.classList.add('fa-volume-high');
    }
});
next.addEventListener('click', () => {
    if (songindex >= songs.length - 1) {
        songindex = 0;
    } else {
        songindex++;
    }

    audioElement.src = songs[songindex].filepath;
    audioElement.currentTime = 0;
    audioElement.play();

    masterplay.classList.remove('fa-circle-play');
    masterplay.classList.add('fa-circle-pause');
    gif.style.opacity = 1;
});

// PREVIOUS BUTTON
previous.addEventListener('click', () => {
    if (songindex <= 0) {
        songindex = songs.length - 1;
    } else {
        songindex--;
    }

    audioElement.src = songs[songindex].filepath;
    audioElement.currentTime = 0;
    audioElement.play();

    masterplay.classList.remove('fa-circle-play');
    masterplay.classList.add('fa-circle-pause');
    gif.style.opacity = 1;
});

volumeIcon.addEventListener('click', () => {
    if (audioElement.volume > 0) {
        audioElement.volume = 0;
        volumeBar.value = 0;
        volumeIcon.classList.remove('fa-volume-high');
        volumeIcon.classList.add('fa-volume-xmark');
    } else {
        audioElement.volume = 1;
        volumeBar.value = 100;
        volumeIcon.classList.remove('fa-volume-xmark');
        volumeIcon.classList.add('fa-volume-high');
    }
});
// Listen to progress
audioElement.addEventListener('timeupdate', () => {
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myprogreesbar.value = progress;
})

myprogreesbar.addEventListener('input', () => {
    audioElement.currentTime = myprogreesbar.value * audioElement.duration / 100;
})
// show actual duration
songitems.forEach((element, i) => {
    let audio = new Audio(songs[i].filepath);

    audio.addEventListener('loadedmetadata', () => {
        let totalSec = audio.duration;
        let minutes = Math.floor(totalSec / 60);
        let seconds = Math.floor(totalSec % 60);

        if (seconds < 10) seconds = "0" + seconds;

        element.getElementsByClassName("duration")[0].innerText = `${minutes}:${seconds}`;
    });
});
audioElement.addEventListener("loadedmetadata", () => {
    let duration = audioElement.duration;
    let min = Math.floor(duration / 60);
    let sec = Math.floor(duration % 60);
    if(sec < 10) sec = "0" + sec;
    totalTimeElem.innerHTML = `${min}:${sec}`;
});

// CURRENT TIME UPDATE
audioElement.addEventListener("timeupdate", () => {
    let cur = audioElement.currentTime;
    let min = Math.floor(cur / 60);
    let sec = Math.floor(cur % 60);
    if(sec < 10) sec = "0" + sec;
    currentTimeElem.innerHTML = `${min}:${sec}`;
});
