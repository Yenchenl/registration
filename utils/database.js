//---- connect to the database
// input mysql2 model 
const mysql = require('mysql2');

// connect to the database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'member'
});

// check the connection
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MariaDB:', err);
        return;
        }
        console.log{'Connected to MariaDB!'};
    })