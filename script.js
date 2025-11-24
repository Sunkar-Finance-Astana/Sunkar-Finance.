function switchLang(lang) {
  document.querySelectorAll('[data-ru]').forEach(el => {
    el.textContent = lang === 'ru' ? el.getAttribute('data-ru') : el.getAttribute('data-kz');
  });
  document.querySelectorAll('.lang').forEach(btn => {
    btn.classList.toggle('active', btn.textContent === lang.toUpperCase());
  });
  document.documentElement.lang = lang;
}

function openCalculator() {
  alert('Калькулятор скоро будет здесь! А пока звоните или пишите в WhatsApp: +7 705 260 66 67');
}
