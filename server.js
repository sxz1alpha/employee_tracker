
const db = require('./db/connection.js');
const inquirer = require('inquirer');
const Connection = require('mysql2/typings/mysql/lib/Connection');


// view all departments, 
'SELECT * FROM departments'
// view all roles, 
'SELECT * FROM roles'
// view all employees, 
'SELECT * FROM employee'
// add a department,
'INSERT INTO departments (name) VALUES (department name goes here)'
// add a role, 
connection.query(
    'SELECT * FROM departments',
    function(err, results, fields) {
        console.table(results);
        inquirer.prompt(['question objects go here']).then(data => {
            `INSERT INTO roles (title, salaray,)`
        });
    }
);
// add an employee, 
// and update an employee role