<?php
require_once 'conection.php';
header('Content-Type: application/json'); // Establece el encabezado para que el contenido devuelto sea JSON

// Verificar si se ha enviado el formulario de búsqueda
if ($_SERVER["REQUEST_METHOD"] == "GET" && isset($_GET['cuarto'])) {
    $titulo = htmlspecialchars($_GET['cuarto']);

    // Preparar y ejecutar la consulta de búsqueda
    $sql = "SELECT id_cuarto, id_usuario, titulo, descripcion, servicios, precio, disponibilidad, direccion, imagen, imagen2, imagen3, imagen4 FROM cuartos WHERE titulo LIKE ?";
    $stmt = $conn->prepare($sql);
    if ($stmt === false) {
        die('Error en la preparación de la consulta: ' . $conn->error);
    }

    // Agregar comodines para la búsqueda
    $titulo = "%" . $titulo . "%";
    $stmt->bind_param("s", $titulo);
    $stmt->execute();
    $result = $stmt->get_result();

    $rooms = [];
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $rooms[] = [
                'titulo' => $row['titulo'],
                'servicios' => $row['servicios'],
                'disponibilidad' => $row['disponibilidad'],
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
    $stmt->close();
}
$conn->close();
?>