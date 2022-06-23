//Import required packages 
import mysql2 from "mysql2";
import inquirer from "inquirer";
import consoleTable from "console.table";

//Create a connection with mysql database 
const connection = mysql2.createConnection ({
    host: "localhost", 
    port: "3306", 
    user: "root", 
    password: "",
    database: "employee_db"
});

//Connect to mysql database 
connection.connect (err => {

    //If error exist, display the error 
    if (err) console.log(err);

    //Display the connection as id
    console.log("connected as id " + connection.threadId);

    //Display a heading for employee tracker
    console.log(`
        --------------------------
        |                        |
        |    EMPLOYEE TRACKER    |
        |                        |
        --------------------------
    `);


    //Call the function to prompt menu selection
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
                "Add Department", 
                "Add Role",
                "Add Employee", 
                "Update Employee's Role",
                "Update Employee's Manager",
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
            
            //Case to update employee role
            case "Update Employee Role":
                updateEmployeeRole();
                break;

            //Case to update employee manager
            case "Update Employee Manager":
                updateEmployeeManagers();
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
        SELECT role.id, role.title, role.salary, department.name AS department
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