
const db = require('./db/connection.js');
const inquirer = require('inquirer');


// main function with switch case for other functions.
const masterPrompt = () => {
    inquirer.prompt([
        {
            type: 'list',
            name: 'masterPrompt',
            message: 'What would you like to do?',
            choices: ['View All Employees', 'View All Employees By Department', 'View All Employees By Manager', 'Add Employee', 'Remove Employee', 'Update Employee Role', 'Update Employee Manager', 'View All Roles', 'Add Role', 'Remove Role']
        }
    ])
    .then(data => {
        if(data.masterPrompt == 'View All Employees') {
            getAllEmployees();
        } else if (data.masterPrompt === 'View All Employees By Department') {
            //TODO: write the function
        } else if (data.masterPrompt === 'View All Employees By Manager') {
            //TODO: write the function
        } else if (data.masterPrompt === 'Add Employee') {
            addEmployee();
        } else if(data.masterPrompt === 'Remove Employee') {
            //TODO: write function
        } else if (data.masterPrompt === 'Update Employee Role') {
            //TODO: write function
        } else if(data.masterPrompt === 'Update Employee Manager') {
            //TODO: write function
        } else if(data.masterPrompt === 'View All Roles') {
            getAllRoles();
        } else if(data.masterPrompt === 'Add Role') {
            //TODO: write function
        } else if(data.masterPrompt === 'Remove Role') {
            //TODO: write function
        }

    })
}

// view all departments, 
const viewDepartments = () => {
    db.connection.query(
        'SELECT * FROM departments'
    )
    .then(data => {
        console.table(data);
    })
    .catch(err => {
        if (err) throw err;
    });
};

// view all roles, 
const getAllRoles = () => {
    db.connection.query(
        'SELECT * FROM roles'
    )
    .then(data => {
        console.table(data);
    })
    .catch(err => {
        if (err) throw err;
    });
};
// view all employees, 
const getAllEmployees = () => {
    db.connection.query(
        'SELECT * FROM employee'
    )
    .then(data => {
        console.table(data);
    })
    .catch(err => {
        if (err) throw err;
    })
};
// add a department,
const addDepartment = () => {
    db.connection.query(
        'INSERT INTO departments (name) VALUES (department name goes here)'
    )
    .then(data => {
        console.table(data);
    })
};
// add a role, 
const addRole = () => {
    db.connection.query(
        'SELECT * FROM departments',
        function(err, results, fields) {
            console.table(results);
            inquirer.prompt([{}]).then(data => {
                `INSERT INTO roles (title, salaray,)`
            });
        }
    )
    .then(data => {
        console.table(data);
    })
    .catch(err => {
        if (err) throw err;
    });
};
// add an employee,
const addEmployee = () => {
    db.connection.query(
        `SELECT * FROM employee`,
        function(err, results, fields) {
            console.table(results);
            inquirer.prompt([]).then(data => {
                `INSERT INTO employee (first_name, last_name,)`
            })
        }
    )
    .then(data => {
        console.table(data);
    })
    .catch(err => {
        if (err) throw err;
    }); 
};
// and update an employee role

masterPrompt();