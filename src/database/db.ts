import mysql from 'mysql2/promise';

export const connection = mysql.createPool({
  host: '10.0.3.42',
  user: 'usuariodb',
  password: 'user1234',
  database: 'infraestructura',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});
