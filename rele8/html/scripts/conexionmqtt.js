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
username = "QLTmug.ldqIyQ";
password = "F57OdMEvI0r1R6ZEzasbjy6YOEpUqyrYi3djkW7OC5M";
topic_raiz = "pruebas";
topic_conexion = "/conexion";
topic_datos_lamparas = "/datos_lamparas";
topic_ip = "/ip";

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
clientId = " WEB FAM-MERCADO--->> " + Math.floor(Math.random() * 1000000 + 1);

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
     window.location = "https://maykesoluciones.github.io/pagina/rele8/html/signin.html";
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
    var switch2 = splitted[1];
    var switch3 = splitted[2];
    var switch4 = splitted[3];
    var switch5 = splitted[4];
    var switch6 = splitted[5];
    var switch7 = splitted[6];
    var switch8 = splitted[7];
    var switch9 = splitted[8];
    var switch10 = splitted[9];

    if (switch1 == "1") {
      $("#display_sw1").prop("checked", true);
    } else {
      $("#display_sw1").prop("checked", "");
    }
    if (switch2 == "1") {
      $("#display_sw2").prop("checked", true);
    } else {
      $("#display_sw2").prop("checked", "");
    }
    if (switch3 == "1") {
      $("#display_sw3").prop("checked", true);
    } else {
      $("#display_sw3").prop("checked", "");
    }
    if (switch4 == "1") {
      $("#display_sw4").prop("checked", true);
    } else {
      $("#display_sw4").prop("checked", "");
    }
    if (switch5 == "1") {
      $("#display_sw5").prop("checked", true);
    } else {
      $("#display_sw5").prop("checked", "");
    }
    if (switch6 == "1") {
      $("#display_sw6").prop("checked", true);
    } else {
      $("#display_sw6").prop("checked", "");
    }
    if (switch7 == "1") {
      $("#display_sw7").prop("checked", true);
    } else {
      $("#display_sw7").prop("checked", "");
    }
    if (switch8 == "1") {
      $("#display_sw8").prop("checked", true);
    } else {
      $("#display_sw8").prop("checked", "");
    }
    if (switch9 == "1") {
      $("#display_sw9").prop("checked", true);
    } else {
      $("#display_sw9").prop("checked", "");
    }
    if (switch10 == "1") {
      $("#display_sw10").prop("checked", true);
    } else {
      $("#display_sw10").prop("checked", "");
    }
  }
};

///////////////////// consulta de ip  /////////////////////////

var conexion_ip =
  url +
  "channels=" +
  topic_raiz +
  topic_ip +
  "&v=" +
  version +
  "&key=" +
  username +
  ":" +
  password;
var eventSource = new EventSource(conexion_ip);

eventSource.onmessage = function (event) {
  var message = JSON.parse(event.data);

  var topic = message.channel;
  // Decodificar mensaje
  var decodedString = atob(message.data);
  console.log("Topic: " + message.channel + "  Mensaje: " + decodedString);

  if (topic == topic_raiz + topic_ip) {
    var splitted = decodedString.toString().split(",");
    var ip = splitted[0];
    
  url = "https://api.callmebot.com/whatsapp.php?";
  movil = "+573012375155";
  mensaje = ip;
  apikey = "423627";


var conexion_WHATSAPP = url+'phone='+movil+'&text='+mensaje+'&apikey='+apikey;


fetch(conexion_WHATSAPP)
.then(respuesta => respuesta.json() )
.then(respuesta => console.log(respuesta.name))
    //document.getElementById("display_ip").innerHTML = ip;
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
////////////////////////////FIN LAMPARA UNO ////////////////////////////
////////////////////// LAMPARA DOS //////////////////////

var conexion_LAMP_DOS =
  url +
  "channels=" +
  topic_raiz +
  topic_dato_lampara_2 +
  "&v=" +
  version +
  "&key=" +
  username +
  ":" +
  password;
var eventSource = new EventSource(conexion_LAMP_DOS);

eventSource.onmessage = function (event) {
  var message = JSON.parse(event.data);

  var topic = message.channel;
  // Decodificar mensaje
  var decodedString = atob(message.data);
  console.log("Topic: " + message.channel + "  Mensaje: " + decodedString);

  if (topic == topic_raiz + topic_dato_lampara_2) {
    var splitted = decodedString.toString().split(",");
    var switch2 = splitted[0];

    if (switch2 == "1") {
      $("#display_sw2").prop("checked", true);
    } else {
      $("#display_sw2").prop("checked", "");
    }
  }
};
////////////////////////////FIN LAMPARA DOS ////////////////////////////
////////////////////// LAMPARA DOS //////////////////////

var conexion_LAMP_TRES =
  url +
  "channels=" +
  topic_raiz +
  topic_dato_lampara_3 +
  "&v=" +
  version +
  "&key=" +
  username +
  ":" +
  password;
var eventSource = new EventSource(conexion_LAMP_TRES);

eventSource.onmessage = function (event) {
  var message = JSON.parse(event.data);

  var topic = message.channel;
  // Decodificar mensaje
  var decodedString = atob(message.data);
  console.log("Topic: " + message.channel + "  Mensaje: " + decodedString);

  if (topic == topic_raiz + topic_dato_lampara_3) {
    var splitted = decodedString.toString().split(",");
    var switch3 = splitted[0];

    if (switch3 == "1") {
      $("#display_sw3").prop("checked", true);
    } else {
      $("#display_sw3").prop("checked", "");
    }
  }
};
////////////////////////////FIN LAMPARA TRES ////////////////////////////
////////////////////// LAMPARA CUATRO //////////////////////

var conexion_LAMP_CUATRO =
  url +
  "channels=" +
  topic_raiz +
  topic_dato_lampara_4 +
  "&v=" +
  version +
  "&key=" +
  username +
  ":" +
  password;
var eventSource = new EventSource(conexion_LAMP_CUATRO);

eventSource.onmessage = function (event) {
  var message = JSON.parse(event.data);

  var topic = message.channel;
  // Decodificar mensaje
  var decodedString = atob(message.data);
  console.log("Topic: " + message.channel + "  Mensaje: " + decodedString);

  if (topic == topic_raiz + topic_dato_lampara_4) {
    var splitted = decodedString.toString().split(",");
    var switch4 = splitted[0];

    if (switch4 == "1") {
      $("#display_sw4").prop("checked", true);
    } else {
      $("#display_sw4").prop("checked", "");
    }
  }
};
////////////////////////////FIN LAMPARA CUATRO ////////////////////////////
////////////////////// LAMPARA CINCO //////////////////////

var conexion_LAMP_CINCO =
  url +
  "channels=" +
  topic_raiz +
  topic_dato_lampara_5 +
  "&v=" +
  version +
  "&key=" +
  username +
  ":" +
  password;
var eventSource = new EventSource(conexion_LAMP_CINCO);

eventSource.onmessage = function (event) {
  var message = JSON.parse(event.data);

  var topic = message.channel;
  // Decodificar mensaje
  var decodedString = atob(message.data);
  console.log("Topic: " + message.channel + "  Mensaje: " + decodedString);

  if (topic == topic_raiz + topic_dato_lampara_5) {
    var splitted = decodedString.toString().split(",");
    var switch5 = splitted[0];

    if (switch5 == "1") {
      $("#display_sw5").prop("checked", true);
    } else {
      $("#display_sw5").prop("checked", "");
    }
  }
};
////////////////////////////FIN LAMPARA CINCO ////////////////////////////
////////////////////// LAMPARA SIES //////////////////////

var conexion_LAMP_SIES =
  url +
  "channels=" +
  topic_raiz +
  topic_dato_lampara_6 +
  "&v=" +
  version +
  "&key=" +
  username +
  ":" +
  password;
var eventSource = new EventSource(conexion_LAMP_SIES);

eventSource.onmessage = function (event) {
  var message = JSON.parse(event.data);

  var topic = message.channel;
  // Decodificar mensaje
  var decodedString = atob(message.data);
  console.log("Topic: " + message.channel + "  Mensaje: " + decodedString);

  if (topic == topic_raiz + topic_dato_lampara_6) {
    var splitted = decodedString.toString().split(",");
    var switch6 = splitted[0];

    if (switch6 == "1") {
      $("#display_sw6").prop("checked", true);
    } else {
      $("#display_sw6").prop("checked", "");
    }
  }
};
////////////////////////////FIN LAMPARA SIES ////////////////////////////
////////////////////// LAMPARA SIETE //////////////////////

var conexion_LAMP_SIETE =
  url +
  "channels=" +
  topic_raiz +
  topic_dato_lampara_7 +
  "&v=" +
  version +
  "&key=" +
  username +
  ":" +
  password;
var eventSource = new EventSource(conexion_LAMP_SIETE);

eventSource.onmessage = function (event) {
  var message = JSON.parse(event.data);

  var topic = message.channel;
  // Decodificar mensaje
  var decodedString = atob(message.data);
  console.log("Topic: " + message.channel + "  Mensaje: " + decodedString);

  if (topic == topic_raiz + topic_dato_lampara_7) {
    var splitted = decodedString.toString().split(",");
    var switch7 = splitted[0];

    if (switch7 == "1") {
      $("#display_sw7").prop("checked", true);
    } else {
      $("#display_sw7").prop("checked", "");
    }
  }
};
////////////////////////////FIN LAMPARA SIETE ////////////////////////////
////////////////////// LAMPARA OCHO //////////////////////

var conexion_LAMP_OCHO =
  url +
  "channels=" +
  topic_raiz +
  topic_dato_lampara_8 +
  "&v=" +
  version +
  "&key=" +
  username +
  ":" +
  password;
var eventSource = new EventSource(conexion_LAMP_OCHO);

eventSource.onmessage = function (event) {
  var message = JSON.parse(event.data);

  var topic = message.channel;
  // Decodificar mensaje
  var decodedString = atob(message.data);
  console.log("Topic: " + message.channel + "  Mensaje: " + decodedString);

  if (topic == topic_raiz + topic_dato_lampara_8) {
    var splitted = decodedString.toString().split(",");
    var switch8 = splitted[0];

    if (switch8 == "1") {
      $("#display_sw8").prop("checked", true);
    } else {
      $("#display_sw8").prop("checked", "");
    }
  }
};
////////////////////////////FIN LAMPARA OCHO ////////////////////////////

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

function sw2_change() {
  var channel = ably.channels.get(topic_raiz + "/actions/sw2");

  if ($("#display_sw2").is(":checked")) {
    channel.publish(clientId, "1");
    console.log("Mensaje sw2 on");
  } else {
    channel.publish(clientId, "0");
    console.log("Mensaje sw2 off");
  }
}

function sw3_change() {
  var channel = ably.channels.get(topic_raiz + "/actions/sw3");

  if ($("#display_sw3").is(":checked")) {
    channel.publish(clientId, "1");
    console.log("Mensaje sw3 on");
  } else {
    channel.publish(clientId, "0");
    console.log("Mensaje sw3 off");
  }
}

function sw4_change() {
  var channel = ably.channels.get(topic_raiz + "/actions/sw4");

  if ($("#display_sw4").is(":checked")) {
    channel.publish(clientId, "1");
    console.log("Mensaje sw4 on");
  } else {
    channel.publish(clientId, "0");
    console.log("Mensaje sw4 off");
  }
}

function sw5_change() {
  var channel = ably.channels.get(topic_raiz + "/actions/sw5");

  if ($("#display_sw5").is(":checked")) {
    channel.publish(clientId, "1");
    console.log("Mensaje sw5 on");
  } else {
    channel.publish(clientId, "0");
    console.log("Mensaje sw5 off");
  }
}

function sw6_change() {
  var channel = ably.channels.get(topic_raiz + "/actions/sw6");

  if ($("#display_sw6").is(":checked")) {
    channel.publish(clientId, "1");
    console.log("Mensaje sw6 on");
  } else {
    channel.publish(clientId, "0");
    console.log("Mensaje sw6 off");
  }
}

function sw7_change() {
  var channel = ably.channels.get(topic_raiz + "/actions/sw7");

  if ($("#display_sw7").is(":checked")) {
    channel.publish(clientId, "1");
    console.log("Mensaje sw7 on");
  } else {
    channel.publish(clientId, "0");
    console.log("Mensaje sw7 off");
  }
}

function sw8_change() {
  var channel = ably.channels.get(topic_raiz + "/actions/sw8");

  if ($("#display_sw8").is(":checked")) {
    channel.publish(clientId, "1");
    console.log("Mensaje sw8 on");
  } else {
    channel.publish(clientId, "0");
    console.log("Mensaje sw8 off");
  }
}

function sw9_change() {
  var channel = ably.channels.get(topic_raiz + "/actions/sw9");

  if ($("#display_sw9").is(":checked")) {
    channel.publish(clientId, "1");
    console.log("Mensaje sw9 on");
  } else {
    channel.publish(clientId, "0");
    console.log("Mensaje sw9 off");
  }
}

function sw10_change() {
  var channel = ably.channels.get(topic_raiz + "/actions/sw10");

  if ($("#display_sw10").is(":checked")) {
    channel.publish(clientId, "1");
    console.log("Mensaje sw10 on");
  } else {
    channel.publish(clientId, "0");
    console.log("Mensaje sw10 off");
  }
}
