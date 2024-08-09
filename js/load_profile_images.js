document.addEventListener('DOMContentLoaded', function() {
    // Verificar si el usuario está autenticado
    fetch('php/check_session.php')
        .then(response => response.json())
        .then(data => {
            if (data.isLoggedIn) {
                // Si el usuario está autenticado, cargar las imágenes de perfil
                loadProfileImages();
            } else {
                console.log('El usuario no está autenticado, no se cargarán las imágenes de perfil.');
            }
        })
        .catch(error => console.error('Error al verificar la sesión:', error));
});

function loadProfileImages() {
    fetch('php/get_profile_images.php')
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                console.error(data.error);
            } else {
                // Mostrar el avatar
                if (data.imagen) {
                    document.querySelector('.headerP-content img').src = 'data:image/jpeg;base64,' + data.imagen;
                }

                // Mostrar el banner
                if (data.banner) {
                    document.querySelector('.headerP').style.backgroundImage = 'url(data:image/jpeg;base64,' + data.banner + ')';
                }
            }
        })
        .catch(error => console.error('Error:', error));
}