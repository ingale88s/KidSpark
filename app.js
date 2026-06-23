// KidSpark – shared utilities

const STORE = 'kidspark';

function getData() {
  try { return JSON.parse(localStorage.getItem(STORE)) || {}; } catch { return {}; }
}
function saveData(d) { localStorage.setItem(STORE, JSON.stringify(d)); }

function addStars(n, subject) {
  const d = getData();
  d.stars = (d.stars || 0) + n;
  if (subject) d[subject] = Math.min(100, (d[subject] || 0) + n * 12);
  saveData(d);
  refreshStarDisplay();
  return d.stars;
}

function refreshStarDisplay() {
  const el = document.getElementById('totalStars');
  if (el) el.textContent = getData().stars || 0;
}

function loadProgress() {
  const d = getData();
  refreshStarDisplay();
  ['math','science','chemistry','physics','logic'].forEach(s => {
    const bar = document.getElementById(s + 'Bar');
    const lbl = document.getElementById(s + 'Lbl');
    const pct = d[s] || 0;
    if (bar) setTimeout(() => { bar.style.width = pct + '%'; }, 400);
    if (lbl) lbl.textContent = pct + '%';
  });
}

// ── CONFETTI ──
function confetti() {
  const colors = ['#FF6B6B','#4ECDC4','#FFD700','#A78BFA','#34D399','#F59E0B','#FF9FF3'];
  const wrap = document.createElement('div');
  wrap.className = 'confetti-wrap';
  document.body.appendChild(wrap);
  for (let i = 0; i < 90; i++) {
    const p = document.createElement('div');
    p.className = 'cpiece';
    const size = 8 + Math.random() * 10;
    p.style.cssText = `
      left:${Math.random()*100}vw;
      top:-20px;
      width:${size}px;height:${size}px;
      background:${colors[i % colors.length]};
      border-radius:${Math.random()>.5?'50%':'3px'};
      --cd:${1.4 + Math.random()*.8}s;
      animation-delay:${Math.random()*.4}s;
    `;
    wrap.appendChild(p);
  }
  setTimeout(() => wrap.remove(), 2800);
}

// ── CELEBRATION POPUP ──
function celebrate(emoji, title, msg) {
  confetti();
  let cel = document.getElementById('celebration');
  if (!cel) {
    cel = document.createElement('div');
    cel.id = 'celebration';
    cel.className = 'celebration';
    cel.innerHTML = `
      <span class="cel-emoji" id="celEmoji"></span>
      <div class="cel-title" id="celTitle"></div>
      <div class="cel-msg" id="celMsg"></div>
      <button class="btn btn-primary" onclick="document.getElementById('celebration').classList.remove('show')">Keep Going! 🚀</button>
    `;
    document.body.appendChild(cel);
  }
  document.getElementById('celEmoji').textContent = emoji || '🎉';
  document.getElementById('celTitle').textContent = title || 'Amazing!';
  document.getElementById('celMsg').textContent = msg || 'You did it!';
  cel.classList.add('show');
}

// ── SOUNDS ──
function beep(type) {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.connect(g); g.connect(ctx.destination);
    if (type === 'correct') {
      o.frequency.value = 523;
      o.frequency.setValueAtTime(659, ctx.currentTime + .1);
      o.frequency.setValueAtTime(784, ctx.currentTime + .2);
      g.gain.setValueAtTime(.25, ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(.001, ctx.currentTime + .5);
      o.start(); o.stop(ctx.currentTime + .5);
    } else if (type === 'wrong') {
      o.frequency.value = 180;
      g.gain.setValueAtTime(.2, ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(.001, ctx.currentTime + .35);
      o.start(); o.stop(ctx.currentTime + .35);
    } else if (type === 'pop') {
      o.frequency.setValueAtTime(900, ctx.currentTime);
      o.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + .12);
      g.gain.setValueAtTime(.18, ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(.001, ctx.currentTime + .15);
      o.start(); o.stop(ctx.currentTime + .15);
    } else if (type === 'win') {
      [523,659,784,1047].forEach((f,i) => {
        const o2 = ctx.createOscillator();
        const g2 = ctx.createGain();
        o2.connect(g2); g2.connect(ctx.destination);
        o2.frequency.value = f;
        g2.gain.setValueAtTime(0, ctx.currentTime + i*.15);
        g2.gain.linearRampToValueAtTime(.2, ctx.currentTime + i*.15 + .05);
        g2.gain.exponentialRampToValueAtTime(.001, ctx.currentTime + i*.15 + .3);
        o2.start(ctx.currentTime + i*.15);
        o2.stop(ctx.currentTime + i*.15 + .35);
      });
    }
  } catch(_) {}
}

// ── BG STARS ──
function createStars(containerId = 'bgStars', count = 45) {
  const el = document.getElementById(containerId);
  if (!el) return;
  for (let i = 0; i < count; i++) {
    const s = document.createElement('div');
    s.className = 'star';
    s.style.cssText = `left:${Math.random()*100}%;top:${Math.random()*100}%;--d:${2+Math.random()*3}s;animation-delay:${Math.random()*3}s`;
    el.appendChild(s);
  }
}

// ── SHOW RESULT ──
function showResult(id, ok, msg) {
  const el = document.getElementById(id);
  if (!el) return;
  el.className = 'result-box show ' + (ok ? 'ok' : 'err');
  el.innerHTML = `<span class="r-emoji">${ok ? '✅' : '❌'}</span><span class="r-txt">${msg}</span>`;
}

document.addEventListener('DOMContentLoaded', () => {
  createStars();
  refreshStarDisplay();
});
