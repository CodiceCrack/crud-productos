const mysql = require('mysql2/promise'); // Importa la versión con promesas
require('dotenv').config();

// Crear la conexión a la base de datos con createPool
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

// Probar la conexión a la base de datos
(async () => {
  try {
    await db.getConnection();
    console.log('Conexión exitosa a la base de datos MySQL');
  } catch (err) {
    console.error('Error al conectar a la base de datos:', err.message);
  }
})();

module.exports = db;
