const express = require('express');
const router = express.Router();
const productSchema = require('../validations/productValidation');
const db = require('../Config/db'); // Corregida la ruta para importar la conexión a la base de datos

// Crear un producto (POST /products)
router.post('/', async (req, res) => {
  try {
    const validatedData = await productSchema.validate(req.body, { abortEarly: false });
    const { name, description, price } = validatedData;

    const [result] = await db.execute(
      'INSERT INTO productos (name, description, price) VALUES (?, ?, ?)',
      [name, description, price]
    );

    res.status(201).json({ id: result.insertId, name, description, price });
  } catch (error) {
    res.status(400).json({ error: error.errors || error.message });
  }
});

// Leer todos los productos (GET /products)
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM productos');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Actualizar un producto (PUT /products/:id)
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const validatedData = await productSchema.validate(req.body, { abortEarly: false });
    const { name, description, price } = validatedData;

    const [result] = await db.execute(
      'UPDATE productos SET name = ?, description = ?, price = ? WHERE id = ?',
      [name, description, price, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    res.json({ id, name, description, price });
  } catch (error) {
    res.status(400).json({ error: error.errors || error.message });
  }
});

// Eliminar un producto (DELETE /products/:id)
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await db.execute(
      'DELETE FROM productos WHERE id = ?',
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    res.json({ message: 'Producto eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
