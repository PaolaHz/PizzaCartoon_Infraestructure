import mysql from 'mysql2/promise';

export const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'infraestructura',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});
