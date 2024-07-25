<?php
session_start();  // Iniciar o reanudar la sesión existente

// Destruir todas las variables de sesión.
// Esto limpia los datos de la sesión en el servidor.
$_SESSION = array();

// Si se desea destruir la sesión completamente, borra también la cookie de sesión.
// Esto es importante para asegurarse de que la sesión no pueda ser reanudada mediante una cookie vieja.
if (ini_get("session.use_cookies")) {
    $params = session_get_cookie_params();
    // Borra la cookie enviando una nueva con tiempo expirado.
    setcookie(session_name(), '', time() - 42000,
        $params["path"], $params["domain"],
        $params["secure"], $params["httponly"]
    );
}

// Finalmente, destruye la sesión.
session_destroy();

// Redireccionar al usuario a la página de inicio o de login
echo "<script>
localStorage.removeItem('isLoggedIn');  // Limpia el estado de autenticación en localStorage
sessionStorage.clear();  // Limpia toda la información guardada en sessionStorage
</script>";

exit();  // Termina la ejecución del script para evitar que se ejecute código adicional.
?>