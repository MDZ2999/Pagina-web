<?php
session_start();
require_once 'conection.php';

if (!isset($_SESSION['user_id'])) {
    echo json_encode(["error" => "Usuario no autenticado."]);
    exit;
}

$id_usuario = $_SESSION['user_id'];

// Consulta para obtener los datos del usuario
$sql = "SELECT nombres, apellidoP, apellidoM, telefono, correo, whatsapp FROM info_usuarios WHERE id_usuario = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $id_usuario);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $nombreCompleto = $row['nombres'] . ' ' . $row['apellidoP'] . ' ' . $row['apellidoM'];
    $telefono = $row['telefono'];
    $correo = $row['correo'];
    $whatsapp = $row['whatsapp'];

    echo json_encode([
        "nombreCompleto" => $nombreCompleto,
        "telefono" => $telefono,
        "correo" => $correo,
        "whatsapp" => $whatsapp
    ]);
} else {
    echo json_encode(["error" => "No se encontraron datos del usuario."]);
}

$stmt->close();
$conn->close();
?>