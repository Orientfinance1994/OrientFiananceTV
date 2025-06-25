// Clock
function updateClock() {
  var clock = document.getElementById("clock");
  var now = new Date();
  clock.textContent = now.toLocaleString();
}
setInterval(updateClock, 1000);
updateClock();

// Slideshow Logic
var slides = document.querySelectorAll(".slide");
var currentSlide = 0;

function showSlide(index) {
  for (var i = 0; i < slides.length; i++) {
    if (i === index) {
      slides[i].className = "slide active";
    } else {
      slides[i].className = "slide";
    }
  }
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

setInterval(nextSlide, 30000); // switch every 30s

// Video playlist logic
var playlist = [
  "video/why_orient.mp4",
  "video/nifty_02.mp4",
  "video/nifty_video.mp4"
];
var videoIndex = 0;
var videoPlayer = document.getElementById("videoPlayer");

function playNextVideo() {
  videoPlayer.src = playlist[videoIndex];
  videoPlayer.play();
  videoIndex = (videoIndex + 1) % playlist.length;
}

if (videoPlayer) {
  videoPlayer.addEventListener("ended", playNextVideo);
  playNextVideo();
} 