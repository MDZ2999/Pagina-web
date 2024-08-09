document.addEventListener('DOMContentLoaded', function() {
    // Verificar si el usuario está autenticado
    fetch('php/check_session.php')
        .then(response => response.json())
        .then(data => {
            if (data.isLoggedIn) {
                // Si el usuario está autenticado, cargar la información del propietario
                loadOwnerInfo();
            } else {
                console.log('El usuario no está autenticado, no se cargarán los datos del propietario.');
            }
        })
        .catch(error => console.error('Error al verificar la sesión:', error));
});

function loadOwnerInfo() {
    fetch('php/get_owner_info.php')
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                console.error(data.error);
            } else {
                // Actualizar los elementos HTML con los datos del usuario
                document.getElementById('nombreUsuario').textContent = data.nombreCompleto;
                document.getElementById('telefonoUsuario').textContent = data.telefono;
                document.getElementById('correoUsuario').textContent = data.correo;
                // Para dirección, actualizar después
                // document.getElementById('direccionUsuario').textContent = data.direccion;
            }
        })
        .catch(error => console.error('Error:', error));
}