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
                <div class="carousel-container">
                    <button class="carousel-btn prev-btn">&lt;</button>
                    <img src="data:image/jpeg;base64,${room.imagen}" alt="Room ${index + 1}" class="room-image">
                    ${room.imagen2 ? `<img src="data:image/jpeg;base64,${room.imagen2}" alt="Room ${index + 1}" class="room-image" style="display: none;">` : ''}
                    ${room.imagen3 ? `<img src="data:image/jpeg;base64,${room.imagen3}" alt="Room ${index + 1}" class="room-image" style="display: none;">` : ''}
                    ${room.imagen4 ? `<img src="data:image/jpeg;base64,${room.imagen4}" alt="Room ${index + 1}" class="room-image" style="display: none;">` : ''}
                    <button class="carousel-btn next-btn">&gt;</button>
                    <div class="carousel-dots">
                        <span class="dot active"></span>
                        ${room.imagen2 ? '<span class="dot"></span>' : ''}
                        ${room.imagen3 ? '<span class="dot"></span>' : ''}
                        ${room.imagen4 ? '<span class="dot"></span>' : ''}
                    </div>
                </div>
                <div class="room-details">
                    <h4>${room.titulo}</h4>
                    <p>Servicios: ${room.servicios}</p>
                    <p>Disponibilidad: ${room.disponibilidad == 1 ? 'Sí' : 'No'}</p>
                </div>
            `;
            roomsSection.appendChild(roomElement);

            // Añadir eventos de click para el carrusel
            setupCarousel(roomElement);
        });

        showPage(currentPage);
    }

    // Carrusel
    const imageModal = document.getElementById('imageModalCarrusel');
    const modalImage = document.getElementById('modalImage');
    const imageModalClose = document.querySelector('.imageModalCarruselClose');
    
    let prevModalBtn, nextModalBtn, modalDots;
    let currentImageIndex = 0;
    let currentImages = [];

    function showModalImage(index) {
        if (modalImage && modalDots) {
            modalImage.src = currentImages[index].src;
            modalDots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
        }
    }

    function openImageModal(images, index) {
        currentImages = images;
        currentImageIndex = index;
        imageModal.style.display = 'block';
        document.body.classList.add('no-scroll');

        // Inicializar los botones y puntos del modal después de abrirlo
        prevModalBtn = document.querySelector('#imageModalCarrusel .prev-btn');
        nextModalBtn = document.querySelector('#imageModalCarrusel .next-btn');
        modalDots = document.querySelectorAll('#imageModalCarrusel .dot');

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

    // Cerrar el modal al hacer clic en cualquier área fuera del contenido del modal
    window.onclick = function(event) {
        if (event.target === imageModal) {
            imageModal.style.display = 'none';
            document.body.classList.remove('no-scroll');
        }
    };

    function setupCarousel(roomElement) {
        const images = roomElement.querySelectorAll('.room-image');
        const prevBtn = roomElement.querySelector('.prev-btn');
        const nextBtn = roomElement.querySelector('.next-btn');
        const dots = roomElement.querySelectorAll('.dot');
        let currentIndex = 0;

        function showImage(index) {
            images.forEach((img, i) => {
                img.style.display = (i === index) ? 'block' : 'none';
            });
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
        }

        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex > 0) ? currentIndex - 1 : images.length - 1;
            showImage(currentIndex);
        });

        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex < images.length - 1) ? currentIndex + 1 : 0;
            showImage(currentIndex);
        });

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                showImage(index);
                currentIndex = index;
            });
        });

        // Hacer clic en la imagen para abrir el modal
        images.forEach((img, index) => {
            img.addEventListener('click', () => {
                openImageModal(images, index);
            });
        });

        // Mostrar la primera imagen inicialmente
        showImage(0);
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