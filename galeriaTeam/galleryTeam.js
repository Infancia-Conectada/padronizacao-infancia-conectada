// ========== ELEMENTOS DO DOM ==========
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modalImg');
const closeBtn = document.getElementById('closeBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const galleryItems = document.querySelectorAll('.gallery-item');

// ========== VARIÁVEIS DE CONTROLE ==========
let currentIndex = 0;
const images = Array.from(galleryItems).map(item => {
    const img = item.querySelector('img');
    return {
        src: img.src,
        alt: img.alt
    };
});

// ========== FUNÇÕES DE CONTROLE DO MODAL ==========

// Abre o modal com a imagem selecionada
function openModal(index) {
    currentIndex = index;
    modalImg.src = images[currentIndex].src;
    modalImg.alt = images[currentIndex].alt;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Previne scroll do body
}

// Fecha o modal
function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = ''; // Restaura scroll do body
}

// Navega para a próxima imagem
function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    modalImg.src = images[currentIndex].src;
    modalImg.alt = images[currentIndex].alt;
}

// Navega para a imagem anterior
function prevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    modalImg.src = images[currentIndex].src;
    modalImg.alt = images[currentIndex].alt;
}

// ========== EVENT LISTENERS ==========

// Adiciona evento de clique em cada item da galeria
galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => openModal(index));
    
    // Suporte para acessibilidade via teclado
    item.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openModal(index);
        }
    });
});

// Botão de fechar
closeBtn.addEventListener('click', closeModal);

// Botões de navegação
prevBtn.addEventListener('click', prevImage);
nextBtn.addEventListener('click', nextImage);

// Fecha modal ao clicar fora da imagem
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

// Navegação por teclado
document.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('active')) return;
    
    switch(e.key) {
        case 'Escape':
            closeModal();
            break;
        case 'ArrowRight':
            nextImage();
            break;
        case 'ArrowLeft':
            prevImage();
            break;
    }
});
