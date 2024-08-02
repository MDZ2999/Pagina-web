<?php

// Incluye el script de conexión a la base de datos
include('conection.php');
// Inicia una nueva sesión o reanuda la existente
session_start();

// Establece el contenido devuelto como JSON
header('Content-Type: application/json');

// Comprueba si el método de la solicitud es POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Recupera los datos enviados desde el formulario
    $correo = $_POST['correo'];
    $contrasena = $_POST['contrasena'];

    // Prepara la consulta SQL para buscar el correo en la base de datos
    $sql = "SELECT id_usuario, correo, contrasena FROM info_usuarios WHERE correo = ?";
    $stmt = $conn->prepare($sql); // Prepara la declaración SQL
    $stmt->bind_param("s", $correo); // Vincula el parámetro de correo a la consulta
    $stmt->execute(); // Ejecuta la consulta
    $result = $stmt->get_result(); // Obtiene el resultado de la consulta

    // Verifica si se encontraron resultados
    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc(); // Obtiene los datos del usuario como un array asociativo
        // Verifica si la contraseña ingresada coincide con la hash almacenada
        if (password_verify($contrasena, $user['contrasena'])) {
            // Establece las variables de sesión para el correo y el id del usuario
            $_SESSION['correo'] = $correo;
            $_SESSION['user_id'] = $user['id_usuario']; // Guarda el id del usuario en la sesión
            // Devuelve un JSON indicando el éxito del inicio de sesión
            echo json_encode(['success' => true, 'message' => 'Inicio de sesión exitoso.']);
        } else {
            // Devuelve un JSON indicando que la contraseña es incorrecta
            echo json_encode(['success' => false, 'message' => 'Usuario o contraseña incorrectos.']);
        }
    } else {
        // Devuelve un JSON indicando que el usuario no fue encontrado
        echo json_encode(['success' => false, 'message' => 'Usuario no encontrado.']);
    }
    $stmt->close(); // Cierra la declaración
}
$conn->close(); // Cierra la conexión a la base de datos


?>