// import dotenv from 'dotenv';
import mysql from 'mysql2/promise';

// dotenv.config();

const pool = mysql.createPool({
  host: "database-2.cb82ks6oy9l3.eu-north-1.rds.amazonaws.com",
  port: "3306",
  user: "root",
  password: "12345678",
  database: "shop",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export default pool;
