import express from 'express';
import {
  getAllClients,
  getClientById,
  updateClient,
  deleteClient,
  sendEmailToVet,
} from '../controllers/client.controller';
import { sendMailValidation, updateClientValidation } from '../middlewares/validation.middleware';
import { validMongoId } from '../middlewares/validMongoId.middleware';
import { checkAuthentication } from '../middlewares/auth.middleware';

const router = express.Router();

// Middleware para todas las rutas de cliente que requieren un cliente por ID
router.param('clientId', validMongoId('clientId'));

// Aplica el middleware de autenticación a las rutas que deseas proteger
router.post('/send-mail', sendMailValidation, sendEmailToVet);

router.use(checkAuthentication);

// Rutas CRUD para clientes
router.get('/', getAllClients);
router.get('/:clientId', getClientById);
router.put('/:clientId', updateClientValidation, updateClient);
router.delete('/:clientId', deleteClient);

export default router;
