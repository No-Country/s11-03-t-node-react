import express from 'express';
import clientRoutes from './client.routes';
import imageRoutes from './images.routes';

const router = express.Router();

// Rutas de clientes
router.use('/api/v1/clients', clientRoutes);
// Rutas de Imagenes
router.use('/api/v1/images', imageRoutes);
// Otras rutas

export default router;
