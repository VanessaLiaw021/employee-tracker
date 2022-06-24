const mysql2 = require("mysql2");

//Create a connection with mysql database 
const connection = mysql2.createConnection (
    {
        host: "localhost", 
        user: "root", 
        password: "",
        database: "employee_db"
    }
);

module.exports = connection;