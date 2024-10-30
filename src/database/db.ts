import mysql from 'mysql2/promise';

export const connection = mysql.createPool({
  host: '44.211.231.207',
  user: 'usuariodb',
  password: 'user1234',
  database: 'infraestructura',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});
