history.forward()

/////////////////////////////////////////
/////////////// Autenticacion////////////
/////////////////////////////////////////

var entrar_pagina;
var entrarpaginaWEB;
var entrarPagina = localStorage.getItem("entrar_pagina");
console.log(entrarPagina);
var ota_autenticar = "false";

var conteo_refres;
const API_KEY = "VRDsGQ.B_CYIQ:dPUOfDfiuRQrRSX9wt1fcYc9v-AKBdGQa2jTP60_D5g"; 
topic_raiz = "Kelly";
topic_conexion = "/conexion";
topic_datos_lamparas = "/datos_lamparas";
topic_ip = "/ip";
topic_github_actualizacion_recibe = "/github/ota/recibe";
topic_github_actualizacion_envia = "/github/ota/envia";

////////////ESTADOS INDIVIDUAL DE LAMPARAS 1,2,3,ETC

topic_dato_lampara_1 = "/datolampara1";
topic_dato_lampara_2 = "/datolampara2";
topic_dato_lampara_3 = "/datolampara3";
topic_dato_lampara_4 = "/datolampara4";
topic_dato_lampara_5 = "/datolampara5";
topic_dato_lampara_6 = "/datolampara6";
topic_dato_lampara_7 = "/datolampara7";
topic_dato_lampara_8 = "/datolampara8";

// // Mensajes
mensaje_inicial = "Desconectado";

const ably = new Ably.Realtime({
    key: API_KEY,
    clientId: "cliente_" + Math.floor(Math.random()*10000)
});

let channel = null;

ably.connection.on((stateChange) => {
  log("Conexión: " + stateChange.current);
  console.log(stateChange);  
});

ably.connection.once("connected", async () => {

log("Conectado a Ably");

 const canalPublica = ably.channels.get(topic_raiz + topic_conexion);
 const canalRecibe  = ably.channels.get(topic_raiz + topic_conexion);

await canalPublica.publish("estado", "conectado");

// Escuchar mensajes entrantes
await canalRecibe.subscribe((msg) => {
log(JSON.stringify(msg.data));
});

log("Escuchando en: " + TOPIC_RECIBE);

});

/////////////////////   conexion hasta aqui  //////////////////////////



