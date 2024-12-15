-- Drop the table if it exists
DROP TABLE IF EXISTS `event`;

CREATE TABLE `event` (
  `event_id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL,
  `photo` varchar(255) NOT NULL, /* Can be stored as a LONGBLOB as well */
  `description` text,
  `event_date` date NOT NULL, -- Separate date column
  `event_time` time NOT NULL, -- Separate time column
  `address` varchar(255) DEFAULT NULL,
  `category_id` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `max_occupants` int DEFAULT NULL, -- Added column for max occupants
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`event_id`),
  KEY `category_id` (`category_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `event_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `category` (`category_id`),
  CONSTRAINT `event_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Insert table with data
INSERT INTO `event` (`event_id`, `title`, `photo`, `description`, `event_date`, `event_time`, `address`, `category_id`, `user_id`, `created_at`, `updated_at`, `deleted_at`, `max_occupants`) 
VALUES
(1, 'Notion Tech Conference', 'public/images/img11.jpg', 'A conference about emerging technologies.', '2025-01-09', '10:00:00', 'Ayala Central Bloc', 11, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL, 300),
(2, 'Art Expo 2025', 'public/images/img15.jpg', 'Showcasing art from around the world.', '2025-03-15', '18:00:00', 'Cebu Art Hall, Colon', 15, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL, 200),
(3, 'Talamban Cleanup Drive', 'public/images/img12.jpg', 'Join us to clean up our community.', '2025-06-18', '08:00:00', 'Rosedale, Cebu', 12, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL, 150),
(4, 'New Year Eve Party', 'public/images/img14.jpg', 'Celebrate the new year with music and fun.', '2024-12-31', '21:00:00', 'SM Seaside, Cebu', 14, 4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL, 500),
(5, 'USC Edu Talk', 'public/images/img7.jpg', 'Year-End USC Edu Talk', '2024-12-20', '17:30:00', 'Rigney Hall, USC TC', 7, 5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL, 100),
(6, 'CESAFI 2025', 'public/images/img16.jpg', 'The annual CESAFI event.', '2025-02-14', '12:00:00', 'Cebu City Sports Complex', 5, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL, 800),
(7, 'Cebu Book Fair 2025', 'public/images/img17.jpg', 'Explore a wide variety of books and meet authors.', '2025-04-20', '09:00:00', 'Cebu Convention Center', 7, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL, 250),
(8, 'IT Park Jam 2025', 'public/images/img18.jpg', 'Live performances by top bands and artists.', '2025-07-05', '19:00:00', 'Cebu IT Park Amphitheater', 2, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL, 1000);

LOCK TABLES `event` WRITE;

UNLOCK TABLES;