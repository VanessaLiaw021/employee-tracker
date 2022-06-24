const mysql2 = require("mysql2");

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

module.exports = connection;