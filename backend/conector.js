const mysql = require('mysql');

const connection = mysql.createConnection({
    host: '<ip-aqui>',
    user: 'MauaSalas',
    password: '<senha-aqui>',
    database: 'MAUASALAS'
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL: ' + err.stack);
        return;
    }
    console.log('Connected to MySQL as ID ' + connection.threadId);

    connection.query('SELECT * FROM salas', (err, rows) => {
        if (err) {
            console.error('Error executing query: ' + err.stack);
            return;
        }
        console.log('Data received from MySQL:\n');
        console.log(rows);
    });

    connection.end((err) => {
        if (err) {
            console.error('Error closing MySQL connection: ' + err.stack);
            return;
        }
        console.log('MySQL connection closed');
    });
});