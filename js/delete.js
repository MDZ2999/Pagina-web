document.addEventListener('DOMContentLoaded', function () {
    const deleteRoomModal = document.getElementById('deleteRoomModal');
    const openDeleteRoomModalBtn = document.querySelector('.delete-button'); // El botón "Eliminar"
    const closeModalBtn = document.querySelector('.close-modal');
    const cancelDeleteRoomBtn = document.getElementById('cancelDeleteRoom');
    const deleteRoomButton = document.getElementById('deleteRoomButton');
    const selectRoom = document.getElementById('deleteRoom');

    // Función para cerrar el modal
    function closeModal() {
        deleteRoomModal.style.display = 'none';
        selectRoom.selectedIndex = 0; // Deseleccionar cualquier opción
    }

    closeModalBtn.addEventListener('click', closeModal);
    cancelDeleteRoomBtn.addEventListener('click', closeModal);

    // Función para abrir el modal de eliminación
    openDeleteRoomModalBtn.addEventListener('click', function () {
        fetchRooms().then(() => {
            deleteRoomModal.style.display = 'block';
        });
    });

    // Función para eliminar un cuarto seleccionado
    deleteRoomButton.addEventListener('click', function () {
        const selectedRoomId = selectRoom.value;

        if (selectedRoomId) {
            // Realizar la solicitud de eliminación
            fetch(`php/delete_room.php?id_cuarto=${selectedRoomId}`, { method: 'POST' })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Cuarto Eliminado',
                            text: 'El cuarto ha sido eliminado exitosamente.',
                            confirmButtonText: 'Aceptar'
                        });                        
                        // Cerrar el modal y resetear el dropdown
                        closeModal();
                    } else {
                        console.error('Error al eliminar el cuarto:', data.error);
                    }
                })
                .catch(error => console.error('Error en la solicitud:', error));
        } else {
            console.error('No se ha seleccionado ningún cuarto para eliminar');
        }
    });

    // Verificar si el usuario está autenticado antes de obtener los cuartos
    fetch('php/check_session.php')
        .then(response => response.json())
        .then(data => {
            if (data.isLoggedIn) {
                // Si el usuario está autenticado, obtener los cuartos
                fetchRooms();
            } else {
                console.log('Usuario no autenticado. No se cargarán los cuartos.');
            }
        })
        .catch(error => console.error('Error al verificar la sesión:', error));

    function fetchRooms() {
        return fetch('php/get_all_user_rooms.php')
            .then(response => response.json())
            .then(data => {
                selectRoom.innerHTML = '<option value="" selected disabled>Selecciona un cuarto</option>'; // Resetear el dropdown
                if (data.error) {
                    console.error('Error del servidor:', data.error);
                } else if (data.length === 0) {
                    console.error('No hay cuartos publicados');
                } else {
                    data.forEach(room => {
                        const option = document.createElement('option');
                        option.value = room.id_cuarto;
                        option.textContent = room.titulo;
                        selectRoom.appendChild(option);
                    });
                }
            })
            .catch(error => console.error('Error en la solicitud:', error));
    }
});