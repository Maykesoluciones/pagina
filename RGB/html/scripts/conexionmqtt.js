history.forward()

/////////////////////////////////////////
/////////////// Autenticacion////////////
/////////////////////////////////////////

var entrar_pagina;
var entrarpaginaWEB;
var entrarPagina = localStorage.getItem("entrar_pagina");
console.log(entrarPagina);

var conteo_refres;

url = "https://realtime.ably.io/event-stream?";
version = "1.2";
//username = "QLTmug.ldqIyQ";
//password = "F57OdMEvI0r1R6ZEzasbjy6YOEpUqyrYi3djkW7OC5M";
username = "VRDsGQ.B_CYIQ";
password = "dPUOfDfiuRQrRSX9wt1fcYc9v-AKBdGQa2jTP60_D5g";
topic_raiz = "RGB";
topic_conexion = "/conexion";
topic_ip = "/ip";

////////////ESTADOS INDIVIDUAL DE LAMPARAS 1,2,3,ETC

topic_dato_lampara_1 = "/datolampara1";

// // Mensajes
mensaje_inicial = "Desconectado";
clientId = " WEB rgb--->> " + Math.floor(Math.random() * 1000000 + 1);

var ably = new Ably.Realtime(username + ":" + password);

var channel = ably.channels.get(topic_raiz + topic_conexion);
channel.publish(clientId, mensaje_inicial); // publicar siempre que inice el servidor web con mensaje de inicio

//recibir mensajes de los topicos suscritos de conexion y desconexion

var conexion =
  url +
  "channels=" +
  topic_raiz +
  "&v=" +
  version +
  "&key=" +
  username +
  ":" +
  password;
var eventSource = new EventSource(conexion);

eventSource.onmessage = function (event) {
  var message = JSON.parse(event.data);

  var topic = message.channel;
  // Decodificar mensaje
  var decodedString = atob(message.data);
  console.log("Topic: " + message.channel + "  Mensaje: " + decodedString);

  if (topic == topic_raiz) {
    var splitted = decodedString.toString().split(",");
    var conex = splitted[0];
    entrar_pagina = splitted[1];

    if (conex == "Conectado" || conex == "Desconectado") {
      document.getElementById("display_conexion").innerHTML = conex;

      display_conexion_fuera = "ok";

      let conteo_acomulado = localStorage.getItem("conteo");
      conteo_refres = Number(conteo_acomulado);
      conteo_refres++;
      var conteo_string = String(conteo_refres);
      console.log(conteo_string);
      localStorage.setItem("conteo", conteo_string);

      if (conteo_refres == 10 || conex == "Desconectado") {
        let autorizo = "false";
        localStorage.setItem("entrar_pagina", autorizo);
        localStorage.setItem("conteo", "0");
        console.log("vas para fuera");
        entrarPagina = localStorage.getItem("entrar_pagina");
        tiempo_exit();
      }
    }
  }
};

tiempo_exit();
function tiempo_exit() {
  setTimeout(() => {
    console.log("tiempo de autorizacion ok");

    if (entrar_pagina == "true" || entrarPagina == "true") {
      console.log("Bienvenido Autorizado");
      let autorizo = "true";
      localStorage.setItem("entrar_pagina", autorizo);
    } else {
     window.location = "https://maykesoluciones.github.io/pagina/RGB/html/signin.html";
    }
  }, 2000);
}

if (display_conexion == "Desconectado") {
  let autorizo = "false";
  localStorage.setItem("entrar_pagina", autorizo);
  localStorage.setItem("conteo", "0");
  console.log("vas para fuera");
  entrarPagina = localStorage.getItem("entrar_pagina");
  tiempo_exit();
}

//////////////////////////////////////////////

var conexion_2 =
  url +
  "channels=" +
  topic_raiz +
  topic_datos_lamparas +
  "&v=" +
  version +
  "&key=" +
  username +
  ":" +
  password;
var eventSource = new EventSource(conexion_2);

eventSource.onmessage = function (event) {
  var message = JSON.parse(event.data);

  var topic = message.channel;
  // Decodificar mensaje
  var decodedString = atob(message.data);
  console.log("Topic: " + message.channel + "  Mensaje: " + decodedString);

  if (topic == topic_raiz + topic_datos_lamparas) {
    var splitted = decodedString.toString().split(",");
    var switch1 = splitted[0];

    if (switch1 == "1") {
      $("#display_sw1").prop("checked", true);
    } else {
      $("#display_sw1").prop("checked", "");
    }
  }
};

////////////////////////////////////////////////////////
///////////////// RECIBIR ESTADO INDIVIDUAL DE CADA LAMPARA ////////////////////////////
////////////////////// LAMPARA UNO //////////////////////
var conexion_LAMP_UNO =
  url +
  "channels=" +
  topic_raiz +
  topic_dato_lampara_1 +
  "&v=" +
  version +
  "&key=" +
  username +
  ":" +
  password;
var eventSource = new EventSource(conexion_LAMP_UNO);

eventSource.onmessage = function (event) {
  var message = JSON.parse(event.data);

  var topic = message.channel;
  // Decodificar mensaje
  var decodedString = atob(message.data);
  console.log("Topic: " + message.channel + "  Mensaje: " + decodedString);

  if (topic == topic_raiz + topic_dato_lampara_1) {
    var splitted = decodedString.toString().split(",");
    var switch1 = splitted[0];

    if (switch1 == "1") {
      $("#display_sw1").prop("checked", true);
    } else {
      $("#display_sw1").prop("checked", "");
    }
  }
};

////////////////////////// FIN RECIBIR ESTADO INDIVIDUAL LAMPARAS ///////////////////////////
function sw1_change() {
  var channel = ably.channels.get(topic_raiz + "/actions/sw1");

  if ($("#display_sw1").is(":checked")) {
    channel.publish(clientId, "1");
    console.log("Mensaje sw1 on");
  } else {
    channel.publish(clientId, "0");
    console.log("Mensaje sw1 off");
  }
}