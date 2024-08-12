<?php
require_once 'conection.php';

// Consulta para obtener todos los datos de los cuartos donde la disponibilidad es 1, ordenados alfabéticamente por título
$sql = "SELECT id_cuarto, id_usuario, titulo, servicios, disponibilidad, precio, imagen, imagen2, imagen3, imagen4 FROM cuartos WHERE disponibilidad = 1 ORDER BY titulo ASC";
$result = $conn->query($sql);

$rooms = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $rooms[] = [
            'titulo' => $row['titulo'],
            'servicios' => $row['servicios'],
            'disponibilidad' => $row['disponibilidad'],
            'precio' => $row['precio'],
            'imagen' => base64_encode($row['imagen']),
            'imagen2' => base64_encode($row['imagen2']),
            'imagen3' => base64_encode($row['imagen3']),
            'imagen4' => base64_encode($row['imagen4']),
            'id_cuarto' => $row['id_cuarto'],
            'id_usuario' => $row['id_usuario'], 
        ];
    }
}

echo json_encode($rooms);
$conn->close();
?>