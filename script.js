let currentMusic = 0;

const music = document.querySelector('#audio');
const seekBar = document.querySelector('.seek-bar');
const songName = document.querySelector('.song-name');
const artistName = document.querySelector('.artist-name');
const disk = document.querySelector('.disk');
const currentTime = document.querySelector('.curr-time');
const duration = document.querySelector('.duration');
const playBtn = document.querySelector('.play-btn');
const forwardBtn = document.querySelector('.forward-btn');
const backBtn = document.querySelector('.back-btn');
// const forwardBtn = document.querySelector('.fa-forward-step');
// const backBtn = document.querySelector('.fa-backward-step');


playBtn.addEventListener('click', () =>{
    if(playBtn.className.includes('pause')){
        music.play()
    }else{
        music.pause()
    }
    playBtn.classList.toggle('pause');
    disk.classList.toggle('play');
})


const setMusic = (i) =>{
    seekBar.value = 0;
    let song = mohbadSongs[i];
    currentMusic = i;
    music.src = song.path;

    songName.innerHTML = song.name;
    artistName.innerHTML = song.artist;
    disk.style.backgroundImage = `url('${song.cover}')`;

    currentTime.innerHTML = '00:00';
    // seekBar.max = music.duration
    // console.log(music.duration);
    setTimeout(() => {
        seekBar.max = music.duration;
        duration.innerHTML = formatTime(music.duration); 
    }, 300);
}

setMusic(0);

const formatTime = (time) =>{
    let min = Math.floor(time / 60);
    if(min < 10) {
        min = `0${min}`;
    }
    let sec = Math.floor(time % 60);
    if(sec < 10) {
        sec = `0${sec}`;
    }
    return `${min} : ${sec}`;
}

// seekBar Runs
setInterval(() => {
    seekBar.value = music.currentTime;
    currentTime.innerHTML = formatTime(music.currentTime)
}, 500)

seekBar.addEventListener('change', () => {
    music.currentTime = seekBar.value;
})
const playMusic = () => {
    music.play();
    playBtn.classList.remove('pause')
    disk.classList.add('play')
}

// forward and backward buttons
forwardBtn.addEventListener('click', () => {
    if(currentMusic >= mohbadSongs.length - 1) {
        currentMusic = 0;
    }else{
        currentMusic++;
    }
    setMusic(currentMusic);
    playMusic();
})

backBtn.addEventListener('click', () => {
    if(currentMusic <= 0) {
        currentMusic = mohbadSongs.length - 1;
    }else{
        currentMusic--;
    }
    setMusic(currentMusic);
    playMusic();
})