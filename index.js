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