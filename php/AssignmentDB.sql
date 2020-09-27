-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 27, 2020 at 02:59 PM
-- Server version: 10.4.14-MariaDB
-- PHP Version: 7.4.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `interactiveassignmenttool`
--

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `adminemail` varchar(100) NOT NULL,
  `term` varchar(50) NOT NULL,
  `adminname` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`adminemail`, `term`, `adminname`) VALUES
('egebircann@sabanciuniv.edu', '2000-2001 Fall', 'Husnu Yenigun');

-- --------------------------------------------------------

--
-- Table structure for table `assignments`
--

CREATE TABLE `assignments` (
  `coursename` varchar(100) NOT NULL,
  `sectionname` varchar(100) NOT NULL,
  `sectiontime` varchar(100) NOT NULL,
  `studentemail` varchar(100) NOT NULL,
  `studentname` varchar(100) NOT NULL,
  `totalscore` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `assignments`
--

INSERT INTO `assignments` (`coursename`, `sectionname`, `sectiontime`, `studentemail`, `studentname`, `totalscore`) VALUES
('IF 100', 'IF 100R - A11', '6:40 pm - 8:30 pm - R', 'atakanataman@sabanciuniv.edu', 'NECİP BİRCAN', 10),
('IF 100', 'IF 100R - A2', '8:40 am - 10:30 am - R', 'egebircan@sabanciuniv.edu', 'NECİP BİRCAN', 10);

-- --------------------------------------------------------

--
-- Table structure for table `assistantdeclarations`
--

CREATE TABLE `assistantdeclarations` (
  `crncode` int(10) NOT NULL,
  `term` varchar(50) NOT NULL,
  `studentemail` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `assistantdeclarations`
--

INSERT INTO `assistantdeclarations` (`crncode`, `term`, `studentemail`) VALUES
(10266, '2015-2016 Spring', 'egebircan@sabanciuniv.edu');

-- --------------------------------------------------------

--
-- Table structure for table `courses`
--

CREATE TABLE `courses` (
  `term` varchar(50) NOT NULL,
  `course` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `courses`
--

INSERT INTO `courses` (`term`, `course`) VALUES
('2015-2016 Fall', 'IF 100');

-- --------------------------------------------------------

--
-- Table structure for table `instructoraddedcourse`
--

CREATE TABLE `instructoraddedcourse` (
  `id` int(11) NOT NULL,
  `instructoremail` varchar(100) NOT NULL,
  `course` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `instructoraddedcourse`
--

INSERT INTO `instructoraddedcourse` (`id`, `instructoremail`, `course`) VALUES
(3, 'kerembora@sabanciuniv.edu', 'NS 101'),
(5, 'duygukaltop@sabanciuniv.edu', 'IF 100'),
(6, 'adagideli@sabanciuniv.edu', 'NS 101'),
(7, 'zeynepdelen@sabanciuniv.edu', 'NS 101');

-- --------------------------------------------------------

--
-- Table structure for table `instructoraddedstudent`
--

CREATE TABLE `instructoraddedstudent` (
  `instructoremail` varchar(50) NOT NULL,
  `studentemail` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `instructoraddedstudent`
--

INSERT INTO `instructoraddedstudent` (`instructoremail`, `studentemail`) VALUES
('hyenigun@sabanciuniv.edu', 'atakanataman@sabanciuniv.edu');

-- --------------------------------------------------------

--
-- Table structure for table `instructordeclaredassistant`
--

CREATE TABLE `instructordeclaredassistant` (
  `instructoremail` varchar(100) NOT NULL,
  `studentemail` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `instructordeclaredassistant`
--

INSERT INTO `instructordeclaredassistant` (`instructoremail`, `studentemail`) VALUES
('hyenigun@sabanciuniv.edu', 'atakanataman@sabanciuniv.edu');

-- --------------------------------------------------------

--
-- Table structure for table `instructors`
--

CREATE TABLE `instructors` (
  `instructoremail` varchar(100) NOT NULL,
  `instructorname` varchar(50) NOT NULL,
  `term` varchar(50) NOT NULL,
  `coursename` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `instructors`
--

INSERT INTO `instructors` (`instructoremail`, `instructorname`, `term`, `coursename`) VALUES
('egebircan@sabanciuniv.edu', 'Duygu Karaoğlan Altop', '2015-2016 Fall', 'IF 100');

-- --------------------------------------------------------

--
-- Table structure for table `studentdeclaredpreference`
--

CREATE TABLE `studentdeclaredpreference` (
  `studentemail` varchar(100) NOT NULL,
  `preferenceid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `studentdeclaredpreference`
--

INSERT INTO `studentdeclaredpreference` (`studentemail`, `preferenceid`) VALUES
('atakanataman', 7),
('egebircan', 8),
('broyuksel', 11),
('ahmet', 12),
('atakanataman@sabanciuniv.edu', 16),
('egebircan@sabanciuniv.edu', 17);

-- --------------------------------------------------------

--
-- Table structure for table `studentpreference`
--

CREATE TABLE `studentpreference` (
  `studentemail` varchar(100) NOT NULL,
  `preferencedegree` int(5) NOT NULL,
  `preferencestring` varchar(100) NOT NULL,
  `coursename` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `studentpreference`
--

INSERT INTO `studentpreference` (`studentemail`, `preferencedegree`, `preferencestring`, `coursename`) VALUES
('egebircan@sabanciuniv.edu', 10, '8:40 am - 10:30 am - R', 'IF 100'),
('egebircan@sabanciuniv.edu', 8, '6:40 pm - 8:30 pm - R', 'IF 100'),
('egebircan@sabanciuniv.edu', 9, '4:40 pm - 6:30 pm - R', 'IF 100');

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE `students` (
  `studentemail` varchar(100) NOT NULL,
  `studentname` varchar(50) NOT NULL,
  `role` varchar(50) NOT NULL,
  `studentnumber` int(10) NOT NULL,
  `workhours` int(5) NOT NULL,
  `assistantscore` double NOT NULL,
  `course` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `students`
--

INSERT INTO `students` (`studentemail`, `studentname`, `role`, `studentnumber`, `workhours`, `assistantscore`, `course`) VALUES
('atakanataman@sabanciuniv.edu', 'NECİP BİRCAN', 'LA', 20951, 2, 5, 'IF 100'),
('egebircan@sabanciuniv.edu', 'NECİP BİRCAN', 'TA', 20950, 1, 3, 'IF 100');

-- --------------------------------------------------------

--
-- Table structure for table `terms`
--

CREATE TABLE `terms` (
  `term` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `terms`
--

INSERT INTO `terms` (`term`) VALUES
('2015-2016 Fall');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`adminemail`);

--
-- Indexes for table `assistantdeclarations`
--
ALTER TABLE `assistantdeclarations`
  ADD PRIMARY KEY (`crncode`),
  ADD UNIQUE KEY `studentnumber` (`studentemail`);

--
-- Indexes for table `courses`
--
ALTER TABLE `courses`
  ADD UNIQUE KEY `course` (`course`);

--
-- Indexes for table `instructoraddedcourse`
--
ALTER TABLE `instructoraddedcourse`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `instructoraddedstudent`
--
ALTER TABLE `instructoraddedstudent`
  ADD PRIMARY KEY (`studentemail`);

--
-- Indexes for table `instructordeclaredassistant`
--
ALTER TABLE `instructordeclaredassistant`
  ADD PRIMARY KEY (`studentemail`);

--
-- Indexes for table `instructors`
--
ALTER TABLE `instructors`
  ADD PRIMARY KEY (`instructoremail`);

--
-- Indexes for table `studentdeclaredpreference`
--
ALTER TABLE `studentdeclaredpreference`
  ADD PRIMARY KEY (`studentemail`),
  ADD UNIQUE KEY `preferenceid` (`preferenceid`);

--
-- Indexes for table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`studentemail`),
  ADD UNIQUE KEY `[studentnumber]` (`studentnumber`);

--
-- Indexes for table `terms`
--
ALTER TABLE `terms`
  ADD PRIMARY KEY (`term`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `instructoraddedcourse`
--
ALTER TABLE `instructoraddedcourse`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `studentdeclaredpreference`
--
ALTER TABLE `studentdeclaredpreference`
  MODIFY `preferenceid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
