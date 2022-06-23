//Import required packages 
const mysql2 = require("mysql2");
const inquirer = require("inquirer");
const consoleTable = require("console.table");

//Create a connection with mysql database 
const connection = mysql2.createConnection (
    {
        host: "localhost", 
        user: "root", 
        password: "",
        database: "employee_db"
    },

    //Display that show connected to employee_db
    console.log("Connected to the employee_db database")
);

// //Connect to mysql database 
connection.connect (err => {

    //If error exist, display the error 
    if (err) console.log(err);

    //Call the function to prompt the menu selection
    promptMenuSelection();
});

//Function that prompt the user for menu selection 
const promptMenuSelection = () => {
    //Array of questions to prompt user with a menu selection 
    const questions = [
        {
            //Question for menu selection 
            type: "list", 
            name: "menu", 
            message: "What would you like to do?",
            choices: [
                "View All Departments",
                "View All Roles", 
                "View All Employees",
                "View Employee by Department",
                "View Employee by Manager",
                "Update Employee's Role", 
                "Update Employee's Manager",
                "Add Department", 
                "Add Role",
                "Add Employee", 
                "Delete Department", 
                "Delete Role", 
                "Delete Employee",
                "Utilized Budget of a department",
                "End Program"
            ]
        }
    ];

    //Prompt user for menu selection, then call the function based on the menu selection 
    inquirer.prompt(questions).then(response => {

        //Switch statement to determine the user menu selection and call that function
        switch (response.menu) {

            //Case to view departments
            case "View All Departments":
                viewAllDepartments();
                break;

            //Case to view all roles
            case "View All Roles":
                viewAllRoles();
                break;

            //Case to view all employees
            case "View All Employees":
                viewAllEmployees();
                break;

            //Case to view employee by department
            case "View Employee by Department":
                viewEmployeeByDepartments();
                break;

            //Case to view employee by manager
            case "View Employee by Manager":
                viewEmployeeByManagers();
                break;

            //Case to update employee role
            case "Update Employee's Role":
                updateEmployeeRole();
                break;

            //Case to update employee manager
            case "Update Employee's Manager":
                updateEmployeeManager();
                break;

            //Case to add department
            case "Add Department":
                addDepartment();
                break;

            //Case to add role
            case "Add Role":
                addRole();
                break;
            
            //Case to add employee
            case "Add Employee":
                addEmployee();
                break;
            
            //Case to delete department
            case "Delete Department":
                deleteDepartment();
                break;
            
            //Case to delete role
            case "Delete Role":
                deleteRole();
            
            //Case to delete employee
            case "Delete Employee":
                deleteEmployee();
                break;

            //Case to delete employee
            case "Utilized Budget of a department":
                budgetByDepartment();
                break;
            
            //Case to end program
            case "End Program":
                connection.end();
                break;

            //Default for errors
            default:
                console.log("Error has occur");
                break;
        };
    });
};

//Function to view departments 
const viewAllDepartments = () => {

    //Query for viewing all departments
    const queryViewDept = "SELECT * FROM department";

    //Connect to employee_db database
    connection.query(queryViewDept, (err, data) => {

        //If error exist, display the error 
        if (err) console.log(err);  

        //Display a heading for viewing all department
        console.log(`
            --------------------------
            | Viewing All Department |
            --------------------------
        `);

        //Display the department table 
        console.table(data);

        //Call the function to prompt user with menu selection
        promptMenuSelection();
    });
};

//Function to view role 
const viewAllRoles = () => {

    //Query for viewing all roles
    const queryViewRole = `
        SELECT role.id, role.title, department.name AS department, role.salary
        FROM role 
        INNER JOIN department ON department.id = role.department_id
    `;

    //Connect to the employee_db database 
    connection.query(queryViewRole, (err, data) => {

        //If error exist, display the error 
        if (err) console.log(err);

        //Display a heading for viewing all roles
        console.log(`
            ---------------------
            | Viewing All Roles |
            ---------------------
        `);

        //Display the role table
        console.table(data);

        //Call the function to prompt user with menu selection
        promptMenuSelection(); 
    });
};

//Function to view employee
const viewAllEmployees = () => {

    //Query for viewing all employees
    const queryViewEmp = `
        SELECT employee.id, employee.first_name, employee.last_name, role.title AS title, 
            department.name AS department, role.salary AS salary, employee.manager_id AS manager
        FROM employee 
        LEFT JOIN role ON role.id = employee.role_id
        LEFT JOIN department ON department.id = role.department_id
    `;

    //Connect to the employee_db database 
    connection.query(queryViewEmp, (err, data) => {

        //If error exist, display the error
        if (err) console.log(err);
    
        //Display a heading for viewing all roles
        console.log(`
            -------------------------
            | Viewing All Employees |
            -------------------------
        `);

        //Display the role table
        console.table(data);

        //Call the function to prompt user with menu selection
        promptMenuSelection(); 
    });
};

//Function to view employee by department (BOUNS FUNCTINALITY FUNCTION)
const viewEmployeeByDepartments = () => {

    //Query for viewing employee by department 
    const queryViewEmpByDept = `
        SELECT employee.id, employee.first_name, employee.last_name, role.title AS title, 
            department.name AS department, role.salary AS salary, employee.manager_id AS manager
        FROM employee 
        LEFT JOIN role on role.id = employee.role_id 
        LEFT JOIN department on department.id = role.department_id
        WHERE department.id = ?
    `;

    //Query for getting the list of department choices 
    const queryDeptList = "SELECT * FROM department";

    //Connect to the employee_db database to get the list of department choices 
    connection.query(queryDeptList, (err, data) => {
        
        //If error exist, display the error
        if (err) console.log(err);

        //Get the list of department list for choices
        const deptList = data.map(department => {
            return { name: department.name, value: department.id };
        });

        //Array of question for viewing employee by department 
        const empByDeptQuestion = [
            {
                type: "list", 
                name: "empByDept",
                message: "Which department to view the employee be?",
                choices: deptList
            }
        ];

        //Prompt user for viewing employee by department, then display employee by department
        inquirer.prompt(empByDeptQuestion).then(response => {

            //Connect to the employee_db database 
            connection.query(queryViewEmpByDept, response.empByDept, (err, data) => {

                //If error exist, display the error
                if (err) console.log(err);

                //Display a heading for viewing employee by department
                console.log(`
                    -----------------------------------
                    | Viewing Employees By Department |
                    -----------------------------------
                `);

                //Display the employee by department
                console.table(data);

                //Call the function to prompt user with menu selection
                promptMenuSelection(); 
            });
        });
    });
};

//Function to view employee by managers (BOUNS FUNCTIONALITY FUNCTION)
const viewEmployeeByManagers = () => {

    //Query for viewing employee by manager
    const queryViewEmpByManager = `
        SELECT employee.id, employee.first_name, employee.last_name, role.title AS title, 
            department.name AS department, role.salary AS salary, employee.manager_id AS manager
        FROM employee 
        LEFT JOIN role on role.id = employee.role_id 
        LEFT JOIN department on department.id = role.department_id
        WHERE manager_id = ?
    `;

    //Query for getting a list of managers name 
    const queryManagetList = "SELECT * FROM employee";

    //Connect to the employee_db database to get the list of manager choices  
    connection.query(queryManagetList, (err, data) => {

        //If error exist, display error
        if (err) console.log(err);

        //Get the list of manager name
        const managerList = data.map(manager => {
            return { name: `${manager.first_name} ${manager.last_name}`, value: manager.manager_id }
        });

        //Array of question to view employee by manager 
        const viewEmpByManagerQuestion = [
            {
                type: "list", 
                name: "empByManager", 
                message: "Which manager would you like to view the employee by?",
                choices: managerList
            }
        ];

        //Prompt user for viewing employee by manager, then display it 
        inquirer.prompt(viewEmpByManagerQuestion).then(response => {

            //Connect to the employee_db database 
            connection.query(queryViewEmpByManager, response.empByManager, (err, data) => {

                //If error exist, display error
                if (err) console.log(err);

                //Display a heading for viewing employee by manager
                console.log(`
                    --------------------------------
                    | Viewing Employees By Manager |
                    --------------------------------
                `);

                //Display the employee by manager
                console.table(data);

                //Call the function to prompt user with menu selection
                promptMenuSelection(); 
            });
        });
    });
};

//Function to update employee role 
const updateEmployeeRole = () => {

    //Query for updating employee role 
    const queryUpdateEmpRole = "UPDATE employee SET ? WHERE ?";

    //Query for getting a list of employee names 
    const queryEmpList = "SELECT * FROM employee";

    //Query for getting a list of role name 
    const queryRoleList = "SELECT * FROM role";

    //Connect to employee_db to get a list of employee names 
    connection.query(queryEmpList, (err, data) => {

        //If error exist, display the error
        if (err) console.log(err);

        //Get the list of employees list for choices
        const empList = data.map(emp => {
            return { name: emp.first_name, value: emp.id };
        });

        //Connect to employee_db to get a list of role names
        connection.query(queryRoleList, (err, data) => {

            //If error exist, display the error
            if (err) console.log(err);

            //Get the list of employees list for choices
            const roleList = data.map(role => {
                return { name: role.title, value: role.id };
            });

            //Array of question for list of employee 
            const updateEmpQuestion = [
                {
                    //Question for list of employee
                    type: "list", 
                    name: "updateEmp",
                    message: "Which employee would you like to update their role?",
                    choices: empList
                },
                {
                    //Question for list of role to update
                    type: "list",
                    name: "listRole", 
                    message: "What role do you want to update for this employee?", 
                    choices: roleList
                }
            ];

            //Prompt user for updating the employee role, then it is updated to the database 
            inquirer.prompt(updateEmpQuestion).then(response => {

                //Connect to employee_db database
                connection.query(queryUpdateEmpRole, [

                    //Set the role id as the id the user input and update the role
                    { role_id: response.listRole },
                    { id: response.updateEmp }

                ], err => {

                    //If error exist, display the error
                    if (err) console.log(err);

                    //Display 
                    console.log(`${response.updateEmp}'s has been updated`);

                    //Call the function to prompt user with menu selection
                    promptMenuSelection();
                });
            });
        });
    });
};

//Function to update employee's manager 
const updateEmployeeManager = () => {};

//Function to add a department
const addDepartment = () => {

    //Query to add a department 
    const queryAddDept = "INSERT INTO department SET name = ?";    

    //Array of question for adding department 
    const addDeptQuestion = [
        {
            //Question for adding department
            type: "input", 
            name: "addDept", 
            message: "What department would you like to add?"
        }
    ];

    //Prompt user for adding department, then it is added to department table 
    inquirer.prompt(addDeptQuestion).then(response => {

        //Connect to employee_db database
        connection.query(queryAddDept, response.addDept, err => {

            //If error exist, display the error
            if (err) console.log(err);

            //Display the table
            console.log(`${response.addDept} is added to the department table`);

            //Call the function to prompt user with menu selection
            promptMenuSelection(); 
        });
    });
};

//Function to add a role
const addRole = () => {

    //Query for adding a role 
    const queryAddRole = "INSERT INTO role SET ?";

    //Query for getting a list of department name 
    const queryDepartmentList = "SELECT * FROM department";

    //Connect to the employee_db Database to get the list of department choices
    connection.query(queryDepartmentList, (err, data) => {

        //If error exist, display the error
        if (err) console.log(err);

        //Get the list of department list for choices
        const deptList = data.map(department => {
            return { name: department.name, value: department.id };
        });

        //Array of question to add role 
        const roleQuestions = [
            {
                //Question for role name to add
                type: "input", 
                name: "name",
                message: "What is the name of the role to add?"
            },
            {
                //Question for role salary to add
                type: "input", 
                name: "salary", 
                message: "What is the salary of the role?"
            },
            {
                //Question for role department for the role
                type: "list", 
                name: "department",
                message: "What is the department name for this role?",
                choices: deptList
            }
        ];

        //Prompt user for adding role, then it is added to role table 
        inquirer.prompt(roleQuestions).then(response => {

            //Connect to the employee_db Database
            connection.query (queryAddRole, {
                
                //Set the title, salary, and department_id based on user input
                title: response.name, 
                salary: response.salary, 
                department_id: response.department 
            
            }, err => {

                //If error exist, display the error
                if (err) console.log(err);

                //Display message to let user know the department has been added to the role table 
                console.log(`${response.name} is added to role database`);

                //Call the function to prompt user with menu selection
                promptMenuSelection();
            });
        });
    });
};

//Function add employee
const addEmployee = () => {

    //@uery for adding employee
    const queryAddEmp = `INSERT INTO employee SET ?`;

    //Query for getting the list of roles to be used for choices 
    const queryRoleList = "SELECT * FROM role";

    //Query for getting the list of manager name to be used for choices 
    const queryManagerList = "SELECT * FROM employee";

    //Connect to the employee_db Database to get the list of role choices 
    connection.query(queryRoleList, (err, data) => {

        //If error exist, display the error
        if (err) console.log(err);

        //Get the list of department list for choices
        const roleList = data.map(role => {
            return { name: role.title, value: role.id };
        });

        //Connect to the employee_db Database to get the list of managerList
        connection.query(queryManagerList, (err, data) => {

            //Get the list of manager name
            const managerList = data.map(manager => {
                return { name: `${manager.first_name} ${manager.last_name}`, value: manager.manager_id }
            });

            //If error exist, display the error
            if (err) console.log(err);

            //Array of question to add employee 
            const employeeQuestions = [
                {
                    //Question for employee first name
                    type: "input", 
                    name: "firstName", 
                    message: "What is the employee's first name?"
                },
                {
                    //Question for employee last name
                    type: "input",
                    name: "lastName", 
                    message: "What is the employee's last name?"
                },
                {
                    //Question for employee role
                    type: "list", 
                    name: "role", 
                    message: "What is the employee's role?",
                    choices: roleList
                },
                {
                    //Question for employee's manager name
                    type: "list", 
                    name: "manager", 
                    message: "What is the employee's manager name?",
                    choices: managerList
                }
            ];

            //Prompt user for adding role, then it is added to role table 
            inquirer.prompt(employeeQuestions).then(response => {

                //Connect to the employee_db Database
                connection.query(queryAddEmp, {

                    //Set the first name, last name, role, and manager based on user input
                    first_name: response.firstName,
                    last_name: response.lastName, 
                    role_id: response.role,
                    manager_id: response.manager

                }, err => {

                    //If error exist, display erro
                    if (err) console.log(err);

                    //Display message to let user know the department has been added to the role table 
                    console.log(`${response.firstName} ${response.lastName} is added to role database`);

                    //Call the function to prompt user with menu selection
                    promptMenuSelection();
                });
            });
        });
    });
};

//Function to delete department (BOUNS FUNCTIONALITY FUNCTION)
const deleteDepartment = () => {

    //Query for deleting a department 
    const queryDeleteDept = "DELETE FROM department WHERE department.id = ?";

    //Query for getting the list of department choices to delete 
    const queryDeptList = "SELECT * FROM department";

    //Connect to the employee_db database to get the list of department choices 
    connection.query(queryDeptList, (err, data) => {

        //If error exist, display the error
        if (err) console.log(err);

        //Get the list of department list for choices
        const deptList = data.map(department => {
            return { name: department.name, value: department.id };
        });

        //Array of question to delete department 
        const deleteDeptQuestion = [
            {
                type: "list", 
                name: "deleteDept",
                message: "Which department would you like to delete?",
                choices: deptList
            }
        ];

        //Prompt user for deleting department, then it is deleted 
        inquirer.prompt(deleteDeptQuestion).then(response => {

            //Connect to the employee_dv database 
            connection.query(queryDeleteDept, response.deleteDept, err => {

                //If error exist, display the error
                if (err) console.log(err);

                //Display message that department is deleted 
                console.log(`${response.deleteDept} department is successfully deleted`);

                //Call the function to prompt user with menu selection 
                promptMenuSelection();
            });
        });
    });
};

//Function to delete role (BOUNS FUNCTIONALITY FUNCTION)
const deleteRole = () => {

    //Query for deleteing a role 
    const queryDeleteRole = "DELETE FROM role WHERE role.id = ?";

    //Query for getting a list of role name 
    const queryRoleList = "SELECT * FROM role";

    //Connect to the employee_db to get the list of roles 
    connection.query(queryRoleList, (err, data) => {

        //If error exist, display the error
        if (err) console.log(err);

        //Get the list of department list for choices
        const roleList = data.map(role => {
            return { name: role.title, value: role.id };
        });

        //Array of question to delete a role 
        const deleteRoleQuestion = [
            {
                type: "list", 
                name: "deleteRole", 
                message: "What role would you like to delete?",
                choices: roleList
            }
        ];

        //Prompt user for deleting a role, then it is deleted from database 
        inquirer.prompt(deleteRoleQuestion).then(response => {

            //Connect to the employee_db database
            connection.query(queryDeleteRole, response.deleteRole, err => {
                
                //If error exist, display the error
                if (err) console.log(err);

                //Display message that role is deleted 
                console.log(`${response.deleteRole} role is successfully deleted`);

                //Call the function to prompt user with menu selection 
                promptMenuSelection();
            });
        });
    });
};

//Function to delete employee (BOUNS FUNCTIONALITY FUNCTION)
const deleteEmployee = () => {};

//Function to view utilized budget of a department (BOUNS FUNCTIONALITY FUNCTION)
const budgetByDepartment = () => {};