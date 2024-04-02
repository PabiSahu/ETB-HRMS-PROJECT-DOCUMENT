// models/home_db.js

const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Pabitra@405',
  database: 'etb_hrms_schema',
  connectionLimit: 50,
  port: 3307,
});

const getConnection = async () => {
  return await pool.getConnection();
};

module.exports = {
  getConnection,
};