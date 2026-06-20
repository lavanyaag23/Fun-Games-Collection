const DIFFICULTY = {
  easy: { duration: 30, minDelay: 700, maxDelay: 1300, minShow: 900, maxShow: 1400 },
  medium: { duration: 30, minDelay: 500, maxDelay: 1000, minShow: 650, maxShow: 1000 },
  hard: { duration: 25, minDelay: 350, maxDelay: 700, minShow: 450, maxShow: 750 }
};

const STORAGE_KEY = 'whackBest_v1';
const HOLE_COUNT = 9;

const grid = document.getElementById('grid');
const scoreEl = document.getElementById('score');
const timerEl = document.getElementById('timer');
const bestStatEl = document.getElementById('bestStat');
const diffButtons = document.querySelectorAll('.diff-btn');
const startBtn = document.getElementById('startBtn');
const endOverlay = document.getElementById('endOverlay');
const finalScoreEl = document.getElementById('finalScore');
const newBestTag = document.getElementById('newBestTag');
const playAgainBtn = document.getElementById('playAgainBtn');

let bestRecords = loadBest();
let currentDiff = 'easy';
let holes = [];
let score = 0;
let timeLeft = DIFFICULTY[currentDiff].duration;
let running = false;
let lastIndex = -1;
let countdownInterval = null;
let audioCtx = null;

buildGrid();
updateBestDisplay();
updateTimerDisplay();

diffButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    if (running || btn.dataset.diff === currentDiff) return;
    diffButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentDiff = btn.dataset.diff;
    timeLeft = DIFFICULTY[currentDiff].duration;
    updateTimerDisplay();
    updateBestDisplay();
  });
});

startBtn.addEventListener('click', startGame);
playAgainBtn.addEventListener('click', () => {
  hideOverlay(endOverlay);
  startGame();
});

function loadBest() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  return {};
}

function saveBest() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(bestRecords));
}

function updateBestDisplay() {
  const rec = bestRecords[currentDiff];
  bestStatEl.textContent = rec !== undefined ? rec : '--';
}

function buildGrid() {
  grid.innerHTML = '';
  holes = [];
  for (let i = 0; i < HOLE_COUNT; i++) {
    const hole = document.createElement('div');
    hole.className = 'hole';
    hole.dataset.index = i;
    hole.innerHTML = '<div class="mole">🐹</div>';
    hole.addEventListener('click', () => onHoleClick(i, hole));
    grid.appendChild(hole);
    holes.push(hole);
  }
}

function startGame() {
  running = true;
  score = 0;
  lastIndex = -1;
  timeLeft = DIFFICULTY[currentDiff].duration;
  updateScore();
  updateTimerDisplay();
  startBtn.disabled = true;
  diffButtons.forEach(b => (b.disabled = true));
  hideOverlay(endOverlay);

  countdownInterval = setInterval(() => {
    timeLeft--;
    updateTimerDisplay();
    if (timeLeft <= 0) endGame();
  }, 1000);

  spawnLoop();
}

function spawnLoop() {
  if (!running) return;
  const config = DIFFICULTY[currentDiff];
  const delay = randomBetween(config.minDelay, config.maxDelay);

  setTimeout(() => {
    if (!running) return;
    const index = pickHoleIndex();
    const hole = holes[index];
    hole.classList.add('active');
    hole.dataset.whacked = 'false';

    const showTime = randomBetween(config.minShow, config.maxShow);
    setTimeout(() => {
      if (!running) return;
      hole.classList.remove('active');
      spawnLoop();
    }, showTime);
  }, delay);
}

function pickHoleIndex() {
  let index;
  do {
    index = Math.floor(Math.random() * HOLE_COUNT);
  } while (index === lastIndex && HOLE_COUNT > 1);
  lastIndex = index;
  return index;
}

function onHoleClick(index, hole) {
  if (!running) return;
  if (!hole.classList.contains('active') || hole.dataset.whacked === 'true') return;

  hole.dataset.whacked = 'true';
  hole.classList.remove('active');
  hole.classList.add('whacked');
  setTimeout(() => hole.classList.remove('whacked'), 280);

  score++;
  updateScore();
  soundWhack();
  burstParticles(hole);
}

function endGame() {
  running = false;
  clearInterval(countdownInterval);
  holes.forEach(h => h.classList.remove('active', 'whacked'));

  startBtn.disabled = false;
  diffButtons.forEach(b => (b.disabled = false));

  const prevBest = bestRecords[currentDiff];
  const isNewBest = prevBest === undefined || score > prevBest;
  if (isNewBest) {
    bestRecords[currentDiff] = score;
    saveBest();
  }

  finalScoreEl.textContent = score;
  newBestTag.classList.toggle('hidden', !isNewBest);
  updateBestDisplay();
  soundGameOver();
  showOverlay(endOverlay);
}

function updateScore() {
  scoreEl.textContent = score;
  bumpUpdate(scoreEl);
}

function updateTimerDisplay() {
  timerEl.textContent = `${timeLeft}s`;
}

function bumpUpdate(el) {
  el.classList.remove('bump');
  void el.offsetWidth;
  el.classList.add('bump');
}

function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function showOverlay(el) { el.classList.remove('hidden'); }
function hideOverlay(el) { el.classList.add('hidden'); }

function getAudioCtx() {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  return audioCtx;
}

function playTone(freqs, duration = 0.09) {
  try {
    const ctx = getAudioCtx();
    freqs.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.08, ctx.currentTime + i * duration);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + (i + 1) * duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime + i * duration);
      osc.stop(ctx.currentTime + (i + 1) * duration);
    });
  } catch (e) {}
}

function soundWhack() { playTone([880, 660], 0.06); }
function soundGameOver() { playTone([523, 440, 349, 261], 0.13); }

function burstParticles(hole) {
  const rect = hole.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;
  const colors = ['#c084fc', '#a855f7', '#34d399'];

  for (let i = 0; i < 10; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.background = colors[i % colors.length];
    p.style.left = cx + 'px';
    p.style.top = cy + 'px';
    document.body.appendChild(p);

    const angle = (Math.PI * 2 * i) / 10;
    const dist = 40 + Math.random() * 30;
    const tx = Math.cos(angle) * dist;
    const ty = Math.sin(angle) * dist;

    p.animate([
      { transform: 'translate(0,0) scale(1)', opacity: 1 },
      { transform: `translate(${tx}px, ${ty}px) scale(0)`, opacity: 0 }
    ], { duration: 450, easing: 'cubic-bezier(.2,.8,.3,1)' });

    setTimeout(() => p.remove(), 470);
  }
}