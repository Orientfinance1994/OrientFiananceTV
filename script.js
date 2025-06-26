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

// Slide Rotation
const slides = Array.from(document.querySelectorAll('.slide'));
let currentSlide = 0;
let slideInterval = null;

// Video Playlist (Slide 2 only)
const videoPlayer = document.getElementById('videoPlayer');
const videoSources = [
  'video/why_orient.mp4',
  'video/nifty_02.mp4',
  'video/nifty_video.mp4'
];
let videoIdx = 0;
let videoPlaylistActive = false;

function showSlide(idx) {
  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === idx);
  });
  currentSlide = idx;
  // Video logic: only play when on Slide 2
  if (idx === 1) {
    startVideoPlaylist();
  } else {
    stopVideoPlaylist();
  }
}
function nextSlide() {
  showSlide((currentSlide + 1) % slides.length);
}
function prevSlide() {
  showSlide((currentSlide - 1 + slides.length) % slides.length);
}
function startSlideShow() {
  if (slideInterval) clearInterval(slideInterval);
  slideInterval = setInterval(nextSlide, 15000);
}
window.addEventListener('keydown', e => {
  if (e.key === 'ArrowRight') {
    nextSlide();
    startSlideShow();
  } else if (e.key === 'ArrowLeft') {
    prevSlide();
    startSlideShow();
  }
});
showSlide(0);
startSlideShow();

// Forex Table (Slide 1)
const forexData = [
  { symbol: 'EURUSD', name: 'Euro / US Dollar', price: 1.1000, bid: 1.0998, ask: 1.1002, change: 0.12 },
  { symbol: 'GBPUSD', name: 'British Pound / US Dollar', price: 1.2700, bid: 1.2697, ask: 1.2703, change: -0.08 },
  { symbol: 'USDJPY', name: 'US Dollar / Japanese Yen', price: 145.20, bid: 145.18, ask: 145.22, change: 0.05 },
  { symbol: 'AUDUSD', name: 'Australian Dollar / US Dollar', price: 0.6700, bid: 0.6698, ask: 0.6702, change: 0.09 },
  { symbol: 'USDCHF', name: 'US Dollar / Swiss Franc', price: 0.8900, bid: 0.8898, ask: 0.8902, change: -0.03 },
  { symbol: 'USDCAD', name: 'US Dollar / Canadian Dollar', price: 1.3400, bid: 1.3397, ask: 1.3403, change: 0.02 }
];
function updateForexTable() {
  const tbody = document.querySelector('#forex-table tbody');
  tbody.innerHTML = '';
  forexData.forEach(row => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${row.symbol}</td>
      <td>${row.name}</td>
      <td>${row.price.toFixed(4)}</td>
      <td>${row.bid.toFixed(4)}</td>
      <td>${row.ask.toFixed(4)}</td>
      <td style="color:${row.change >= 0 ? 'green' : 'red'}">${row.change >= 0 ? '+' : ''}${row.change.toFixed(2)}%</td>
    `;
    tbody.appendChild(tr);
  });
}
function simulateForexUpdates() {
  forexData.forEach(row => {
    // Simulate small random price changes
    const delta = (Math.random() - 0.5) * 0.002;
    row.price += delta;
    row.bid = row.price - 0.0002;
    row.ask = row.price + 0.0002;
    row.change = (Math.random() - 0.5) * 0.2;
  });
  updateForexTable();
}
updateForexTable();
setInterval(simulateForexUpdates, 10000);

// TradingView Widgets Injection
function injectTradingViewTicker() {
  const container = document.getElementById('ticker-tape-widget');
  if (!container) return;
  container.innerHTML = '';
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js';
  script.async = true;
  script.innerHTML = JSON.stringify({
    symbols: [
      { proName: 'FOREXCOM:SPXUSD', title: 'S&P 500' },
      { proName: 'FX_IDC:EURUSD', title: 'EUR/USD' },
      { proName: 'BITSTAMP:BTCUSD', title: 'Bitcoin' },
      { proName: 'BITSTAMP:ETHUSD', title: 'Ethereum' },
      { proName: 'OANDA:XAUUSD', title: 'Gold' }
    ],
    colorTheme: 'light',
    isTransparent: false,
    displayMode: 'adaptive',
    locale: 'en'
  });
  container.appendChild(script);
}
function injectTradingViewChart() {
  const container = document.getElementById('chart-widget');
  if (!container) return;
  container.innerHTML = '';
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
  script.async = true;
  script.innerHTML = JSON.stringify({
    allow_symbol_change: true,
    calendar: false,
    details: false,
    hide_side_toolbar: true,
    hide_top_toolbar: false,
    hide_legend: false,
    hide_volume: false,
    hotlist: false,
    interval: 'D',
    locale: 'en',
    save_image: true,
    style: '1',
    symbol: 'OANDA:XAUUSD',
    theme: 'light',
    timezone: 'Etc/UTC',
    backgroundColor: '#ffffff',
    gridColor: 'rgba(46, 46, 46, 0.06)',
    watchlist: [],
    withdateranges: false,
    compareSymbols: [],
    studies: [],
    width: 1000,
    height: 810
  });
  container.appendChild(script);
}
function injectTradingViewTimeline() {
  const container = document.getElementById('timeline-widget');
  if (!container) return;
  container.innerHTML = '';
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-timeline.js';
  script.async = true;
  script.innerHTML = JSON.stringify({
    feedMode: 'all_symbols',
    isTransparent: false,
    displayMode: 'regular',
    width: '100%',
    height: '100%',
    colorTheme: 'light',
    locale: 'en'
  });
  container.appendChild(script);
}
function injectTradingViewEvents() {
  const container = document.getElementById('events-widget');
  if (!container) return;
  container.innerHTML = '';
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-events.js';
  script.async = true;
  script.innerHTML = JSON.stringify({
    colorTheme: 'light',
    isTransparent: false,
    width: '100%',
    height: '100%',
    locale: 'en',
    importanceFilter: '-1,0,1'
  });
  container.appendChild(script);
}
function injectCustomTradingViewEvents() {
  const container = document.getElementById('custom-events-widget');
  if (!container) return;
  container.innerHTML = '';
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-events.js';
  script.async = true;
  script.innerHTML = JSON.stringify({
    colorTheme: "light",
    isTransparent: false,
    locale: "en",
    countryFilter: "ar,au,br,ca,cn,fr,de,in,id,it,jp,kr,mx,ru,sa,za,tr,gb,us,eu",
    importanceFilter: "0,1",
    width: 400,
    height: 550
  });
  container.appendChild(script);
}
document.addEventListener('DOMContentLoaded', function() {
  injectTradingViewTicker();
  injectTradingViewChart();
  injectTradingViewTimeline();
  injectTradingViewEvents();
  injectCustomTradingViewEvents();
});

function startVideoPlaylist() {
  if (!videoPlayer || videoSources.length <= 1) return;
  videoPlaylistActive = true;
  videoPlayer.src = videoSources[videoIdx];
  videoPlayer.play().catch(e => {});
}
function stopVideoPlaylist() {
  videoPlaylistActive = false;
  if (videoPlayer) videoPlayer.pause();
}
function playNextVideo() {
  if (!videoPlaylistActive) return;
  videoIdx = (videoIdx + 1) % videoSources.length;
  videoPlayer.src = videoSources[videoIdx];
  videoPlayer.play().catch(e => {});
}
if (videoPlayer && videoSources.length > 1) {
  videoPlayer.addEventListener('ended', playNextVideo);
} 