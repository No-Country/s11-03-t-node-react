const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot');

const QRPortalWeb = require('@bot-whatsapp/portal');
const BaileysProvider = require('@bot-whatsapp/provider/baileys');
const MongoAdapter = require('@bot-whatsapp/database/mongo');
const ChatGPTClass = require('./chatgpt.class');
//const { PROMP } = require('./promp.js');


/**
 * Declaramos las conexiones de Mongo
 */

const MONGO_DB_URI = process.env.MONGODB_URI;
const MONGO_DB_NAME = 'vetcare_bot';

/**
 * Aqui declaramos los flujos hijos, los flujos se declaran de atras para adelante, es decir que si tienes un flujo de este tipo:
 *
 *          Menu Principal
 *           - SubMenu 1
 *             - Submenu 1.1
 *           - Submenu 2
 *             - Submenu 2.1
 *
 * Primero declaras los submenus 1.1 y 2.1, luego el 1 y 2 y al final el principal.
 */
const createBotChatGpt = new ChatGPTClass();

const PROMP = [
  `[INTRUCCIONES]: Soy una secretaria de una veterinaria. Estoy aquí para ayudarte con cualquier pregunta o solicitud que tengas. `,
  ` ¿Qué servicios ofrece la veterinaria? `,
  `Consultas generales
Vacunaciones
Esterilizaciones
Castraciones
Tratamientos de emergencia
Consultas dentales.
  ¿Cuáles son los horarios de atención? `,
  ` La veterinaria está abierta de lunes a sábado, de 8:00 a 12:30 y de 17:00 a 21:30. Siendo las citas de 60min `,
  ` ¿Cómo puedo agendar una cita?`,
  ` Para agendar una cita, visite nuestra página web en https://s11-03-t-node-react-vetfront.vercel.app/. `,
  ` ¿Qué tipos de mascotas atiende la veterinaria?.
   La veterinaria atiende perros, gatos, conejos, roedores y aves.
   ¿Cuál es el costo de los servicios?
   Los costos de los servicios varían según el tipo de servicio y la mascota. Para obtener más información, visite nuestra página web en https://s11-03-t-node-react-vetfront.vercel.app/.
  [IMPORTANTE]:
  Cuando el {usuario} te pregunta solo responde frases cortas de menos `,
  ` de 40 caracteres. IMPORTANTE cuando el {usuario}`,
  ` demuestre y confirme interes en reservar un cita, obligatoriamente pidele que escriba “si confirmo”`,
  `Si entiendes la tarea que debes realizar responde con una sola palabra “OK”
  `,
].join('');



const flowConfirmacional = addKeyword('si confirmo').addAnswer('Confirmamos con tu reserva')
console.log(createBotChatGpt)
const flowInicial = addKeyword(['Hola','hola', 'ole', 'alo', 'buenas', 'dia', 'noches', 'tardes']).addAnswer('🙌 Hola bienvenido a *VetCare*', null, async () => {
  await createBotChatGpt.handleMsgChatGPT(PROMP);
}).addAnswer("¿Para cuando quieres reservar la cita?", { capture: true }, async (ctx, { flowDynamic, fallBack }) => {
  const response = await createBotChatGpt.handleMsgChatGPT(ctx.body)
  console.log(JSON.stringify(response, null, 2))
  const message = response.text
  if(ctx.body.toUpperCase() !== 'si confirmo'){
    await fallBack(message);
  }
},[flowConfirmacional]);

const main = async () => {
  const adapterDB = new MongoAdapter({
    dbUri: MONGO_DB_URI,
    dbName: MONGO_DB_NAME,
  });
  const adapterProvider = createProvider(BaileysProvider);
  const adapterFlow = createFlow([flowInicial]);
  createBot({
    flow: adapterFlow,
    provider: adapterProvider,
    database: adapterDB,
  });
  QRPortalWeb();
};

main();

/*
const main = async () => {
    const adapterDB = new MongoAdapter({
        dbUri: MONGO_DB_URI,
        dbName: MONGO_DB_NAME,
    })
    const adapterFlow = createFlow([flowPrincipal])
    const adapterProvider = createProvider(BaileysProvider)
    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })
    QRPortalWeb()
}

main()
*/
/*const flowPrincipal = addKeyword(['hola', 'ole', 'alo'])
  .addAnswer('🙌 Hola bienvenido a *VetCare*')
  .addAnswer(
    'Por favor indiquenos su consulta',
    {
      buttons: [
        { body: '👉 *Triaje* _para ver los horarios de triaje_' },
        { body: '👉 *Especialidades*  _para ver la lista de especialistas_' },
        { body: '👉 *Horarios* _revisar los horarios_' },
      ],
    },
    null,
    null,
    [flo
    
    const flowPrincipal = addKeyword(['hola', 'ole', 'alo'])
  .addAnswer('🙌 Hola bienvenido a *VetCare*. Por favor indiquenos su consulta ',)
  .addAnswer(
    [
      'te comparto los siguientes links de interes sobre el proyecto',
      '👉 *doc* para ver la documentación',
      '👉 *gracias*  para ver la lista de videos',
      '👉 *discord* unirte al discord',
    ],
    null,
    null,
    [flowDocs, flowGracias, flowTuto, flowDiscord],
  );
        */
