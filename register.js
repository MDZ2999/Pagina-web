$(document).ready(function() {
    // Obtén el botón de crear cuenta y el checkbox de términos y condiciones
    const createButton = $('#createButton');
    const conditionCheckbox = $('#conditionCheckbox');

    // Agrega un evento click al checkbox de términos y condiciones
    conditionCheckbox.on('click', function() {
        // Habilita el botón de crear cuenta cuando el checkbox está marcado
        if (conditionCheckbox.is(':checked')) {
            createButton.prop('disabled', false);
            // Deshabilita el checkbox para que no se pueda desmarcar
            conditionCheckbox.prop('disabled', true);
        }
    });

    // Función que se ejecuta cuando el formulario con ID 'registerForm' se envía
    $('#registerForm').on('submit', function(event) {
        event.preventDefault(); // Evita el comportamiento por defecto del formulario, que es recargar la página

        // Recopila los datos del formulario en un objeto
        var formData = {
            nombres: $('#nombres').val(),
            apellidoP: $('#apellidoP').val(),
            apellidoM: $('#apellidoM').val(),
            correo: $('#correoRegistro').val(),
            contrasena: $('#contrasenaRegistro').val(),
            telefono: $('#telefono').val()
        };

        // Verifica si el checkbox de términos y condiciones está marcado
        if (conditionCheckbox.is(':checked')) {
            // Si el checkbox está marcado, realiza una solicitud AJAX
            $.ajax({
                type: 'POST', // Tipo de solicitud HTTP (POST)
                url: 'register.php', // URL del servidor donde se enviarán los datos
                data: formData, // Datos que se enviarán al servidor
                dataType: 'json', // Tipo de datos que se espera del servidor
                encode: true,
                success: function(response) {
                    // Función que se ejecuta si la solicitud es exitosa
                    if (response.success) {
                        // Muestra un mensaje de éxito utilizando SweetAlert2
                        Swal.fire({
                            title: 'Registro Exitoso',
                            text: '¡Puedes Iniciar Sesión!',
                            icon: 'success',
                            confirmButtonText: 'Aceptar'
                        }).then(function(result) {
                            if (result.isConfirmed) {
                                // Oculta el formulario de registro y muestra el formulario de inicio de sesión
                                $('#registerBox').hide();
                                $('#loginBox').show();
                            }
                        });
                    } else {
                        // Muestra un mensaje de error si la respuesta indica que el registro falló
                        Swal.fire({
                            title: 'Error',
                            text: response.message,
                            icon: 'error',
                            confirmButtonText: 'Aceptar'
                        });
                    }
                },
                error: function() {
                    // Función que se ejecuta si hay un error en la solicitud AJAX
                    Swal.fire({
                        title: 'Error',
                        text: 'Hubo un problema con el registro. Por favor, intenta de nuevo.',
                        icon: 'error',
                        confirmButtonText: 'Aceptar'
                    });
                }
            });
        } else {
            // Muestra un mensaje de error si el checkbox de términos y condiciones no está marcado
            Swal.fire({
                title: 'Error',
                text: 'Debes aceptar los términos y condiciones para registrarte.',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
        }
    });
});