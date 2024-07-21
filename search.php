<?php
// Incluir el archivo de conexión a la base de datos
include 'conexion.php';

// Verificar si se ha enviado el formulario de búsqueda
if ($_SERVER["REQUEST_METHOD"] == "GET" && isset($_GET['cuarto'])) {
    $titulo = htmlspecialchars($_GET['cuarto']);

    // Preparar y ejecutar la consulta de búsqueda
    $sql = "SELECT id_cuarto, id_usuario, titulo, descripcion, servicios, precio, disponibilidad, direccion, imagen FROM cuartos WHERE titulo LIKE ?";
    $stmt = $conn->prepare($sql);
    if ($stmt === false) {
        die('Error en la preparación de la consulta: ' . $conn->error);
    }

    // Agregar comodines para la búsqueda
    $titulo = "%" . $titulo . "%";
    $stmt->bind_param("s", $titulo);
    $stmt->execute();
    $result = $stmt->get_result();
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Buscar Cuarto</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <h2>Buscar Cuarto</h2>
    <!-- Formulario de búsqueda -->
    <form action="search.php" method="get">
        <label for="cuarto">Título del Cuarto:</label>
        <input type="text" id="cuarto" name="cuarto" placeholder="🔍" required>
        <button type="submit">Buscar</button>
    </form>

    <br>

    <div class="card-container">
        <?php
        // Verificar si hay resultados
        if (isset($result) && $result->num_rows > 0) {
            // Mostrar los datos de cada cuarto encontrado
            while ($row = $result->fetch_assoc()) {
                echo "<div class='card'>";
                echo "<h3>" . htmlspecialchars($row["titulo"]) . "</h3>";
                echo "<p><strong>Descripción:</strong> " . htmlspecialchars($row["descripcion"]) . "</p>";
                echo "<p><strong>Servicios:</strong> " . htmlspecialchars($row["servicios"]) . "</p>";
                echo "<p><strong>Precio:</strong> $" . htmlspecialchars($row["precio"]) . "</p>";
                echo "<p><strong>Disponibilidad:</strong> " . htmlspecialchars($row["disponibilidad"]) . "</p>";
                echo "<p><strong>Dirección:</strong> " . htmlspecialchars($row["direccion"]) . "</p>";
                echo "<img src='" . htmlspecialchars($row["imagen"]) . "' alt='Imagen del cuarto'>";
                echo "</div>";
            }
        } elseif (isset($result)) {
            // Mostrar mensaje si no hay resultados
            echo "<p>No se encontraron cuartos con ese título</p>";
        }
        ?>
    </div>

    <!-- Botón para volver atrás -->
    <form action="index.php" method="get" style="text-align:center; margin-top:20px;">
        <button type="submit">Volver</button>
    </form>
</body>
</html>

<?php
// Cerrar la conexión a la base de datos
$conn->close();
?>