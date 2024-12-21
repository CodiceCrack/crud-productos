const yup = require('yup');

// Esquema de validación para productos
const productSchema = yup.object({
  name: yup
    .string()
    .required('El nombre del producto es obligatorio'),
  
  description: yup
    .string()
    .optional(),

  price: yup
    .number()
    .typeError('El precio debe ser un número')
    .required('El precio es obligatorio')
    .positive('El precio debe ser un número positivo'),
});

module.exports = productSchema;
