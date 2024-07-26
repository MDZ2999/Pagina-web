$(document).ready(function() {
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