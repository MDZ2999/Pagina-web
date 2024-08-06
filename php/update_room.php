<?php
require_once 'conection.php';
header('Content-Type: application/json');

$id = $_POST['id'];
$titulo = $_POST['titulo'];
$descripcion = $_POST['descripcion'];
$servicios = $_POST['servicios'];
$precio = $_POST['precio'];
$disponibilidad = $_POST['disponibilidad'];
$direccion = $_POST['direccion'];

// Verificar si hay una nueva imagen
if (isset($_FILES['imagen']) && $_FILES['imagen']['error'] == 0) {
    $imagen = file_get_contents($_FILES['imagen']['tmp_name']);
    $sql = "UPDATE cuartos SET titulo = ?, descripcion = ?, servicios = ?, precio = ?, disponibilidad = ?, direccion = ?, imagen = ? WHERE id_cuarto = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssssibsi", $titulo, $descripcion, $servicios, $precio, $disponibilidad, $direccion, $imagen, $id);
} else {
    $sql = "UPDATE cuartos SET titulo = ?, descripcion = ?, servicios = ?, precio = ?, disponibilidad = ?, direccion = ? WHERE id_cuarto = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sssssii", $titulo, $descripcion, $servicios, $precio, $disponibilidad, $direccion, $id);
}

if ($stmt->execute()) {
    echo json_encode(array("success" => true));
} else {
    echo json_encode(array("error" => "Error al actualizar el cuarto."));
}

$stmt->close();
$conn->close();
?>