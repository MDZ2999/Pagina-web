document.addEventListener('DOMContentLoaded', function () {
    // Obtener el modal de edición de perfil
    var modal = document.getElementById("editProfileModal");

    // Obtener el botón que abre el modal
    var btn = document.getElementById("openEditProfileModal");

    // Obtener el elemento <span> que cierra el modal
    var span = document.querySelector(".editProfileClose");

    // Obtener el botón de cancelar
    var cancelButton = document.querySelector(".editProfileCancel-button");

    // Obtener el cuerpo del documento
    var body = document.body;

    // Variable para almacenar la instancia de Cropper.js
    var avatarCropper;
    var bannerCropper;

    // Función para resetear el formulario y ocultar previsualizaciones
    function resetForm() {
        document.getElementById("editProfileForm").reset();
        document.getElementById('avatarPreview').style.display = 'none';
        document.getElementById('bannerPreview').style.display = 'none';
        if (avatarCropper) {
            avatarCropper.destroy();
        }
        if (bannerCropper) {
            bannerCropper.destroy();
        }
    }

    // Verificar si los elementos existen antes de agregar los event listeners
    if (btn) {
        btn.addEventListener('click', function () {
            modal.style.display = "block";
            body.classList.add("no-scroll");
        });
    }

    if (span) {
        span.addEventListener('click', function () {
            modal.style.display = "none";
            body.classList.remove("no-scroll");
            resetForm();
        });
    }

    if (cancelButton) {
        cancelButton.addEventListener('click', function () {
            modal.style.display = "none";
            body.classList.remove("no-scroll");
            resetForm();
        });
    }

    // Cuando el usuario haga clic en cualquier lugar fuera del modal, lo cierra
    window.addEventListener('click', function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
            body.classList.remove("no-scroll");
            resetForm();
        }
    });

    // Previsualización de imagen
    document.getElementById('avatar').addEventListener('change', function (event) {
        var input = event.target;
        var reader = new FileReader();

        reader.onload = function () {
            var dataURL = reader.result;
            var imagePreview = document.getElementById('avatarPreview');
            imagePreview.src = dataURL;
            imagePreview.style.display = 'block';
        };
        reader.readAsDataURL(input.files[0]);
    });

    document.getElementById('banner').addEventListener('change', function (event) {
        var input = event.target;
        var reader = new FileReader();

        reader.onload = function () {
            var dataURL = reader.result;
            var imagePreview = document.getElementById('bannerPreview');
            imagePreview.src = dataURL;
            imagePreview.style.display = 'block';
        };
        reader.readAsDataURL(input.files[0]);
    });

    // Obtener el modal de recorte de imagen
    var cropperModal = document.getElementById("cropperModal");
    var imageToCrop = document.getElementById("imageToCrop");
    var cropperClose = document.querySelector(".cropperClose");
    var cropCancelButton = document.querySelector(".cropCancel-button");
    var cropSaveButton = document.querySelector(".cropSave-button");

    // Abrir el modal de imagen ampliada y preparar Cropper.js
    document.getElementById('avatarPreview').onclick = function () {
        imageToCrop.src = this.src;
        cropperModal.style.display = "block";
        body.classList.add("no-scroll");
        avatarCropper = new Cropper(imageToCrop, {
            aspectRatio: 1,
            viewMode: 1
        });
    }

    document.getElementById('bannerPreview').onclick = function () {
        imageToCrop.src = this.src;
        cropperModal.style.display = "block";
        body.classList.add("no-scroll");
        bannerCropper = new Cropper(imageToCrop, {
            aspectRatio: 3 / 1,
            viewMode: 1
        });
    }

    // Cerrar el modal de recorte de imagen
    cropperClose.onclick = function () {
        cropperModal.style.display = "none";
        body.classList.remove("no-scroll");
        if (avatarCropper) {
            avatarCropper.destroy();
        }
        if (bannerCropper) {
            bannerCropper.destroy();
        }
    }

    cropCancelButton.onclick = function () {
        cropperModal.style.display = "none";
        body.classList.remove("no-scroll");
        if (avatarCropper) {
            avatarCropper.destroy();
        }
        if (bannerCropper) {
            bannerCropper.destroy();
        }
    }

    window.onclick = function (event) {
        if (event.target == cropperModal) {
            cropperModal.style.display = "none";
            body.classList.remove("no-scroll");
            if (avatarCropper) {
                avatarCropper.destroy();
            }
            if (bannerCropper) {
                bannerCropper.destroy();
            }
        }
    }

    // Guardar la imagen recortada
    cropSaveButton.onclick = function () {
        if (avatarCropper) {
            var croppedImageDataURL = avatarCropper.getCroppedCanvas().toDataURL('image/jpeg');
            document.getElementById('avatarPreview').src = croppedImageDataURL;
            var avatarCroppedInput = document.getElementById('avatarCropped');
            if (avatarCroppedInput) {
                avatarCroppedInput.value = croppedImageDataURL;
            } else {
                console.error('Elemento avatarCropped no encontrado');
            }
            avatarCropper.destroy();
            avatarCropper = null;
        } else if (bannerCropper) {
            var croppedImageDataURL = bannerCropper.getCroppedCanvas().toDataURL('image/jpeg');
            document.getElementById('bannerPreview').src = croppedImageDataURL;
            var bannerCroppedInput = document.getElementById('bannerCropped');
            if (bannerCroppedInput) {
                bannerCroppedInput.value = croppedImageDataURL;
            } else {
                console.error('Elemento bannerCropped no encontrado');
            }
            bannerCropper.destroy();
            bannerCropper = null;
        }
        cropperModal.style.display = "none";
        body.classList.remove("no-scroll");
    }

    // Validación del formulario y envío de imágenes recortadas
    document.getElementById("editProfileForm").addEventListener('submit', function (event) {
        event.preventDefault();
        var form = event.target;
        var formData = new FormData(form);

        // Añadir las imágenes recortadas al formData
        if (document.getElementById('avatarCropped').value) {
            formData.append('avatarCropped', document.getElementById('avatarCropped').value);
        }
        if (document.getElementById('bannerCropped').value) {
            formData.append('bannerCropped', document.getElementById('bannerCropped').value);
        }

        // Verifica si al menos uno de los campos de archivo está lleno
        if (form.querySelector('#avatar').files.length > 0 || form.querySelector('#banner').files.length > 0 || formData.has('avatarCropped') || formData.has('bannerCropped')) {
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
                        resetForm();
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