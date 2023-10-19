import express from 'express';
import {
  createAppointment,
  getAllAppointments,
  getAppointmentById,
  updateAppointment,
  deleteAppointment,
} from '../controllers/appointment.controller';
import { createAppointmentValidation, updateAppointmentValidation } from '../middlewares/validation.middleware';
import { validMongoId } from '../middlewares/validMongoId.middleware';
import { checkAuthentication } from '../middlewares/auth.middleware';
import { validateAppointment } from '../middlewares/validateAppointment.middleware';

const router = express.Router();

// Middleware para todas las rutas de cliente que requieren un cliente por ID
router.param('appointmentId', validMongoId('appointmentId'));

// Aplica el middleware de autenticación a las rutas que deseas proteger
router.use(checkAuthentication);

// Rutas para citas
// Registrar una cita
router.post('/', createAppointmentValidation, validateAppointment, createAppointment);
//Obtener todas las cita registradas
router.get('/', getAllAppointments);
//Obtener una cita por Id
router.get('/:appointmentId', getAppointmentById);
//Actualizar la información de una cita
router.put('/:appointmentId', updateAppointmentValidation, updateAppointment);
//Eliminar una cita
router.delete('/:appointmentId', deleteAppointment);

export default router;
