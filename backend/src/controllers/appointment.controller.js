import { sendResponse } from '../responses/responseUtils';
import { tryCatch } from '../utils/tryCatch';
import Client from '../schemas/client.schema';
import Pet from '../schemas/pet.schema';
import Appointment from '../schemas/appointment.schema';
import ErrorApp from '../utils/ErrorApp';
import disableEntity from '../utils/disableEntity';
import Veterinarian from '../schemas/veterinarian.schema';
import { paginate } from '../utils/pagination';
import fs from 'fs';
import { sendEmail } from '../services/sendEmail';

export const createAppointment = tryCatch(async (req, res) => {
  const { date, start_time, end_time, reason, notes, petId, veterinarianId } = req.body;
  const clientId = req.client.clientId;

  // Verifica la existencia de cliente, mascota y veterinario
  const [existingClient, existingPet, existingVeterinarian] = await Promise.all([
    Client.findById(clientId),
    Pet.findById(petId),
    Veterinarian.findById(veterinarianId),
  ]);

  if (!existingClient) {
    throw ErrorApp('Cliente no encontrado', 404);
  }
  if (!existingPet) {
    throw ErrorApp('Mascota no encontrada', 404);
  }
  if (!existingVeterinarian) {
    throw ErrorApp('Veterinario no encontrado', 404);
  }

  // Crea la nueva cita
  const newAppointment = new Appointment({
    date: new Date(date),
    start_time: new Date(start_time),
    end_time: new Date(end_time),
    reason,
    notes,
    petId,
    clientId,
    veterinarianId,
  });

  // Guarda la nueva cita en la base de datos
  await newAppointment.save();

  // Lee la plantilla HTML desde el archivo para la confirmación de citas
  const appointmentConfirmationTemplatePath = 'public/mails/templates/appointment_confirmation.html';
  const appointmentConfirmationContent = fs.readFileSync(appointmentConfirmationTemplatePath, 'utf8');

  // Reemplaza las variables en la plantilla HTML
  const clientFullname = existingClient.fullname;
  const veterinarianFullname = existingVeterinarian.fullname;
  const appointmentStartTime = new Date(start_time).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
    timeZone: 'UTC',
  });
  const appointmentDate = new Date(date).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
  const petName = existingPet.name;
  const appointmentReason = reason;

  const appointmentConfirmationContentReplaced = appointmentConfirmationContent
    .replace('[Nombre de Mascota]', petName)
    .replace('[Nombre del Cliente]', clientFullname)
    .replace('[Nombre del Veterinario]', veterinarianFullname)
    .replace('[Fecha de Cita]', appointmentDate)
    .replace('[Hora de Inicio]', appointmentStartTime)
    .replace('[Motivo de Cita]', appointmentReason);

  // Envía el correo de confirmación de la cita al cliente utilizando la función sendEmail
  const emailSubject = 'Confirmación de Cita';
  await sendEmail(existingClient.email, emailSubject, appointmentConfirmationContentReplaced);

  // Devuelve una respuesta RESTful desde utils
  sendResponse(res, 201, 'Cita creada con éxito', newAppointment);
});

// Obtener todas las citas con filtros opcionales y paginación
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

  const updatedAppointment = await Appointment.findByIdAndUpdate(appointmentId, { $set: updateFields }, { new: true })
    .populate('clientId')
    .populate('veterinarianId')
    .populate('petId');

  // Lee la plantilla HTML desde el archivo para la confirmación de citas
  const appointmentUpdateTemplatePath = 'public/mails/templates/appointment_confirmation.html';
  const appointmentUpdateContent = fs.readFileSync(appointmentUpdateTemplatePath, 'utf8');

  // Reemplaza las variables en la plantilla HTML
  const clientFullname = updatedAppointment.clientId.fullname;
  const veterinarianFullname = updatedAppointment.veterinarianId.fullname;
  const petName = updatedAppointment.petId.name;
  const appointmentDate = new Date(updatedAppointment.date).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
  const appointmentStartTime = new Date(updatedAppointment.start_time).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
    timeZone: 'UTC',
  });

  const appointmentUpdateContentReplaced = appointmentUpdateContent
    .replace('Su cita ha sido confirmada', 'Su cita fué actualizada')
    .replace('[Nombre de Mascota]', petName)
    .replace('[Nombre del Cliente]', clientFullname)
    .replace('[Nombre del Veterinario]', veterinarianFullname)
    .replace('[Fecha de Cita]', appointmentDate)
    .replace('[Hora de Inicio]', appointmentStartTime)
    .replace('[Motivo de Cita]', updatedAppointment.reason);

  // Envía el correo de confirmación de que la cita fue cancelada con la función sendEmail
  const emailSubject = 'Modificación de Cita';
  await sendEmail(updatedAppointment.clientId.email, emailSubject, appointmentUpdateContentReplaced);

  // Devuelve una respuesta RESTful desde utils
  sendResponse(res, 200, 'Cita actualizada con éxito', updatedAppointment);
});

// Eliminar una cita por ID
export const deleteAppointment = tryCatch(async (req, res) => {
  const { appointmentId } = req.params;

  // Verifica la existencia de cliente, mascota y veterinario
  const existingAppointment = await Appointment.findById(appointmentId).populate('veterinarianId').populate('clientId');
  if (!existingAppointment) {
    throw ErrorApp('Cita no encontrado', 404);
  }
  // Lee la plantilla HTML desde el archivo para la confirmación de citas
  const appointmentCancellationTemplatePath = 'public/mails/templates/appointment_cancellation.html';
  const appointmentCancellationContent = fs.readFileSync(appointmentCancellationTemplatePath, 'utf8');

  // Reemplaza las variables en la plantilla HTML
  const clientFullname = existingAppointment.clientId.fullname;
  const veterinarianFullname = existingAppointment.veterinarianId.fullname;
  const appointmentDate = new Date(existingAppointment.date).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });

  const appointmentCancellationContentReplaced = appointmentCancellationContent
    .replace('[Nombre del Cliente]', clientFullname)
    .replace('[Nombre del Veterinario]', veterinarianFullname)
    .replace('[Fecha de Cita]', appointmentDate);

  // Envía el correo de confirmación de que la cita fue cancelada con la función sendEmail
  const emailSubject = 'Cancelación de Cita';
  await sendEmail(existingAppointment.clientId.email, emailSubject, appointmentCancellationContentReplaced);
  await disableEntity(Appointment, appointmentId, 'Cita');

  // Devuelve una respuesta RESTful desde utils
  sendResponse(res, 200, 'Cita desactivada con éxito');
});
