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
function injectSingleTickerWidget(containerId, symbol) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = '';
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.async = true;
  script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-single-ticker.js';
  script.innerHTML = JSON.stringify({
    symbol: symbol,
    width: "100%",
    colorTheme: "dark",
    isTransparent: false,
    locale: "en"
  });
  container.appendChild(script);
}
function injectMQL5QuotesWidget(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = '';
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.async = true;
  script.setAttribute('data-type', 'quotes-widget');
  script.src = 'https://c.mql5.com/js/widgets/quotes/widget.js?v=1';
  script.innerHTML = JSON.stringify({
    type: 'overview',
    style: 'table',
    filter: [
      'EURUSD', 'USDJPY', 'GBPUSD', 'AUDUSD', 'USDCAD', 'USDCHF', 'NZDUSD', 'XAUUSD', 'XAGUSD'
    ],
    width: '100%',
    height: 420,
    period: 'M1',
    id: containerId
  });
  container.appendChild(script);
}
document.addEventListener('DOMContentLoaded', function() {
  injectTradingViewTicker();
  injectTradingViewChart();
  injectTradingViewTimeline();
  injectTradingViewEvents();
  injectCustomTradingViewEvents();
  injectSingleTickerWidget('single-ticker-eurusd', 'FX:EURUSD');
  injectSingleTickerWidget('single-ticker-gbpusd', 'FX:GBPUSD');
  injectSingleTickerWidget('single-ticker-usdjpy', 'FX:USDJPY');
  injectSingleTickerWidget('single-ticker-audusd', 'FX:AUDUSD');
  injectSingleTickerWidget('single-ticker-usdchf', 'FX:USDCHF');
  injectSingleTickerWidget('single-ticker-usdcad', 'FX:USDCAD');
  injectMQL5QuotesWidget('quotesWidgetOverview-slide1');
  injectMQL5QuotesWidget('quotesWidgetOverview-slide2');
  injectMQL5QuotesWidget('quotesWidgetOverview-slide3');
  injectMQL5QuotesWidget('quotesWidgetOverview-slide4');
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