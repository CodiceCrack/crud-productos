// Importar dotenv para cargar variables de entorno
require('dotenv').config();

// Importar dependencias
const express = require('express');
const cors = require('cors');  // 👉 Agregar esta línea para importar CORS
const db = require('./Config/db'); // Importa la conexión a la base de datos
const productRoutes = require('./routes/products'); // Importar las rutas de productos

// Inicializar la aplicación de Express
const app = express();

// Middleware para habilitar CORS
app.use(cors());  // 👉 Agregar esta línea para usar CORS

// Middleware para parsear JSON
app.use(express.json());

// Usar las rutas de productos
app.use('/products', productRoutes);

// Ruta principal
app.get('/', (req, res) => {
  res.send('¡Hola, mundo desde Express!');
});

// Definir el puerto desde las variables de entorno o usar el 3000 por defecto
const PORT = process.env.PORT || 3000;

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
