document.addEventListener('DOMContentLoaded', function() {
    const roomsGrid = document.querySelector('.rooms-gridI');

    function fetchRooms() {
        fetch('php/get_all_rooms.php')
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
        roomsGrid.innerHTML = '';
        
        rooms.forEach((room, index) => {
            const roomElement = document.createElement('div');
            roomElement.className = 'room-section-containerI';
            roomElement.innerHTML = `
                <div class="room-image-containerI">
                    <div class="carousel-containerI">
                        <button class="carousel-btnI prev-btnI">&lt;</button>
                        <img src="data:image/jpeg;base64,${room.imagen}" alt="Room ${index + 1}" class="roomI-image">
                        <button class="carousel-btnI next-btnI">&gt;</button>
                        <div class="carousel-dotsI">
                            <span class="dotI active"></span>
                            <span class="dotI"></span>
                            <span class="dotI"></span>
                        </div>
                    </div>
                </div>
                <div class="room-details-containerI">
                    <h4>${room.titulo}</h4>
                    <p>Servicios: ${room.servicios}</p>
                    <p>Disponibilidad: ${room.disponibilidad == 1 ? 'Sí' : 'No'}</p>
                </div>
            `;
            roomsGrid.appendChild(roomElement);
        });
    }

    fetchRooms();
});