function loadRoomDetails(id_cuarto) {
    $.ajax({
        url: 'php/check_session.php',
        dataType: 'json',
        success: function(response) {
            if (response.isLoggedIn) {
                $.ajax({
                    url: `php/get_details.php?id_cuarto=${id_cuarto}`,
                    dataType: 'json',
                    success: function(data) {
                        console.log("Respuesta del servidor:", data);
                        if (data.error) {
                            console.log("Error recibido:", data.error);
                        } else {
                            // Actualizar la imagen del avatar del propietario del cuarto
                            const avatarElement = document.querySelector('.detallesavatar');
                            avatarElement.src = `data:image/jpeg;base64,${data.propietario.imagen}`;
                    
                            // Obtener los elementos del carrusel de imágenes
                            const imageElements = document.querySelectorAll('.detallesimg');
                            const dots = document.querySelectorAll('.detalles-dot');
                            let activeIndex = 0;
                    
                            // Resetear imágenes y dots
                            imageElements.forEach((img, index) => {
                                img.style.display = 'none';
                                dots[index].style.display = 'none';
                            });
                    
                            // Configurar las imágenes disponibles en el carrusel
                            ['imagen', 'imagen2', 'imagen3', 'imagen4'].forEach((field, index) => {
                                if (data.cuarto[field]) {
                                    imageElements[index].src = `data:image/jpeg;base64,${data.cuarto[field]}`;
                                    imageElements[index].style.display = 'block';
                                    dots[index].style.display = 'inline-block';
                    
                                    if (index === 0) {
                                        imageElements[index].style.display = 'block';
                                        dots[index].classList.add('active');
                                    } else {
                                        imageElements[index].style.display = 'none';
                                        dots[index].classList.remove('active');
                                    }
                                }
                            });
                    
                            // Mostrar la primera imagen y activar el primer dot por defecto
                            imageElements[0].style.display = 'block';
                            dots[0].classList.add('active');
                    
                            // Actualizar los detalles del cuarto
                            document.querySelector('.detalles-info').innerHTML = `
                                <p>Descripcion: ${data.cuarto.descripcion}</p>
                                <p>Servicios: ${data.cuarto.servicios}</p>
                                <p>Precio: ${data.cuarto.precio}</p>
                                <p>Direccion: ${data.cuarto.direccion}</p>
                            `;
                    
                            // Mostrar la sección de detalles
                            showSection('detalles');
                        }
                    },                    
                    error: function(xhr, status, error) {
                        console.error('No se pudo cargar la información del cuarto');
                        console.error('Estado:', status);
                        console.error('Error:', error);
                        console.error('Respuesta del servidor:', xhr.responseText);
                    }
                });
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

// Manejo del carrusel en la sección de detalles
document.addEventListener('DOMContentLoaded', function() {
    const prevBtn = document.querySelector('.detalles-prev-btn');
    const nextBtn = document.querySelector('.detalles-next-btn');
    const images = document.querySelectorAll('.detallesimg');
    const dots = document.querySelectorAll('.detalles-dot');
    let currentIndex = 0;

    function showImage(index) {
        images.forEach((img, i) => {
            img.style.display = (i === index) ? 'block' : 'none';
            dots[i].classList.toggle('active', i === index);
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

    // Mostrar la primera imagen al cargar
    showImage(0);
});

function showSection(targetId) {
    const targetSection = document.getElementById(targetId);
    document.querySelectorAll('.section').forEach(section => {
        section.style.display = 'none';
    });
    targetSection.style.display = 'block';
    sessionStorage.setItem('activeSectionId', targetId);
    updateActiveLink(targetId);
}