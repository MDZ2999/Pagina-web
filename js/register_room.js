document.addEventListener('DOMContentLoaded', function() {
    // Obtener el modal
    var modal = document.getElementById("publicarModal");

    // Obtener el div que abre el modal
    var btn = document.getElementById("openPublicarModal");

    // Obtener el elemento <span> que cierra el modal
    var span = document.querySelector(".publicarClose");

    // Obtener el botón de cancelar
    var cancelButton = document.querySelector(".publicarCancel-button");

    var body = document.body;

    // Función para resetear el formulario y ocultar previsualizaciones
    function resetRegisterRoomForm() {
        document.getElementById("registerRoomForm").reset();
        var imagePreview = document.getElementById('imagePreview');
        imagePreview.style.display = 'none';
        imagePreview.src = '';
    }

    // Verificar si los elementos existen antes de agregar los event listeners
    if (btn) {
        btn.addEventListener('click', function() {
            modal.style.display = "block";
            body.classList.add("no-scroll");
        });
    }

    if (span) {
        span.addEventListener('click', function() {
            modal.style.display = "none";
            body.classList.remove("no-scroll");
            resetRegisterRoomForm(); // Llamar a la función de reseteo
        });
    }

    if (cancelButton) {
        cancelButton.addEventListener('click', function() {
            modal.style.display = "none";
            body.classList.remove("no-scroll");
            resetRegisterRoomForm(); // Llamar a la función de reseteo
        });
    }

    // Cuando el usuario haga clic en cualquier lugar fuera del modal, lo cierra
    window.addEventListener('click', function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
            body.classList.remove("no-scroll");
            resetRegisterRoomForm(); // Llamar a la función de reseteo
        }
    });

        // Agrega un escuchador de eventos al elemento de entrada de archivo con id 'imagen'
    document.querySelectorAll('input[type="file"]').forEach(function(input) {
        input.addEventListener('change', function(event) {
            var reader = new FileReader();
            var previewId = 'imagePreview' + (input.id.replace('imagen', '') || '');
            var imagePreview = document.getElementById(previewId);
    
            reader.onload = function() {
                var dataURL = reader.result;
                imagePreview.src = dataURL;
                imagePreview.style.display = 'block';
            };
            reader.readAsDataURL(input.files[0]);
        });
    });

    var imageModal = document.getElementById("imageModal");
    var imageModalContent = document.getElementById("imageModalContent");
    var imageModalClose = document.querySelector(".imageModalClose");

    // Abrir el modal de imagen ampliada
    ['imagePreview', 'imagePreview2', 'imagePreview3', 'imagePreview4'].forEach(function(previewId) {
        document.getElementById(previewId).onclick = function() {
            imageModalContent.src = this.src;
            imageModal.style.display = "block";
            document.body.classList.add("no-scroll");
        }
    });

    // Cerrar el modal de imagen ampliada
    imageModalClose.onclick = function() {
        imageModal.style.display = "none";
        document.body.classList.remove("no-scroll");
    }

    window.onclick = function(event) {
        if (event.target == imageModal) {
            imageModal.style.display = "none";
            document.body.classList.remove("no-scroll");
        }
    }

    // Validación del formulario
    // Añade un evento de 'submit' al formulario identificado por "registerRoomForm"
    document.getElementById("registerRoomForm").addEventListener('submit', function(event) {
        event.preventDefault(); // Previene el comportamiento predeterminado de recargar la página
        var form = event.target; // Obtiene el formulario que disparó el evento
        var formData = new FormData(form); // Crea un objeto FormData a partir del formulario

        // Verifica si todos los campos del formulario son válidos
        if (form.checkValidity()) {
            // Realiza una solicitud POST usando fetch
            fetch('php/register_room.php', {
                method: 'POST',
                body: formData // Envía los datos del formulario en el cuerpo de la solicitud
            })
            .then(response => response.text()) // Convierte la respuesta a texto
            .then(responseText => {
                // Maneja la respuesta del servidor
                if (responseText.includes('exitosamente')) {
                    // Si la respuesta incluye la palabra 'exitosamente', muestra un mensaje de éxito
                    Swal.fire({
                        title: 'Éxito',
                        text: responseText, // Muestra el texto de respuesta del servidor
                        icon: 'success',
                        confirmButtonText: 'Aceptar'
                    });
                    modal.style.display = "none"; // Oculta el modal del formulario
                    resetRegisterRoomForm(); // Llamar a la función de reseteo
                } else {
                    // Si la respuesta es diferente, asume un error y muestra un mensaje
                    Swal.fire({
                        title: 'Error',
                        text: responseText, // Muestra el texto de respuesta del servidor
                        icon: 'error',
                        confirmButtonText: 'Aceptar'
                    });
                }
            })
            .catch(error => {
                // Captura errores de la solicitud fetch y muestra un mensaje de error
                console.error('Error:', error);
                Swal.fire({
                    title: 'Error',
                    text: 'Ocurrió un error al registrar el cuarto.',
                    icon: 'error',
                    confirmButtonText: 'Aceptar'
                });
            });
        } else {
            // Si el formulario no es válido, muestra un mensaje pidiendo completar todos los campos
            Swal.fire({
                title: 'Error',
                text: 'Por favor, completa todos los campos del formulario.',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
        }
    });

});