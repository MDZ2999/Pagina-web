document.addEventListener('DOMContentLoaded', function() {
    const editRoomModal = document.getElementById('editRoomModal');
    const editRoomClose = document.querySelector('.editRoomClose');
    const selectRoom = document.getElementById('selectRoom');
    const editRoomForm = document.getElementById('editRoomForm');
    const editImagePreview = document.getElementById('imageEditPreview');
    const editImagePreview2 = document.getElementById('imageEditPreview2');
    const editImagePreview3 = document.getElementById('imageEditPreview3');
    const editImagePreview4 = document.getElementById('imageEditPreview4');
    const editRoomCancelButton = document.querySelector('.editRoomCancel-button');

    // Cerrar el modal
    editRoomClose.onclick = function() {
        closeModal();
    };

    // Cerrar el modal y restablecer los campos al hacer clic en el botón "Cancelar"
    editRoomCancelButton.onclick = function() {
        closeModal();
    };

    // Función para cerrar el modal y restablecer los campos del formulario
    function closeModal() {
        editRoomModal.style.display = 'none';
        selectRoom.value = "";
        editRoomForm.reset();
        editImagePreview.style.display = 'none';
        editImagePreview2.style.display = 'none';
        editImagePreview3.style.display = 'none';
        editImagePreview4.style.display = 'none';
        clearRoomFields();
    }

    // Limpiar los campos del formulario
    function clearRoomFields() {
        document.getElementById('tituloEdit').value = "";
        document.getElementById('descripcionEdit').value = "";
        document.getElementById('serviciosEdit').value = "";
        document.getElementById('precioEdit').value = "";
        document.getElementById('disponibilidadEdit').value = "";
        document.getElementById('direccionEdit').value = "";
        editImagePreview.src = "";
        editImagePreview2.src = "";
        editImagePreview3.src = "";
        editImagePreview4.src = "";
    }

    // Obtener todos los cuartos y llenar la lista desplegable
    fetch('php/get_all_user_rooms.php')
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                console.error(data.error);
            } else {
                data.forEach(room => {
                    const option = document.createElement('option');
                    option.value = room.id_cuarto;
                    option.textContent = room.titulo;
                    selectRoom.appendChild(option);
                });
            }
        })
        .catch(error => console.error('Error:', error));

    // Manejar el cambio de selección en la lista desplegable
    selectRoom.onchange = function() {
        const roomId = this.value;
        if (roomId) {
            fetch(`php/get_room_details.php?id=${roomId}`)
                .then(response => response.json())
                .then(data => {
                    if (data.error) {
                        console.error(data.error);
                    } else {
                        document.getElementById('tituloEdit').value = data.titulo;
                        document.getElementById('descripcionEdit').value = data.descripcion;
                        document.getElementById('serviciosEdit').value = data.servicios;
                        document.getElementById('precioEdit').value = data.precio;
                        document.getElementById('disponibilidadEdit').value = data.disponibilidad;
                        document.getElementById('direccionEdit').value = data.direccion;
                        if (data.imagen) {
                            editImagePreview.src = `data:image/jpeg;base64,${data.imagen}`;
                            editImagePreview.style.display = 'block';
                        } else {
                            editImagePreview.style.display = 'none';
                        }
                        if (data.imagen2) {
                            editImagePreview2.src = `data:image/jpeg;base64,${data.imagen2}`;
                            editImagePreview2.style.display = 'block';
                        } else {
                            editImagePreview2.style.display = 'none';
                        }
                        if (data.imagen3) {
                            editImagePreview3.src = `data:image/jpeg;base64,${data.imagen3}`;
                            editImagePreview3.style.display = 'block';
                        } else {
                            editImagePreview3.style.display = 'none';
                        }
                        if (data.imagen4) {
                            editImagePreview4.src = `data:image/jpeg;base64,${data.imagen4}`;
                            editImagePreview4.style.display = 'block';
                        } else {
                            editImagePreview4.style.display = 'none';
                        }
                    }
                })
                .catch(error => console.error('Error:', error));
        }
    };

    // Manejar el envío del formulario de edición
    editRoomForm.onsubmit = function(event) {
        event.preventDefault();

        const formData = new FormData(editRoomForm);
        formData.append('id', selectRoom.value);

        // Si no se ha seleccionado una nueva imagen, no agregar la entrada de imagen al FormData
        if (document.getElementById('imagenEdit').files.length === 0) {
            formData.delete('imagen');
        }
        if (document.getElementById('imagenEdit2').files.length === 0) {
            formData.delete('imagen2');
        }
        if (document.getElementById('imagenEdit3').files.length === 0) {
            formData.delete('imagen3');
        }
        if (document.getElementById('imagenEdit4').files.length === 0) {
            formData.delete('imagen4');
        }

        fetch('php/update_room.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: data.error
                });
            } else {
                Swal.fire({
                    icon: 'success',
                    title: 'Éxito',
                    text: 'Cuarto actualizado con éxito.'
                });
                closeModal();
                // Opcional: recargar la página para reflejar los cambios
                location.reload();
            }
        })
        .catch(error => {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Ocurrió un error al actualizar el cuarto.'
            });
            console.error('Error:', error);
        });
    };

    // Abrir el modal al hacer clic en la imagen de placeholder
    document.querySelector('.image-container').onclick = function() {
        openEditRoomModal();
    };

    // Función para abrir el modal
    function openEditRoomModal() {
        editRoomModal.style.display = 'block';
        clearRoomFields(); // Limpiar los campos cuando se abre el modal
    }

    // Cerrar el modal al hacer clic en cualquier área fuera del contenido del modal
    window.onclick = function(event) {
        if (event.target === editRoomModal) {
            closeModal();
        }
    };

     // Agrega un escuchador de eventos al elemento de entrada de archivo para todas las imágenes
    document.querySelectorAll('input[type="file"]').forEach(function(input) {
        input.addEventListener('change', function(event) {
            var reader = new FileReader();
            var previewId = 'imageEditPreview' + (input.id.replace('imagenEdit', '') || '');
            var imagePreview = document.getElementById(previewId);

            reader.onload = function() {
                var dataURL = reader.result;
                imagePreview.src = dataURL;
                imagePreview.style.display = 'block';
            };

            reader.readAsDataURL(input.files[0]);
        });
    });

    // Abrir el modal de imagen ampliada
    ['imageEditPreview', 'imageEditPreview2', 'imageEditPreview3', 'imageEditPreview4'].forEach(function(previewId) {
        document.getElementById(previewId).onclick = function() {
            imageModalContent.src = this.src;
            imageModal.style.display = "block";
            document.body.classList.add("no-scroll");
        }
    });
});