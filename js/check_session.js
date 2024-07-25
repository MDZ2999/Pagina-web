$(document).ready(function() {
    $.ajax({
        type: 'GET',
        url: 'php/check_session.php',
        dataType: 'json',  // Asegura que la respuesta es tratada como JSON
        success: function(response) {
            if (response.isLoggedIn) {
                // El usuario está autenticado
                $('.section').hide();
                $('#inicio').show();
            } else {
                // El usuario no está autenticado
                $('.section').hide();
                $('#inicio').show();
                sessionStorage.removeItem('activeSectionId');  // Asegura que no se guarda el estado anterior
            }
        }
    });
});