<?php
include('conection.php');
session_start();

header('Content-Type: application/json'); // Especifica que la respuesta será en formato JSON

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $correo = $_POST['correo'];
    $contrasena = $_POST['contrasena'];

    // Buscar el usuario en la base de datos
    $sql = "SELECT correo, contrasena FROM info_usuarios WHERE correo = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $correo);
    $stmt->execute();
    $result = $stmt->get_result();
    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();
        if (password_verify($contrasena, $user['contrasena'])) {
            // Si la contraseña coincide
            $_SESSION['correo'] = $correo;
            echo json_encode(['success' => true, 'message' => 'Inicio de sesión exitoso.']);
        } else {
            // Si la contraseña no coincide
            echo json_encode(['success' => false, 'message' => 'Usuario o contraseña incorrectos.']);
        }
    } else {
        // Si no se encuentra el usuario
        echo json_encode(['success' => false, 'message' => 'Usuario no encontrado.']);
    }
    $stmt->close();
}
$conn->close();
?>