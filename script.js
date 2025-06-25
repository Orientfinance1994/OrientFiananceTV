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

// Inject TradingView Widgets
function injectTradingViewChart() {
  const container = document.querySelector('.chart-panel .tradingview-widget-container');
  if (!container) return;
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
  script.async = true;
  script.innerHTML = JSON.stringify({
    autosize: true,
    symbol: 'OANDA:XAUUSD',
    interval: 'W',
    timezone: 'Etc/UTC',
    theme: 'light',
    style: '1',
    locale: 'en',
    allow_symbol_change: true
  });
  container.querySelector('.tradingview-widget-container__widget').appendChild(script);
}

function injectTradingViewTicker() {
  const container = document.querySelector('.ticker-tape .tradingview-widget-container');
  if (!container) return;
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
  container.querySelector('.tradingview-widget-container__widget').appendChild(script);
}

document.addEventListener('DOMContentLoaded', function() {
  injectTradingViewChart();
  injectTradingViewTicker();
}); 