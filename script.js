// === Sunkar Finance - Основной JavaScript ===

// Переключение языков
function switchLanguage(lang) {
    // Сохраняем выбранный язык
    localStorage.setItem('preferredLang', lang);
    
    // Обновляем атрибут html
    document.documentElement.setAttribute('data-lang', lang);
    
    // Обновляем активную кнопку
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });
    
    // Обновляем все текстовые элементы
    updateTextContent(lang);
}

// Обновление текстового содержимого
function updateTextContent(lang) {
    document.querySelectorAll('[data-ru]').forEach(element => {
        const text = element.getAttribute(`data-${lang}`) || element.getAttribute('data-ru');
        element.textContent = text;
    });
}

// Инициализация языка при загрузке
function initLanguage() {
    const savedLang = localStorage.getItem('preferredLang') || 'ru';
    switchLanguage(savedLang);
}

// Модальное окно калькулятора
function openCalculator() {
    document.getElementById('calculatorModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeCalculator() {
    document.getElementById('calculatorModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Закрытие модального окна при клике вне его
window.onclick = function(event) {
    const modal = document.getElementById('calculatorModal');
    if (event.target === modal) {
        closeCalculator();
    }
}

// Анимация чисел
function animateValue(element, start, end, duration) {
    const range = end - start;
    const startTime = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const current = Math.floor(start + (range * progress));
        element.textContent = current + '%';
        
        // Обновляем круговой прогресс
        const circle = document.querySelector('.progress-circle');
        if (circle) {
            circle.style.background = `conic-gradient(var(--accent-gold) ${current * 3.6}deg, #e0e0e0 ${current * 3.6}deg)`;
        }
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    requestAnimationFrame(update);
}

// Основная функция расчета вероятности
function calculateProbability() {
    // Сбор данных формы (упрощенная версия - здесь будет полная логика из ТЗ)
    const formData = {
        fullName: document.getElementById('fullName').value,
        phone: document.getElementById('phone').value,
        // Добавь остальные поля по мере необходимости
    };
    
    // Валидация
    if (!formData.fullName || !formData.phone) {
        alert('Пожалуйста, заполните обязательные поля');
        return;
    }
    
    // Расчет вероятности (упрощенный пример)
    let probability = calculateRating(formData);
    
    // Показываем результат
    const resultDiv = document.getElementById('calcResult');
    const percentValue = document.getElementById('percentValue');
    const resultText = document.getElementById('resultText');
    
    resultDiv.style.display = 'block';
    
    // Анимируем процент
    animateValue(percentValue, 0, probability, 1500);
    
    // Устанавливаем текстовое описание
    let advice = '';
    let color = '';
    
    if (probability >= 75) {
        advice = 'Высокая вероятность одобрения. Рекомендуем отправить заявку — у вас хорошие шансы.';
        color = '#28a745';
    } else if (probability >= 50) {
        advice = 'Средняя вероятность. Возможны дополнительные запросы от банка.';
        color = '#ffc107';
    } else if (probability >= 25) {
        advice = 'Низкая вероятность. Рекомендуем улучшить финансовую историю.';
        color = '#fd7e14';
    } else {
        advice = 'Очень низкая вероятность. Рекомендуем связаться с менеджером для индивидуального решения.';
        color = '#dc3545';
    }
    
    resultText.textContent = advice;
    resultText.style.color = color;
    
    // Сохраняем данные для отправки в WhatsApp
    window.calculatorData = { ...formData, probability, advice };
}

// Функция расчета рейтинга (основная логика)
function calculateRating(data) {
    let rating = 60; // Базовая ставка
    
    // Здесь будет полная логика расчета из твоего ТЗ
    // с учетом возраста, дохода, DTI, просрочек и т.д.
    
    // Временная упрощенная логика
    const randomFactor = Math.random() * 20 - 10; // ±10 случайность
    rating += randomFactor;
    
    // Ограничиваем от 5 до 95%
    rating = Math.max(5, Math.min(95, Math.round(rating)));
    
    return rating;
}

// Отправка заявки в WhatsApp
function sendToWhatsApp() {
    if (!window.calculatorData) {
        alert('Сначала рассчитайте вероятность');
        return;
    }
    
    const data = window.calculatorData;
    const message = `Здравствуйте! Оставляю заявку.%0A%0AФИО: ${data.fullName}%0AТелефон: ${data.phone}%0AВероятность одобрения: ${data.probability}%0A%0A${data.advice}`;
    
    const whatsappUrl = `https://wa.me/77470493983?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

// Анимация появления элементов при скролле
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    // Наблюдаем за элементами с анимацией
    document.querySelectorAll('.service-card, .review-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    initLanguage();
    initScrollAnimations();
    
    // Инициализация кнопок переключения языка
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            switchLanguage(this.dataset.lang);
        });
    });
    
    // Микро-анимации для кнопок
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            // Создаем эффект пульсации
            const x = e.clientX - e.target.getBoundingClientRect().left;
            const y = e.clientY - e.target.getBoundingClientRect().top;
            
            const ripple = document.createElement('span');
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});

// Добавляем стили для ripple-эффекта
const rippleStyles = `
.ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.6);
    transform: scale(0);
    animation: ripple-animation 0.6s linear;
    pointer-events: none;
}

@keyframes ripple-animation {
    to {
        transform: scale(4);
        opacity: 0;
    }
}

.btn {
    position: relative;
    overflow: hidden;
}
`;

// Вставляем стили в документ
const styleSheet = document.createElement('style');
styleSheet.textContent = rippleStyles;
document.head.appendChild(styleSheet);
