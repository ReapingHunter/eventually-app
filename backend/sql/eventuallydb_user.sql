-- Drop table if it exists
DROP TABLE IF EXISTS `user`;

-- Create table with updated schema
CREATE TABLE `user` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

LOCK TABLES `user` WRITE;

-- Insert table with data
/*
  EMAIL & PASSWORDS:
    marlex@gmail.com - hello123
    sean@gmail.com - 123hello
    venz@gmail.com - 12345678
*/
INSERT INTO `user` (`user_id`, `username`, `email`, `password_hash`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'Marlex', 'marlex@gmail.com', '$2b$10$uPxtw/cVOKac9oDr9LI34OufHo4acDmXO2.LTObsgOGi5g9l3GAvm', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL),
(2, 'Sean', 'sean@gmail.com', '$2b$10$6V0DGCCYPCb3NxZVHzODL.pRsSkdw0IKO2rEg8mZj/uKwJo7GDuWu', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL),
(3, 'Venz', 'venz@gmail.com', '$2b$10$AjEwYhzW3CAGaVXe7GCjVegguiCHYBFdJkZoJYer8P2T/mHyVovyS', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL);

UNLOCK TABLES;