<?php
session_start();
require_once 'conection.php';

if (!isset($_SESSION['user_id'])) {
    echo "Error: Usuario no autenticado.";
    exit;
}

$id_usuario = $_SESSION['user_id'];

$imagen = null;
$banner = null;

// Verificar si se envió la imagen del avatar recortada
if (isset($_POST['avatarCropped']) && !empty($_POST['avatarCropped'])) {
    $imagen = base64_decode(explode(',', $_POST['avatarCropped'])[1]);
}

// Verificar si se envió la imagen del banner recortada
if (isset($_POST['bannerCropped']) && !empty($_POST['bannerCropped'])) {
    $banner = base64_decode(explode(',', $_POST['bannerCropped'])[1]);
}

// Alternativamente, si no se envió la imagen recortada, verificar si se subió una imagen normal
if ($imagen === null && isset($_FILES['avatar']) && $_FILES['avatar']['error'] == UPLOAD_ERR_OK) {
    $imagen = file_get_contents($_FILES['avatar']['tmp_name']);
}

if ($banner === null && isset($_FILES['banner']) && $_FILES['banner']['error'] == UPLOAD_ERR_OK) {
    $banner = file_get_contents($_FILES['banner']['tmp_name']);
}

if ($imagen !== null || $banner !== null) {
    $sql = "UPDATE info_usuarios SET ";
    if ($imagen !== null) {
        $sql .= "imagen = ?, ";
    }
    if ($banner !== null) {
        $sql .= "banner = ?, ";
    }
    $sql = rtrim($sql, ", ");
    $sql .= " WHERE id_usuario = ?";

    $stmt = $conn->prepare($sql);

    if ($imagen !== null && $banner !== null) {
        $stmt->bind_param("bbi", $null, $null, $id_usuario);
        $stmt->send_long_data(0, $imagen);
        $stmt->send_long_data(1, $banner);
    } elseif ($imagen !== null) {
        $stmt->bind_param("bi", $null, $id_usuario);
        $stmt->send_long_data(0, $imagen);
    } elseif ($banner !== null) {
        $stmt->bind_param("bi", $null, $id_usuario);
        $stmt->send_long_data(0, $banner);
    }

    if ($stmt->execute()) {
        echo "Perfil editado exitosamente";
    } else {
        echo "Error: " . $stmt->error;
    }

    $stmt->close();
    $conn->close();
} else {
    echo "Error: No se subieron imágenes.";
}
?>