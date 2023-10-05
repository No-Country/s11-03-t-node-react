import cloudinary from '../config/cloudinary-config';
import { Stream } from 'stream';

export const uploadImage = async (req, res) => {
  try {
    // Crea un flujo a partir del búfer
    const stream = new Stream.PassThrough();
    stream.end(req.file.buffer);

    // Sube el flujo a Cloudinary utilizando upload_stream
    const result = await cloudinary.uploader.upload_stream((error, result) => {
      if (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al cargar la imagen' });
      } else {
        // Devuelve la URL de la imagen subida en la respuesta
        res.json({ photo_url: result.secure_url });
      }
    });

    // Pasa el flujo al método upload_stream
    stream.pipe(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al cargar la imagen' });
  }
};
