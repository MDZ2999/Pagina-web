<?php
// Iniciar sesión
session_start();

// Incluir la conexión a la base de datos
require_once 'conection.php'; // Asegúrate de tener un archivo de conexión a la base de datos

// Verificar si el usuario está autenticado
if (!isset($_SESSION['user_id'])) {
    echo "Error: Usuario no autenticado.";
    exit;
}

// Obtener el ID del usuario autenticado
$id_usuario = $_SESSION['user_id'];

// Obtener datos del formulario
$titulo = $_POST['titulo'];
$descripcion = $_POST['descripcion'];
$servicios = $_POST['servicios'];
$precio = $_POST['precio'];
$disponibilidad = $_POST['disponibilidad'];
$direccion = $_POST['direccion'];

// Verificar si el valor de precio es numérico y dentro del rango esperado
if (!is_numeric($precio) || $precio < 0 || $precio > 99999999.99) {
    echo "Error: El valor del precio es inválido.";
    exit;
}

// Manejo de la imagen principal (obligatoria)
if (isset($_FILES['imagen']['tmp_name']) && $_FILES['imagen']['tmp_name']) {
    $imagen = file_get_contents($_FILES['imagen']['tmp_name']);
} else {
    echo "Error: La imagen principal es obligatoria.";
    exit;
}

// Manejo de las imágenes opcionales
$imagen2 = isset($_FILES['imagen2']['tmp_name']) && $_FILES['imagen2']['tmp_name'] ? file_get_contents($_FILES['imagen2']['tmp_name']) : null;
$imagen3 = isset($_FILES['imagen3']['tmp_name']) && $_FILES['imagen3']['tmp_name'] ? file_get_contents($_FILES['imagen3']['tmp_name']) : null;
$imagen4 = isset($_FILES['imagen4']['tmp_name']) && $_FILES['imagen4']['tmp_name'] ? file_get_contents($_FILES['imagen4']['tmp_name']) : null;

// Preparar y vincular
$stmt = $conn->prepare("INSERT INTO cuartos (id_usuario, titulo, descripcion, servicios, precio, disponibilidad, direccion, imagen, imagen2, imagen3, imagen4) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
$stmt->bind_param("isssdssssss", $id_usuario, $titulo, $descripcion, $servicios, $precio, $disponibilidad, $direccion, $imagen, $imagen2, $imagen3, $imagen4);

// Ejecutar la declaración
if ($stmt->execute()) {
    echo "Nuevo cuarto registrado exitosamente";
} else {
    echo "Error: " . $stmt->error;
}

// Cerrar conexión
$stmt->close();
$conn->close();
?>