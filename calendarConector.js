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

function banco(query, callback, nome, tipo) {
    try {
        connection.query(query, (err, rows) => {
            return callback(rows, nome, tipo);
        });
    }
    catch (err) {
        console.log(err);
        return callback(0, nome, tipo);
    }
}

function bancoI(query){
    try {
        connection.query(query, (err, rows) => {
        });
    }
    catch (err) {
        console.log(err);
    }
}

module.exports = banco;

module.exports = {
    banco,
    bancoI
};