document.addEventListener('DOMContentLoaded', () => {
    const images = [
        'url("/Pagina%20web/img/carrusel/banner1.png")',
        'url("/Pagina%20web/img/carrusel/banner2.jpg")',
        'url("/Pagina%20web/img/carrusel/banner3.jpg")',
        'url("/Pagina%20web/img/carrusel/banner4.jpg")'
    ];

    let currentIndex = 0;

    const headerElement = document.querySelector('.headerI');
    const leftButton = document.querySelector('.left-button');
    const rightButton = document.querySelector('.right-button');

    function updateHeaderImage() {
        headerElement.style.backgroundImage = images[currentIndex];
    }

    leftButton.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateHeaderImage();
    });

    rightButton.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % images.length;
        updateHeaderImage();
    });

    updateHeaderImage();
});