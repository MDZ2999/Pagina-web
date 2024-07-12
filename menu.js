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
    // Selecciona todos los enlaces de navegación
    const navLinks = document.querySelectorAll('.nav-links li a');
    // Selecciona el contenedor de los enlaces de navegación
    const navLinksContainer = document.querySelector('.nav-links');

    // Función para mostrar el menú y el overlay
    function showMenu() {
        mobileMenu.classList.add('show'); // Muestra el menú móvil
        menuToggle.classList.add('active'); // Activa el botón de menú
        menuOverlay.classList.add('show'); // Muestra el overlay
        // Cambia el color de fondo de los iconos del menú a negro
        menuToggle.querySelectorAll('.menu-icon').forEach(icon => {
            icon.style.backgroundColor = 'black';
        });
        menuContainer.classList.add('fixed'); // Mantiene el contenedor del menú fijo
        // Desactiva los enlaces de navegación
        navLinks.forEach(link => {
            link.classList.add('disabled');
        });
        navLinksContainer.classList.add('no-hover'); // Añade la clase no-hover al contenedor de los enlaces de navegación
    }

    // Función para ocultar el menú y el overlay
    function hideMenu() {
        mobileMenu.classList.remove('show'); // Oculta el menú móvil
        menuToggle.classList.remove('active'); // Desactiva el botón de menú
        menuOverlay.classList.remove('show'); // Oculta el overlay
        // Cambia el color de fondo de los iconos del menú a blanco
        menuToggle.querySelectorAll('.menu-icon').forEach(icon => {
            icon.style.backgroundColor = 'white';
        });
        menuContainer.classList.remove('fixed'); // Deja de mantener el contenedor del menú fijo
        // Reactiva los enlaces de navegación
        navLinks.forEach(link => {
            link.classList.remove('disabled');
        });
        navLinksContainer.classList.remove('no-hover'); // Remueve la clase no-hover del contenedor de los enlaces de navegación
    }

    // Añade un evento de clic al botón de menú
    menuToggle.addEventListener('click', function() {
        if (mobileMenu.classList.contains('show')) {
            hideMenu(); // Oculta el menú si ya está mostrando
        } else {
            showMenu(); // Muestra el menú si no está mostrando
        }
    });

    // Añade un evento de clic al overlay para ocultar el menú al hacer clic fuera de él
    menuOverlay.addEventListener('click', function() {
        hideMenu(); // Oculta el menú y el overlay
    });

    // Previene la interacción con el contenido de la página cuando el menú está desplegado
    document.addEventListener('click', function(event) {
        if (!mobileMenu.contains(event.target) && !menuToggle.contains(event.target)) {
            hideMenu(); // Oculta el menú y el overlay si se hace clic fuera del menú y del botón de menú
        }
    });
});