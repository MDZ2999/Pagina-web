document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('.nav-links li a');

    // Esta función muestra la sección seleccionada y oculta las demás
    function showSection(targetId) {
        const targetSection = document.getElementById(targetId);
        document.querySelectorAll('.section').forEach(section => {
            section.style.display = 'none';  // Oculta todas las secciones
        });
        targetSection.style.display = 'block';  // Muestra la sección solicitada
        sessionStorage.setItem('activeSectionId', targetId);  // Guarda la sección activa en sessionStorage
        updateActiveLink(targetId);
    }

    // Actualiza el enlace activo en la barra de navegación
    function updateActiveLink(targetId) {
        links.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-section') === targetId) {
                link.classList.add('active');
            }
        });
    }

    // Restaura la sección activa desde sessionStorage o muestra 'inicio' si no hay ninguna guardada
    function restoreActiveSection() {
        const activeSectionId = sessionStorage.getItem('activeSectionId') || 'inicio';
        showSection(activeSectionId);
    }

    // Añade el controlador de eventos a cada enlace
    links.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const sectionId = this.getAttribute('data-section');
            // Verifica el estado de la sesión antes de mostrar secciones restringidas
            if (sectionId === 'perfil' || sectionId === 'publicar') {
                checkLoginAndShowSection(sectionId);
            } else {
                showSection(sectionId);
            }
        });
    });

    // Verifica el estado de inicio de sesión y muestra la sección correspondiente
    function checkLoginAndShowSection(sectionId) {
        $.ajax({
            url: 'php/check_session.php',
            dataType: 'json',
            success: function(response) {
                if (response.isLoggedIn) {
                    showSection(sectionId);
                } else {
                    Swal.fire({
                        title: 'Acceso Restringido',
                        text: 'Por favor, inicia sesión para acceder a esta sección.',
                        icon: 'warning',
                        confirmButtonText: 'Iniciar Sesión',
                        preConfirm: () => {
                            localStorage.setItem('requestedSection', sectionId);  // Guarda la sección solicitada
                            window.location.href = 'login-register.html';
                        }
                    });
                }
            }
        });
    }

    // Restaura la sección activa al cargar la página
    restoreActiveSection();
});