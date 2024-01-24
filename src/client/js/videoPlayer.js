const video = document.querySelector("video");
const playBtn = document.getElementById("play");
const playBtnIcon = playBtn.querySelector("i");
const muteBtn = document.getElementById("mute");
const muteBtnIcon = muteBtn.querySelector("i");
const volumeRange = document.getElementById("volume");
const currenTime = document.getElementById("currenTime");
const totalTime = document.getElementById("totalTime");
const timeline = document.getElementById("timeline");
const fullScreenBtn = document.getElementById("fullScreen");
const fullScreenIcon = fullScreenBtn.querySelector("i");
const videoContainer = document.getElementById("videoContainer");
const videoControls = document.getElementById("videoControls");

let constrolsTimeout = null;
let constrolsMovementTimeout = null;
let volumeValue = 0.5;
video.volume = volumeValue;

const handlePlayClick = (e) => {
  //watch 사이트 진입 || reload시 플레이어 자동 재생
  //멈추면 재생 아이콘 뜨기 개발
  //재생하면 일시정지 아이콘 뜨기
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
  playBtnIcon.classList = video.paused ? "fas fa-play" : "fas fa-pause";
};

const handleMuteClick = (e) => {
  //음소거시 음소거 아이콘 1초 노출
  video.muted = !video.muted;
  muteBtnIcon.classList = video.muted
    ? "fas fa-volume-mute"
    : "fas fa-volume-up";
  volumeRange.value = video.muted ? 0 : volumeValue;
};

const handleVolumeChange = (event) => {
  const {
    target: { value },
  } = event;
  if (video.muted) {
    video.muted = false;
    muteBtn.innerText = "Mute";
  }
  volumeValue = value;
  video.volume = value;
};

const formatTime = (seconds) =>
  new Date(seconds * 1000).toISOString().substr(14, 5);

const handleLoadedMetadata = () => {
  totalTime.innerText = formatTime(Math.floor(video.duration));
  timeline.max = Math.floor(video.duration);
};

const handleTimeUpdate = () => {
  currenTime.innerText = formatTime(Math.floor(video.currentTime));
  timeline.value = Math.floor(video.currentTime);
};

const handleTimelineChange = (event) => {
  const {
    target: { value },
  } = event;
  video.currentTime = value;
};

const handleFullscreen = () => {
  const fullscreen = document.fullscreenElement;
  if (fullscreen) {
    document.exitFullscreen();
    fullScreenIcon.classList = "fas fa-expand";
  } else {
    videoContainer.requestFullscreen();
    fullScreenIcon.classList = "fas fa-compress";
  }
};

const hideControls = () => videoControls.classList.remove("showing");

const handleMouseMove = () => {
  if (constrolsTimeout) {
    clearTimeout(constrolsTimeout);
    constrolsTimeout = null;
  }
  if (constrolsMovementTimeout) {
    clearTimeout(constrolsMovementTimeout);
    constrolsMovementTimeout = null;
  }
  videoControls.classList.add("showing");
  constrolsMovementTimeout = setTimeout(hideControls, 3000);
};

const handleMouseLeave = () => {
  constrolsTimeout = setTimeout(hideControls, 3000);
};

const handleKeyboard = (event) => {
  const keyBoardInput = event.key;
  if (keyBoardInput === " ") {
    event.preventDefault();
    return handlePlayClick();
  }
  if (
    keyBoardInput === "Enter" ||
    keyBoardInput === "f" ||
    keyBoardInput === "F"
  ) {
    return handleFullscreen();
  }
  if (keyBoardInput === "m" || keyBoardInput === "M") {
    return handleMuteClick();
  }
  if (keyBoardInput === "ArrowRight") {
    event.preventDefault();
    return (video.currentTime += 5);
  }
  if (keyBoardInput === "ArrowLeft") {
    event.preventDefault();
    return (video.currentTime -= 5);
  }
};

//스페이스바를 누르면 멈춤 PLAY/PAUSE
// document.addEventListener("keyup", (event) => {
//   if (event.code === "Space") {
//     handlePlayClick();
//   }
// });

//m 버튼으로 mute 사용하기
// document.addEventListener("keyup", (event) => {
//   if (event.keyCode === 77) {
//     handleMuteClick();
//   }
// });

const handleEnded = () => {
  const { id } = videoContainer.dataset;
  fetch(`/api/videos/${id}/view`, {
    method: "POST",
  });
  //00초로 플레이어 돌아오게 만들기 & 다음 영상 노출 및 되돌아가기 아이콘 노출
};

video.addEventListener("click", handlePlayClick);
playBtn.addEventListener("click", handlePlayClick);
muteBtn.addEventListener("click", handleMuteClick);
volumeRange.addEventListener("input", handleVolumeChange);
video.addEventListener("loadeddata", handleLoadedMetadata);
video.addEventListener("timeupdate", handleTimeUpdate);
video.addEventListener("ended", handleEnded);
videoContainer.addEventListener("mousemove", handleMouseMove);
videoContainer.addEventListener("mouseleave", handleMouseLeave);
timeline.addEventListener("input", handleTimelineChange);
fullScreenBtn.addEventListener("click", handleFullscreen);
window.addEventListener("keydown", handleKeyboard);
