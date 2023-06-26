require('dotenv').config();

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
    try {
        connection.query(query, (err, rows) => {
            callback(rows, req, res)
        });
    }
    catch (err) {
        res.json(false);
    }
}

module.exports = banco;