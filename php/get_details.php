<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
require_once 'conection.php';
header('Content-Type: application/json');

$response = [];  // Inicializar un arreglo para almacenar la respuesta

if (isset($_GET['id_cuarto'])) {
    $response["cuarto_valido"] = true;
} else {
    $response["error"] = "Cuarto no valido.";
    echo json_encode($response);
    exit();  // Detener la ejecución si falta el ID del cuarto
}

if (isset($_GET['id_usuario'])) {
    $response["usuario_valido"] = true;
} else {
    $response["error"] = "Usuario no valido.";
    echo json_encode($response);
    exit();  // Detener la ejecución si falta el ID del usuario
}

$id_cuarto = intval($_GET['id_cuarto']);
$id_usuario = intval($_GET['id_usuario']);

// Ejecutar la consulta para el cuarto
$sqlCuarto = "SELECT titulo, descripcion, servicios, precio, direccion, imagen, imagen2, imagen3, imagen4 FROM cuartos WHERE id_cuarto = ?";
$stmtCuarto = $conn->prepare($sqlCuarto);
if (!$stmtCuarto) {
    $response["error"] = "Error en la preparación de la consulta: " . $conn->error;
    echo json_encode($response);
    exit();
}
$stmtCuarto->bind_param("i", $id_cuarto);
$stmtCuarto->execute();
$resultCuarto = $stmtCuarto->get_result();

$cuarto = null;
if ($resultCuarto->num_rows > 0) {
    $cuarto = $resultCuarto->fetch_assoc();
    $response["cuarto"] = [
        "titulo" => $cuarto['titulo'],
        "descripcion" => $cuarto['descripcion'],
        "servicios" => $cuarto['servicios'],
        "precio" => $cuarto['precio'],
        "direccion" => $cuarto['direccion'],
        "imagen" => $cuarto['imagen'] ? base64_encode($cuarto['imagen']) : null,
        "imagen2" => $cuarto['imagen2'] ? base64_encode($cuarto['imagen2']) : null,
        "imagen3" => $cuarto['imagen3'] ? base64_encode($cuarto['imagen3']) : null,
        "imagen4" => $cuarto['imagen4'] ? base64_encode($cuarto['imagen4']) : null
    ];
} else {
    $response["error"] = "No se encontraron datos del cuarto.";
}

// Liberar el resultado de la consulta del cuarto antes de continuar
$stmtCuarto->free_result();
$stmtCuarto->close();

// Ejecutar la consulta para el usuario
$sqlUsuario = "SELECT nombres, apellidoP, apellidoM, imagen, telefono, correo, whatsapp FROM info_usuarios WHERE id_usuario = ?";
$stmtUsuario = $conn->prepare($sqlUsuario);
if (!$stmtUsuario) {
    $response["error"] = "Error en la preparación de la consulta: " . $conn->error;
    echo json_encode($response);
    exit();
}
$stmtUsuario->bind_param("i", $id_usuario);
$stmtUsuario->execute();
$resultUsuario = $stmtUsuario->get_result();

if ($resultUsuario->num_rows > 0) {
    $usuario = $resultUsuario->fetch_assoc();
    $response["usuario"] = [
        "imagen" => $usuario['imagen'] ? base64_encode($usuario['imagen']) : null,    
        "nombreCompleto" => $usuario['nombres'] . ' ' . $usuario['apellidoP'] . ' ' . $usuario['apellidoM'],
        "telefono" => $usuario['telefono'],
        "correo" => $usuario['correo'],
        "whatsapp" => $usuario['whatsapp']
    ];
} else {
    $response["error"] = "No se encontraron datos del usuario.";
}

$stmtUsuario->close();
$conn->close();

echo json_encode($response);
?>