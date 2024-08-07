<?php
require_once 'conection.php';

// Consulta para obtener todos los datos de los cuartos donde la disponibilidad es 1, ordenados alfabéticamente por título
$sql = "SELECT titulo, servicios, disponibilidad, imagen FROM cuartos WHERE disponibilidad = 1 ORDER BY titulo ASC";
$result = $conn->query($sql);

$rooms = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $rooms[] = [
            'titulo' => $row['titulo'],
            'servicios' => $row['servicios'],
            'disponibilidad' => $row['disponibilidad'],
            'imagen' => base64_encode($row['imagen'])
        ];
    }
}

echo json_encode($rooms);
$conn->close();
?>