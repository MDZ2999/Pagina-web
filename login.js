$(document).ready(function() {
    $('#loginForm').submit(function(event) {
        event.preventDefault(); // Evita que el formulario se envíe de la manera tradicional
        var formData = $(this).serialize(); // Serializa los datos del formulario

        $.ajax({
            type: 'POST',
            url: 'login.php',
            data: formData,
            dataType: 'json',
            success: function(response) {
                if (response.success) {
                    Swal.fire({
                        title: 'Éxito',
                        text: response.message,
                        icon: 'success',
                        confirmButtonText: 'Aceptar'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            window.location.href = 'index.html'; // Redirige al index.html después de clic en Aceptar
                        }
                    });
                } else {
                    Swal.fire({
                        title: 'Error',
                        text: response.message,
                        icon: 'error',
                        confirmButtonText: 'Aceptar'
                    });
                }
            }
        });
    });
});