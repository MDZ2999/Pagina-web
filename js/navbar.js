document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('.nav-links li a');

    function showSection(targetId) {
        const targetSection = document.getElementById(targetId);
        document.querySelectorAll('.section').forEach(section => {
            section.style.display = 'none';
        });
        targetSection.style.display = 'block';
        sessionStorage.setItem('activeSectionId', targetId);
        updateActiveLink(targetId);
    }

    function updateActiveLink(targetId) {
        links.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-section') === targetId) {
                link.classList.add('active');
            }
        });
    }

    function restoreActiveSection() {
        const activeSectionId = sessionStorage.getItem('activeSectionId') || 'inicio';
        showSection(activeSectionId);
    }

    links.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const sectionId = this.getAttribute('data-section');
            if (sectionId === 'perfil' || sectionId === 'publicar') {
                checkLoginAndShowSection(sectionId);
            } else {
                showSection(sectionId);
            }
        });
    });

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
                            window.location.href = 'login-register.html';
                        }
                    });
                }
            }
        });
    }

    restoreActiveSection(); // Restaura la sección activa al cargar la página
});