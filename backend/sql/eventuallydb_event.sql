-- Drop the table if it exists
DROP TABLE IF EXISTS `event`;

CREATE TABLE `event` (
  `event_id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL,
  `photo` varchar(255) NOT NULL, /* Can be stored as a LONGBLOB as well */
  `description` text,
  `event_datetime` datetime NOT NULL, -- Combined date and time column
  `address` varchar(255) DEFAULT NULL,
  `category_id` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`event_id`),
  KEY `category_id` (`category_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `event_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `category` (`category_id`) ON DELETE SET NULL,
  CONSTRAINT `event_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Insert table with data
INSERT INTO `event` (`event_id`, `title`, `photo`, `description`, `event_datetime`, `address`, `category_id`, `user_id`, `created_at`, `updated_at`, `deleted_at`) 
VALUES
(1, 'Notion Tech Conference', 'img11.jpg', 'A conference about emerging technologies.', '2025-01-09 10:00:00', 'Ayala Central Bloc', 11, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL),
(2, 'Art Expo 2025', 'img15.jpg', 'Showcasing art from around the world.', '2025-03-15 18:00:00', 'Cebu Art Hall, Colon', 15, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL),
(3, 'Talamban Cleanup Drive', 'img12.jpg', 'Join us to clean up our community.', '2025-06-18 08:00:00', 'Rosedale, Cebu', 12, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL),
(4, 'New Year Eve Party', 'img14.jpg', 'Celebrate the new year with music and fun.', '2024-12-31 21:00:00', 'SM Seaside, Cebu', 14, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL),
(5, 'USC Edu Talk', 'img7.jpg', 'Year-End USC Edu Talk', '2024-12-20 17:30:00', 'Rigney Hall, USC TC', 7, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL),
(6, 'CESAFI 2025', 'img16.jpg', 'The annual CESAFI event.', '2025-02-14 12:00:00', 'Cebu City Sports Complex', 5, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL),
(7, 'Cebu Book Fair 2025', 'img17.jpg', 'Explore a wide variety of books and meet authors.', '2025-04-20 09:00:00', 'Cebu Convention Center', 7, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL),
(8, 'IT Park Jam 2025', 'img18.jpg', 'Live performances by top bands and artists.', '2025-07-05 19:00:00', 'Cebu IT Park Amphitheater', 2, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL);

LOCK TABLES `event` WRITE;

UNLOCK TABLES;