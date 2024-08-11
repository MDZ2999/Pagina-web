document.addEventListener('DOMContentLoaded', function() {
    const roomsGrid = document.querySelector('.rooms-gridI');
    const imageModal = document.getElementById('imageModalCarrusel');
    const modalImage = document.getElementById('modalImage');
    const imageModalClose = document.querySelector('.imageModalCarruselClose');
    const searchForm = document.getElementById('searchForm');
    
    let prevModalBtn, nextModalBtn, modalDots;
    let currentImageIndex = 0;
    let currentImages = [];

    async function fetchRooms(query = '') {
        const url = query ? `php/search.php?cuarto=${query}` : 'php/get_all_rooms.php';
        try {
            const response = await fetch(url);
            const data = await response.json();
            if (data.error) {
                console.error(data.error);
            } else {
                displayRooms(data);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }    

    function displayRooms(rooms) {
        roomsGrid.innerHTML = '';
        const fragment = document.createDocumentFragment();
        
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
                        </div>
                    </div>
                </div>
                <div class="room-details-containerI">
                    <h4>${room.titulo}</h4>
                    <p>Servicios: ${room.servicios}</p>
                    <p>Disponibilidad: ${room.disponibilidad == 1 ? 'Sí' : 'No'}</p>
                    <p hidden>ID Cuarto: ${room.id_cuarto}</p>
                    <p hidden>ID Usuario: ${room.id_usuario}</p>
                </div>
            `;
            fragment.appendChild(roomElement);

            setupCarousel(roomElement, room);
        });

        roomsGrid.appendChild(fragment);
    }

    function setupCarousel(roomElement, room) {
        const imageContainer = roomElement.querySelector('.room-image-containerI');

        imageContainer.addEventListener('click', () => {
            openImageModal(room);
        });

        const detailsContainer = roomElement.querySelector('.room-details-containerI');
        detailsContainer.addEventListener('click', () => {
            console.log('ID del cuarto:', room.id_cuarto);
            console.log('ID del usuario:', room.id_usuario);
            loadRoomDetails(room.id_cuarto, room.id_usuario);
        });
    }

    function showModalImage(index) {
        if (modalImage && modalDots) {
            modalImage.src = currentImages[index];
            modalDots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
        }
    }

    function openImageModal(room) {
        currentImages = [
            `data:image/jpeg;base64,${room.imagen}`,
            room.imagen2 ? `data:image/jpeg;base64,${room.imagen2}` : null,
            room.imagen3 ? `data:image/jpeg;base64,${room.imagen3}` : null,
            room.imagen4 ? `data:image/jpeg;base64,${room.imagen4}` : null
        ].filter(Boolean);

        currentImageIndex = 0;
        imageModal.style.display = 'block';
        document.body.classList.add('no-scroll');

        // Inicializar los botones y puntos del modal después de abrirlo
        prevModalBtn = document.querySelector('#imageModalCarrusel .prev-btn');
        nextModalBtn = document.querySelector('#imageModalCarrusel .next-btn');
        const dotsContainer = document.getElementById('carouselDotsContainer');
        dotsContainer.innerHTML = '';
        currentImages.forEach((img, i) => {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            if (i === 0) dot.classList.add('active');
            dotsContainer.appendChild(dot);
        });
        modalDots = dotsContainer.querySelectorAll('.dot');

        // Asegurarse de que los puntos se inicialicen antes de llamar a showModalImage
        showModalImage(currentImageIndex);

        if (prevModalBtn && nextModalBtn && modalDots) {
            prevModalBtn.addEventListener('click', () => {
                currentImageIndex = (currentImageIndex > 0) ? currentImageIndex - 1 : currentImages.length - 1;
                showModalImage(currentImageIndex);
            });

            nextModalBtn.addEventListener('click', () => {
                currentImageIndex = (currentImageIndex < currentImages.length - 1) ? currentImageIndex + 1 : 0;
                showModalImage(currentImageIndex);
            });

            modalDots.forEach((dot, index) => {
                dot.addEventListener('click', () => {
                    showModalImage(index);
                    currentImageIndex = index;
                });
            });
        }
    }

    imageModalClose.onclick = function() {
        imageModal.style.display = 'none';
        document.body.classList.remove('no-scroll');
    };

    window.onclick = function(event) {
        if (event.target === imageModal) {
            imageModal.style.display = 'none';
            document.body.classList.remove('no-scroll');
        }
    };

    searchForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const searchQuery = document.querySelector('#searchInput').value;
        fetchRooms(searchQuery);
    });

    fetchRooms();
});