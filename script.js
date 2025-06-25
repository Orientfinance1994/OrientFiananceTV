// Clock
function updateClock() {
  const now = new Date();
  const h = String(now.getHours()).padStart(2, '0');
  const m = String(now.getMinutes()).padStart(2, '0');
  const s = String(now.getSeconds()).padStart(2, '0');
  document.getElementById('clock').textContent = `${h}:${m}:${s}`;
}
setInterval(updateClock, 1000);
updateClock();

// Video playlist logic
const videoPlayer = document.getElementById('videoPlayer');
const videoSources = [
  'video/why_orient.mp4',
  'video/nifty_02.mp4',
  'video/nifty_video.mp4'
];
let videoIdx = 0;

function playNextVideo() {
  videoIdx = (videoIdx + 1) % videoSources.length;
  videoPlayer.src = videoSources[videoIdx];
  videoPlayer.play().catch(e => console.log('Video autoplay blocked:', e));
}

if (videoPlayer && videoSources.length > 1) {
  videoPlayer.addEventListener('ended', playNextVideo);
  videoPlayer.src = videoSources[0];
} 