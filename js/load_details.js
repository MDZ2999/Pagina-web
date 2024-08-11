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

                // Obtener y limpiar el carrusel existente
                const carruselContainer = document.querySelector('.detallescarrusel');
                const dotsContainer = document.querySelector('.detalles-dots');
                
                if (!carruselContainer || !dotsContainer) {
                    console.error('Contenedores del carrusel o dots no encontrados.');
                    return;
                }

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
                    const prevBtn = document.querySelector('.detalles-prev-btn');
                    const nextBtn = document.querySelector('.detalles-next-btn');
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
                }
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

document.addEventListener('DOMContentLoaded', function() {
    window.loadRoomDetails = function(id_cuarto, id_usuario) {
        $.ajax({
            url: 'php/check_session.php',
            dataType: 'json',
            success: function(response) {
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
});

function showSection(targetId) {
    const targetSection = document.getElementById(targetId);

    // Verifica si se está saliendo de la sección "detalles"
    const currentActiveSection = document.querySelector('.section[style="display: block;"]');
    if (currentActiveSection && currentActiveSection.id === 'detalles' && targetId !== 'detalles') {
        // Recarga la página si se está saliendo de "detalles"
        location.reload(true); // true para recarga forzada (similar a Ctrl+F5)
    }

    document.querySelectorAll('.section').forEach(section => {
        section.style.display = 'none';
    });

    targetSection.style.display = 'block';
    sessionStorage.setItem('activeSectionId', targetId);
    updateActiveLink(targetId);
}

function updateActiveLink(targetId) {
    const links = document.querySelectorAll('.nav-links li a');
    links.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-section') === targetId) {
            link.classList.add('active');
        }
    });
}