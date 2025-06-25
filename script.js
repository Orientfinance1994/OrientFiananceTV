// Clock
function updateClock() {
  const clock = document.getElementById("clock");
  const now = new Date();
  clock.textContent = now.toLocaleString();
}
setInterval(updateClock, 1000);
updateClock();

// Slideshow Logic
const slides = document.querySelectorAll(".slide");
let currentSlide = 0;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle("active", i === index);
  });
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

setInterval(nextSlide, 30000); // switch every 30s

// Video playlist logic
const playlist = [
  "video/why_orient.mp4",
  "video/nifty_02.mp4",
  "video/nifty_video.mp4"
];
let videoIndex = 0;
const videoPlayer = document.getElementById("videoPlayer");

function playNextVideo() {
  videoPlayer.src = playlist[videoIndex];
  videoPlayer.play();
  videoIndex = (videoIndex + 1) % playlist.length;
}

videoPlayer.addEventListener("ended", playNextVideo);
playNextVideo(); 