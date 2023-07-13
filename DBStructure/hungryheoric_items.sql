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
-- Table structure for table `items`
--

DROP TABLE IF EXISTS `items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `items` (
  `item_id` int NOT NULL AUTO_INCREMENT,
  `item_name` varchar(60) NOT NULL,
  PRIMARY KEY (`item_id`),
  UNIQUE KEY `item_name_UNIQUE` (`item_name`)
) ENGINE=InnoDB AUTO_INCREMENT=126 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `items`
--

LOCK TABLES `items` WRITE;
/*!40000 ALTER TABLE `items` DISABLE KEYS */;
INSERT INTO `items` VALUES (74,' Avocado'),(75,' Hühnchen'),(71,' Tomaten'),(1,'Apfel'),(81,'Apple'),(25,'Avocado'),(82,'Banana'),(8,'Banane'),(13,'Barsch'),(103,'Basil'),(98,'Beer'),(77,'Bier'),(51,'Birne'),(110,'Black Tea'),(68,'Blutorange'),(104,'Bread'),(21,'Brennesseltee'),(76,'Brot'),(78,'Burger'),(122,'Burritos'),(113,'Butter'),(85,'Cabbage'),(91,'Cane Sugar'),(43,'Capri Sonne'),(97,'Capri Sun'),(86,'Carrot'),(100,'Cheddar'),(117,'Chicken'),(105,'Chocolate Cake'),(66,'Club Mate'),(96,'Coca Cola'),(108,'Coffee Beans'),(59,'Cola'),(106,'Egg'),(9,'Erdbeeren'),(61,'Fanta'),(20,'Fencheltee'),(101,'Feta'),(89,'Flour'),(18,'Früchtetee'),(3,'Gauda'),(39,'Gösser'),(47,'Gösser Naturradler'),(48,'Granatapfel'),(109,'Green Tea'),(2,'Gurke'),(72,'Hafermilch'),(121,'Ham'),(64,'Haselnuss'),(69,'Hecht'),(55,'Himbeeren'),(52,'Huhn'),(7,'Hühnchen'),(73,'Joghurt'),(36,'Kaffee'),(19,'Kamillentee'),(35,'Kartoffelstärke'),(45,'Käse'),(67,'Kinder country'),(12,'Kotelett '),(22,'Kräuterteee'),(40,'Kuchen'),(83,'Lemon'),(125,'Lemon Ice'),(116,'M&M\'s'),(57,'Mandarine'),(38,'Mehl'),(60,'Milchschnitte'),(88,'Milk'),(93,'Minced Meat'),(14,'Müsli'),(111,'Olive Oil'),(124,'Onions'),(54,'Orange'),(102,'Oregano'),(6,'Paprika'),(120,'Pepper'),(119,'Pepperoni'),(99,'Red Wine'),(95,'Salmon'),(37,'Schafmilch'),(5,'Schafskäse'),(44,'Schlagobers'),(62,'Schnitzel'),(79,'Schnuggi'),(41,'Schokokuchen'),(11,'Schokolade'),(42,'Sekt'),(112,'Sesame Oil'),(4,'Sojamlich'),(87,'Soymilk'),(123,'Spaghetti'),(92,'Spareribs'),(58,'Speckwürfel'),(34,'Stärke'),(17,'Steak'),(115,'Strawberry Ice Cream'),(90,'Sugar'),(16,'Tee'),(70,'Tomate'),(10,'Tomaten'),(84,'Tomato'),(94,'Tuna'),(114,'Vanilla Ice Cream'),(32,'Vanille'),(63,'Walnuss'),(65,'Wassermelone'),(107,'Whipped Cream'),(118,'Wiener Sausages'),(56,'Yoghurt'),(80,'yxc<x<yx<yx'),(33,'Zucker'),(46,'Zwiebel');
/*!40000 ALTER TABLE `items` ENABLE KEYS */;
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
