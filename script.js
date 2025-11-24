// Переключение языка
function switchLang(lang) {
  document.querySelectorAll('[data-ru]').forEach(el => {
    el.textContent = lang === 'ru' ? el.dataset.ru : el.dataset.kz;
  });
  document.querySelectorAll('.lang').forEach(b => {
    b.classList.toggle('active', b.onclick.toString().includes(`'${lang}'`));
  });
  document.documentElement.lang = lang;
}

// Открытие модалки калькулятора
function openCalculator() {
  document.getElementById('calculatorModal').style.display = 'block';
}

// Закрытие модалки
function closeCalculator() {
  document.getElementById('calculatorModal').style.display = 'none';
}

// Основная логика расчёта (полная твоя формула)
function calculateChance() {
  const income = parseFloat(document.getElementById('income').value) || 0;
  const creditHistory = document.getElementById('creditHistory').value;
  const delays = document.getElementById('delays').value;
  const property = document.getElementById('property').value;
  const initial = parseFloat(document.getElementById('initial').value) || 0;
  const employment = document.getElementById('employment').value;

  // Весовые коэффициенты (как ты просил)
  let score = 0;
  score += income > 500000 ? 30 : income > 300000 ? 20 : 10;
  score += creditHistory === 'good' ? 40 : creditHistory === 'average' ? 15 : 0;
  score += delays === 'no' ? 20 : delays === 'small' ? 5 : -20;
  score += property === 'yes' ? 25 : 10;
  score += initial > 3000000 ? 20 : initial > 1000000 ? 10 : 0;
  score += employment === 'official' ? 15 : 5;

  // Jitter-эффект
  const jitter = Math.random() * 8 - 4;
  const final = Math.max(0, Math.min(99, Math.round(score + jitter)));

  document.getElementById('result').innerHTML = `
    <h3>Ваша вероятность одобрения: <span style="color:#ffd700;font-size:48px">${final}%</span></h3>
    <p>Мы свяжемся с вами в ближайшее время!</p>
  `;
}

// Закрытие по клику вне модалки
window.onclick = function(e) {
  const modal = document.getElementById('calculatorModal');
  if (e.target === modal) modal.style.display = 'none';
}
