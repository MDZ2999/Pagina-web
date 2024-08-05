document.addEventListener('DOMContentLoaded', function() {
    var modal = document.getElementById("editModal");
    var btn = document.getElementById("openEditModal");
    var span = document.getElementById("closeEditModal");
    var cancelButton = document.getElementById("cancelButton");
    var body = document.body;

    // Función para abrir el modal y cargar los datos del usuario
    btn.onclick = function() {
        fetch('php/get_owner_info.php')
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    console.error(data.error);
                } else {
                    // Dividir el nombre completo en nombres, apellido paterno y apellido materno
                    var nombreArray = data.nombreCompleto.split(' ');
                    document.getElementById('nombres').value = nombreArray[0] || '';
                    document.getElementById('apellidoP').value = nombreArray[1] || '';
                    document.getElementById('apellidoM').value = nombreArray[2] || '';

                    document.getElementById('telefono').value = data.telefono;
                }
            })
            .catch(error => console.error('Error:', error));
        modal.style.display = "block";
        body.classList.add("no-scroll");
    };

    // Función para cerrar el modal
    span.onclick = function() {
        modal.style.display = "none";
        body.classList.remove("no-scroll");
    };

    cancelButton.onclick = function() {
        modal.style.display = "none";
        body.classList.remove("no-scroll");
    };

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
            body.classList.remove("no-scroll");
        }
    };

    // Enviar el formulario para actualizar los datos del usuario
    document.getElementById("editForm").addEventListener('submit', function(event) {
        event.preventDefault();
        var form = event.target;
        var formData = new FormData(form);

        fetch('php/update_user_info.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.text())
        .then(responseText => {
            if (responseText.includes('exitosamente')) {
                Swal.fire({
                    title: 'Éxito',
                    text: responseText,
                    icon: 'success',
                    confirmButtonText: 'Aceptar'
                });
                modal.style.display = "none";
                body.classList.remove("no-scroll");
                // Actualizar los datos en el contenedor principal
                document.getElementById('editnombreUsuario').textContent = formData.get('nombres') + ' ' + formData.get('apellidoP') + ' ' + formData.get('apellidoM');
                document.getElementById('editTelefonoUsuario').textContent = formData.get('telefono');
            } else {
                Swal.fire({
                    title: 'Error',
                    text: responseText,
                    icon: 'error',
                    confirmButtonText: 'Aceptar'
                });
            }
        })
        .catch(error => {
            console.error('Error:', error);
            Swal.fire({
                title: 'Error',
                text: 'Ocurrió un error al actualizar los datos.',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
        });
    });
});