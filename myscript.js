// console.log("Welcome to Spotify");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myprogressBar = document.getElementById('myprogressbar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songitem'));

let songs = [
    { songName: "Soorede - from Salaar", filePath: "./songs/1.mp3", coverPath: "covers/1.jpeg" },
    { songName: "Yaalo Yaala - from Animal", filePath: "./songs/2.mp3", coverPath: "covers/2.jpeg" },
    { songName: "Samayama - from Hi-Nanna", filePath: "./songs/3.mp3", coverPath: "covers/3.jpeg" },
    { songName: "Nuvvu Navvukuntu - from MAD", filePath: "./songs/4.mp3", coverPath: "covers/4.jpeg" },
    { songName: "Priya Mithunam - from Adhipurush", filePath: "./songs/5.mp3", coverPath: "covers/5.jpeg" },
    { songName: "Dum Masala - from GunturKaaram", filePath: "./songs/6.mp3", coverPath: "covers/6.jpeg" },
]

songItems.forEach((element, i) => {
    // element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})

//handle play pause click
var count = 0;
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
        if (count == 0) {
            masterSongName.innerText = songs[0].songName;
            count++;
        }
    }
    else {
        audioElement.pause();
        makeAllPlays();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }


})
// listen to events

audioElement.addEventListener('ended', () => {
    if (songIndex >= 5) {
        songIndex = 0
    }
    else {
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})

audioElement.addEventListener('timeupdate', () => {
    //update  seekbar
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myprogressBar.value = progress;
})

myprogressBar.addEventListener('change', () => {
    audioElement.currentTime = myprogressBar.value * audioElement.duration / 100;

})

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');

    })
}


let songItemPlay = Array.from(document.getElementsByClassName('songItemPlay'));
songItemPlay.forEach((element) => {
    element.addEventListener('click', (e) => {
        if (e.target.classList.contains('fa-play-circle')) {
            makeAllPlays();
            songIndex = parseInt(e.target.id);
            e.target.classList.remove('fa-play-circle');
            e.target.classList.add('fa-pause-circle');
            audioElement.src = `songs/${songIndex + 1}.mp3`;
            masterSongName.innerText = songs[songIndex].songName;
            audioElement.currentTime = 0;
            audioElement.play();
            gif.style.opacity = 1;
            masterPlay.classList.remove('fa-play-circle');
            masterPlay.classList.add('fa-pause-circle');
        }
        else {
            // e.target.classList.remove('fa-pause-circle');
            // e.target.classList.add('fa-play-circle');
            makeAllPlays();
            audioElement.pause();
            gif.style.opacity = 0;
            masterPlay.classList.remove('fa-pause-circle');
            masterPlay.classList.add('fa-play-circle');
        }
    })


})


document.getElementById('next').addEventListener('click', () => {
    if (songIndex >= 5) {
        songIndex = 0
    }
    else {
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    gif.style.opacity = 1;
})

document.getElementById('previous').addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = 0
    }
    else {
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    gif.style.opacity = 1;
})