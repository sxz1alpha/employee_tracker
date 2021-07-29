
const db = require('./db/connection.js');
const inquirer = require('inquirer');
const mysql = require('mysql2');


// main function with switch case for other functions.
const masterPrompt = () => {
    inquirer.prompt([
        {
            type: 'list',
            name: 'masterPrompt',
            message: 'What would you like to do?',
            choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add Department', 'Add Role', 'Add Employee', 'Remove Employee', 'Update Employee Role', 'Update Employee Manager','Delete Department', 'Delete Role', 'Delete Employee']
        }
    ])
    .then(data => {
        if(data.masterPrompt == 'View All Departments') {
            viewDepartments();
        } else if (data.masterPrompt === 'View All Roles') {
            viewRoles();
        } else if (data.masterPrompt === 'View All Employees') {
            viewEmployees();
        } else if (data.masterPrompt === 'Add Department') {
            addDepartment();
        } else if(data.masterPrompt === 'Add Role') {
            addRole();
        } else if (data.masterPrompt === 'Update Employee Role') {
            updateEmployee();
        } else if(data.masterPrompt === 'Add Employee') {
            addEmployee();
        } else if(data.masterPrompt === 'Remove Employee') {
            getAllRoles();
        } else if(data.masterPrompt === 'Update Employee Manager') {
            updateManager();
        } else if (data.masterPrompt === 'Delete Employee') {
            deleteEmployee();
        } else if (data.masterPrompt === 'Delete Department') {
            deleteDepartment();
        } else if (data.masterPrompt === 'Delete Role') {
            deleteRole();
        }
    
    });
};
// view all departments, 
const viewDepartments = () => {
    db.query(
        'SELECT * FROM department',
        function(err, data) {
            if (err) throw err;
            console.table(data);
            masterPrompt();
        }
    )
};

// view all roles, 
const viewRoles = () => {
    db.query(
        'SELECT * FROM roles',
        function(err, data) {
            if (err) throw err;
            console.table(data);
            masterPrompt();
        }
    )
};

// view all employees, 
const viewEmployees = () => {
    db.query(
        'SELECT * FROM employee',
        function(err, data) {
            if (err) throw err;
            console.table(data);
            masterPrompt();
        }
    )
};

// add a department,
const addDepartment = () => {
    db.query(
        `SELECT * FROM department`,
        function (err, results) {

            if (err) throw err;

            console.table(results)

            inquirer.prompt([
                {
                    type: 'input',
                    name: 'departmentName',
                    message: 'What is the name of the department you would like to add?'
                }
            ])
            .then(data => {
                db.query(
                `INSERT INTO department (name) values ('${data.departmentName}')`,
                function(err, data) {
                    if (err) throw err;
                    console.table(data);
                    masterPrompt();
                }
                )
            })
        }
    )
};

// add a role, 
const addRole = () => {
    db.query(
        'SELECT * FROM department',
        function(err, results) {
            
            if (err) throw err;
            
            console.table(results);

            inquirer.prompt([
                {
                    type: "input",
                    name: 'title',
                    message: `What is the new role called?`,
                },
                {
                    type: 'number',
                    name: 'salary',
                    message: 'What is the salary for this role?',
                },
                {
                    type: 'number',
                    name: 'department',
                    message: 'What department id is this role for?'
                }
            ])
            .then(data => {

                db.query(
                `INSERT INTO roles (title, salary, department_id) VALUES (?,?,?)`, [data.title, data.salary, data.id],
                function(err, data) {
                    if (err) throw err;
                    console.table(data);
                    masterPrompt();
                }
                )
            });
        }
    )
};

// add an employee,
const addEmployee = () => {
    db.query(
        `SELECT * FROM employee`,
        function (err, results) {
            if (err) throw err;
            console.table(results)
        }
    )
    
    db.query(
        `SELECT * FROM roles`,
        function(err, results) {
            
            if (err) throw err;

            console.table(results);

            inquirer.prompt([
                {
                    type: 'input',
                    name: 'first',
                    message: `What is the employee's first name?`
                },
                {
                    type: 'input',
                    name: 'last',
                    message: `What is the employee's last name?`
                },
                {
                    type: 'number',
                    name: 'roleId',
                    message: 'Please select the role id number for the new employee from the table above.'
                },
                {
                    type: 'number',
                    name: 'managerId',
                    message: 'Please enter the employees managers id number or press enter if the employee has no manager.'
                }
            ])
            .then(data => {
                db.query(
                `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`, [data.first, data.last, data.roleId, data.managerId],
                function(err, data) {
                    if (err) throw err;
                    console.table(data);
                    masterPrompt();
                }
                )
            });
        }
    )
};

// and update an employee role
const updateEmployee = () => {
    db.query(
        `SELECT * FROM employee`,
        function(err, results) {
           
            if (err) throw err;
            
            console.table(results);

            inquirer.prompt([
                {
                    type: 'number',
                    name: 'employee',
                    message: 'What is the id number of the employee whos role you would like to change?'
                },
                {
                    type: 'number',
                    name: 'newRole',
                    message: `What is the employee's new role ID?`
                }
            ])
            .then(data => {
                db.query(
                    `UPDATE employee SET role_id = (?) WHERE id = (?)`, [data.newRole, data.employee],
                    function(err, results) {
                        if (err) throw err;
                        console.table(results);
                        masterPrompt();
                    }
                )
            })
        }
    )
}
// Updates the employees manager id
const updateManager = () => {
    db.query(
        `SELECT * FROM employee`,
        function(err, results) {
           
            if (err) throw err;
            
            console.table(results);

            inquirer.prompt([
                {
                    type: 'number',
                    name: 'employee',
                    message: 'What is the id number of the employee whos manager you would like to change?'
                },
                {
                    type: 'number',
                    name: 'newManager',
                    message: `What is the ID of the employee's new manager?`
                }
            ])
            .then(data => {
                db.query(
                    `UPDATE employee SET manager_id = (?) WHERE id = (?)`, [data.newManager, data.employee],
                    function(err, results) {
                        if (err) throw err;
                        console.table(results);
                        masterPrompt();
                    }
                )
            })
        }
    )
}

//view employees by manager

//view employees by department

//delete department
const deleteDepartment = () => {
    db.query(
        `SELECT * FROM department`,
        function(err, results) {
            
            if (err) throw err;
            
            console.table(results)

            inquirer.prompt([
                {
                    type: 'number',
                    name: 'department',
                    message: 'Please input thedepartment id number for the department you wish to delete.'
                }
            ])
            .then(data => {
                db.query(
                    `DELETE FROM department WHERE id =?`, [data.department],
                    function(err, results) {
                        if (err) throw err;
                        console.table(results);
                        masterPrompt();
                    }
                )
            })
        }
    )
}

//delete roles
const deleteRole = () => {
    db.query(
        `SELECT * FROM roles`,
        function(err, results) {
            
            if (err) throw err;
            
            console.table(results)

            inquirer.prompt([
                {
                    type: 'number',
                    name: 'role',
                    message: 'Please input the role id number for the role you wish to delete.'
                }
            ])
            .then(data => {
                db.query(
                    `DELETE FROM roles WHERE id =?`, [data.role],
                    function(err, results) {
                        if (err) throw err;
                        console.table(results);
                        masterPrompt();
                    }
                )
            })
        }
    )
}

//delete employees
const deleteEmployee = () => {
    db.query(
        `SELECT * FROM employee`,
        function(err, results) {
            
            if (err) throw err;
            
            console.table(results)

            inquirer.prompt([
                {
                    type: 'number',
                    name: 'employee',
                    message: 'Please input the employee id number for the employee you wish to delete.'
                }
            ])
            .then(data => {
                db.query(
                    `DELETE FROM employee WHERE id =?`, [data.employee],
                    function(err, results) {
                        if (err) throw err;
                        console.table(results);
                        masterPrompt();
                    }
                )
            })
        }
    )
}
masterPrompt();
