<?php
session_start();
require_once 'conection.php';
header('Content-Type: application/json');

$id = $_GET['id'];

// Consulta para obtener los detalles del cuarto
$sql = "SELECT titulo, descripcion, servicios, precio, disponibilidad, direccion, imagen FROM cuartos WHERE id_cuarto = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $id);
$stmt->execute();
$stmt->bind_result($titulo, $descripcion, $servicios, $precio, $disponibilidad, $direccion, $imagen);

$room = array();

if ($stmt->fetch()) {
    $room = array(
        "titulo" => $titulo,
        "descripcion" => $descripcion,
        "servicios" => $servicios,
        "precio" => $precio,
        "disponibilidad" => $disponibilidad,
        "direccion" => $direccion,
        "imagen" => base64_encode($imagen)
    );
} else {
    echo json_encode(array("error" => "No se encontró el cuarto."));
    $stmt->close();
    $conn->close();
    exit();
}

echo json_encode($room);
$stmt->close();
$conn->close();
?>