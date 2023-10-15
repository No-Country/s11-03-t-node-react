import { sendResponse } from '../responses/responseUtils';
import { tryCatch } from '../utils/tryCatch';
import Client from '../schemas/client.schema';
import Pet from '../schemas/pet.schema';
import Appointment from '../schemas/appointment.schema';
import ErrorApp from '../utils/ErrorApp';
import disableEntity from '../utils/disableEntity';
import Veterinarian from '../schemas/veterinarian.schema';
import { paginate } from '../utils/pagination';

// Crear una nueva cita
export const createAppointment = tryCatch(async (req, res) => {
  const { date, start_time, end_time, reason, notes, petId, veterinarianId } = req.body;
  const clientId = req.client.clientId; // Accede al ID del cliente directamente

  // Verificar si el cliente que se asociará a la cita existe en DB.
  const existingClient = await Client.findById(clientId);

  if (!existingClient) {
    const error = ErrorApp(`Cliente no encontrado`, 404);
    throw error;
  }

  // Verificar si la mascota que se asociará a la cita existe en DB.
  const existingPet = await Pet.findById(petId);

  if (!existingPet) {
    const error = ErrorApp(`Mascota no encontrada`, 404);
    throw error;
  }

  // Verificar si el veterinario existe en DB.
  const existingVeterinarian = await Veterinarian.findById(veterinarianId);

  if (!existingVeterinarian) {
    const error = ErrorApp(`Veterinario no encontrado`, 404);
    throw error;
  }

  // Verifica si la hora de inicio es mayor o igual que la hora de finalización
  if (new Date(start_time) >= new Date(end_time)) {
    const error = ErrorApp('La hora de inicio debe ser menor que la hora de finalización', 400);
    throw error;
  }

  // Calcula la diferencia de tiempo en minutos entre start_time y end_time
  const startTimeMs = new Date(start_time).getTime();
  const endTimeMs = new Date(end_time).getTime();
  const timeDifferenceMinutes = (endTimeMs - startTimeMs) / (1000 * 60);

  // Verifica si la diferencia es menor que 30 minutos
  if (timeDifferenceMinutes < 30) {
    const error = ErrorApp('La diferencia de tiempo debe ser de al menos 30 minutos', 400);
    throw error;
  }

  // Verificar si el veterinario tiene citas programadas en el mismo día y con superposición de horas
  const existingAppointmentsForVeterinarian = await Appointment.find({
    veterinarianId: veterinarianId,
    date: date,
    $or: [
      {
        $and: [{ start_time: { $lt: end_time } }, { end_time: { $gt: start_time } }],
      },
    ],
  });

  // Verifica si alguna cita existente se superpone con la nueva cita
  const isOverlapping = existingAppointmentsForVeterinarian.some((appointment) => {
    const existingStartTime = new Date(appointment.start_time);
    const existingEndTime = new Date(appointment.end_time);
    const newStartTime = new Date(start_time);
    const newEndTime = new Date(end_time);

    // Verifica si el nuevo rango horario se superpone con el rango horario existente
    return newStartTime < existingEndTime && newEndTime > existingStartTime;
  });

  if (isOverlapping) {
    const error = ErrorApp('El veterinario ya tiene una cita programada en ese horario', 409);
    throw error;
  }

  // Si no hay superposiciones, crea la nueva cita
  const newAppointment = new Appointment({
    date,
    start_time,
    end_time,
    reason,
    notes,
    petId,
    clientId,
    veterinarianId,
  });

  // Guarda una nueva cita en la base de datos
  await newAppointment.save();

  // Devuelve una respuesta RESTful desde utils
  sendResponse(res, 201, 'Cita creada con éxito', newAppointment);
});

// Obtener todas las citas con filtros opcionales y paginación
// export const getAllAppointments = tryCatch(async (req, res) => {
//   // Obtiene los parámetros de consulta (query parameters) de la solicitud, incluyendo la página y el límite
//   const { clientId, petId, veterinarianId, date, isActive, search } = req.query;

//   const page = parseInt(req.query.page) || 1;
//   const limit = parseInt(req.query.limit) || 10;
//   const baseUrl = `${req.protocol}://${req.get('host')}${req.originalUrl.split('?')[0]}`;

//   // Crea un objeto de filtro inicial vacío
//   const filter = {};

//   // Agrega filtros si se proporcionan los parámetros
//   if (clientId) {
//     filter.clientId = clientId;
//   }
//   if (petId) {
//     filter.petId = petId;
//   }
//   if (veterinarianId) {
//     filter.veterinarianId = veterinarianId;
//   }
//   if (date) {
//     filter.date = new Date(date);
//   }
//   if (isActive) {
//     filter.isActive = isActive;
//   }

//   // Realiza la consulta sin paginación para contar los resultados
//   const totalResults = await Appointment.countDocuments(filter);

//   let results;

//   // Si el número de resultados es mayor que el límite, aplica paginación, de lo contrario, obtén todos los resultados
//   if (totalResults > limit) {
//     results = await paginate(Appointment, page, limit, baseUrl, filter);
//   } else {
//     // Si se proporciona una palabra clave de búsqueda, utiliza la búsqueda de texto completo
//     if (search) {
//       results = await Appointment.find({ $text: { $search: search } }, { score: { $meta: 'textScore' } })
//         .sort({ date: -1 }) // Ordena por fecha en orden descendente (más recientes primero)
//         .limit(limit);
//     } else {
//       results = await Appointment.find(filter).populate([
//         { path: 'clientId' },
//         { path: 'petId' },
//         { path: 'veterinarianId' },
//       ]);
//     }
//   }

//   // Devuelve una respuesta RESTful desde utils con la cantidad total de resultados
//   sendResponse(res, 200, 'Citas encontradas con éxito', { totalResults, results });
// });
// export const getAllAppointments = tryCatch(async (req, res) => {
//   // Obtiene los parámetros de consulta (query parameters) de la solicitud, incluyendo la página y el límite
//   const { clientId, petId, veterinarianId, date, isActive, search } = req.query;

//   const page = parseInt(req.query.page) || 1;
//   const limit = parseInt(req.query.limit) || 10;
//   const baseUrl = `${req.protocol}://${req.get('host')}${req.originalUrl.split('?')[0]}`;

//   // Crea un objeto de filtro inicial vacío
//   const filter = {};

//   // Agrega filtros si se proporcionan los parámetros
//   if (clientId) {
//     filter.clientId = clientId;
//   }
//   if (petId) {
//     filter.petId = petId;
//   }
//   if (veterinarianId) {
//     filter.veterinarianId = veterinarianId;
//   }
//   if (date) {
//     filter.date = new Date(date);
//   }
//   if (isActive) {
//     filter.isActive = isActive;
//   }

//   // Realiza la consulta sin paginación para contar los resultados
//   let totalResults;
//   let results;

//   if (search) {
//     // Si se proporciona una palabra clave de búsqueda, busca en varios campos
//     results = await Appointment.find({
//       $or: [{ reason: { $regex: search, $options: 'i' } }, { notes: { $regex: search, $options: 'i' } }],
//     })
//       .sort({ date: -1 }) // Ordena por fecha en orden descendente (más recientes primero)
//       .limit(limit);
//     totalResults = results.length; // Actualiza el número total de resultados después de la búsqueda
//   } else {
//     totalResults = await Appointment.countDocuments(filter);
//     // Si el número de resultados es mayor que el límite, aplica paginación, de lo contrario, obtén todos los resultados
//     if (totalResults > limit) {
//       results = await paginate(Appointment, page, limit, baseUrl, filter);
//     } else {
//       results = await Appointment.find(filter).populate([
//         { path: 'clientId' },
//         { path: 'petId' },
//         { path: 'veterinarianId' },
//       ]);
//     }
//   }

//   // Devuelve una respuesta RESTful desde utils con la cantidad total de resultados
//   sendResponse(res, 200, 'Citas encontradas con éxito', { totalResults, results });
// });
export const getAllAppointments = tryCatch(async (req, res) => {
  // Obtiene los parámetros de consulta (query parameters) de la solicitud, incluyendo la página y el límite
  const { clientId, petId, veterinarianId, date, isActive, search } = req.query;

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const baseUrl = `${req.protocol}://${req.get('host')}${req.originalUrl.split('?')[0]}`;

  // Crea un objeto de filtro inicial vacío
  const filter = {};

  // Agrega filtros si se proporcionan los parámetros
  if (clientId) {
    filter.clientId = clientId;
  }
  if (petId) {
    filter.petId = petId;
  }
  if (veterinarianId) {
    filter.veterinarianId = veterinarianId;
  }
  if (date) {
    filter.date = new Date(date);
  }
  if (isActive) {
    filter.isActive = isActive;
  }

  // Realiza la consulta sin paginación para contar los resultados
  let totalResults;
  let results;

  if (search) {
    // Si se proporciona una palabra clave de búsqueda, busca en varios campos
    results = await Appointment.find({
      $or: [{ reason: { $regex: search, $options: 'i' } }, { notes: { $regex: search, $options: 'i' } }],
    }).sort({ date: -1 }); // Ordena por fecha en orden descendente (más recientes primero);
  } else {
    results = await Appointment.find(filter).sort({ date: -1 }); // Ordena por fecha en orden descendente (más recientes primero);
  }

  // Calcula el número total de resultados
  totalResults = results.length;

  if (totalResults > limit) {
    // Si el número de resultados es mayor que el límite, aplica paginación
    results = await paginate(Appointment, page, limit, baseUrl, filter);
  }

  // Devuelve una respuesta RESTful desde utils con la cantidad total de resultados
  sendResponse(res, 200, 'Citas encontradas con éxito', { totalResults, results });
});

// Obtener una cita por ID
export const getAppointmentById = tryCatch(async (req, res) => {
  const { appointmentId } = req.params;
  const appointment = await Appointment.findById(appointmentId)
    .populate('clientId')
    .populate('petId')
    .populate('veterinarianId');

  if (!appointment) {
    const error = ErrorApp(`Cita no encontrado`, 404);
    throw error;
  }

  // Devuelve una respuesta RESTful desde utils
  sendResponse(res, 200, 'Cita encontrada con éxito', appointment);
});

// Actualizar una cita por ID
export const updateAppointment = tryCatch(async (req, res) => {
  const { appointmentId } = req.params;
  const { ...updateFields } = req.body;

  const appointment = await Appointment.findById(appointmentId);

  // Verificar si la cita existe en DB.
  if (!appointment) {
    const error = ErrorApp(`Cita no encontrada`, 404);
    throw error;
  }

  // Verifica si la cita está activa antes de permitir la actualización
  if (!appointment.isActive) {
    const error = ErrorApp('No se puede actualizar una cita inactiva', 404);
    throw error;
  }

  const updatedAppointment = await Appointment.findByIdAndUpdate(appointmentId, { $set: updateFields }, { new: true });

  // Devuelve una respuesta RESTful desde utils
  sendResponse(res, 200, 'Cita actualizada con éxito', updatedAppointment);
});

// Eliminar una cita por ID
export const deleteAppointment = tryCatch(async (req, res) => {
  const { appointmentId } = req.params;

  await disableEntity(Appointment, appointmentId, 'Cita');

  // Devuelve una respuesta RESTful desde utils
  sendResponse(res, 200, 'Cita desactivada con éxito');
});
