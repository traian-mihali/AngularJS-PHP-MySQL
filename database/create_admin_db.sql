-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema admin
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema admin
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `admin` DEFAULT CHARACTER SET utf8 ;
USE `admin` ;

-- -----------------------------------------------------
-- Table `admin`.`departments`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `admin`.`departments` (
  `department_id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NULL DEFAULT NULL,
  PRIMARY KEY (`department_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 24
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `admin`.`offices`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `admin`.`offices` (
  `office_id` INT(11) NOT NULL AUTO_INCREMENT,
  `office_name` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`office_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 8
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `admin`.`department_offices`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `admin`.`department_offices` (
  `department_id` INT(11) NOT NULL,
  `office_id` INT(11) NOT NULL,
  PRIMARY KEY (`department_id`, `office_id`),
  INDEX `fk_department_offices_offices1_idx` (`office_id` ASC) VISIBLE,
  INDEX `fk_department_offices_departments1_idx` (`department_id` ASC) VISIBLE,
  CONSTRAINT `fk_department_offices_departments1`
    FOREIGN KEY (`department_id`)
    REFERENCES `admin`.`departments` (`department_id`)
    ON UPDATE CASCADE,
  CONSTRAINT `fk_department_offices_offices1`
    FOREIGN KEY (`office_id`)
    REFERENCES `admin`.`offices` (`office_id`)
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `admin`.`employees`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `admin`.`employees` (
  `employee_id` INT(11) NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(50) NOT NULL,
  `last_name` VARCHAR(50) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `birthdate` DATE NULL DEFAULT NULL,
  `is_manager` TINYINT(4) NULL DEFAULT '0',
  `department_id` INT(11) NULL DEFAULT NULL,
  `office_id` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (`employee_id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE,
  INDEX `fk_employees_departments1_idx` (`department_id` ASC) VISIBLE,
  INDEX `fk_employees_offices1_idx` (`office_id` ASC) VISIBLE,
  CONSTRAINT `fk_employees_departments1`
    FOREIGN KEY (`department_id`)
    REFERENCES `admin`.`departments` (`department_id`)
    ON DELETE SET NULL
    ON UPDATE CASCADE,
  CONSTRAINT `fk_employees_offices1`
    FOREIGN KEY (`office_id`)
    REFERENCES `admin`.`offices` (`office_id`)
    ON DELETE SET NULL
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `admin`.`monthly_income`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `admin`.`monthly_income` (
  `monthly_income_id` INT(11) NOT NULL AUTO_INCREMENT,
  `month_year` DATE NOT NULL,
  `gross_income` DECIMAL(8,2) NOT NULL,
  `employee_id` INT(11) NOT NULL,
  PRIMARY KEY (`monthly_income_id`),
  INDEX `fk_monthly_income_employees1_idx` (`employee_id` ASC) VISIBLE,
  CONSTRAINT `fk_monthly_income_employees1`
    FOREIGN KEY (`employee_id`)
    REFERENCES `admin`.`employees` (`employee_id`)
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `admin`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `admin`.`users` (
  `user_id` INT(11) NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `name` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`user_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
