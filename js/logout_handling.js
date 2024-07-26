document.addEventListener('DOMContentLoaded', function() {
    const logoutButton = document.getElementById('logoutButton');

    logoutButton.addEventListener('click', function(event) {
        event.preventDefault();
        $.ajax({
            type: 'POST',
            url: 'php/logout.php',
            success: function() {
                localStorage.removeItem('isLoggedIn');
                sessionStorage.clear();
                window.location.href = 'index.html';
            },
            error: function() {
                alert('Error al cerrar sesión. Por favor, inténtalo de nuevo.');
            }
        });
    });
});