const mysql = require('mysql2/promise');

const conn = mysql.createPool({
    host: 'localhost',
    database: 'nodejs-produtos',
    user: 'root',
    password: ''
});

module.exports = conn;
