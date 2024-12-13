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

INSERT INTO `user` (`user_id`, `first_name`, `last_name`, `email`, `password_hash`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'John', 'Doe', 'john.doe@gmail.com', '$2b$10$K.qDbFjMOnfj8fy1YOEfZO0US67AZ1a64n.vwBmO1eIY5fgjZ9.NK', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL),
(2, 'Jane', 'Smith', 'jane.smith@gmail.com', '$2b$10$WiAczOQzRaLqoeH//rBmtOXh0jkRHGccBh/tsoQIDtD1JfL1.76zK', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL),
(3, 'Admin', 'User', 'admin@gmail.com', '$2b$10$EeE1x9pkvi5AYizvTfPueuwP1TBGgFt0aN.rfxi6X5Bv41eP.o4z.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL);

UNLOCK TABLES;