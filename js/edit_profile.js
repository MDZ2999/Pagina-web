document.addEventListener('DOMContentLoaded', function() {
    // Obtener el modal
    var modal = document.getElementById("editProfileModal");

    // Obtener el div que abre el modal
    var btn = document.getElementById("openEditProfileModal");

    // Obtener el elemento <span> que cierra el modal
    var span = document.querySelector(".editProfileClose");

    // Obtener el botón de cancelar
    var cancelButton = document.querySelector(".editProfileCancel-button");

    var body = document.body;

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
        });
    }

    if (cancelButton) {
        cancelButton.addEventListener('click', function() {
            modal.style.display = "none";
            body.classList.remove("no-scroll");
            document.getElementById("editProfileForm").reset();
            document.getElementById('avatarPreview').style.display = 'none';
            document.getElementById('bannerPreview').style.display = 'none';
        });
    }

    // Cuando el usuario haga clic en cualquier lugar fuera del modal, lo cierra
    window.addEventListener('click', function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
            body.classList.remove("no-scroll");
            document.getElementById("editProfileForm").reset();
            document.getElementById('avatarPreview').style.display = 'none';
            document.getElementById('bannerPreview').style.display = 'none';
        }
    });

    // Previsualización de imagen
    document.getElementById('avatar').addEventListener('change', function(event) {
        var input = event.target;
        var reader = new FileReader();

        reader.onload = function() {
            var dataURL = reader.result;
            var imagePreview = document.getElementById('avatarPreview');
            imagePreview.src = dataURL;
            imagePreview.style.display = 'block';
        };
        reader.readAsDataURL(input.files[0]);
    });

    document.getElementById('banner').addEventListener('change', function(event) {
        var input = event.target;
        var reader = new FileReader();

        reader.onload = function() {
            var dataURL = reader.result;
            var imagePreview = document.getElementById('bannerPreview');
            imagePreview.src = dataURL;
            imagePreview.style.display = 'block';
        };
        reader.readAsDataURL(input.files[0]);
    });

    var imageModal = document.getElementById("imageModal");
    var imageModalContent = document.getElementById("imageModalContent");
    var imageModalClose = document.querySelector(".imageModalClose");

    // Abrir el modal de imagen ampliada
    document.getElementById('avatarPreview').onclick = function() {
        imageModalContent.src = this.src;
        imageModal.style.display = "block";
        document.body.classList.add("no-scroll");
    }

    document.getElementById('bannerPreview').onclick = function() {
        imageModalContent.src = this.src;
        imageModal.style.display = "block";
        document.body.classList.add("no-scroll");
    }

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
    document.getElementById("editProfileForm").addEventListener('submit', function(event) {
        event.preventDefault();
        var form = event.target;
        var formData = new FormData(form);

        // Verifica si al menos uno de los campos de archivo está lleno
        if (form.querySelector('#avatar').files.length > 0 || form.querySelector('#banner').files.length > 0) {
            fetch('php/edit_profile.php', {
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
                    form.reset();
                    document.getElementById('avatarPreview').style.display = 'none';
                    document.getElementById('bannerPreview').style.display = 'none';
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
                    text: 'Ocurrió un error al editar el perfil.',
                    icon: 'error',
                    confirmButtonText: 'Aceptar'
                });
            });
        } else {
            Swal.fire({
                title: 'Error',
                text: 'Por favor, sube al menos una imagen.',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
        }
    });
});