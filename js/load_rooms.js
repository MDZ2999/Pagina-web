document.addEventListener('DOMContentLoaded', function() {
    let currentPage = 1;
    const itemsPerPage = 4;
    const roomsSection = document.getElementById('roomsSection');
    let totalPages = 0;

    async function fetchRooms() {
        try {
            const response = await fetch('php/get_user_rooms.php');
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
        roomsSection.innerHTML = '';
        totalPages = Math.ceil(rooms.length / itemsPerPage);

        rooms.forEach((room, index) => {
            const roomElement = document.createElement('div');
            roomElement.className = 'room';
            roomElement.innerHTML = `
                <div class="carousel-container">
                    <button class="carousel-btn prev-btn">&lt;</button>
                    <img src="data:image/jpeg;base64,${room.imagen}" alt="Room ${index + 1}" class="room-image">
                    <button class="carousel-btn next-btn">&gt;</button>
                    <div class="carousel-dots">
                        <span class="dot active"></span>
                    </div>
                </div>
                <div class="room-details">
                    <h4>${room.titulo}</h4>
                    <p>Servicios: ${room.servicios}</p>
                    <p>Disponibilidad: ${room.disponibilidad == 1 ? 'Sí' : 'No'}</p>
                </div>
            `;
            roomsSection.appendChild(roomElement);

            setupCarousel(roomElement, room);
        });

        showPage(currentPage);
    }

    const imageModal = document.getElementById('imageModalCarrusel');
    const modalImage = document.getElementById('modalImage');
    const imageModalClose = document.querySelector('.imageModalCarruselClose');

    let prevModalBtn, nextModalBtn, modalDots;
    let currentImageIndex = 0;
    let currentImages = [];

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

        showModalImage(currentImageIndex);

        if (prevModalBtn && nextModalBtn && modalDots) {
            prevModalBtn.addEventListener('click', prevImage);
            nextModalBtn.addEventListener('click', nextImage);
            modalDots.forEach((dot, index) => {
                dot.addEventListener('click', () => {
                    showModalImage(index);
                    currentImageIndex = index;
                });
            });
        }
    }

    function prevImage() {
        currentImageIndex = (currentImageIndex > 0) ? currentImageIndex - 1 : currentImages.length - 1;
        showModalImage(currentImageIndex);
    }

    function nextImage() {
        currentImageIndex = (currentImageIndex < currentImages.length - 1) ? currentImageIndex + 1 : 0;
        showModalImage(currentImageIndex);
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

    function setupCarousel(roomElement, room) {
        const imageContainer = roomElement.querySelector('.carousel-container');
        imageContainer.addEventListener('click', () => {
            openImageModal(room);
        });

        const detailsContainer = roomElement.querySelector('.room-details');
            detailsContainer.addEventListener('click', () => {
            showSection(detalles); 
        });
    }

    function showSection(targetId) {
        const targetSection = document.getElementById(targetId);
        document.querySelectorAll('.section').forEach(section => {
            section.style.display = 'none';
        });
        targetSection.style.display = 'block';
        sessionStorage.setItem('activeSectionId', targetId);
        updateActiveLink(targetId);
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