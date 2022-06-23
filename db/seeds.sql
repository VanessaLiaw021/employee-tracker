-- Added pre populated values for department table --
INSERT INTO department (name)
VALUES  ("Sales"),
        ("Engineering"),
        ("Finance"), 
        ("Legal"),
        ("Human Resources"),
        ("IT");

-- Added pre populated values for role table --
INSERT INTO role (title, salary, department_id)
VALUES  ("Sales Lead", 100000, 1),
        ("Salesperson", 100000, 1), 
        ("Lead Engineer", 120000, 2), 
        ("Software Engineer", 150000, 2),
        ("Account Manager", 110000, 3),
        ("Accountant", 115000, 3), 
        ("Legal Team Lead", 120000, 4), 
        ("Lawyer", 130000, 4), 
        ("HR Manager", 100000, 5), 
        ("HR Assistant", 100000, 5), 
        ("IT Manager", 150000, 6), 
        ("IT Help Desk Support", 160000, 6);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ("John", "Fred", 1, null),
        ("Mike", "Sanders", 2, 1),
        ("Beck", "Tank", 3, null), 
        ("Ashely", "Lane", 4, 3),
        ("Matt", "Anderson", 5, null),
        ("William", "Brown", 6, 5),
        ("Nicole", "Grant", 7, null),
        ("Sarah", "Smith", 8, 7),
        ("Kate", "Johnson", 9, null),
        ("Peter", "Wiliiams", 10, 9),
        ("Smith", "Baker", 11, null), 
        ("Emma", "Garcia", 12, 11);