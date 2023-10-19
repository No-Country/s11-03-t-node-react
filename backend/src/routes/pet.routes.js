import express from 'express';
import { createPet, getAllPets, getPetById, updatePet } from '../controllers/pet.controller';
import { checkAuthentication } from '../middlewares/auth.middleware';

const router = express.Router();

// Rutas para mascotas
// Registrar una mascota
router.post('/', checkAuthentication, createPet);
//Obtener todas las mascotas registradas
router.get('/', getAllPets);
//Obtener una mascota por Id
router.get('/:petId', getPetById);
//Actualizar la información de una mascota
router.put('/:petId', checkAuthentication, updatePet);

export default router;
