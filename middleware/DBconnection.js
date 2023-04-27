const mysql = require('mysql')

const util = require('util')

// require('util.promisify').shim();

const pool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASWWORD,
    database: process.env.MYSQL_DB,
    timezone: 'utc+5:30'
});

pool.getConnection((err, connection) => {
    if (err) {
        console.log("*************************************************************")
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('Database connection was closed.');
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('Database has too many connections.');
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('Database connection was refused.');
        }
    }

    if (connection) connection.release();

    return
})


pool.query = util.promisify(pool.query)

module.exports = {
    mySqlCon: pool
};


