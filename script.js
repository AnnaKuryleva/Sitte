// Плавная прокрутка для навигации
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Анимация появления элементов при скролле
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Добавляем класс fade-in к элементам для анимации
const animateElements = document.querySelectorAll('.section, .skill-card, .timeline-item, .uiux-card, .tool-item');
animateElements.forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

// Активное состояние навигации при скролле
const sections = document.querySelectorAll('.section, .hero-section');
const navLinks = document.querySelectorAll('.nav-menu > li > a, .dropdown-menu a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Выпадающие меню работают на hover через CSS
// JavaScript не должен мешать работе hover эффектов

// Функция для определения текущей видимой секции
function getCurrentSection() {
    const sections = Array.from(document.querySelectorAll('section[id], .hero-section'));
    const scrollPosition = window.pageYOffset;
    
    // Находим секцию, которая находится ближе всего к верху экрана
    let currentSection = sections[0];
    
    for (let i = 0; i < sections.length; i++) {
        const section = sections[i];
        const sectionTop = section.offsetTop;
        
        // Если секция уже прошла верх экрана, это наша текущая секция
        if (sectionTop <= scrollPosition + 100) {
            currentSection = section;
        } else {
            // Если секция еще не достигнута, останавливаемся
            break;
        }
    }
    
    return currentSection;
}

// Функция для получения следующей секции
function getNextSection(currentSection) {
    const sections = Array.from(document.querySelectorAll('section[id], .hero-section'));
    const currentIndex = sections.indexOf(currentSection);
    
    if (currentIndex < sections.length - 1) {
        return sections[currentIndex + 1];
    }
    return null;
}

// Функция для получения предыдущей секции
function getPreviousSection(currentSection) {
    const sections = Array.from(document.querySelectorAll('section[id], .hero-section'));
    const currentIndex = sections.indexOf(currentSection);
    
    if (currentIndex > 0) {
        return sections[currentIndex - 1];
    }
    return null;
}

// Плавная прокрутка для фиксированных стрелок навигации
document.getElementById('arrow-up')?.addEventListener('click', function (e) {
    e.preventDefault();
    const currentSection = getCurrentSection();
    if (currentSection) {
        const previousSection = getPreviousSection(currentSection);
        if (previousSection) {
            previousSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
});

document.getElementById('arrow-down')?.addEventListener('click', function (e) {
    e.preventDefault();
    const currentSection = getCurrentSection();
    if (currentSection) {
        const nextSection = getNextSection(currentSection);
        if (nextSection) {
            nextSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
});

// Показываем/скрываем стрелки в зависимости от позиции скролла
window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    
    const arrowUp = document.getElementById('arrow-up');
    const arrowDown = document.getElementById('arrow-down');
    
    // Скрываем стрелку вверх в начале страницы
    if (scrollTop < 100) {
        arrowUp?.classList.add('hide');
    } else {
        arrowUp?.classList.remove('hide');
    }
    
    // Скрываем стрелку вниз в конце страницы
    if (scrollTop + windowHeight >= documentHeight - 100) {
        arrowDown?.classList.add('hide');
    } else {
        arrowDown?.classList.remove('hide');
    }
});

// Параллакс эффект для hero секции
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroShapes = document.querySelector('.hero-shapes');
    if (heroShapes) {
        heroShapes.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Анимация счетчиков (если будут добавлены)
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// Плавное появление навигации при скролле вниз
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.style.boxShadow = 'none';
    } else {
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// Добавление эффекта hover для карточек
document.querySelectorAll('.skill-card, .uiux-card, .db-type-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s ease';
    });
});

// Плавная анимация для секций с разным фоном
const sectionsWithBg = document.querySelectorAll('.section');
sectionsWithBg.forEach((section, index) => {
    if (index % 2 === 0) {
        section.style.transition = 'background-color 0.5s ease';
    }
});

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    // Добавляем класс для плавного появления
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);

    // Показываем первую секцию сразу
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        heroSection.classList.add('visible');
    }
});

// Обработка изменения размера окна
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Пересчитываем позиции для анимаций
        observer.disconnect();
        animateElements.forEach(el => {
            observer.observe(el);
        });
    }, 250);
});

