DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

LOCK TABLES `user` WRITE;

/*
  EMAIL & PASSWORDS:
    marlex@gmail.com - hello123
    sean@gmail.com - 123hello
    venz@gmail.com - 12345678
*/
INSERT INTO `user` (`user_id`, `first_name`, `last_name`, `email`, `password_hash`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'Marlex', 'Manalili', 'marlex@gmail.com', '$2b$10$uPxtw/cVOKac9oDr9LI34OufHo4acDmXO2.LTObsgOGi5g9l3GAvm', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL),
(2, 'Sean', 'Duran', 'sean@gmail.com', '$2b$10$6V0DGCCYPCb3NxZVHzODL.pRsSkdw0IKO2rEg8mZj/uKwJo7GDuWu', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL),
(3, 'Venz', 'Manlangit', 'venz@gmail.com', '$2b$10$AjEwYhzW3CAGaVXe7GCjVegguiCHYBFdJkZoJYer8P2T/mHyVovyS', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL);

UNLOCK TABLES;