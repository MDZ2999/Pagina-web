// Espera a que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", function() {
    // Selecciona el botón de menú
    const menuToggle = document.querySelector('.menu-toggle');
    // Selecciona el menú móvil
    const mobileMenu = document.querySelector('.mobile-menu');
    // Selecciona el contenedor del menú
    const menuContainer = document.querySelector('.menu-container');
    // Selecciona el overlay
    const menuOverlay = document.querySelector('.menu-overlay');

    // Función para mostrar el menú y el overlay
    function showMenu() {
        mobileMenu.classList.add('show');
        menuToggle.classList.add('active');
        menuOverlay.classList.add('show');
        menuToggle.querySelectorAll('.menu-icon').forEach(icon => {
            icon.style.backgroundColor = 'black';
        });
        menuContainer.classList.add('fixed');
    }

    // Función para ocultar el menú y el overlay
    function hideMenu() {
        mobileMenu.classList.remove('show');
        menuToggle.classList.remove('active');
        menuOverlay.classList.remove('show');
        menuToggle.querySelectorAll('.menu-icon').forEach(icon => {
            icon.style.backgroundColor = 'white';
        });
        menuContainer.classList.remove('fixed');
    }

    // Añade un evento de clic al botón de menú
    menuToggle.addEventListener('click', function() {
        if (mobileMenu.classList.contains('show')) {
            hideMenu();
        } else {
            showMenu();
        }
    });

    // Añade un evento de clic al overlay para ocultar el menú al hacer clic fuera de él
    menuOverlay.addEventListener('click', function() {
        hideMenu();
    });

    // Previene la interacción con el contenido de la página cuando el menú está desplegado
    document.addEventListener('click', function(event) {
        if (!mobileMenu.contains(event.target) && !menuToggle.contains(event.target)) {
            hideMenu();
        }
    });
}); 