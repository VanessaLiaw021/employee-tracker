-- Drop the database employee_db if it already exists --
DROP DATABASE IF EXISTS employee_db;

-- Create the database employee_db --
CREATE DATABASE employee_db;

-- Use employee_db for creating tables -- 
USE employee_db;

-- Create the table for department -- 
CREATE TABLE department (

    -- Column for department id --
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,

    -- Column for department name --
    name VARCHAR(30) NOT NULL
);

-- Create the table for role --
CREATE TABLE role (

    -- Column for role id --
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    
    -- Column for role title 
    title VARCHAR(30) NOT NULL, 

    -- Column for role salary --
    salary VARCHAR(30) NOT NULL, 

    -- Column for role department name as id 
    department_id INT,

    -- Foreign Key for department -- 
    FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE SET NULL
);

-- Create the table for employee --
CREATE TABLE employee (

    -- Column for employee id -- 
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,

    -- Column for employee first name -- 
    first_name VARCHAR(30) NOT NULL,

    -- Column for employee last name -- 
    last_name VARCHAR(30) NOT NULL, 

    -- Column for employee role id -- 
    role_id INT, 

    -- Column for employee manager id -- 
    manager_id INT,

    -- Foreign Key for role --
    FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE SET NULL,

    -- Foreign Key for manager --
    FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE SET NULL
);