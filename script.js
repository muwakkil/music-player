const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');

const songs = ["01 Lose My Mind",
  "02 No Room for a Saint",
  "03 Drive",
  "04 Just Keep Watching",
  "05 Messy",
  "06 Don’t Let Me Drown",
  "07 Underdog",
  "08 Grandma Calls the Boy Bad News",
  "09 Bad as I Used to Be",
  "10 Baja California",
  "11 OMG!",
  "12 All at Once"];

let songIndex = 0;

function loadSong(song) {
  title.innerText = song;
  audio.src = `music/f1-the-album_2025/${song}.mp3`;
  cover.src = `images/cover_itemimage.JPG`;
}

loadSong(songs[songIndex]);

function playSong() {
  musicContainer.classList.add('play');
  playBtn.querySelector('i.fas').classList.replace('fa-play', 'fa-pause');
  audio.play();
}

function pauseSong() {
  musicContainer.classList.remove('play');
  playBtn.querySelector('i.fas').classList.replace('fa-pause', 'fa-play');
  audio.pause();
}

playBtn.addEventListener('click', () => {
  const isPlaying = musicContainer.classList.contains('play');
  isPlaying ? pauseSong() : playSong();
});

function prevSong() {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  loadSong(songs[songIndex]);
  playSong();
}

function nextSong() {
  songIndex = (songIndex + 1) % songs.length;
  loadSong(songs[songIndex]);
  playSong();
}

prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const percent = (currentTime / duration) * 100;
  progress.style.width = `${percent}%`;
}

audio.addEventListener('timeupdate', updateProgress);

function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  audio.currentTime = (clickX / width) * audio.duration;
}

progressContainer.addEventListener('click', setProgress);

audio.addEventListener('ended', nextSong);