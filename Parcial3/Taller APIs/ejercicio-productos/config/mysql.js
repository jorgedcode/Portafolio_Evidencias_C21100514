const db = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

const connection = db.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: "",
    database: process.env.DB_NAME
});

connection.connect((err) => {
    if(err) throw err;
    console.info('Conectado a la base de datos MySQL');
});

module.exports = connection;