<?php
session_start();
require_once 'conection.php';

if (!isset($_SESSION['user_id'])) {
    echo "Error: Usuario no autenticado.";
    exit;
}

$id_usuario = $_SESSION['user_id'];

// Verificar que todos los campos necesarios estén presentes en la solicitud
if (
    isset($_POST['nombres']) && !empty($_POST['nombres']) &&
    isset($_POST['apellidoP']) && !empty($_POST['apellidoP']) &&
    isset($_POST['apellidoM']) && !empty($_POST['apellidoM']) &&
    isset($_POST['telefono']) && !empty($_POST['telefono'])
) {
    $nombres = $_POST['nombres'];
    $apellidoP = $_POST['apellidoP'];
    $apellidoM = $_POST['apellidoM'];
    $telefono = $_POST['telefono'];

    // Actualizar la información del usuario en la base de datos
    $sql = "UPDATE info_usuarios SET nombres = ?, apellidoP = ?, apellidoM = ?, telefono = ? WHERE id_usuario = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssssi", $nombres, $apellidoP, $apellidoM, $telefono, $id_usuario);

    if ($stmt->execute()) {
        echo "Información actualizada exitosamente";
    } else {
        echo "Error: " . $stmt->error;
    }

    $stmt->close();
    $conn->close();
} else {
    echo "Error: Faltan campos obligatorios.";
}
?>