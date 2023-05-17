const mysql = require('mysql');

const connection = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DB
});

connection.getConnection((err) => {
    if (err) {
        console.error('Error connecting to MySQL: ' + err.stack);
        return;
    }

});

function banco(query, callback, req, res) {
    connection.query(query, (err, rows) => {
        if (err) {
            console.error('Error executing query: ' + err.stack);
            return;
        }
        callback(rows, req, res)
    });

//     connection.end((err) => {
//         if (err) {
//             console.error('Error closing MySQL connection: ' + err.stack);
//             return;
//         }
//     });
}

module.exports = banco;