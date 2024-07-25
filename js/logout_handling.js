document.addEventListener('DOMContentLoaded', function() {
    const logoutButton = document.getElementById('logoutButton'); // Asegúrate de que el botón de cierre de sesión tenga este ID

    logoutButton.addEventListener('click', function() {
        $.ajax({
            type: 'POST',
            url: 'php/logout.php', // Asegúrate de que la ruta sea correcta
            success: function() {
                // Limpia el estado de autenticación local
                localStorage.removeItem('isLoggedIn');
                sessionStorage.removeItem('activeSectionId');

                // Redirige al usuario al inicio o página de login
                window.location.href = 'index.html';
            },
            error: function() {
                alert('Error al cerrar sesión. Por favor, inténtalo de nuevo.');
            }
        });
    });
});