document.addEventListener('DOMContentLoaded', function() {
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
});