En construccion:

Aqui el script de la base de datos:

-- DROP DATABASE MiHabitacion;

CREATE DATABASE MiHabitacion;

USE MiHabitacion;

CREATE TABLE info_usuarios (
    id_usuario INT AUTO_INCREMENT,
    nombres VARCHAR(30) NOT NULL,
    apellidoP VARCHAR(15) NOT NULL,
    apellidoM VARCHAR(15) NOT NULL,
    correo VARCHAR(50) NOT NULL UNIQUE,
    telefono VARCHAR(10) NOT NULL UNIQUE,
    whatsapp TEXT NULL,
    contrasena VARCHAR(60) NOT NULL,
    banner LONGBLOB NOT NULL,
    imagen LONGBLOB NULL,
    FyH_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id_usuario)
);


CREATE TABLE cuartos (
    id_cuarto INT AUTO_INCREMENT,
    id_usuario INT NOT NULL,
    titulo VARCHAR(100) NOT NULL,
    descripcion TEXT NOT NULL,
    servicios TEXT NOT NULL,
    precio DECIMAL(6,2) NOT NULL,
    disponibilidad BOOLEAN DEFAULT TRUE,
    direccion TEXT NOT NULL,
    imagen LONGBLOB NOT NULL,
    imagen2 LONGBLOB NULL,
    imagen3 LONGBLOB NULL,
    imagen4 LONGBLOB NULL,
    PRIMARY KEY (id_cuarto),
    FOREIGN KEY (id_usuario) REFERENCES info_usuarios (id_usuario)
);

El archivo conection.php lo deberan modificar segun sus configuraciones de puerto y contraseña y las demas.
