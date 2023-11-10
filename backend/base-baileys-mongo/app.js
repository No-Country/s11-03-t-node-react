const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot');

const QRPortalWeb = require('@bot-whatsapp/portal');
const BaileysProvider = require('@bot-whatsapp/provider/baileys');
const MongoAdapter = require('@bot-whatsapp/database/mongo');
const ChatGPTClass = require('./chatgpt.class');
const { PROMP } = require('./promp.js');


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
console.log(PROMP)
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
