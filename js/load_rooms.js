document.addEventListener('DOMContentLoaded', function() {
    let currentPage = 1;
    const itemsPerPage = 4;
    const roomsSection = document.getElementById('roomsSection');
    let totalPages = 0;

    function fetchRooms() {
        fetch('php/get_user_rooms.php')
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    console.error(data.error);
                } else {
                    displayRooms(data);
                }
            })
            .catch(error => console.error('Error:', error));
    }

    function displayRooms(rooms) {
        roomsSection.innerHTML = '';
        totalPages = Math.ceil(rooms.length / itemsPerPage);
        
        rooms.forEach((room, index) => {
            const roomElement = document.createElement('div');
            roomElement.className = 'room';
            roomElement.innerHTML = `
                <img src="data:image/jpeg;base64,${room.imagen}" alt="Room ${index + 1}" class="room-image">
                <div class="room-details">
                    <h4>${room.titulo}</h4>
                    <p>Servicios: ${room.servicios}</p>
                    <p>Disponibilidad: ${room.disponibilidad == 1 ? 'Sí' : 'No'}</p>
                </div>
            `;
            roomsSection.appendChild(roomElement);
        });

        showPage(currentPage);
    }

    function showPage(page) {
        const rooms = document.querySelectorAll('.room');
        rooms.forEach((room, index) => {
            if (index >= (page - 1) * itemsPerPage && index < page * itemsPerPage) {
                room.style.display = 'flex';
            } else {
                room.style.display = 'none';
            }
        });

        document.querySelector('.room-left-button').disabled = page === 1;
        document.querySelector('.room-right-button').disabled = page === totalPages;
    }

    window.nextPage = function() {
        if (currentPage < totalPages) {
            currentPage++;
            showPage(currentPage);
        }
    }

    window.previousPage = function() {
        if (currentPage > 1) {
            currentPage--;
            showPage(currentPage);
        }
    }

    fetchRooms();
});