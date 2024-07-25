document.addEventListener("DOMContentLoaded", function() {
    const menuToggle = document.querySelector('.menu-toggle'); // Selecciona el botón de menú
    const mobileMenu = document.querySelector('.mobile-menu'); // Selecciona el menú móvil
    const menuContainer = document.querySelector('.menu-container'); // Selecciona el contenedor del menú
    const menuOverlay = document.querySelector('.menu-overlay'); // Selecciona el overlay
    const navLinks = document.querySelectorAll('.nav-links li a'); // Selecciona todos los enlaces de navegación
    const navLinksContainer = document.querySelector('.nav-links'); // Selecciona el contenedor de los enlaces de navegación
    const body = document.body; // Selecciona el body

    // Función para mostrar el menú y congelar la página
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

        // Congelar el desplazamiento de la página
        body.classList.add('no-scroll');
        
        // Congelar el buscador
        const searchInput = document.querySelector('.search-container input');
        searchInput.style.cursor = 'auto'; // Cambia el cursor del buscador a modo default
        searchInput.disabled = true; // Desactiva el input del buscador
    }

    // Función para ocultar el menú y restaurar la página
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

        // Reactivar el desplazamiento de la página
        body.classList.remove('no-scroll');

        // Reactivar el buscador
        const searchInput = document.querySelector('.search-container input');
        searchInput.style.cursor = ''; // Restablece el cursor del buscador
        searchInput.disabled = false; // Activa el input del buscador
    }

    // Evento de clic para el botón de menú
    menuToggle.addEventListener('click', function() {
        if (mobileMenu.classList.contains('show')) {
            hideMenu(); // Oculta el menú si ya está mostrando
        } else {
            showMenu(); // Muestra el menú si no está mostrando
        }
    });

    // Evento de clic para el overlay para ocultar el menú
    menuOverlay.addEventListener('click', function() {
        hideMenu(); // Oculta el menú y el overlay
    });

    // Oculta el menú si se hace clic fuera de él
    document.addEventListener('click', function(event) {
        if (!mobileMenu.contains(event.target) && !menuToggle.contains(event.target)) {
            hideMenu();
        }
    });

});