require('dotenv').config();

module.exports = {
    "host": process.env.MYSQL_SERVER,
    "user": process.env.MYSQL_USER,
    "password": process.env.MYSQL_PASSWORD,
    "database": process.env.MYSQL_DB,
    "connectionLimit": 5,
    "debug": false,
    "multipleStatements": true
}