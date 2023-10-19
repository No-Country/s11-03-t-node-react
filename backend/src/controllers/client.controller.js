import { paginate } from '../utils/pagination';
import { sendResponse } from '../responses/responseUtils';
import { tryCatch } from '../utils/tryCatch';
import Client from '../schemas/client.schema';
import disableEntity from '../utils/disableEntity';
import ErrorApp from '../utils/ErrorApp';
import mongoose from 'mongoose';
import { sendEmail } from '../services/sendEmail';
import fs from 'fs';

// Obtener todos los clientes
export const getAllClients = tryCatch(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10; // Límite 10 por defecto
  const baseUrl = `${req.protocol}://${req.get('host')}${req.originalUrl.split('?')[0]}`;

  const response = await paginate(Client, page, limit, baseUrl);

  // Devuelve una respuesta RESTful desde utils
  sendResponse(res, 200, 'Clientes encontrados con éxito', response);
});

// Enviar un mail a la veterinaria
export const sendEmailToVet = tryCatch(async (req, res) => {
  const { fullname, email, message } = req.body;

  // Lee el contenido de la plantilla HTML desde el archivo
  const template = fs.readFileSync('public/mails/templates/consultation_confirmation.html', 'utf8');

  // Reemplaza los marcadores de posición en la plantilla con los datos dinámicos
  const htmlContent = template
    .replace('[Nombre Completo]', fullname)
    .replace('[Correo Electrónico]', email)
    .replace('[Mensaje]', message);

  // Configura el asunto del correo electrónico
  const subject = 'Consulta Médica';

  // Envía el correo electrónico utilizando la función sendEmail
  await sendEmail(email, subject, htmlContent);

  sendResponse(res, 200, 'Correo enviado con éxito');
});

// Obtener un cliente por ID
export const getClientById = tryCatch(async (req, res) => {
  const { clientId } = req.params;

  // Realiza una sola agregación para obtener el cliente con sus citas y mascotas.
  const clientData = await Client.aggregate([
    {
      $match: { _id: new mongoose.Types.ObjectId(clientId) },
    },
    {
      $lookup: {
        from: 'appointments',
        localField: '_id',
        foreignField: 'clientId',
        as: 'appointments',
      },
    },
    {
      $lookup: {
        from: 'pets',
        localField: '_id',
        foreignField: 'clientId',
        as: 'pets',
      },
    },
  ]).option({ lean: true });

  if (!clientData || clientData.length === 0) {
    const error = ErrorApp(`Cliente no encontrado`, 404);
    throw error;
  }
  // Excluir el campo "password" del resultado
  const clientDataWithoutPassword = { ...clientData[0] };
  delete clientDataWithoutPassword.password;

  // Devuelve el resultado con la información del cliente, sus citas y mascotas.
  sendResponse(res, 200, 'Cliente encontrado con éxito', clientDataWithoutPassword);
});

// Actualizar un cliente por ID
export const updateClient = tryCatch(async (req, res) => {
  const { clientId } = req.params;
  const { ...updateFields } = req.body;

  const client = await Client.findById(clientId);

  // Verifica si el cliente existe

  if (!client) {
    const error = ErrorApp(`Cliente no encontrado`, 404);
    throw error;
  }

  // Verifica si el cliente está activo antes de permitir la actualización
  if (!client.isActive) {
    const error = ErrorApp('No se puede actualizar un cliente inactivo', 404);
    throw error;
  }

  // Actualiza los campos si el cliente está activo
  const updatedClient = await Client.findByIdAndUpdate(clientId, { $set: updateFields }, { new: true });

  // Devuelve una respuesta RESTful desde utils
  sendResponse(res, 200, 'Cliente actualizado con éxito', updatedClient);
});

// Desactivar un cliente por ID
export const deleteClient = tryCatch(async (req, res) => {
  const { clientId } = req.params;

  // Llama a la función útil disableEntity con los tres parametros
  await disableEntity(Client, clientId, 'Cliente');

  sendResponse(res, 200, 'Cliente desactivado con éxito');
});
