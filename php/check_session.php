<?php
session_start();
header('Content-Type: application/json');

// Verificar si el usuario está autenticado
if (isset($_SESSION['correo'])) {
    echo json_encode(['isLoggedIn' => true]);
} else {
    echo json_encode(['isLoggedIn' => false]);
}
?>