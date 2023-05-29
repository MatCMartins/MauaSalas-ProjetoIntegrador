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

function banco(query, callback) {
    try {
        connection.query(query, (err, rows) => {
            if (rows == []) {
                rows = "0";
            }
            callback(rows);
        });
    }
    catch (err) {
        callback("0");
    }
}

module.exports = banco;