import express from 'express';
import clientRoutes from './client.routes';
import imageRoutes from './images.routes';
import petRoutes from './pet.routes';
import authRoutes from './auth.routes';

const router = express.Router();

// Ruta de Autenticación
router.use('/api/v1/auth', authRoutes);
// Rutas de clientes
router.use('/api/v1/clients', clientRoutes);
// Rutas de Imagenes
router.use('/api/v1/images', imageRoutes);
// Rutas de mascotas
router.use('/api/v1/pets', petRoutes);

// Otras rutas

export default router;
