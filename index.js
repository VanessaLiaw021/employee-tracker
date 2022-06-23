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
                viewDepartments();
                break;

            //Case to view all roles
            case "View All Roles":
                viewRoles();
                break;

            //Case to view all employees
            case "View All Employees":
                viewEmployees();
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
const viewDepartments = () => {

    //Query for viewing department
    const queryViewDept = "SELECT * FROM department";

    //Connect to employee_db database
    connection.query(queryViewDept, (err, data) => {

        //If error exist, display the error 
        if (err) console.log(err);

        //Add spacing between the table
        console.log("\n");

        //Display the department table 
        console.table(data);

        //Call the function to prompt user with menu selection
        promptMenuSelection();
    });
};