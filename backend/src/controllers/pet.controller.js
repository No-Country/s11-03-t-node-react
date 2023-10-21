import Pet from '../schemas/pet.schema';
import Client from '../schemas/client.schema';
import { sendResponse } from '../responses/responseUtils';
import ErrorApp from '../utils/ErrorApp';
import { tryCatch } from '../utils/tryCatch';
import mongoose from 'mongoose';
import { paginate } from '../utils/pagination';

// Crear un nuevo mascota
export const createPet = tryCatch(async (req, res) => {
  const { name, specie, sex, age, photo_url } = req.body;
  const clientId = req.client.clientId;

  // Verificar si el cliente o usuario dueño de la mascota existe
  const existingClient = await Client.findById(clientId);

  if (!existingClient) {
    const error = ErrorApp(`El cliente no existe`, 404);
    throw error;
  }

  const newPet = new Pet({
    name,
    specie,
    sex,
    age,
    photo_url,
    clientId,
  });

  // Guarda una nueva mascota en la base de datos
  await newPet.save();
  sendResponse(res, 201, 'Mascota registrada con éxito', newPet);
});
// Obtener todas las mascotas
export const getAllPets = tryCatch(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10; // Límite 10 por defecto
  const baseUrl = `${req.protocol}://${req.get('host')}${req.originalUrl.split('?')[0]}`;

  // Usa la función paginate para obtener los resultados paginados
  const response = await paginate(Pet, page, limit, baseUrl);

  // Agrega la información del dueño de cada mascota en la respuesta
  response.results = await Pet.populate(response.results, { path: 'clientId', select: '-password' });

  sendResponse(res, 200, 'Mascotas encontradas con éxito', response);
});

// Obtener una mascota por ID junto a su historial de citas
export const getPetById = tryCatch(async (req, res) => {
  const { petId } = req.params;
  //const pet = await Pet.findById(petId);
  const pet = await Pet.aggregate([
    {
      $match: { _id: new mongoose.Types.ObjectId(petId) },
    },
    {
      $lookup: {
        from: 'appointments',
        localField: '_id',
        foreignField: 'petId',
        as: 'appointments',
      },
    },
    {
      $sort: {
        'appointments.date': -1,
      },
    },
  ]).option({ lean: true });
  if (!pet) {
    const error = ErrorApp(`Mascota no encontrada`, 404);
    throw error;
  }
  sendResponse(res, 200, 'Mascota encontrada con éxito', pet);
});

// Actualizar datos de una mascota por ID
export const updatePet = tryCatch(async (req, res) => {
  const { petId } = req.params;
  const { ...updateFields } = req.body;

  const pet = await Pet.findById(petId);

  if (!pet) {
    const error = ErrorApp(`Mascota no encontrada`, 404);
    throw error;
  }
  const updatedPet = await Pet.findByIdAndUpdate(petId, { $set: updateFields }, { new: true });
  sendResponse(res, 200, 'Datos de la mascota actualizados con éxito', updatedPet);
});
