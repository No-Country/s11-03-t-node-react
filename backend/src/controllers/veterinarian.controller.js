import { paginate } from '../utils/pagination';
import { sendResponse } from '../responses/responseUtils';
import { tryCatch } from '../utils/tryCatch';
import Veterinarian from '../schemas/veterinarian.schema';
import disableEntity from '../utils/disableEntity';
import ErrorApp from '../utils/ErrorApp';
import mongoose from 'mongoose';
import Appointment from '../schemas/appointment.schema';

// Registrar un nuevo veterinario
export const createVeterinarian = async (req, res) => {
  const { fullname, speciality, phone, license } = req.body;

  const newVeterinarian = new Veterinarian({
    fullname,
    speciality,
    phone,
    license,
  });

  // Guarda una nueva cita en la base de datos
  await newVeterinarian.save();
  sendResponse(res, 201, 'Se registró el veterinario con éxito', newVeterinarian);
};

// Obtener todos los veterinarios registrados
export const getAllVeterinarians = tryCatch(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10; // Límite 10 por defecto
  const baseUrl = `${req.protocol}://${req.get('host')}${req.originalUrl.split('?')[0]}`;

  const response = await paginate(Veterinarian, page, limit, baseUrl);

  // Devuelve una respuesta RESTful desde utils
  sendResponse(res, 200, 'Veterinarios encontrados con éxito', response);
});

// Obtener un veterinario por ID
export const getVeterinarianById = tryCatch(async (req, res) => {
  const { veterinarianId } = req.params;

  const veterinarianData = await Veterinarian.aggregate([
    {
      $match: { _id: new mongoose.Types.ObjectId(veterinarianId) },
    },
  ]);

  if (!veterinarianData || veterinarianData.length === 0) {
    return sendResponse(res, 404, 'Veterinario no encontrado', []);
  }

  const activeAppointments = await Appointment.find({
    veterinarianId: veterinarianData[0]._id,
    isActive: true,
  });

  const response = {
    _id: veterinarianData[0]._id,
    speciality: veterinarianData[0].speciality,
    phone: veterinarianData[0].phone,
    license: veterinarianData[0].license,
    photo_url: veterinarianData[0].photo_url,
    isActive: veterinarianData[0].isActive,
    fullname: veterinarianData[0].fullname,
    activeAppointments: activeAppointments,
  };

  return sendResponse(res, 200, 'Veterinario encontrado con éxito', [response]);
});

// Actualizar un veterinario por ID
export const updateVeterinarian = tryCatch(async (req, res) => {
  const { veterinarianId } = req.params;
  const { ...updateFields } = req.body;

  const veterinarian = await Veterinarian.findById(veterinarianId);

  // Verifica si el veterinario existe

  if (!veterinarian) {
    const error = ErrorApp(`Veterinario no encontrado`, 404);
    throw error;
  }

  // Verifica si el veterinario está activo antes de permitir la actualización
  if (!veterinarian.isActive) {
    const error = ErrorApp('No se puede actualizar un veterinario inactivo', 404);
    throw error;
  }
  // TODO -> Verificar si envía un archivo con la imagen de perfil del veterinario

  // Actualiza los campos si el veterinario se encuentra activo
  const updatedVeterinarian = await Veterinarian.findByIdAndUpdate(
    veterinarianId,
    { $set: updateFields },
    { new: true },
  );

  // Devuelve una respuesta RESTful desde utils
  sendResponse(res, 200, 'Veterinario actualizado con éxito', updatedVeterinarian);
});

// Desactivar un veterinario por ID
export const deleteVeterinarian = tryCatch(async (req, res) => {
  const { veterinarianId } = req.params;

  // Llama a la función útil disableEntity con los tres parametros
  await disableEntity(Veterinarian, veterinarianId, 'Veterinarian');

  sendResponse(res, 200, 'Veterinario inhabilitado con éxito');
});
