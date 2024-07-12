document.addEventListener('DOMContentLoaded', function() {
    // Obtener todos los elementos <a> dentro de <li> en el navbar
    const links = document.querySelectorAll('.nav-links li a');

    // Establecer 'Inicio' como activo por defecto al cargar la página
    document.getElementById('inicio-link').classList.add('active');

    // Función para mostrar la sección correspondiente y ocultar las demás
    function showSection(targetId) {
        const targetSection = document.getElementById(targetId);
        // Mostrar solo la sección objetivo y ocultar las demás
        document.querySelectorAll('.section').forEach(section => {
            section.style.display = 'none';
        });
        targetSection.style.display = 'block';
    }

    // Mostrar la sección de inicio por defecto
    showSection('inicio');

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