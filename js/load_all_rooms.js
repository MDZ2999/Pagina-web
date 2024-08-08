document.addEventListener('DOMContentLoaded', function() {
    const roomsGrid = document.querySelector('.rooms-gridI');
    const imageModal = document.getElementById('imageModalCarrusel');
    const modalImage = document.getElementById('modalImage');
    const imageModalClose = document.querySelector('.imageModalCarruselClose');
    
    let prevModalBtn, nextModalBtn, modalDots;
    let currentImageIndex = 0;
    let currentImages = [];

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
                        ${room.imagen2 ? `<img src="data:image/jpeg;base64,${room.imagen2}" alt="Room ${index + 1}" class="roomI-image" style="display: none;">` : ''}
                        ${room.imagen3 ? `<img src="data:image/jpeg;base64,${room.imagen3}" alt="Room ${index + 1}" class="roomI-image" style="display: none;">` : ''}
                        ${room.imagen4 ? `<img src="data:image/jpeg;base64,${room.imagen4}" alt="Room ${index + 1}" class="roomI-image" style="display: none;">` : ''}
                        <button class="carousel-btnI next-btnI">&gt;</button>
                        <div class="carousel-dotsI">
                            <span class="dotI active"></span>
                            ${room.imagen2 ? '<span class="dotI"></span>' : ''}
                            ${room.imagen3 ? '<span class="dotI"></span>' : ''}
                            ${room.imagen4 ? '<span class="dotI"></span>' : ''}
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

            // Añadir eventos de click para el carrusel y los detalles
            setupCarousel(roomElement, room);
        });
    }

    function setupCarousel(roomElement, room) {
        const images = roomElement.querySelectorAll('.roomI-image');
        const prevBtn = roomElement.querySelector('.prev-btnI');
        const nextBtn = roomElement.querySelector('.next-btnI');
        const dots = roomElement.querySelectorAll('.dotI');
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

        // Añadir evento para los detalles del cuarto
        const detailsContainer = roomElement.querySelector('.room-details-containerI');
        detailsContainer.addEventListener('click', () => {
            checkLoginAndShowSection('nombreDeLaSeccion'); // Cambia 'nombreDeLaSeccion' por el ID de la sección correspondiente
        });
    }

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
        const dotsContainer = document.getElementById('carouselDotsContainer');
        dotsContainer.innerHTML = '';
        images.forEach((img, i) => {
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

    function checkLoginAndShowSection(sectionId) {
        $.ajax({
            url: 'php/check_session.php',
            dataType: 'json',
            success: function(response) {
                if (response.isLoggedIn) {
                    showSection(sectionId);
                } else {
                    Swal.fire({
                        title: 'Acceso Restringido',
                        text: 'Por favor, inicia sesión para acceder a esta sección.',
                        icon: 'warning',
                        confirmButtonText: 'Iniciar Sesión',
                        preConfirm: () => {
                            window.location.href = 'login-register.html';
                        }
                    });
                }
            }
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

    fetchRooms();
});