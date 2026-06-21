const STORAGE_KEY = 'bugHunterCodeBest_v1';

const LEVELS = [
  {
    title: 'Missing Semicolon',
    timeLimit: 25,
    buggyLine: 2,
    explanation: 'Missing semicolon at the end of this line — JavaScript statements should end with `;`.',
    lines: [
      '<span class="tok-kw">function</span> <span class="tok-fn">greet</span>(name) {',
      '&nbsp;&nbsp;<span class="tok-kw">let</span> message = <span class="tok-str">"Hello, "</span> + name',
      '&nbsp;&nbsp;console.<span class="tok-fn">log</span>(message);',
      '&nbsp;&nbsp;<span class="tok-kw">return</span> message;',
      '}'
    ]
  },
  {
    title: 'Wrong Variable Name',
    timeLimit: 22,
    buggyLine: 4,
    explanation: '`ara` is undefined — it should be `area`, the variable defined above.',
    lines: [
      '<span class="tok-kw">function</span> <span class="tok-fn">calculateArea</span>(radius) {',
      '&nbsp;&nbsp;<span class="tok-kw">const</span> pi = <span class="tok-num">3.14</span>;',
      '&nbsp;&nbsp;<span class="tok-kw">let</span> area = pi * radius * radius;',
      '&nbsp;&nbsp;<span class="tok-kw">return</span> ara;',
      '}'
    ]
  },
  {
    title: 'Infinite Loop',
    timeLimit: 20,
    buggyLine: 3,
    explanation: '`n` is never decreased inside the loop — add `n--;` after this line, or the loop runs forever.',
    lines: [
      '<span class="tok-kw">function</span> <span class="tok-fn">countDown</span>(n) {',
      '&nbsp;&nbsp;<span class="tok-kw">while</span> (n &gt; <span class="tok-num">0</span>) {',
      '&nbsp;&nbsp;&nbsp;&nbsp;console.<span class="tok-fn">log</span>(n);',
      '&nbsp;&nbsp;}',
      '&nbsp;&nbsp;<span class="tok-kw">return</span> <span class="tok-str">"Done!"</span>;',
      '}'
    ]
  },
  {
    title: 'Function Bug',
    timeLimit: 18,
    buggyLine: 2,
    explanation: '`sum` is calculated but never returned — add `return sum;` so the function actually outputs a value.',
    lines: [
      '<span class="tok-kw">function</span> <span class="tok-fn">add</span>(a, b) {',
      '&nbsp;&nbsp;<span class="tok-kw">let</span> sum = a + b;',
      '}',
      '',
      'console.<span class="tok-fn">log</span>(<span class="tok-fn">add</span>(<span class="tok-num">2</span>, <span class="tok-num">3</span>));'
    ]
  },
  {
    title: 'Array Index Bug',
    timeLimit: 16,
    buggyLine: 2,
    explanation: 'Arrays are zero-indexed, so `arr[arr.length]` is out of bounds (undefined). Use `arr[arr.length - 1]`.',
    lines: [
      '<span class="tok-kw">function</span> <span class="tok-fn">getLastItem</span>(arr) {',
      '&nbsp;&nbsp;<span class="tok-kw">return</span> arr[arr.length];',
      '}',
      '',
      'console.<span class="tok-fn">log</span>(<span class="tok-fn">getLastItem</span>([<span class="tok-num">1</span>, <span class="tok-num">2</span>, <span class="tok-num">3</span>]));'
    ]
  }
];

const levelStat = document.getElementById('levelStat');
const scoreStat = document.getElementById('scoreStat');
const timerStat = document.getElementById('timerStat');
const bestStatEl = document.getElementById('bestStat');
const levelBanner = document.getElementById('levelBanner');
const levelTag = document.getElementById('levelTag');
const levelTitleText = document.getElementById('levelTitleText');
const codeLines = document.getElementById('codeLines');
const feedbackBox = document.getElementById('feedbackBox');
const startBtn = document.getElementById('startBtn');
const endOverlay = document.getElementById('endOverlay');
const finalScoreEl = document.getElementById('finalScore');
const finalSolvedEl = document.getElementById('finalSolved');
const newBestTag = document.getElementById('newBestTag');
const playAgainBtn = document.getElementById('playAgainBtn');

let best = Number(localStorage.getItem(STORAGE_KEY)) || 0;
let currentLevel = 0;
let score = 0;
let solvedCount = 0;
let attempts = 0;
let timeLeft = 0;
let awaitingAnswer = false;
let timerInterval = null;
let advanceTimer = null;
let audioCtx = null;

bestStatEl.textContent = best || '--';

startBtn.addEventListener('click', startGame);
playAgainBtn.addEventListener('click', () => {
  hideOverlay(endOverlay);
  startGame();
});

function startGame() {
  currentLevel = 0;
  score = 0;
  solvedCount = 0;
  scoreStat.textContent = '0';
  startBtn.disabled = true;
  levelBanner.classList.remove('hidden');
  hideOverlay(endOverlay);
  loadLevel(0);
}

function loadLevel(index) {
  if (index >= LEVELS.length) {
    finishGame();
    return;
  }

  const lvl = LEVELS[index];
  attempts = 0;
  awaitingAnswer = true;
  timeLeft = lvl.timeLimit;

  feedbackBox.classList.add('hidden');
  feedbackBox.className = 'feedback-box hidden';

  levelTag.textContent = `Level ${index + 1}`;
  levelTitleText.textContent = lvl.title;
  levelStat.textContent = `${index + 1}/${LEVELS.length}`;

  renderCode(lvl.lines);
  updateTimerDisplay();

  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    timeLeft--;
    updateTimerDisplay();
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      handleTimeout();
    }
  }, 1000);
}

function renderCode(lines) {
  codeLines.innerHTML = '';
  lines.forEach((lineHtml, i) => {
    const row = document.createElement('div');
    row.className = 'code-line';
    row.dataset.line = i + 1;
    row.innerHTML = `<span class="line-num">${i + 1}</span><span class="line-code">${lineHtml || '&nbsp;'}</span>`;
    row.addEventListener('click', () => onLineClick(i + 1, row));
    codeLines.appendChild(row);
  });
}

function onLineClick(lineNum, el) {
  if (!awaitingAnswer) return;
  const lvl = LEVELS[currentLevel];

  if (lineNum === lvl.buggyLine) {
    awaitingAnswer = false;
    clearInterval(timerInterval);
    el.classList.add('correct');
    soundCorrect();

    const bonus = Math.max(20, 60 + timeLeft * 3 - attempts * 15);
    score += bonus;
    solvedCount++;
    scoreStat.textContent = score;
    bumpUpdate(scoreStat);

    showFeedback(true, lvl, bonus);
    advanceTimer = setTimeout(() => {
      currentLevel++;
      loadLevel(currentLevel);
    }, 2200);
  } else {
    attempts++;
    el.classList.add('wrong');
    soundWrong();
    setTimeout(() => el.classList.remove('wrong'), 350);
  }
}

function handleTimeout() {
  awaitingAnswer = false;
  const lvl = LEVELS[currentLevel];
  highlightBuggyLine(lvl.buggyLine, 'revealed');
  soundTimeout();
  showFeedback(false, lvl, 0);
  advanceTimer = setTimeout(() => {
    currentLevel++;
    loadLevel(currentLevel);
  }, 2200);
}

function highlightBuggyLine(lineNum, cls) {
  const el = codeLines.querySelector(`.code-line[data-line="${lineNum}"]`);
  if (el) el.classList.add(cls);
}

function showFeedback(success, lvl, points) {
  feedbackBox.classList.remove('hidden');
  feedbackBox.className = `feedback-box ${success ? 'success' : 'timeout'}`;
  if (success) {
    feedbackBox.innerHTML = `<strong>✅ Correct! +${points} pts</strong><p>${lvl.explanation}</p>`;
  } else {
    feedbackBox.innerHTML = `<strong>⏰ Time's up!</strong><p>${lvl.explanation}</p>`;
  }
}

function finishGame() {
  clearInterval(timerInterval);
  clearTimeout(advanceTimer);
  levelBanner.classList.add('hidden');
  feedbackBox.classList.add('hidden');
  codeLines.innerHTML = '<p class="idle-hint">Press Start to play again</p>';
  timerStat.textContent = '--';
  timerStat.classList.remove('danger');
  levelStat.textContent = `${LEVELS.length}/${LEVELS.length}`;
  startBtn.disabled = false;

  const isNewBest = score > best;
  if (isNewBest) {
    best = score;
    localStorage.setItem(STORAGE_KEY, String(best));
  }

  finalScoreEl.textContent = score;
  finalSolvedEl.textContent = `${solvedCount}/${LEVELS.length}`;
  newBestTag.classList.toggle('hidden', !isNewBest);
  bestStatEl.textContent = best || '--';

  soundFinish();
  setTimeout(() => showOverlay(endOverlay), 400);
}

function updateTimerDisplay() {
  timerStat.textContent = `${timeLeft}s`;
  timerStat.classList.toggle('danger', timeLeft <= 5);
}

function bumpUpdate(el) {
  el.classList.remove('bump');
  void el.offsetWidth;
  el.classList.add('bump');
}

function showOverlay(el) { el.classList.remove('hidden'); }
function hideOverlay(el) { el.classList.add('hidden'); }

function getAudioCtx() {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  return audioCtx;
}

function playTone(freqs, duration = 0.1) {
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

function soundCorrect() { playTone([660, 880, 1100], 0.08); }
function soundWrong() { playTone([240, 180], 0.06); }
function soundTimeout() { playTone([392, 311], 0.12); }
function soundFinish() { playTone([523, 659, 784, 1047], 0.14); }