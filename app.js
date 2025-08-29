
// Configs
const START_DATE_DISPLAY = '26/07/2025'; // mostrado no site
const START_DATE_ISO = '2025-07-26';     // para contagem (YYYY-MM-DD)
const QUIZ_DATE_ANSWER = '26/07/2025';   // resposta esperada para o quiz
const QUIZ_COLOR_ANSWER = 'PRETO'; 'preto'; 'Preto'      // resposta esperada (case-insensitive)
const ONE_YEAR_ANNIV = '2026-07-26T00:00:00';

// SPA Nav
const sections = document.querySelectorAll('.section');
const navButtons = document.querySelectorAll('.nav button[data-target]');
function setActive(id) {
  sections.forEach(s => s.classList.toggle('active', s.id === id));
  navButtons.forEach(b => b.classList.toggle('active', b.dataset.target === id));
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
navButtons.forEach(btn => btn.addEventListener('click', () => setActive(btn.dataset.target)));

// Countdown
function updateCountdown() {
  const end = new Date(ONE_YEAR_ANNIV);
  const now = new Date();
  let diff = Math.max(0, end - now);
  const d = Math.floor(diff / (1000 * 60 * 60 * 24));
  diff -= d * 24 * 60 * 60 * 1000;
  const h = Math.floor(diff / (1000 * 60 * 60));
  diff -= h * 60 * 60 * 1000;
  const m = Math.floor(diff / (1000 * 60));
  diff -= m * 60 * 1000;
  const s = Math.floor(diff / 1000);
  document.getElementById('cd-days').textContent = d.toString().padStart(2, '0');
  document.getElementById('cd-hours').textContent = h.toString().padStart(2, '0');
  document.getElementById('cd-mins').textContent = m.toString().padStart(2, '0');
  document.getElementById('cd-secs').textContent = s.toString().padStart(2, '0');
}
setInterval(updateCountdown, 1000); updateCountdown();

// Floating hearts
setInterval(() => {
  const h = document.createElement('div');
  h.className = 'heart';
  h.textContent = '❤';
  h.style.left = Math.random() * 100 + 'vw';
  h.style.setProperty('--x', (Math.random() * 40 - 20) + 'px');
  document.body.appendChild(h);
  setTimeout(() => h.remove(), 5000);
}, 800);

// Music Gate then Quiz Gate
const musicGate = document.getElementById('musicGate');
const quizGate = document.getElementById('quizGate');
const goToQuizBtn = document.getElementById('goToQuiz');
goToQuizBtn.addEventListener('click', () => {
  musicGate.style.display = 'none';
  quizGate.style.display = 'flex';
});

document.getElementById('quizForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const dateVal = document.getElementById('qdate').value.trim();
  const colorVal = document.getElementById('qcolor').value.trim().toUpperCase();
  const err = document.getElementById('qerror');
  if (dateVal === QUIZ_DATE_ANSWER && colorVal === QUIZ_COLOR_ANSWER) {
    quizGate.style.display = 'none';
    localStorage.setItem('loveSiteAccess', '1'); // remember access
  } else {
    err.style.display = 'block';
    err.textContent = 'Hmmm... resposta incorreta. Tenta lembrar nosso momento especial e a nossa cor favorita ❤';
  }
});

// Auto-skip gates if previously passed
window.addEventListener('load', () => {
  if (localStorage.getItem('loveSiteAccess') === '1') {
    musicGate.style.display = 'none';
    quizGate.style.display = 'none';
  }
});
