import express from 'express';
import cors from 'cors';
import routes from './routes/routes';
import connectToDatabase from './config/db';

const app = express();

app.use(cors());
app.use(express.json());

// Utiliza la aplicación configurada que incluye todas las rutas
app.use('/', routes);

const port = process.env.PORT || 3001;

// Configura Express para servir archivos estáticos desde la carpeta "public"
app.use(express.static('public'));

// Ruta de inicio que muestra el archivo "index.html"
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// Llama a la función de conexión a la base de datos
connectToDatabase()
  .then(() => {
    console.log('Conexión exitosa a la base de datos');
    console.log(`Servidor escuchando en http://localhost:${port}`);
  })
  .catch((error) => {
    console.error('Error al conectar con la base de datos:', error);
  });

// Manejo de errores en el puerto
app.listen(port, () => {
  console.log(`Aplicación Express corriendo en http://localhost:${port}`);
});
