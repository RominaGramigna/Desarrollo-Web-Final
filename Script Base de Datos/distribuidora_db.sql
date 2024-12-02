CREATE DATABASE  IF NOT EXISTS `distribuidora_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `distribuidora_db`;
-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: localhost    Database: distribuidora_db
-- ------------------------------------------------------
-- Server version	8.0.40

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `categorias`
--

DROP TABLE IF EXISTS `categorias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categorias` (
  `ID_Categoria` int NOT NULL AUTO_INCREMENT,
  `Descripcion` varchar(50) DEFAULT NULL,
  `UltimaModificacion` timestamp NOT NULL DEFAULT (now()),
  `UsuarioAlta` int DEFAULT NULL,
  PRIMARY KEY (`ID_Categoria`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categorias`
--

LOCK TABLES `categorias` WRITE;
/*!40000 ALTER TABLE `categorias` DISABLE KEYS */;
INSERT INTO `categorias` VALUES (1,'Aceites','2024-08-07 18:05:26',NULL),(2,'Fideos','2024-12-01 19:48:51',NULL);
/*!40000 ALTER TABLE `categorias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clientes`
--

DROP TABLE IF EXISTS `clientes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clientes` (
  `ID_Cliente` int NOT NULL AUTO_INCREMENT,
  `Cliente` varchar(50) DEFAULT NULL,
  `Domicilio` varchar(50) DEFAULT NULL,
  `Localidad` varchar(50) DEFAULT NULL,
  `Estado` tinyint NOT NULL,
  `UltimaModificacion` timestamp NOT NULL DEFAULT (now()),
  `ID_Usuario` int DEFAULT NULL,
  `UsuarioAlta` int DEFAULT NULL,
  PRIMARY KEY (`ID_Cliente`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clientes`
--

LOCK TABLES `clientes` WRITE;
/*!40000 ALTER TABLE `clientes` DISABLE KEYS */;
/*!40000 ALTER TABLE `clientes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `marcas`
--

DROP TABLE IF EXISTS `marcas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `marcas` (
  `ID_Marca` int NOT NULL AUTO_INCREMENT,
  `Descripcion` varchar(50) DEFAULT NULL,
  `UltimaModificacion` timestamp NOT NULL DEFAULT (now()),
  `UsuarioAlta` int DEFAULT NULL,
  PRIMARY KEY (`ID_Marca`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `marcas`
--

LOCK TABLES `marcas` WRITE;
/*!40000 ALTER TABLE `marcas` DISABLE KEYS */;
INSERT INTO `marcas` VALUES (1,'Natura','2024-10-28 22:02:52',NULL);
/*!40000 ALTER TABLE `marcas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pedidos`
--

DROP TABLE IF EXISTS `pedidos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pedidos` (
  `ID_Pedido` int NOT NULL,
  `ID_Cliente` int NOT NULL,
  `Estado` tinyint NOT NULL,
  `ID_Articulo` int NOT NULL,
  `Articulo` varchar(50) DEFAULT NULL,
  `Cantidad` int NOT NULL,
  `PrecioNeto` decimal(12,4) DEFAULT NULL,
  `PrecioFinal` decimal(12,4) DEFAULT NULL,
  `UltimaModificacion` timestamp NOT NULL DEFAULT (now()),
  PRIMARY KEY (`ID_Pedido`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pedidos`
--

LOCK TABLES `pedidos` WRITE;
/*!40000 ALTER TABLE `pedidos` DISABLE KEYS */;
/*!40000 ALTER TABLE `pedidos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productos`
--

DROP TABLE IF EXISTS `productos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productos` (
  `ID_Articulo` int NOT NULL AUTO_INCREMENT,
  `Articulo` varchar(50) NOT NULL,
  `ID_Marca` int NOT NULL,
  `ID_Categoria` int NOT NULL,
  `cantidad` int DEFAULT NULL,
  `Estado` tinyint NOT NULL,
  `Imagen` varchar(200) DEFAULT NULL,
  `UltimaModificacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `UsuarioAlta` int DEFAULT NULL,
  PRIMARY KEY (`ID_Articulo`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productos`
--

LOCK TABLES `productos` WRITE;
/*!40000 ALTER TABLE `productos` DISABLE KEYS */;
INSERT INTO `productos` VALUES (1,'Aceite Natura',1,1,10,1,'01.jpg','2024-12-02 01:04:23',NULL),(2,'Fideos',1,2,22,1,'02.jpg','2024-12-02 01:12:25',NULL),(3,'Pañales',1,1,11,1,'04.jpg','2024-12-02 01:13:06',NULL),(4,'yerba',1,1,55,1,'yerba.jpg','2024-12-02 12:06:03',NULL),(5,'Sierra de los Padre',1,1,11,1,'03.jpeg','2024-12-02 11:50:30',NULL);
/*!40000 ALTER TABLE `productos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productosprecios`
--

DROP TABLE IF EXISTS `productosprecios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productosprecios` (
  `ID_Articulo` int NOT NULL AUTO_INCREMENT,
  `PrecioNeto` decimal(12,4) DEFAULT NULL,
  `PrecioFinal` decimal(12,4) DEFAULT NULL,
  `UltimaModificacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `UsuarioAlta` int DEFAULT NULL,
  PRIMARY KEY (`ID_Articulo`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productosprecios`
--

LOCK TABLES `productosprecios` WRITE;
/*!40000 ALTER TABLE `productosprecios` DISABLE KEYS */;
INSERT INTO `productosprecios` VALUES (1,2000.0000,2420.0000,'2024-12-02 01:04:23',NULL),(2,1500.0000,1815.0000,'2024-12-02 01:12:25',NULL),(3,111.0000,134.3100,'2024-12-02 01:13:06',NULL),(4,87687.0000,106101.2700,'2024-12-02 12:06:03',NULL),(5,111.0000,134.3100,'2024-12-02 11:50:30',NULL);
/*!40000 ALTER TABLE `productosprecios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `ID_Usuario` int NOT NULL AUTO_INCREMENT,
  `Usuario` varchar(50) NOT NULL,
  `Clave` varchar(20) NOT NULL,
  `Email` varchar(50) NOT NULL,
  `Telefono` varchar(10) DEFAULT NULL,
  `UltimaModificacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`ID_Usuario`),
  UNIQUE KEY `Usuario` (`Usuario`),
  UNIQUE KEY `Email` (`Email`),
  UNIQUE KEY `Telefono` (`Telefono`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'Administrador','1234','alejandroaparicio547@gmail.com','3471681380','2024-03-29 15:52:51');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `vwproductos`
--

DROP TABLE IF EXISTS `vwproductos`;
/*!50001 DROP VIEW IF EXISTS `vwproductos`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `vwproductos` AS SELECT 
 1 AS `ID_Articulo`,
 1 AS `Articulo`,
 1 AS `ID_Categoria`,
 1 AS `Categoria`,
 1 AS `ID_Marca`,
 1 AS `Marca`,
 1 AS `Precio`,
 1 AS `Cantidad`,
 1 AS `Imagen`*/;
SET character_set_client = @saved_cs_client;

--
-- Final view structure for view `vwproductos`
--

/*!50001 DROP VIEW IF EXISTS `vwproductos`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `vwproductos` AS select `p`.`ID_Articulo` AS `ID_Articulo`,`p`.`Articulo` AS `Articulo`,`c`.`ID_Categoria` AS `ID_Categoria`,`c`.`Descripcion` AS `Categoria`,`m`.`ID_Marca` AS `ID_Marca`,`m`.`Descripcion` AS `Marca`,`pp`.`PrecioFinal` AS `Precio`,`p`.`cantidad` AS `Cantidad`,`p`.`Imagen` AS `Imagen` from (((`productos` `p` join `categorias` `c` on((`c`.`ID_Categoria` = `p`.`ID_Categoria`))) join `marcas` `m` on((`m`.`ID_Marca` = `p`.`ID_Marca`))) join `productosprecios` `pp` on((`pp`.`ID_Articulo` = `p`.`ID_Articulo`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-12-02 10:13:34
