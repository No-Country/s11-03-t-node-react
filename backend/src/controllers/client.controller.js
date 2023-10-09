import { paginate } from '../utils/pagination';
import { sendResponse } from '../responses/responseUtils';
import { tryCatch } from '../utils/tryCatch';
import Client from '../schemas/client.schema';
import disableEntity from '../utils/disableEntity';
import ErrorApp from '../utils/ErrorApp';

// Crear un nuevo cliente
export const createClient = tryCatch(async (req, res) => {
  const { email, password } = req.body;

  // Verifica si el correo electrónico ya existe en la base de datos
  const existingClient = await Client.findOne({ email });

  if (existingClient) {
    const error = ErrorApp('El correo electrónico ya está en uso', 400);
    throw error;
  }

  const newClient = new Client({
    email,
    password,
  });

  // Guarda el nuevo cliente en la base de datos
  await newClient.save();

  // Devuelve una respuesta RESTful desde utils
  sendResponse(res, 201, 'Cliente creado con éxito', newClient);
});

// Obtener todos los clientes
export const getAllClients = tryCatch(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10; // Límite 10 por defecto
  const baseUrl = `${req.protocol}://${req.get('host')}${req.originalUrl.split('?')[0]}`;

  const response = await paginate(Client, page, limit, baseUrl);

  // Devuelve una respuesta RESTful desde utils
  sendResponse(res, 200, 'Clientes encontrados con éxito', response);
});

// Obtener un cliente por ID
export const getClientById = tryCatch(async (req, res) => {
  const { clientId } = req.params;

  const client = await Client.findById(clientId);

  if (!client) {
    const error = ErrorApp(`Cliente no encontrado`, 404);
    throw error;
  }

  // Devuelve una respuesta RESTful desde utils
  sendResponse(res, 200, 'Cliente encontrado con éxito', client);
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
