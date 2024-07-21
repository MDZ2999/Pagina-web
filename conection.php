<?php
$servername = "localhost";
$username = "root";
$password = "alexis";
$dbname = "mihabitacion";
$port = 3306; // Especifica el puerto de la base de datos

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname, $port);

// Verificar conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}
echo "";

?>
