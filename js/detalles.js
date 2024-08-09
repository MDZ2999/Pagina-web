document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('.detallesimg');
    const prevBtn = document.querySelector('.detalles-prev-btn');
    const nextBtn = document.querySelector('.detalles-next-btn');
    const dots = document.querySelectorAll('.detalles-dot');
    let currentIndex = 0;

    function showImage(index) {
        images.forEach((img, i) => {
            img.style.display = (i === index) ? 'block' : 'none';
            dots[i].classList.toggle('active', i === index);
        });
    }

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : images.length - 1;
        showImage(currentIndex);
    });

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex < images.length - 1) ? currentIndex + 1 : 0;
        showImage(currentIndex);
    });

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showImage(index);
            currentIndex = index;
        });
    });

    showImage(currentIndex);
});