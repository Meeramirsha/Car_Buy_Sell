-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: localhost    Database: carbackend_db
-- ------------------------------------------------------
-- Server version	8.0.41

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
-- Table structure for table `cars`
--

DROP TABLE IF EXISTS `cars`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cars` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `availability` bit(1) NOT NULL DEFAULT b'1',
  `body_type` varchar(255) DEFAULT NULL,
  `color` varchar(255) DEFAULT NULL,
  `contact_email` varchar(255) DEFAULT NULL,
  `contact_phone` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `features_string` varchar(255) DEFAULT NULL,
  `fuel_type` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `make` varchar(255) DEFAULT NULL,
  `mileage` int NOT NULL,
  `model` varchar(255) DEFAULT NULL,
  `price` double NOT NULL,
  `transmission` varchar(255) DEFAULT NULL,
  `year` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cars`
--

LOCK TABLES `cars` WRITE;
/*!40000 ALTER TABLE `cars` DISABLE KEYS */;
INSERT INTO `cars` VALUES 
(1, b'1', 'Sedan', 'Silver', 'seller1@example.com', '(555) 123-4567', 'This Toyota Corolla is in excellent condition with low mileage.', 'Bluetooth,Backup Camera,Lane Departure Warning', 'Gasoline', 'https://images.unsplash.com/photo-1590362891991-f776e747a588', 'Toyota', 15000, 'Corolla', 20000, 'Automatic', 2022),
(2, b'1', 'Sedan', 'Blue', 'seller2@example.com', '(555) 234-5678', 'This Honda Civic offers excellent fuel economy and a comfortable ride.', 'Honda Sensing Suite,Touchscreen Infotainment,Android Auto', 'Gasoline', 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf', 'Honda', 18500, 'Civic', 22000, 'CVT', 2021),
(3, b'1', 'Hatchback', 'Red', 'seller3@example.com', '(555) 345-6789', 'This Ford Focus offers a sporty driving experience with responsive handling.', 'SYNC 3 Infotainment,Keyless Entry,Alloy Wheels', 'Gasoline', 'https://images.unsplash.com/photo-1551830820-330a71b99659', 'Ford', 25000, 'Focus', 18000, 'Manual', 2020),
(17, b'1', 'Sedan', 'Red', 'toyota@example.com', '9876543210', 'A reliable and fuel-efficient sedan.', 'Bluetooth, Backup Camera, Cruise Control, Keyless Entry', 'Petrol', 'https://images.unsplash.com/photo-1655704390628-02774ee4a3ae?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'Toyota', 45000, 'Camry', 18000, 'Automatic', 2018),
(18, b'1', 'Sedan', 'Blue', 'honda@example.com', '9123456780', 'Compact car with modern features and great mileage.', 'Apple CarPlay, Android Auto, Lane Departure Warning, Heated Seats', 'Petrol', 'https://images.unsplash.com/photo-1656918931725-2f9d9fce4acb?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'Honda', 32000, 'Civic', 17000, 'Automatic', 2019),
(19, b'1', 'Coupe', 'Black', 'ford@example.com', '9988776655', 'Sporty coupe with powerful engine and sleek design.', 'Leather Seats, Premium Sound System, Navigation, Convertible Top', 'Petrol', 'https://images.unsplash.com/photo-1673016953003-99b924cb7635?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'Ford', 27000, 'Mustang', 35000, 'Manual', 2020),
(20, b'1', 'Sedan', 'White', 'tesla@example.com', '9001122334', 'Electric car with cutting-edge technology and features.', 'Autopilot, Full Self-Driving Capability, Premium Interior, Glass Roof', 'Electric', 'https://images.unsplash.com/photo-1721340143289-94be4f77cda4?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'Tesla', 15000, 'Model 3', 45000, 'Automatic', 2021),
(21, b'1', 'SUV', 'Gray', 'bmw@example.com', '9012345678', 'Luxury SUV with advanced safety and comfort features.', 'Panoramic Sunroof, Heated Steering Wheel, 360-Degree Camera, Adaptive Cruise Control', 'Diesel', 'https://media.istockphoto.com/id/1307086567/photo/generic-modern-suv-car-in-concrete-garage.webp?s=1024x1024&w=is&k=20&c=NehEPnJZVdks6u6RgVBNiGei0F1LOqs7jh81dExbXpc=', 'BMW', 38000, 'X5', 55000, 'Automatic', 2020);
/*!40000 ALTER TABLE `cars` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-07-03 10:09:58
