<?php
session_start();
require_once 'conection.php';

if (!isset($_SESSION['user_id'])) {
    echo json_encode(["error" => "Usuario no autenticado."]);
    exit;
}

$id_usuario = $_SESSION['user_id'];

// Consulta para obtener las imágenes
$sql = "SELECT imagen, banner FROM info_usuarios WHERE id_usuario = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $id_usuario);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $imagen = $row['imagen'] ? base64_encode($row['imagen']) : null;
    $banner = $row['banner'] ? base64_encode($row['banner']) : null;

    echo json_encode([
        "imagen" => $imagen,
        "banner" => $banner
    ]);
} else {
    echo json_encode(["error" => "No se encontraron imágenes."]);
}

$stmt->close();
$conn->close();
?>