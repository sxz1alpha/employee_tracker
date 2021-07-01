const mysql = require('mysql2');
require('dotenv').config();

// Connect to database
const db = mysql.createConnection(
    {
        host: process.env.DB_HOST,
        // Your MySQL username,
        user: process.env.DB_USER,
        //Your MySQL password
        password: process.env.DB_PASS,
        database: 'employee'
    },
    console.log('Connected to the Employee Tracker database.')
);

module.exports = db;