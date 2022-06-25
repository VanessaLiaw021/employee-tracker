//View Employee By Department Prompt
const viewEmpByDept = () => {

    //Array of question for viewing employee by department 
    const empByDeptQuestion = [
        {
            type: "list", 
            name: "empByDept",
            message: "Which department to view the employee be?",
            choices: deptList
        }
    ];
};

//View Employee By Manager Prompt
const viewEmpByManager = () => {

    //Array of question to view employee by manager 
    const viewEmpByManagerQuestion = [
        {
            //Question to view employee by manager
            type: "list", 
            name: "empByManager", 
            message: "Which manager would you like to view the employee by?",
            choices: managerList
        }
    ];
};

//Update Employee By Role Prompt
const updateEmpRole = (empList, roleList) => {

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
};

//Update Employee By Manager Prompt 
const updateEmpManager = (employeeList) => {

    //Array of question to update employee manager 
    const updateManagerQuestion = [
        {
            //Question for which employee to update
            type: "list", 
            name: "updateManager", 
            message: "Which employee would you like to update the manager?",
            choices: employeeList
        },
        {
            //Question for list of manager 
            type: "list", 
            name: "newManager", 
            message: "Who is the employee's new manager?",
            choices: employeeList
        }
    ];
};

//Add Department Prompt 
const addDept = () => {

    //Array of question for adding department 
    const addDeptQuestion = [
        {
            //Question for adding department
            type: "input", 
            name: "addDept", 
            message: "What department would you like to add?"
        }
    ];
};

module.exports = {
    viewEmpByDept, 
    viewEmpByManager,
    updateEmpRole,
    updateEmpManager,
    addDept
};