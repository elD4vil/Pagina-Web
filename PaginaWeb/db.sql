-- Crear la base de datos si no existe
DROP DATABASE nodel;
CREATE DATABASE nodel;

-- Usar la base de datos
USE nodel;

CREATE TABLE Usuarios (
	ID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	email VARCHAR(20),
	name VARCHAR(20),
	password VARCHAR(20)
);

CREATE TABLE apliaciones (
  ID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  contenido LONGBLOB NOT NULL,
  tipo_de_contenido VARCHAR(100) NOT NULL
);

CREATE TABLE archivos (
  ID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  contenido LONGBLOB NOT NULL,
  tipo_de_contenido VARCHAR(100) NOT NULL

);