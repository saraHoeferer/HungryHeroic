-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: localhost    Database: hungryheoric
-- ------------------------------------------------------
-- Server version	8.0.33

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
-- Table structure for table `inventorylists`
--

DROP TABLE IF EXISTS `inventorylists`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `inventorylists` (
  `user_id` int NOT NULL,
  `item_id` int NOT NULL,
  `quantity` int NOT NULL,
  `expiration_date` date NOT NULL,
  `category_id` int NOT NULL,
  `storage_loc_id` int NOT NULL,
  PRIMARY KEY (`user_id`,`item_id`),
  KEY `item_id_idx` (`item_id`),
  KEY `user_id_idx` (`user_id`),
  KEY `FK_category_id_idx` (`category_id`),
  KEY `FK_storage_loc_id_idx` (`storage_loc_id`),
  CONSTRAINT `FK_category_id` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`),
  CONSTRAINT `FK_storage_loc_id` FOREIGN KEY (`storage_loc_id`) REFERENCES `storagelocations` (`storage_loc_id`),
  CONSTRAINT `item_id` FOREIGN KEY (`item_id`) REFERENCES `items` (`item_id`),
  CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inventorylists`
--

LOCK TABLES `inventorylists` WRITE;
/*!40000 ALTER TABLE `inventorylists` DISABLE KEYS */;
INSERT INTO `inventorylists` VALUES (4,1,2,'2023-07-19',1,3),(4,5,1,'2023-07-16',9,1),(4,6,1,'2023-07-12',2,1),(4,10,1,'2023-07-08',2,1),(4,11,3,'2023-07-08',23,3),(4,16,2,'2023-08-07',19,3),(4,17,1,'2023-07-07',5,1),(4,32,1,'2023-07-29',10,3),(4,42,10,'2023-07-15',8,3),(4,43,1,'2023-09-10',20,2),(4,44,2,'2023-07-22',17,1),(4,56,1,'2023-07-19',17,1),(4,58,2,'2023-07-19',5,1),(4,60,2,'2023-07-19',17,1),(4,62,2,'2023-07-19',5,2),(4,63,2,'2023-08-01',16,1),(4,65,2,'2023-07-19',1,1),(4,76,2,'2023-07-19',11,3),(6,47,24,'2024-07-26',7,1),(6,77,24,'2025-07-19',8,1),(6,79,1,'2023-09-10',22,2),(7,6,2,'2023-07-19',2,1),(7,10,1,'2023-07-19',2,2),(7,52,2,'2023-07-14',25,1),(8,17,3,'2023-07-13',5,2),(8,54,3,'2023-07-18',1,3),(8,56,3,'2023-07-19',17,1),(8,61,2,'2023-09-11',7,1),(8,81,2,'2023-07-16',1,3),(8,83,2,'2023-07-14',1,1),(8,84,2,'2023-07-03',2,1),(8,85,1,'2023-07-15',2,1),(8,86,3,'2023-07-19',2,1),(8,87,2,'2023-08-02',3,1),(8,88,2,'2023-07-12',3,1),(8,89,2,'2023-08-12',4,3),(8,90,2,'2023-08-31',22,3),(8,91,2,'2023-09-11',22,3),(8,93,2,'2023-07-20',5,1),(8,94,1,'2023-07-31',6,2),(8,95,1,'2023-07-18',6,1),(8,96,4,'2023-08-14',7,1),(8,97,15,'2023-08-01',7,3),(8,98,2,'2023-08-25',8,1),(8,99,1,'2023-09-16',8,3),(8,100,1,'2023-07-17',9,1),(8,101,1,'2023-07-14',9,1),(8,102,1,'2023-08-12',10,3),(8,103,2,'2023-08-01',10,3),(8,104,1,'2023-07-18',11,3),(8,105,1,'2023-07-18',13,1),(8,106,10,'2023-07-15',14,1),(8,107,1,'2023-07-18',17,1),(8,108,2,'2023-07-24',18,3),(8,109,1,'2023-08-08',19,3),(8,110,2,'2023-07-19',19,3),(8,111,2,'2023-09-11',20,3),(8,112,3,'2023-08-15',20,3),(8,113,1,'2023-07-10',21,1),(8,114,1,'2023-09-11',24,2),(8,116,2,'2023-07-24',23,3),(8,117,1,'2023-07-16',25,1),(8,118,4,'2023-07-19',26,1),(8,119,1,'2023-07-16',26,1),(8,123,2,'2023-07-15',15,3);
/*!40000 ALTER TABLE `inventorylists` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-07-13 13:31:47
