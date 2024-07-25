$(document).ready(function() {
    // Asocia un controlador de eventos al formulario de inicio de sesión para manejar la presentación
    $('#loginForm').submit(function(event) {
        event.preventDefault(); // Previene el comportamiento predeterminado del formulario, evitando que la página se recargue

        // Serializa los datos del formulario para la solicitud AJAX
        var formData = $(this).serialize();

        // Realiza una solicitud AJAX al servidor
        $.ajax({
            type: 'POST', // Define el método HTTP de la solicitud
            url: 'php/login.php', // Especifica la URL del script PHP que procesará los datos del formulario
            data: formData, // Envía los datos del formulario serializados
            dataType: 'json', // Especifica que se espera una respuesta en formato JSON
            success: function(response) {
                // Manejo de la respuesta si la solicitud AJAX fue exitosa
                if (response.success) {
                    // Si el inicio de sesión es exitoso
                    localStorage.setItem('isLoggedIn', 'true'); // Almacena en localStorage el estado de autenticación
                    Swal.fire({ // Utiliza SweetAlert para mostrar un mensaje de éxito
                        title: 'Éxito',
                        text: response.message,
                        icon: 'success',
                        confirmButtonText: 'Aceptar'
                    }).then((result) => {
                        // Después de cerrar el mensaje de éxito
                        if (result.isConfirmed) {
                            const requestedSection = localStorage.getItem('requestedSection') || 'inicio';
                            localStorage.removeItem('requestedSection'); // Limpia la sección solicitada almacenada en localStorage
                            window.location.href = `index.html#${requestedSection}`; // Redirige al usuario a la sección deseada o al inicio si no se especificó una
                        }
                    });
                } else {
                    // Si hay un error en el inicio de sesión, como usuario o contraseña incorrectos
                    Swal.fire({
                        title: 'Error',
                        text: response.message,
                        icon: 'error',
                        confirmButtonText: 'Aceptar'
                    });
                }
            },
            error: function() {
                // Manejo de errores si la solicitud AJAX falla por razones de red o configuración del servidor
                Swal.fire({
                    title: 'Error',
                    text: 'No se pudo conectar con el servidor. Por favor, inténtalo de nuevo más tarde.',
                    icon: 'error',
                    confirmButtonText: 'Aceptar'
                });
            }
        });
    });
});