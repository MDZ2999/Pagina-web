// Espera a que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", function() {
    // Selecciona el botón de menú
    const menuToggle = document.querySelector('.menu-toggle');
    // Selecciona el menú móvil
    const mobileMenu = document.querySelector('.mobile-menu');
    // Selecciona el contenedor del menú
    const menuContainer = document.querySelector('.menu-container');

    // Añade un evento de clic al botón de menú
    menuToggle.addEventListener('click', function() {
        // Alterna la clase 'show' en el menú móvil para mostrarlo o ocultarlo
        mobileMenu.classList.toggle('show');
        // Alterna la clase 'active' en el botón de menú para indicar su estado activo o inactivo
        menuToggle.classList.toggle('active');

        // Verifica si el menú móvil está mostrándose
        if (mobileMenu.classList.contains('show')) {
            // Si está mostrándose, cambia el color de fondo de los iconos del menú a negro
            menuToggle.querySelectorAll('.menu-icon').forEach(icon => {
                icon.style.backgroundColor = 'black';
            });
            // Añade la clase 'fixed' al contenedor del menú para mantenerlo fijo en la pantalla
            menuContainer.classList.add('fixed');
        } else {
            // Si no está mostrándose, cambia el color de fondo de los iconos del menú a blanco
            menuToggle.querySelectorAll('.menu-icon').forEach(icon => {
                icon.style.backgroundColor = 'white';
            });
            // Remueve la clase 'fixed' del contenedor del menú para que no esté fijo en la pantalla
            menuContainer.classList.remove('fixed');
        }
    });
});