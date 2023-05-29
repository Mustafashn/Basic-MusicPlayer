const container = document.querySelector(".container");
const image = document.querySelector("#music-image");
const title = document.querySelector(".music-details .title");
const singer = document.querySelector(".music-details .singer");
const prev = document.querySelector("#controls #prev");
const play = document.querySelector("#controls #play");
const playIcon = document.querySelector("#controls #play i");
const next = document.querySelector("#controls #next");
const durationTime = document.querySelector("#progress .times #duration-time");
const currenTime = document.querySelector("#progress .times #current-time");
const progressBar = document.querySelector("#progress-bar");
const player = new MusicPlayer(musicList);
const volume = document.querySelector("#volume");
const volumeBar = document.querySelector("#volume-bar");
const ul = document.querySelector("ul");

window.addEventListener("load", () => {
  getMusic();
  displayMusicList(player.musicList);
  isPlayingNow();
});
function getMusic() {
  let music = player.getMusic();
  displayMusic(music);
}
function displayMusic(music) {
  title.innerText = music.getName();
  image.src = "img/" + music.img;
  audio.src = "mp3/" + music.file;
}

play.addEventListener("click", () => {
  let isMusicPlay = container.classList.contains("playing");
  isMusicPlay ? pauseMusic() : playMusic();
});
prev.addEventListener("click", () => {
  player.prevMusic();
  getMusic();
  playMusic();
  isPlayingNow();
});
next.addEventListener("click", () => {
  player.nextMusic();
  getMusic();
  playMusic();
  isPlayingNow();
});
function pauseMusic() {
  audio.pause();
  playIcon.classList = "fa-solid fa-play";
  container.classList.remove("playing");
}
function playMusic() {
  audio.play();
  playIcon.classList = "fa-solid fa-pause";
  container.classList.add("playing");
}

function calculateTime(totalSecond) {
  const minute = Math.floor(totalSecond / 60);
  const second = Math.floor(totalSecond % 60);
  if (second < 10) {
    updatedSecond = `0${second}`;
  } else {
    updatedSecond = `${second}`;
  }
  const sonuc = `${minute}:${updatedSecond}`;
  return sonuc;
}
audio.addEventListener("loadedmetadata", () => {
  durationTime.textContent = calculateTime(audio.duration);
  progressBar.max = Math.floor(audio.duration);
});
audio.addEventListener("timeupdate", () => {
  progressBar.value = Math.floor(audio.currentTime);
  currenTime.textContent = calculateTime(progressBar.value);
});
progressBar.addEventListener("input", () => {
  currenTime.textContent = calculateTime(progressBar.value);
  audio.currentTime = progressBar.value;
});
let muteState = "unmuted";
volume.addEventListener("click", () => {
  if (muteState === "unmuted") {
    audio.muted = true;
    muteState = "muted";
    volumeBar.value = 0;
    volume.classList = "fa-solid fa-volume-xmark";
  } else {
    audio.muted = false;
    muteState = "unmuted";
    volumeBar.value = audio.volume * 100;
    volume.classList = "fa-solid fa-volume-high";
  }
});

volumeBar.addEventListener("input", (e) => {
  const value = e.target.value;
  audio.volume = value / 100;
  if (value == 0) {
    volume.classList = "fa-solid fa-volume-xmark";
    audio.muted = true;
    muteState = "muted";
  } else {
    audio.muted = false;
    muteState = "unmuted";
    volume.classList = "fa-solid fa-volume-high";
  }
});

function displayMusicList(list) {
  for (let i = 0; i < list.length; i++) {
    let liTag = `
    <li 
    li-index = '${i}' onclick="selectedMusic(this)" 
    class="list-group-item d-flex justify-content-between">
              <span>${list[i].getName()} </span>
              <span id="music-${i}" class="badge bg-primary rounded-pill">3:32</span>
              <audio class="music-${i}" src="mp3/${list[i].file}"></audio>
            </li>
            `;
    ul.insertAdjacentHTML("beforeend", liTag);

    let liAudioDuration = ul.querySelector(`#music-${i}`);
    let liAudioTag = ul.querySelector(`.music-${i}`);
    liAudioTag.addEventListener("loadeddata", () => {
      liAudioDuration.innerText = calculateTime(liAudioTag.duration);
    });
  }
}
const selectedMusic = (li) => {
  player.index = li.getAttribute("li-index");
  displayMusic(player.getMusic());
  playMusic();
  isPlayingNow();
};
const isPlayingNow = () => {
  for (let li of ul.querySelectorAll("li")) {
    if (li.classList.contains("playing")) {
      li.classList.remove("playing");
    }
    if (li.getAttribute("li-index") == player.index) {
      li.classList.add("playing");
    }
  }
};
audio.addEventListener("ended", () => {
  player.nextMusic();
  getMusic();
  playMusic();
  isPlayingNow();
});
