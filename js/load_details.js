document.addEventListener('DOMContentLoaded', function () {
    // Inicializar los contenedores del carrusel y puntos una sola vez
    const carruselContainer = document.querySelector('.detallescarrusel');
    const dotsContainer = document.querySelector('.detalles-dots');

    if (!carruselContainer || !dotsContainer) {
        console.error('Contenedores del carrusel o dots no encontrados.');
        return;
    }

    window.loadRoomDetails = function (id_cuarto, id_usuario) {
        // Almacenar los IDs antes de mostrar la sección
        localStorage.setItem('currentCuartoId', id_cuarto);
        localStorage.setItem('currentUsuarioId', id_usuario);
        $.ajax({
            url: 'php/check_session.php',
            dataType: 'json',
            success: function (response) {
                if (response.isLoggedIn) {
                    showSection('detalles');
                    showDetails(id_cuarto, id_usuario);
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

    // Verificar si hay IDs almacenados en localStorage
    const storedCuartoId = localStorage.getItem('currentCuartoId');
    const storedUsuarioId = localStorage.getItem('currentUsuarioId');

    if (storedCuartoId && storedUsuarioId) {
        // Cargar los detalles del cuarto almacenado
        loadRoomDetails(storedCuartoId, storedUsuarioId);
    }

    function showDetails(id_cuarto, id_usuario) {
        console.log('ID del cuarto:', id_cuarto);
        console.log('ID del usuario:', id_usuario);

        fetch(`php/get_details.php?id_cuarto=${id_cuarto}&id_usuario=${id_usuario}`)
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    console.error(data.error);
                } else {
                    // Mostrar el avatar si existe
                    if (data.usuario && data.usuario.imagen) {
                        document.querySelector('.detallesavatar').src = 'data:image/jpeg;base64,' + data.usuario.imagen;
                    } else {
                        document.querySelector('.detallesavatar').src = 'img/avatar.png'; // Imagen por defecto
                    }

                    // Actualizar la información del cuarto
                    document.getElementById('detallesTitulo').textContent = data.cuarto.titulo;
                    document.getElementById('detallesDescripcion').textContent = data.cuarto.descripcion;
                    document.getElementById('detallesServicios').textContent = data.cuarto.servicios;
                    document.getElementById('detallesPrecio').textContent = data.cuarto.precio;
                    document.getElementById('detallesDireccion').textContent = data.cuarto.direccion;

                    // Limpiar el carrusel y los puntos antes de crear nuevo contenido
                    carruselContainer.innerHTML = `
                        <button class="detallescarousel-btn detalles-prev-btn">&lt;</button>
                        <button class="detallescarousel-btn detalles-next-btn">&gt;</button>
                    `;
                    dotsContainer.innerHTML = '';

                    const images = [];
                    if (data.cuarto.imagen) images.push(data.cuarto.imagen);
                    if (data.cuarto.imagen2) images.push(data.cuarto.imagen2);
                    if (data.cuarto.imagen3) images.push(data.cuarto.imagen3);
                    if (data.cuarto.imagen4) images.push(data.cuarto.imagen4);

                    if (images.length === 0) {
                        console.warn('No hay imágenes disponibles para mostrar en el carrusel.');
                        return;
                    }

                    images.forEach((image, index) => {
                        // Crear el elemento de imagen
                        const imgElement = document.createElement('img');
                        imgElement.src = `data:image/jpeg;base64,${image}`;
                        imgElement.classList.add('detallesimg');
                        imgElement.style.display = index === 0 ? 'block' : 'none';
                        carruselContainer.insertBefore(imgElement, carruselContainer.querySelector('.detalles-next-btn'));

                        // Crear el punto correspondiente
                        const dotElement = document.createElement('span');
                        dotElement.classList.add('detalles-dot');
                        if (index === 0) dotElement.classList.add('active');
                        dotsContainer.appendChild(dotElement);
                    });

                    // Crear botones de navegación solo si hay más de una imagen
                    if (images.length > 1) {
                        const prevBtn = carruselContainer.querySelector('.detalles-prev-btn');
                        const nextBtn = carruselContainer.querySelector('.detalles-next-btn');
                        let currentIndex = 0;

                        function showImage(index) {
                            carruselContainer.querySelectorAll('.detallesimg').forEach((img, i) => {
                                img.style.display = i === index ? 'block' : 'none';
                            });
                            dotsContainer.querySelectorAll('.detalles-dot').forEach((dot, i) => {
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

                        dotsContainer.querySelectorAll('.detalles-dot').forEach((dot, index) => {
                            dot.addEventListener('click', () => {
                                showImage(index);
                                currentIndex = index;
                            });
                        });

                        // Mostrar la primera imagen por defecto
                        showImage(0);
                    } else {
                        // Si solo hay una imagen, esconder los botones de navegación
                        carruselContainer.querySelector('.detalles-prev-btn').style.display = 'none';
                        carruselContainer.querySelector('.detalles-next-btn').style.display = 'none';
                        
                        // Mostrar la única imagen disponible
                        carruselContainer.querySelector('.detallesimg').style.display = 'block';
                    }
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    function showSection(targetId) {
        // Verifica si se está saliendo de la sección "detalles"
        const currentActiveSection = document.querySelector('.section[style="display: block;"]');
        if (currentActiveSection && currentActiveSection.id === 'detalles' && targetId !== 'detalles') {
            // Limpiar el localStorage cuando se sale de "detalles"
            localStorage.removeItem('currentCuartoId');
            localStorage.removeItem('currentUsuarioId');
            // Forzar la recarga de la página si se sale de "detalles"
            location.reload(true); // true para recarga forzada (similar a Ctrl+F5)
            return;
        }

        document.querySelectorAll('.section').forEach(section => {
            section.style.display = 'none';
        });

        const targetSection = document.getElementById(targetId);
        targetSection.style.display = 'block';
        sessionStorage.setItem('activeSectionId', targetId);
        updateActiveLink(targetId);
    }

    function updateActiveLink(targetId) {
        const links = document.querySelectorAll('.nav-links li a');
        links.forEach(link => {
            link.classList.remove('active');
            
            // Si la sección activa es 'detalles', activar 'perfil'
            if (targetId === 'detalles' && link.getAttribute('data-section') === 'perfil') {
                link.classList.add('active');
            }
            // Activar el enlace normalmente para las demás secciones
            else if (link.getAttribute('data-section') === targetId) {
                link.classList.add('active');
            }
        });
    }    

    // Limpiar el localStorage cuando se cierra la página, excepto si se está en "detalles"
    window.addEventListener('beforeunload', function () {
        const activeSection = sessionStorage.getItem('activeSectionId');
        if (activeSection !== 'detalles') {
            localStorage.removeItem('currentCuartoId');
            localStorage.removeItem('currentUsuarioId');
        }
    });
});