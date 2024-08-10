<?php
require_once 'conection.php';
header('Content-Type: application/json');

if (isset($_GET['id_cuarto'])) {
    $id_cuarto = intval($_GET['id_cuarto']);
} else {
    echo json_encode(['error' => 'ID del cuarto no proporcionado.']);
    exit; // Es importante salir del script si no se proporciona el ID
}

// Consulta para obtener los detalles del cuarto
$sqlCuarto = "SELECT titulo, descripcion, servicios, precio, direccion, imagen, imagen2, imagen3, imagen4, id_usuario FROM cuartos WHERE id_cuarto = ?";
$stmtCuarto = $conn->prepare($sqlCuarto);

if (!$stmtCuarto) {
    echo json_encode(['error' => 'Error en la preparación de la consulta de cuartos.']);
    $conn->close();
    exit;
}

$stmtCuarto->bind_param("i", $id_cuarto);
$stmtCuarto->execute();
$resultCuarto = $stmtCuarto->get_result();

if ($resultCuarto->num_rows > 0) {
    $cuarto = $resultCuarto->fetch_assoc();

    // Consulta para obtener la información del propietario
    $id_usuario = $cuarto['id_usuario'];
    $sqlPropietario = "SELECT nombres, imagen FROM info_usuarios WHERE id_usuario = ?";
    $stmtPropietario = $conn->prepare($sqlPropietario);

    if (!$stmtPropietario) {
        echo json_encode(['error' => 'Error en la preparación de la consulta de propietario.']);
        $stmtCuarto->close();
        $conn->close();
        exit;
    }

    $stmtPropietario->bind_param("i", $id_usuario);
    $stmtPropietario->execute();
    $resultPropietario = $stmtPropietario->get_result();

    if ($resultPropietario->num_rows > 0) {
        $propietario = $resultPropietario->fetch_assoc();

        // Enviar la respuesta JSON
        echo json_encode([
            'cuarto' => $cuarto,
            'propietario' => $propietario
        ]);
        exit;

    } else {
        echo json_encode(['error' => 'Propietario no encontrado.']);
    }

    $stmtPropietario->close();
} else {
    echo json_encode(['error' => 'Cuarto no encontrado.']);
}

$stmtCuarto->close();
$conn->close();
?>