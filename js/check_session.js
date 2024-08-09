$(document).ready(function() {
    const links = document.querySelectorAll('.nav-links li a');
    // Definir la función updateActiveLink
    function updateActiveLink(targetId) {
        links.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-section') === targetId) {
                link.classList.add('active');
            }
        });
    }
    // Definir la función showSection
    function showSection(targetId) {
        const targetSection = document.getElementById(targetId);
        document.querySelectorAll('.section').forEach(section => {
            section.style.display = 'none';
        });
        targetSection.style.display = 'block';
        sessionStorage.setItem('activeSectionId', targetId);
        updateActiveLink(targetId); // Esta función se encarga de actualizar el enlace activo en la navegación, asegúrate de que esté definida si la necesitas
    }

    // Realizar la verificación de la sesión
    $.ajax({
        type: 'GET',
        url: 'php/check_session.php',
        dataType: 'json',
        success: function(response) {
            if (response.isLoggedIn) {
                // Si el usuario está autenticado, no necesita cambiar la sección, solo asegura que la última sección activa sea mostrada.
                var activeSectionId = sessionStorage.getItem('activeSectionId') || 'inicio';
                $('#' + activeSectionId).show();
            } else {
                // El usuario no está autenticado
                let activeSectionId = sessionStorage.getItem('activeSectionId');
                if (activeSectionId !== 'perfil' && activeSectionId !== 'publicar') {
                    showSection(activeSectionId || 'inicio');
                } else {
                    $('.section').hide();
                    $('#inicio').show();
                    sessionStorage.removeItem('activeSectionId');  // Asegura que no se guarda el estado de secciones restringidas
                }
            }
        }
    });
});