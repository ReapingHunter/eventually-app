-- Drop table if it exists
DROP TABLE IF EXISTS `category`;

CREATE TABLE `category` (
  `category_id` int NOT NULL AUTO_INCREMENT,
  `category_name` varchar(50) NOT NULL,
  PRIMARY KEY (`category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

LOCK TABLES `category` WRITE;

-- Insert table with data
INSERT INTO `category` (`category_id`, `category_name`) VALUES
(1, 'Corporate'),
(2, 'Social'),
(3, 'Cultural and Community'),
(4, 'Entertainment'),
(5, 'Sports and Recreational'),
(6, 'Charity'),
(7, 'Educational'),
(8, 'Networking'),
(9, 'Professional Development'),
(10, 'Health and Wellness'),
(11, 'Technology and Innovation'),
(12, 'Environmental'),
(13, 'Food and Drink'),
(14, 'Holiday'),
(15, 'Art and Crafts'),
(16, 'Luxury and Lifestyle'),
(17, 'Adventure and Outdoor');

UNLOCK TABLES;