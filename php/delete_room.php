<?php
session_start();
require_once 'conection.php';

if (!isset($_SESSION['user_id'])) {
    echo json_encode(["error" => "Usuario no autenticado."]);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id_cuarto = $_GET['id_cuarto'];
    $id_usuario = $_SESSION['user_id'];

    // Verificar que el cuarto pertenezca al usuario
    $sql = "DELETE FROM cuartos WHERE id_cuarto = ? AND id_usuario = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ii", $id_cuarto, $id_usuario);

    if ($stmt->execute()) {
        echo json_encode(["success" => true]);
    } else {
        echo json_encode(["error" => "Error al eliminar el cuarto: " . $stmt->error]);
    }

    $stmt->close();
    $conn->close();
} else {
    echo json_encode(["error" => "Método de solicitud no permitido."]);
}
?>