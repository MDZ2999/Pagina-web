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

// Manejo de la imagen
$imagen = file_get_contents($_FILES['imagen']['tmp_name']);

// Preparar y vincular
$stmt = $conn->prepare("INSERT INTO cuartos (id_usuario, titulo, descripcion, servicios, precio, disponibilidad, direccion, imagen) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
$stmt->bind_param("isssdsis", $id_usuario, $titulo, $descripcion, $servicios, $precio, $disponibilidad, $direccion, $imagen);

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