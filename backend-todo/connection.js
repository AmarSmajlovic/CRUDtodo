const mysql = require('mysql');

let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'amarpassword',
    database: 'todo_list_baza'
})

connection.connect((err) => {
    if(err) throw err;
    console.log('Connected to the MySQL server!');
});

module.exports  = connection;