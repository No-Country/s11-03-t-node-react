import mongoose from 'mongoose';

// Define el esquema para Veterinarian con anotaciones Swagger
const veterinarianSchemaDefinition = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
    swagger: {
      type: 'string',
      description: 'Nombre completo del veterinario',
    },
  },
  speciality: {
    type: String,
    required: true,
    swagger: {
      type: 'string',
      description: 'Especialidad del veterinario',
    },
  },
  phone: {
    type: String,
    swagger: {
      type: 'string',
      description: 'Número de teléfono del veterinario',
    },
  },
  license: {
    type: String,
    required: true,
    swagger: {
      type: 'string',
      description: 'Número de licencia del veterinario',
    },
  },
  photo_url: {
    type: String,
    default: 'https://res.cloudinary.com/dxq0pypxu/image/upload/v1696476957/nn12qmebo7v6qhbwbkdf.png',
    swagger: {
      type: 'string',
      description: 'URL de la foto del veterinario',
    },
  },
  isActive: {
    type: Boolean,
    default: true,
    swagger: {
      type: 'boolean',
      description: 'Indica si el veterinario está activo o inactivo',
    },
  },
});

// Crea el modelo Veterinarian con el esquema definido
const Veterinarian = mongoose.model('Veterinarian', veterinarianSchemaDefinition);

export default Veterinarian;
