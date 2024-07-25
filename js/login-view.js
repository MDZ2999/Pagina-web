$(document).ready(function() {
    // Muestra el formulario de registro y oculta el de inicio de sesión
    $('#showRegisterForm').click(function() {
        $('#loginBox').hide();
        $('#registerBox').show();
    });
});