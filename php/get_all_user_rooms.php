<?php
session_start();
require_once 'conection.php';
header('Content-Type: application/json');

// Asegúrate de que el usuario esté autenticado y de que el ID del usuario esté en la sesión
if (!isset($_SESSION['user_id'])) {
    echo "Error: Usuario no autenticado.";
    exit;
}

$id_usuario = $_SESSION['user_id'];

// Consulta para obtener todos los cuartos del usuario actual
$sql = "SELECT id_cuarto, titulo FROM cuartos WHERE id_usuario = ? ORDER BY titulo ASC";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $id_usuario);
$stmt->execute();
$result = $stmt->get_result();

$rooms = array();

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $rooms[] = $row;
    }
} else {
    echo json_encode(array("error" => "No se encontraron cuartos."));
    $stmt->close();
    $conn->close();
    exit();
}

echo json_encode($rooms);
$stmt->close();
$conn->close();
?>