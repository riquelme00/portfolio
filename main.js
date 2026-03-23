// --- 1. LIGHT/DARK MODE ---
// Idêntico ao projeto de referência: escuta o evento "change" do checkbox.
// Funciona porque o checkbox tem opacity:0 + position:absolute (não display:none).
const themeToggle = document.getElementById('theme-toggle');

themeToggle.addEventListener('change', () => {
    document.body.classList.toggle('light-mode');
});


// --- 2. ANIMAÇÃO DE SCROLL (versão robusta) ---
const initAnimationScroll = () => {
    const sections = document.querySelectorAll('.js-section');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            } else {
                entry.target.classList.remove('active');
            }
        });
    }, { threshold: 0.1 }); // dispara quando 10% da seção aparecer

    sections.forEach(section => observer.observe(section));
};

initAnimationScroll();


// --- 3. TYPING ANIMATION ---
const titleElement = document.querySelector('.cabeçalho h1');
const subtitleElement = document.querySelector('.cabeçalho p');

const titleText = titleElement.innerText;
const subtitleText = subtitleElement.innerText;
titleElement.innerHTML = '';
subtitleElement.innerHTML = '';

const typeWriter = (element, text, speed = 100) => {
    let i = 0;
    const typing = () => {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(typing, speed);
        }
    };
    typing();
};

setTimeout(() => typeWriter(titleElement, titleText, 100), 500);
setTimeout(() => typeWriter(subtitleElement, subtitleText, 60), 2500);


// --- 4. MODAL DE PROJETOS ---
const cards = document.querySelectorAll('.projetos-card');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
const modalImg = document.querySelector('.modal-img');
const modalTitle = document.querySelector('.modal-title');
const modalDesc = document.querySelector('.modal-description');

const openModal = (card) => {
    modalImg.src = card.querySelector('.projetos-imagem').src;
    modalTitle.innerText = card.querySelector('.info-projetos').innerText;
    modalDesc.innerText = card.querySelector('.paragrafos-projetos').innerText;
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
};

const closeModal = () => {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
    document.body.style.overflow = 'auto';
};

cards.forEach(card => card.addEventListener('click', () => openModal(card)));
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) closeModal();
});