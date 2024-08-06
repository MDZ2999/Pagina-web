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
$updateFields = "titulo = ?, descripcion = ?, servicios = ?, precio = ?, disponibilidad = ?, direccion = ?";
$params = [$titulo, $descripcion, $servicios, $precio, $disponibilidad, $direccion];

if (isset($_FILES['imagen']) && $_FILES['imagen']['error'] == 0) {
    $imagen = file_get_contents($_FILES['imagen']['tmp_name']);
    $updateFields .= ", imagen = ?";
    $params[] = $imagen;
}
if (isset($_FILES['imagen2']) && $_FILES['imagen2']['error'] == 0) {
    $imagen2 = file_get_contents($_FILES['imagen2']['tmp_name']);
    $updateFields .= ", imagen2 = ?";
    $params[] = $imagen2;
}
if (isset($_FILES['imagen3']) && $_FILES['imagen3']['error'] == 0) {
    $imagen3 = file_get_contents($_FILES['imagen3']['tmp_name']);
    $updateFields .= ", imagen3 = ?";
    $params[] = $imagen3;
}
if (isset($_FILES['imagen4']) && $_FILES['imagen4']['error'] == 0) {
    $imagen4 = file_get_contents($_FILES['imagen4']['tmp_name']);
    $updateFields .= ", imagen4 = ?";
    $params[] = $imagen4;
}
$params[] = $id;

$sql = "UPDATE cuartos SET $updateFields WHERE id_cuarto = ?";
$stmt = $conn->prepare($sql);

$types = str_repeat('s', count($params) - 1) . 'i';
$stmt->bind_param($types, ...$params);

if ($stmt->execute()) {
    echo json_encode(array("success" => true));
} else {
    echo json_encode(array("error" => "Error al actualizar el cuarto."));
}

$stmt->close();
$conn->close();
?>