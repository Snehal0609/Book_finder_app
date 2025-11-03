-- This script is ready to run in MySQL Workbench.

-- Task 1: Create the database model
CREATE TABLE Campers (
    CamperID INT PRIMARY KEY,
    FirstName VARCHAR(50),
    MiddleName VARCHAR(50),
    LastName VARCHAR(50),
    Email VARCHAR(100) UNIQUE,
    DateOfBirth DATE,
    Gender VARCHAR(10),
    PersonalPhone VARCHAR(20) UNIQUE
);

CREATE TABLE Camps (
    CampID INT PRIMARY KEY,
    CampTitle VARCHAR(100),
    StartDate DATE,
    EndDate DATE,
    Capacity INT,
    Price DECIMAL(10, 2)
);

CREATE TABLE CampRegistrations (
    RegistrationID INT PRIMARY KEY,
    CamperID INT,
    CampID INT,
    RegistrationDate DATE,
    FOREIGN KEY (CamperID) REFERENCES Campers(CamperID),
    FOREIGN KEY (CampID) REFERENCES Camps(CampID)
);

-- Task 2: Populate tables with sample and random data
-- Note: This part includes the necessary INSERT statements for validation.

-- Disable safe update mode for this script
SET SQL_SAFE_UPDATES = 0;

-- Drop procedure if it exists to allow re-running the script
DROP PROCEDURE IF EXISTS PopulateCampers;

-- Stored procedure to populate the Campers table with 5000 random entries
DELIMITER $$
CREATE PROCEDURE PopulateCampers()
BEGIN
    DECLARE i INT DEFAULT 1;
    DECLARE gender_val VARCHAR(10);
    DECLARE dob_val DATE;
    DECLARE current_date DATE DEFAULT '2025-09-16'; 
    DECLARE birth_year INT;
    DECLARE birth_month INT;
    DECLARE birth_day INT;

    TRUNCATE TABLE Campers;

    -- Insert Lakshmi's record for validation
    INSERT INTO Campers (CamperID, FirstName, LastName, Email, DateOfBirth, Gender, PersonalPhone)
    VALUES (9000, 'Lakshmi', 'Iyer', 'lakshmi.iyer@example.com', '2009-05-21', 'Female', '555-1234567890');
    
    WHILE i <= 5000 DO
        IF RAND() <= 0.65 THEN
            SET gender_val = 'Female';
        ELSE
            SET gender_val = 'Male';
        END IF;

        SET @rand_num = RAND();
        IF @rand_num <= 0.18 THEN SET birth_year = YEAR(current_date) - FLOOR(RAND() * 6) - 7;
        ELSEIF @rand_num <= 0.45 THEN SET birth_year = YEAR(current_date) - FLOOR(RAND() * 2) - 13;
        ELSEIF @rand_num <= 0.65 THEN SET birth_year = YEAR(current_date) - FLOOR(RAND() * 3) - 15;
        ELSE SET birth_year = YEAR(current_date) - FLOOR(RAND() * 5) - 15;
        END IF;

        SET birth_month = FLOOR(RAND() * 12) + 1;
        SET birth_day = FLOOR(RAND() * 28) + 1;
        SET dob_val = MAKEDATE(birth_year, birth_month * 31 + birth_day);

        INSERT INTO Campers (CamperID, FirstName, LastName, Email, DateOfBirth, Gender, PersonalPhone)
        VALUES (i, CONCAT('Camper', i), 'Test', CONCAT('camper', i, '@test.com'), dob_val, gender_val, CONCAT('555-01', i));

        SET i = i + 1;
    END WHILE;
END$$
DELIMITER ;

-- Call the procedure to run the script
CALL PopulateCampers();

-- Insert sample data into the Camps table for validation
INSERT INTO Camps (CampID, CampTitle, StartDate, EndDate, Capacity, Price)
VALUES
(1, 'Tech Explorers Camp', '2022-07-15', '2022-07-29', 50, 450.00),
(2, 'Art & Design Workshop', '2023-06-10', '2023-06-20', 30, 300.00),
(3, 'Young Leader Academy', '2024-08-01', '2024-08-15', 40, 550.00),
(4, 'Robotics Summer Camp', '2025-07-05', '2025-07-19', 60, 600.00);

-- Insert data into the CampRegistrations table to link campers to camps
INSERT INTO CampRegistrations (RegistrationID, CamperID, CampID, RegistrationDate)
VALUES
(1, 9000, 2, '2023-05-01'), -- Lakshmi visited in 2023
(2, 9000, 4, '2025-06-01');  -- Lakshmi visited in 2025