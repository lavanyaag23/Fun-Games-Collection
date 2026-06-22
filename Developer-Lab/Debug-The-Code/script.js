const STORAGE_KEY = 'debugTheCodeBest_v1';

const QUESTION_BANK = [
  {
    title: 'Missing Semicolon',
    difficulty: 'easy',
    baseTime: 22,
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
    difficulty: 'easy',
    baseTime: 20,
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
    difficulty: 'easy',
    baseTime: 20,
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
    difficulty: 'easy',
    baseTime: 18,
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
    difficulty: 'easy',
    baseTime: 18,
    buggyLine: 2,
    explanation: 'Arrays are zero-indexed, so `arr[arr.length]` is out of bounds (undefined). Use `arr[arr.length - 1]`.',
    lines: [
      '<span class="tok-kw">function</span> <span class="tok-fn">getLastItem</span>(arr) {',
      '&nbsp;&nbsp;<span class="tok-kw">return</span> arr[arr.length];',
      '}',
      '',
      'console.<span class="tok-fn">log</span>(<span class="tok-fn">getLastItem</span>([<span class="tok-num">1</span>, <span class="tok-num">2</span>, <span class="tok-num">3</span>]));'
    ]
  },
  {
    title: 'Assignment vs Comparison',
    difficulty: 'medium',
    baseTime: 20,
    buggyLine: 2,
    explanation: '`=` is assignment, not comparison — this always sets `age` to 18 instead of checking it. Use `===`.',
    lines: [
      '<span class="tok-kw">function</span> <span class="tok-fn">checkAge</span>(age) {',
      '&nbsp;&nbsp;<span class="tok-kw">if</span> (age = <span class="tok-num">18</span>) {',
      '&nbsp;&nbsp;&nbsp;&nbsp;<span class="tok-kw">return</span> <span class="tok-str">"You are 18!"</span>;',
      '&nbsp;&nbsp;}',
      '&nbsp;&nbsp;<span class="tok-kw">return</span> <span class="tok-str">"Not 18"</span>;',
      '}'
    ]
  },
  {
    title: 'Off-by-one For Loop',
    difficulty: 'medium',
    baseTime: 20,
    buggyLine: 3,
    explanation: '`i <= arr.length` runs one iteration too many — `arr[arr.length]` is undefined. Use `i < arr.length`.',
    lines: [
      '<span class="tok-kw">function</span> <span class="tok-fn">sumArray</span>(arr) {',
      '&nbsp;&nbsp;<span class="tok-kw">let</span> total = <span class="tok-num">0</span>;',
      '&nbsp;&nbsp;<span class="tok-kw">for</span> (<span class="tok-kw">let</span> i = <span class="tok-num">0</span>; i &lt;= arr.length; i++) {',
      '&nbsp;&nbsp;&nbsp;&nbsp;total += arr[i];',
      '&nbsp;&nbsp;}',
      '&nbsp;&nbsp;<span class="tok-kw">return</span> total;',
      '}'
    ]
  },
  {
    title: 'Missing Break in Switch',
    difficulty: 'medium',
    baseTime: 22,
    buggyLine: 5,
    explanation: 'Missing `break;` after this line — execution falls through into the "regular" case, so `discount` becomes 10 instead of staying 50.',
    lines: [
      '<span class="tok-kw">function</span> <span class="tok-fn">getDiscount</span>(type) {',
      '&nbsp;&nbsp;<span class="tok-kw">let</span> discount = <span class="tok-num">0</span>;',
      '&nbsp;&nbsp;<span class="tok-kw">switch</span> (type) {',
      '&nbsp;&nbsp;&nbsp;&nbsp;<span class="tok-kw">case</span> <span class="tok-str">"vip"</span>:',
      '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;discount = <span class="tok-num">50</span>;',
      '&nbsp;&nbsp;&nbsp;&nbsp;<span class="tok-kw">case</span> <span class="tok-str">"regular"</span>:',
      '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;discount = <span class="tok-num">10</span>;',
      '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="tok-kw">break</span>;',
      '&nbsp;&nbsp;&nbsp;&nbsp;<span class="tok-kw">default</span>:',
      '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;discount = <span class="tok-num">0</span>;',
      '&nbsp;&nbsp;}',
      '&nbsp;&nbsp;<span class="tok-kw">return</span> discount;',
      '}'
    ]
  },
  {
    title: 'Wrong Comparison Operator',
    difficulty: 'medium',
    baseTime: 18,
    buggyLine: 2,
    explanation: 'The condition is backwards — this returns true for ages under 18. It should check `age >= 18`.',
    lines: [
      '<span class="tok-kw">function</span> <span class="tok-fn">canVote</span>(age) {',
      '&nbsp;&nbsp;<span class="tok-kw">if</span> (age &lt; <span class="tok-num">18</span>) {',
      '&nbsp;&nbsp;&nbsp;&nbsp;<span class="tok-kw">return</span> <span class="tok-kw">true</span>;',
      '&nbsp;&nbsp;}',
      '&nbsp;&nbsp;<span class="tok-kw">return</span> <span class="tok-kw">false</span>;',
      '}'
    ]
  },
  {
    title: 'Type Coercion Bug',
    difficulty: 'medium',
    baseTime: 18,
    buggyLine: 2,
    explanation: 'If either argument is a string, `+` concatenates instead of adding — e.g. `"5" + 3` becomes `"53"`. Convert with `Number(a) + Number(b)`.',
    lines: [
      '<span class="tok-kw">function</span> <span class="tok-fn">addNumbers</span>(a, b) {',
      '&nbsp;&nbsp;<span class="tok-kw">return</span> a + b;',
      '}',
      '',
      'console.<span class="tok-fn">log</span>(<span class="tok-fn">addNumbers</span>(<span class="tok-str">"5"</span>, <span class="tok-num">3</span>));'
    ]
  },
  {
    title: 'Scope Bug',
    difficulty: 'hard',
    baseTime: 18,
    buggyLine: 2,
    explanation: '`var` is function-scoped, so all three callbacks share the same `i` and log `3, 3, 3`. Use `let` instead to give each iteration its own `i`.',
    lines: [
      '<span class="tok-kw">function</span> <span class="tok-fn">delayedLogs</span>() {',
      '&nbsp;&nbsp;<span class="tok-kw">for</span> (<span class="tok-kw">var</span> i = <span class="tok-num">0</span>; i &lt; <span class="tok-num">3</span>; i++) {',
      '&nbsp;&nbsp;&nbsp;&nbsp;setTimeout(() =&gt; console.<span class="tok-fn">log</span>(i), <span class="tok-num">100</span>);',
      '&nbsp;&nbsp;}',
      '}'
    ]
  },
  {
    title: 'Missing Return Recursive',
    difficulty: 'hard',
    baseTime: 18,
    buggyLine: 5,
    explanation: 'The recursive case never returns its result — add `return` before `n * factorial(n - 1);`, or the function always returns `undefined`.',
    lines: [
      '<span class="tok-kw">function</span> <span class="tok-fn">factorial</span>(n) {',
      '&nbsp;&nbsp;<span class="tok-kw">if</span> (n &lt;= <span class="tok-num">1</span>) {',
      '&nbsp;&nbsp;&nbsp;&nbsp;<span class="tok-kw">return</span> <span class="tok-num">1</span>;',
      '&nbsp;&nbsp;}',
      '&nbsp;&nbsp;n * <span class="tok-fn">factorial</span>(n - <span class="tok-num">1</span>);',
      '}'
    ]
  },
  {
    title: 'Null Reference Bug',
    difficulty: 'hard',
    baseTime: 16,
    buggyLine: 2,
    explanation: 'If `user.name` is undefined, accessing `[0]` throws an error. Guard with optional chaining: `user.name?.[0]`.',
    lines: [
      '<span class="tok-kw">function</span> <span class="tok-fn">getFirstChar</span>(user) {',
      '&nbsp;&nbsp;<span class="tok-kw">return</span> user.name[<span class="tok-num">0</span>];',
      '}',
      '',
      'console.<span class="tok-fn">log</span>(<span class="tok-fn">getFirstChar</span>({}));'
    ]
  },
  {
    title: 'Missing Await',
    difficulty: 'hard',
    baseTime: 16,
    buggyLine: 2,
    explanation: '`fetchUser(id)` returns a Promise — without `await`, `response` is the Promise itself, not the resolved data. Add `await` before the call.',
    lines: [
      '<span class="tok-kw">async function</span> <span class="tok-fn">getUser</span>(id) {',
      '&nbsp;&nbsp;<span class="tok-kw">const</span> response = <span class="tok-fn">fetchUser</span>(id);',
      '&nbsp;&nbsp;<span class="tok-kw">return</span> response.data;',
      '}'
    ]
  },
  {
    title: 'Mutating Array While Iterating',
    difficulty: 'hard',
    baseTime: 16,
    buggyLine: 4,
    explanation: '`splice` shifts later elements down, but `i` still increments — this skips the element right after a removed one. Loop backwards instead.',
    lines: [
      '<span class="tok-kw">function</span> <span class="tok-fn">removeEvens</span>(nums) {',
      '&nbsp;&nbsp;<span class="tok-kw">for</span> (<span class="tok-kw">let</span> i = <span class="tok-num">0</span>; i &lt; nums.length; i++) {',
      '&nbsp;&nbsp;&nbsp;&nbsp;<span class="tok-kw">if</span> (nums[i] % <span class="tok-num">2</span> === <span class="tok-num">0</span>) {',
      '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;nums.<span class="tok-fn">splice</span>(i, <span class="tok-num">1</span>);',
      '&nbsp;&nbsp;&nbsp;&nbsp;}',
      '&nbsp;&nbsp;}',
      '&nbsp;&nbsp;<span class="tok-kw">return</span> nums;',
      '}'
    ]
  },
  {
    title: 'Wrong Loop Bound',
    difficulty: 'hard',
    baseTime: 16,
    buggyLine: 2,
    explanation: '`i` starts at `arr.length`, which is out of bounds (undefined). Start at `arr.length - 1` instead.',
    lines: [
      '<span class="tok-kw">function</span> <span class="tok-fn">printReverse</span>(arr) {',
      '&nbsp;&nbsp;<span class="tok-kw">for</span> (<span class="tok-kw">let</span> i = arr.length; i &gt;= <span class="tok-num">0</span>; i--) {',
      '&nbsp;&nbsp;&nbsp;&nbsp;console.<span class="tok-fn">log</span>(arr[i]);',
      '&nbsp;&nbsp;}',
      '}'
    ]
  },
  {
    title: 'Floating Point Comparison',
    difficulty: 'hard',
    baseTime: 16,
    buggyLine: 2,
    explanation: 'Floating-point math makes `0.1 + 0.2` equal `0.30000000000000004`, not exactly `0.3` — direct `===` fails. Compare with a small epsilon tolerance instead.',
    lines: [
      '<span class="tok-kw">function</span> <span class="tok-fn">isPointThree</span>(value) {',
      '&nbsp;&nbsp;<span class="tok-kw">return</span> <span class="tok-num">0.1</span> + <span class="tok-num">0.2</span> === value;',
      '}',
      '',
      'console.<span class="tok-fn">log</span>(<span class="tok-fn">isPointThree</span>(<span class="tok-num">0.3</span>));'
    ]
  }
];

const DIFFICULTY_CONFIG = {
  easy: { count: 5, pools: ['easy'], timeAdjust: 5 },
  medium: { count: 8, pools: ['easy', 'medium'], timeAdjust: 0 },
  hard: { count: 12, pools: ['medium', 'hard'], timeAdjust: -4 }
};

const levelStat = document.getElementById('levelStat');
const scoreStat = document.getElementById('scoreStat');
const timerStat = document.getElementById('timerStat');
const bestStatEl = document.getElementById('bestStat');
const diffButtons = document.querySelectorAll('.diff-btn');
const levelBanner = document.getElementById('levelBanner');
const levelTag = document.getElementById('levelTag');
const levelTitleText = document.getElementById('levelTitleText');
const codeLines = document.getElementById('codeLines');
const feedbackBox = document.getElementById('feedbackBox');
const startBtn = document.getElementById('startBtn');
const restartBtn = document.getElementById('restartBtn');
const endOverlay = document.getElementById('endOverlay');
const finalDifficultyEl = document.getElementById('finalDifficulty');
const finalScoreEl = document.getElementById('finalScore');
const finalSolvedEl = document.getElementById('finalSolved');
const finalAccuracyEl = document.getElementById('finalAccuracy');
const newBestTag = document.getElementById('newBestTag');
const playAgainBtn = document.getElementById('playAgainBtn');

let bestRecords = loadBest();
let currentDiff = 'easy';
let questions = [];
let currentIndex = 0;
let score = 0;
let solvedCount = 0;
let attempts = 0;
let timeLeft = 0;
let awaitingAnswer = false;
let running = false;
let timerInterval = null;
let advanceTimer = null;
let audioCtx = null;

updateBestDisplay();

diffButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    if (running || btn.dataset.diff === currentDiff) return;
    diffButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentDiff = btn.dataset.diff;
    updateBestDisplay();
  });
});

startBtn.addEventListener('click', startGame);
restartBtn.addEventListener('click', resetToIdle);
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

function buildQuestionSet(diff) {
  const config = DIFFICULTY_CONFIG[diff];
  const pool = QUESTION_BANK.filter(q => config.pools.includes(q.difficulty));
  const shuffled = shuffle(pool);
  return shuffled.slice(0, Math.min(config.count, shuffled.length));
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function startGame() {
  running = true;
  questions = buildQuestionSet(currentDiff);
  currentIndex = 0;
  score = 0;
  solvedCount = 0;
  scoreStat.textContent = '0';
  startBtn.disabled = true;
  restartBtn.disabled = false;
  diffButtons.forEach(b => (b.disabled = true));
  levelBanner.classList.remove('hidden');
  hideOverlay(endOverlay);
  loadQuestion(0);
}

function resetToIdle() {
  running = false;
  awaitingAnswer = false;
  clearInterval(timerInterval);
  clearTimeout(advanceTimer);
  levelBanner.classList.add('hidden');
  feedbackBox.classList.add('hidden');
  codeLines.innerHTML = '<p class="idle-hint">Pick a difficulty and press Start to load the first buggy snippet</p>';
  timerStat.textContent = '--';
  timerStat.classList.remove('danger');
  levelStat.textContent = `1/${DIFFICULTY_CONFIG[currentDiff].count}`;
  scoreStat.textContent = '0';
  startBtn.disabled = false;
  restartBtn.disabled = true;
  diffButtons.forEach(b => (b.disabled = false));
  hideOverlay(endOverlay);
}

function loadQuestion(index) {
  if (index >= questions.length) {
    finishGame();
    return;
  }

  const q = questions[index];
  attempts = 0;
  awaitingAnswer = true;
  timeLeft = Math.max(8, q.baseTime + DIFFICULTY_CONFIG[currentDiff].timeAdjust);

  feedbackBox.className = 'feedback-box hidden';

  levelTag.textContent = `Question ${index + 1}`;
  levelTitleText.textContent = q.title;
  levelStat.textContent = `${index + 1}/${questions.length}`;

  renderCode(q.lines);
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
  const q = questions[currentIndex];

  if (lineNum === q.buggyLine) {
    awaitingAnswer = false;
    clearInterval(timerInterval);
    el.classList.add('correct');
    soundCorrect();

    const bonus = Math.max(20, 60 + timeLeft * 3 - attempts * 15);
    score += bonus;
    solvedCount++;
    scoreStat.textContent = score;
    bumpUpdate(scoreStat);

    showFeedback(true, q, bonus);
    advanceTimer = setTimeout(() => {
      currentIndex++;
      loadQuestion(currentIndex);
    }, 2000);
  } else {
    attempts++;
    el.classList.add('wrong');
    soundWrong();
    setTimeout(() => el.classList.remove('wrong'), 350);
  }
}

function handleTimeout() {
  awaitingAnswer = false;
  const q = questions[currentIndex];
  highlightBuggyLine(q.buggyLine, 'revealed');
  soundTimeout();
  showFeedback(false, q, 0);
  advanceTimer = setTimeout(() => {
    currentIndex++;
    loadQuestion(currentIndex);
  }, 2200);
}

function highlightBuggyLine(lineNum, cls) {
  const el = codeLines.querySelector(`.code-line[data-line="${lineNum}"]`);
  if (el) el.classList.add(cls);
}

function showFeedback(success, q, points) {
  feedbackBox.classList.remove('hidden');
  feedbackBox.className = `feedback-box ${success ? 'success' : 'timeout'}`;
  if (success) {
    feedbackBox.innerHTML = `<strong>✅ Correct! +${points} pts</strong><p>${q.explanation}</p>`;
  } else {
    feedbackBox.innerHTML = `<strong>⏰ Time's up!</strong><p>${q.explanation}</p>`;
  }
}

function finishGame() {
  running = false;
  clearInterval(timerInterval);
  clearTimeout(advanceTimer);
  levelBanner.classList.add('hidden');
  feedbackBox.classList.add('hidden');
  codeLines.innerHTML = '<p class="idle-hint">Pick a difficulty and press Start to play again</p>';
  timerStat.textContent = '--';
  timerStat.classList.remove('danger');
  levelStat.textContent = `${questions.length}/${questions.length}`;
  startBtn.disabled = false;
  restartBtn.disabled = true;
  diffButtons.forEach(b => (b.disabled = false));

  const isNewBest = !bestRecords[currentDiff] || score > bestRecords[currentDiff];
  if (isNewBest) {
    bestRecords[currentDiff] = score;
    saveBest();
  }

  const accuracy = Math.round((solvedCount / questions.length) * 100);

  finalDifficultyEl.textContent = currentDiff[0].toUpperCase() + currentDiff.slice(1);
  finalScoreEl.textContent = score;
  finalSolvedEl.textContent = `${solvedCount}/${questions.length}`;
  finalAccuracyEl.textContent = `${accuracy}%`;
  newBestTag.classList.toggle('hidden', !isNewBest);
  updateBestDisplay();

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