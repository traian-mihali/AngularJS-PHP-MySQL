-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema admin
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema admin
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `admin` DEFAULT CHARACTER SET utf8 ;
USE `admin` ;

-- -----------------------------------------------------
-- Table `admin`.`offices`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `admin`.`offices` (
  `office_id` INT(11) NOT NULL AUTO_INCREMENT,
  `office_name` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`office_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `admin`.`departments`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `admin`.`departments` (
  `department_id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NULL,
  PRIMARY KEY (`department_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `admin`.`salaries`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `admin`.`salaries` (
  `salary_id` INT(11) NOT NULL AUTO_INCREMENT,
  `monthly_gross_income` DECIMAL(6,2) NOT NULL,
  PRIMARY KEY (`salary_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `admin`.`employees`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `admin`.`employees` (
  `employee_id` INT(11) NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(50) NOT NULL,
  `last_name` VARCHAR(50) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `birthdate` DATE NULL DEFAULT NULL,
  `is_manager` TINYINT NULL,
  `salary_id` INT(11) NOT NULL,
  `office_id` INT(11) NOT NULL,
  `department_id` INT(11) NOT NULL,
  PRIMARY KEY (`employee_id`),
  INDEX `fk_employees_salaries1_idx` (`salary_id` ASC) VISIBLE,
  INDEX `fk_employees_offices1_idx` (`office_id` ASC) VISIBLE,
  INDEX `fk_employees_departments1_idx` (`department_id` ASC) VISIBLE,
  CONSTRAINT `fk_employees_salaries1`
    FOREIGN KEY (`salary_id`)
    REFERENCES `admin`.`salaries` (`salary_id`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE,
  CONSTRAINT `fk_employees_offices1`
    FOREIGN KEY (`office_id`)
    REFERENCES `admin`.`offices` (`office_id`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE,
  CONSTRAINT `fk_employees_departments1`
    FOREIGN KEY (`department_id`)
    REFERENCES `admin`.`departments` (`department_id`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `admin`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `admin`.`users` (
  `user_id` INT(11) NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `name` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`user_id`))
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
