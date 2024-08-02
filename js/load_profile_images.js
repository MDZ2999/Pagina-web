document.addEventListener('DOMContentLoaded', function() {
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
});