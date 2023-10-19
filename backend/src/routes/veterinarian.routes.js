import express from 'express';
import {
  createVeterinarian,
  getAllVeterinarians,
  getVeterinarianById,
  updateVeterinarian,
  deleteVeterinarian,
} from '../controllers/veterinarian.controller';
import { createVeterinarianValidation, updateVeterinarianValidation } from '../middlewares/validation.middleware';
import { validMongoId } from '../middlewares/validMongoId.middleware';
import { checkAuthentication } from '../middlewares/auth.middleware';

const router = express.Router();

// Middleware para todas las rutas de veterinario que requieren un veterinario por ID
router.param('veterinarianId', validMongoId('veterinarianId'));

// Aplica el middleware de autenticación a las rutas que deseas proteger
//router.use(authenticate);

// Rutas CRUD para veterinarios
router.post('/', checkAuthentication, createVeterinarianValidation, createVeterinarian);
router.get('/', getAllVeterinarians);
router.get('/:veterinarianId', getVeterinarianById);
router.put('/:veterinarianId', checkAuthentication, updateVeterinarianValidation, updateVeterinarian);
router.delete('/:veterinarianId', checkAuthentication, deleteVeterinarian);

export default router;
