-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 18, 2024 at 05:03 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `postcodedb`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_postcodes`
--

CREATE TABLE `tbl_postcodes` (
  `postcodeID` int(11) NOT NULL,
  `postcode` varchar(8) NOT NULL,
  `Longitude` decimal(10,6) DEFAULT NULL,
  `Latitude` decimal(10,6) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `tbl_postcodes`
--

INSERT INTO `tbl_postcodes` (`postcodeID`, `postcode`, `Longitude`, `Latitude`) VALUES
(4, '57400', 72.568900, 76.456780),
(5, 'CH14BJ', 0.000000, 76.456780),
(6, '33101 Mi', -80.191800, 25.761700),
(7, '10001 Ne', -74.006000, 40.712800),
(8, '10178 Be', 13.405000, 52.520000),
(9, '20095', 9.993700, 53.551100),
(10, 'B4 7DA', -1.890401, 52.486243);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_users`
--

CREATE TABLE `tbl_users` (
  `userID` int(11) NOT NULL,
  `Username` varchar(255) NOT NULL,
  `Password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `tbl_users`
--

INSERT INTO `tbl_users` (`userID`, `Username`, `Password`) VALUES
(2, 'tahir', '$2b$10$NoXl0/DatGMZ/.tZjI1oAOfE4PzOe3w52X5xauNIvjyhyQS.ErJMG'),
(3, 'admin', '$2b$10$RAJ1iYbTtesErKtj4tYGwOPNMbKTeAWhy77EhMp43L7IwiUqYnGCK');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_postcodes`
--
ALTER TABLE `tbl_postcodes`
  ADD PRIMARY KEY (`postcodeID`);

--
-- Indexes for table `tbl_users`
--
ALTER TABLE `tbl_users`
  ADD PRIMARY KEY (`userID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tbl_postcodes`
--
ALTER TABLE `tbl_postcodes`
  MODIFY `postcodeID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `tbl_users`
--
ALTER TABLE `tbl_users`
  MODIFY `userID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
