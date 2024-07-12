document.addEventListener('DOMContentLoaded', function() {
    // Obtener todos los elementos <a> dentro de <li> en el navbar
    const links = document.querySelectorAll('.nav-links li a');

    // Función para mostrar la sección correspondiente y gestionar estado activo
    function showSection(targetId) {
        const targetSection = document.getElementById(targetId);
        // Mostrar solo la sección objetivo y ocultar las demás
        document.querySelectorAll('.section').forEach(section => {
            section.style.display = 'none';
        });
        targetSection.style.display = 'block';

        // Guardar el ID de la sección activa en el almacenamiento local
        localStorage.setItem('activeSectionId', targetId);
    }

    // Restaurar el estado activo al cargar la página
    function restoreActiveSection() {
        const activeSectionId = localStorage.getItem('activeSectionId');
        if (activeSectionId) {
            // Remover la clase 'active' de todos los elementos <li>
            links.forEach(link => link.classList.remove('active'));

            // Agregar la clase 'active' al elemento <li> correspondiente
            const activeLink = document.querySelector(`.nav-links li a[data-section="${activeSectionId}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
                // Mostrar la sección correspondiente al ID guardado
                showSection(activeSectionId);
            }
        } else {
            // Mostrar la sección de inicio por defecto si no hay sección activa guardada
            showSection('inicio');
        }
    }

    // Mostrar la sección activa guardada al cargar la página
    restoreActiveSection();

    // Iterar sobre cada elemento <a> para agregar evento de clic
    links.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();

            // Remover la clase 'active' de todos los elementos <li>
            links.forEach(link => link.classList.remove('active'));

            // Agregar la clase 'active' al elemento <li> actual
            this.classList.add('active');

            // Obtener el ID de la sección a mostrar
            const targetId = this.getAttribute('data-section');

            // Mostrar la sección correspondiente
            showSection(targetId);
        });
    });
});