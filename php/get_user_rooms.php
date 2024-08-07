<?php
session_start();
require_once 'conection.php';

if (!isset($_SESSION['user_id'])) {
    echo json_encode(["error" => "Usuario no autenticado."]);
    exit;
}

$id_usuario = $_SESSION['user_id'];

// Consulta para obtener los cuartos del usuario incluyendo imagen2, imagen3 e imagen4
$sql = "SELECT titulo, servicios, disponibilidad, imagen, imagen2, imagen3, imagen4 FROM cuartos WHERE id_usuario = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $id_usuario);
$stmt->execute();
$result = $stmt->get_result();

$rooms = [];

while ($row = $result->fetch_assoc()) {
    $row['imagen'] = base64_encode($row['imagen']);
    $row['imagen2'] = base64_encode($row['imagen2']);
    $row['imagen3'] = base64_encode($row['imagen3']);
    $row['imagen4'] = base64_encode($row['imagen4']);
    $rooms[] = $row;
}

echo json_encode($rooms);

$stmt->close();
$conn->close();
?>