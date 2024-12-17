-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 17, 2024 at 06:30 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

DROP Database IF EXISTS eventuallydb;
CREATE Database eventuallydb;
USE eventuallydb;

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `eventuallydb`
--

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `category_id` int(11) NOT NULL,
  `category_name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `category`
--

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

-- --------------------------------------------------------

--
-- Table structure for table `event`
--

CREATE TABLE `event` (
  `event_id` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `photo` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `event_datetime` datetime NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `event`
--

INSERT INTO `event` (`event_id`, `title`, `photo`, `description`, `event_datetime`, `address`, `category_id`, `user_id`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'Notion Tech Conference', 'http://localhost:3000/images/img11.jpg', 'A conference about emerging technologies.', '2025-01-09 10:00:00', 'Ayala Central Bloc', 11, 1, '2024-12-17 05:27:34', '2024-12-17 05:27:34', NULL),
(2, 'Art Expo 2025', 'http://localhost:3000/images/img15.jpg', 'Showcasing art from around the world.', '2025-03-15 18:00:00', 'Cebu Art Hall, Colon', 15, 2, '2024-12-17 05:27:34', '2024-12-17 05:27:34', NULL),
(3, 'Talamban Cleanup Drive', 'http://localhost:3000/images/img12.jpg', 'Join us to clean up our community.', '2025-06-18 08:00:00', 'Rosedale, Cebu', 12, 3, '2024-12-17 05:27:34', '2024-12-17 05:27:34', NULL),
(4, 'New Year Eve Party', 'http://localhost:3000/images/img14.jpg', 'Celebrate the new year with music and fun.', '2024-12-31 21:00:00', 'SM Seaside, Cebu', 14, 1, '2024-12-17 05:27:34', '2024-12-17 05:27:34', NULL),
(5, 'USC Edu Talk', 'http://localhost:3000/images/img7.jpg', 'Year-End USC Edu Talk', '2024-12-20 17:30:00', 'Rigney Hall, USC TC', 7, 2, '2024-12-17 05:27:34', '2024-12-17 05:27:34', NULL),
(6, 'CESAFI 2025', 'http://localhost:3000/images/img16.jpg', 'The annual CESAFI event.', '2025-02-14 12:00:00', 'Cebu City Sports Complex', 5, 3, '2024-12-17 05:27:34', '2024-12-17 05:27:34', NULL),
(7, 'Cebu Book Fair 2025', 'http://localhost:3000/images/img17.jpg', 'Explore a wide variety of books and meet authors.', '2025-04-20 09:00:00', 'Cebu Convention Center', 7, 1, '2024-12-17 05:27:34', '2024-12-17 05:27:34', NULL),
(8, 'IT Park Jam 2025', 'http://localhost:3000/images/img18.jpg', 'Live performances by top bands and artists.', '2025-07-05 19:00:00', 'Cebu IT Park Amphitheater', 2, 2, '2024-12-17 05:27:34', '2024-12-17 05:27:34', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `notification`
--

CREATE TABLE `notification` (
  `notification_id` int NOT NULL,
  `rsvp_id` int NOT NULL,
  `message` text NOT NULL,
  `status` enum('Unread','Read') DEFAULT 'Unread'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `rsvp`
--

CREATE TABLE `rsvp` (
  `rsvp_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `event_id` int(11) NOT NULL,
  `status` enum('Going','Maybe','Not Going') DEFAULT 'Maybe',
  `rsvp_date` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `username`, `email`, `password_hash`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'Marlex', 'marlex@gmail.com', '$2b$10$uPxtw/cVOKac9oDr9LI34OufHo4acDmXO2.LTObsgOGi5g9l3GAvm', '2024-12-17 05:24:38', '2024-12-17 05:24:38', NULL),
(2, 'Sean', 'sean@gmail.com', '$2b$10$6V0DGCCYPCb3NxZVHzODL.pRsSkdw0IKO2rEg8mZj/uKwJo7GDuWu', '2024-12-17 05:24:38', '2024-12-17 05:24:38', NULL),
(3, 'Venz', 'venz@gmail.com', '$2b$10$AjEwYhzW3CAGaVXe7GCjVegguiCHYBFdJkZoJYer8P2T/mHyVovyS', '2024-12-17 05:24:38', '2024-12-17 05:24:38', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`category_id`);

--
-- Indexes for table `event`
--
ALTER TABLE `event`
  ADD PRIMARY KEY (`event_id`),
  ADD KEY `category_id` (`category_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `notification`
--
ALTER TABLE `notification`
  ADD PRIMARY KEY (`notification_id`),
  ADD KEY `rsvp_id` (`rsvp_id`);

--
-- Indexes for table `rsvp`
--
ALTER TABLE `rsvp`
  ADD PRIMARY KEY (`rsvp_id`),
  ADD KEY `rsvp_ibfk_1` (`user_id`),
  ADD KEY `rsvp_ibfk_2` (`event_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `event`
--
ALTER TABLE `event`
  MODIFY `event_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `notification`
--
ALTER TABLE `notification`
  MODIFY `notification_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `rsvp`
--
ALTER TABLE `rsvp`
  MODIFY `rsvp_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `event`
--
ALTER TABLE `event`
  ADD CONSTRAINT `event_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `category` (`category_id`) ON DELETE SET NULL,
  ADD CONSTRAINT `event_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE SET NULL;

--
-- Constraints for table `notification`
--
ALTER TABLE `notification`
  ADD CONSTRAINT `notification_ibfk_1` FOREIGN KEY (`rsvp_id`) REFERENCES `rsvp` (`rsvp_id`);

--
-- Constraints for table `rsvp`
--
ALTER TABLE `rsvp`
  ADD CONSTRAINT `rsvp_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  ADD CONSTRAINT `rsvp_ibfk_2` FOREIGN KEY (`event_id`) REFERENCES `event` (`event_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
