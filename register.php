<?php
include 'conection.php'; // Incluye el archivo de conexión a la base de datos

header('Content-Type: application/json'); // Establece el encabezado para que el contenido devuelto sea JSON

// Inicializa la respuesta con un mensaje de error por defecto
$response = array('success' => false, 'message' => 'Error desconocido.');

// Verifica si hay un error en la conexión a la base de datos
if ($conn->connect_error) {
    $response['message'] = "Conexión fallida: " . $conn->connect_error; // Establece el mensaje de error de conexión
    echo json_encode($response); // Devuelve la respuesta en formato JSON
    exit(); // Termina la ejecución del script
}

// Verifica si la solicitud es de tipo POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Obtiene los datos enviados a través del formulario
    $nombres = $_POST['nombres'];
    $apellidoP = $_POST['apellidoP'];
    $apellidoM = $_POST['apellidoM'];
    $correo = $_POST['correo'];
    $telefono = $_POST['telefono'];
    $contraseña = $_POST['contrasena'];
    $hash_contraseña = password_hash($contraseña, PASSWORD_BCRYPT); // Hashea la contraseña utilizando BCRYPT

    // Prepara la consulta SQL para insertar los datos en la base de datos
    $sql = "INSERT INTO info_usuarios (nombres, apellidoP, apellidoM, correo, telefono, contrasena) VALUES (?, ?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($sql); // Prepara la consulta
    $stmt->bind_param("ssssss", $nombres, $apellidoP, $apellidoM, $correo, $telefono, $hash_contraseña); // Vincula los parámetros

    // Ejecuta la consulta y verifica si fue exitosa
    if ($stmt->execute()) {
        $response['success'] = true; // Establece la respuesta como exitosa
        $response['message'] = "Registro exitoso. ¡Puedes iniciar sesión!"; // Mensaje de éxito
    } else {
        $response['message'] = "Error: " . $stmt->error; // Mensaje de error en caso de fallo
    }

    $stmt->close(); // Cierra la declaración preparada
}

$conn->close(); // Cierra la conexión a la base de datos
echo json_encode($response); // Devuelve la respuesta en formato JSON
?>