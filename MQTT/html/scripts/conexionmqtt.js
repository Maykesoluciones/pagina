history.forward()

/////////////////////////////////////////
/////////////// Autenticacion////////////
/////////////////////////////////////////

var entrar_pagina;
var entrarpaginaWEB;
var entrarPagina = localStorage.getItem("entrar_pagina");
console.log(entrarPagina);

var conteo_refres;

// // Mensaje Inicial
mensaje_inicial = "Desconectado";

const connectUrl = 'wss://broker.emqx.io:8084/mqtt';
topic_raiz = "MQTT";
topic_conexion = "/conexion";
topic_datos_lamparas = "/datos_lamparas";
topic_ip = "/ip";
topic_github_actualizacion_recibe = "/github/ota/recibe";
topic_github_actualizacion_envia = "/github/ota/envia";

var topic_datos_hora_prog_lamp3 = "/hora/envia/programa/lampara3";

////////////ESTADOS INDIVIDUAL DE LAMPARAS 1,2,3,ETC
topic_dato_lampara_1 = "/datolampara1";
topic_dato_lampara_2 = "/datolampara2";
topic_dato_lampara_3 = "/datolampara3";
topic_dato_lampara_4 = "/datolampara4";
topic_dato_lampara_5 = "/datolampara5";
topic_dato_lampara_6 = "/datolampara6";
topic_dato_lampara_7 = "/datolampara7";
topic_dato_lampara_8 = "/datolampara8";

const options = {
  clean: true,
  connectTimeout: 4000,
  clientId: "WEB FAM-MQTT--->> " + Math.floor(Math.random() * 1000000 + 1),
  clean: true,
  connectTimeout: 4000,
  reconnectPeriod: 1000,
};
const client = mqtt.connect(connectUrl, options);

client.on('connect', () => {
  console.log('Conexion Exitosa con broker.emqx.io')
  client.subscribe(topic_raiz)
  client.subscribe(topic_raiz + topic_datos_lamparas)
  client.subscribe(topic_raiz + topic_dato_lampara_1)
  client.subscribe(topic_raiz + topic_dato_lampara_2)
  client.subscribe(topic_raiz + topic_dato_lampara_3)
  client.subscribe(topic_raiz + topic_dato_lampara_4)
  client.subscribe(topic_raiz + topic_dato_lampara_5)
  client.subscribe(topic_raiz + topic_dato_lampara_6)
  client.subscribe(topic_raiz + topic_dato_lampara_7)
  client.subscribe(topic_raiz + topic_dato_lampara_8)
  client.subscribe(topic_raiz + topic_datos_hora_prog_lamp3)

  client.publish(topic_raiz + topic_conexion, mensaje_inicial);
});

//recibir mensajes de los topicos suscritos de conexion y desconexion

client.on('message', (topic, message) => {
  console.log(`Mensaje recibido [${topic}]: ${message.toString()}`);
  if (topic == topic_raiz){
    var splitted = message.toString().split(",");
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
        //tiempo_exit();
      }
    }
  }

  //recibir mensajes de los topicos suscritos de github/ota/firmware

    if (topic == topic_raiz+topic_github_actualizacion_recibe) {
    var splitted = decodedString.toString().split(",");
    var conexion_gitgub = splitted[0];
    var mensaje_estado = splitted[1];

    //Conectado,Firmware actualizado.

    console.log("Topic: " + message.channel + "  Mensaje: " + decodedString);

    if (conexion_gitgub == "Conectado") {
      contenido.innerHTML= mensaje_estado;
    }

    if (conexion_gitgub == "Conectado") {
      if(mensaje_estado == "Valide su clave OTA."){
        ota_autenticar = true;
        console.log("autenticar")
      }
    }

    setTimeout(() => {
      contenido.innerHTML= "";
          },10000);
  }

  if (topic == topic_raiz + topic_datos_lamparas){
    var splitted = message.toString().split(",");

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
  //// consulta de ip  /////

  if (topic == topic_raiz + topic_ip) {
    var splitted = message.toString().split(",");
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
  /// fin consulta ip ///

////////////////////////////////////////////////////////
///////////////// RECIBIR ESTADO INDIVIDUAL DE CADA LAMPARA ////////////////////////////
////////////////////// LAMPARA UNO //////////////////////
if (topic == topic_raiz + topic_dato_lampara_1) {
  var splitted = message.toString().split(",");
  var switch1 = splitted[0];

  if (switch1 == "1") {
    $("#display_sw1").prop("checked", true);
  } else {
    $("#display_sw1").prop("checked", "");
  }
}
////////////////////////////FIN LAMPARA UNO ////////////////////////////
////////////////////// LAMPARA DOS //////////////////////
if (topic == topic_raiz + topic_dato_lampara_2) {
  var splitted = message.toString().split(",");
  var switch2 = splitted[0];

  if (switch2 == "1") {
    $("#display_sw2").prop("checked", true);
  } else {
    $("#display_sw2").prop("checked", "");
  }
}
////////////////////////////FIN LAMPARA DOS ////////////////////////////
////////////////////// LAMPARA TRES //////////////////////
if (topic == topic_raiz + topic_dato_lampara_3) {
  var splitted = message.toString().split(",");
  var switch3 = splitted[0];

  if (switch3 == "1") {
    $("#display_sw3").prop("checked", true);
  } else {
    $("#display_sw3").prop("checked", "");
  }
}
////////////////////////////FIN LAMPARA TRES ////////////////////////////
////////////////////// LAMPARA CUATRO //////////////////////
if (topic == topic_raiz + topic_dato_lampara_4) {
  var splitted = message.toString().split(",");
  var switch4 = splitted[0];

  if (switch4 == "1") {
    $("#display_sw4").prop("checked", true);
  } else {
    $("#display_sw4").prop("checked", "");
  }
}
////////////////////////////FIN LAMPARA CUATRO ////////////////////////////
////////////////////// LAMPARA CINCO //////////////////////
if (topic == topic_raiz + topic_dato_lampara_5) {
  var splitted = message.toString().split(",");
  var switch5 = splitted[0];

  if (switch5 == "1") {
    $("#display_sw5").prop("checked", true);
  } else {
    $("#display_sw5").prop("checked", "");
  }
}
////////////////////////////FIN LAMPARA CINCO ////////////////////////////
////////////////////// LAMPARA SIES //////////////////////
if (topic == topic_raiz + topic_dato_lampara_6) {
  var splitted = message.toString().split(",");
  var switch6 = splitted[0];

  if (switch6 == "1") {
    $("#display_sw6").prop("checked", true);
  } else {
    $("#display_sw6").prop("checked", "");
  }
}
////////////////////////////FIN LAMPARA SIES ////////////////////////////
////////////////////// LAMPARA SIETE //////////////////////
if (topic == topic_raiz + topic_dato_lampara_7) {
  var splitted = message.toString().split(",");
  var switch7 = splitted[0];

  if (switch7 == "1") {
    $("#display_sw7").prop("checked", true);
  } else {
    $("#display_sw7").prop("checked", "");
  }
}
////////////////////////////FIN LAMPARA SIETE ////////////////////////////
////////////////////// LAMPARA OCHO //////////////////////

if (topic == topic_raiz + topic_dato_lampara_8) {
  var splitted = message.toString().split(",");
  var switch8 = splitted[0];

  if (switch8 == "1") {
    $("#display_sw8").prop("checked", true);
  } else {
    $("#display_sw8").prop("checked", "");
  }
}
////////////////////////////FIN LAMPARA OCHO ////////////////////////////
////////////////////////// FIN RECIBIR ESTADO INDIVIDUAL LAMPARAS ///////////////////////////
});

//tiempo_exit();
function tiempo_exit() {
  setTimeout(() => {
    console.log("tiempo de autorizacion ok");

    if (entrar_pagina == "true" || entrarPagina == "true") {
      console.log("Bienvenido Autorizado");
      let autorizo = "true";
      localStorage.setItem("entrar_pagina", autorizo);
    } else {
     window.location = "https://maykesoluciones.github.io/pagina/MQTT/html/signin.html";
    }
  }, 2000);
}

if (display_conexion == "Desconectado") {
  let autorizo = "false";
  localStorage.setItem("entrar_pagina", autorizo);
  localStorage.setItem("conteo", "0");
  console.log("vas para fuera");
  entrarPagina = localStorage.getItem("entrar_pagina");
  //tiempo_exit();
}

function sw1_change() {
  if ($("#display_sw1").is(":checked")) {
    client.publish(topic_raiz + "/actions/sw1", "1");
    console.log("Mensaje sw1 on");
  } else {
    client.publish(topic_raiz + "/actions/sw1", "0");
    console.log("Mensaje sw1 off");
  }
}

function sw2_change() {
  if ($("#display_sw2").is(":checked")) {
    client.publish(topic_raiz + "/actions/sw2", "1");
    console.log("Mensaje sw2 on");
  } else {
    client.publish(topic_raiz + "/actions/sw2", "0");
    console.log("Mensaje sw2 off");
  }
}

function sw3_change() {
  if ($("#display_sw3").is(":checked")) {
    client.publish(topic_raiz + "/actions/sw3", "1");
    console.log("Mensaje sw3 on");
  } else {
    client.publish(topic_raiz + "/actions/sw3", "0");
    console.log("Mensaje sw3 off");
  }
}

function sw4_change() {

  if ($("#display_sw4").is(":checked")) {
    client.publish(topic_raiz + "/actions/sw4", "1");
    console.log("Mensaje sw4 on");
  } else {
    client.publish(topic_raiz + "/actions/sw4", "0");
    console.log("Mensaje sw4 off");
  }
}

function sw5_change() {
  if ($("#display_sw5").is(":checked")) {
    client.publish(topic_raiz + "/actions/sw5", "1");
    console.log("Mensaje sw5 on");
  } else {
    client.publish(topic_raiz + "/actions/sw5", "0");
    console.log("Mensaje sw5 off");
  }
}

function sw6_change() {
  if ($("#display_sw6").is(":checked")) {
    client.publish(topic_raiz + "/actions/sw6", "1");
    console.log("Mensaje sw6 on");
  } else {
    client.publish(topic_raiz + "/actions/sw6", "0");
    console.log("Mensaje sw6 off");
  }
}

function sw7_change() {
  if ($("#display_sw7").is(":checked")) {
    client.publish(topic_raiz + "/actions/sw7", "1");
    console.log("Mensaje sw7 on");
  } else {
    client.publish(topic_raiz + "/actions/sw7", "0");
    console.log("Mensaje sw7 off");
  }
}

function sw8_change() {
  if ($("#display_sw8").is(":checked")) {
    client.publish(topic_raiz + "/actions/sw8", "1");
    console.log("Mensaje sw8 on");
  } else {
    client.publish(topic_raiz + "/actions/sw8", "0");
    console.log("Mensaje sw8 off");
  }
}

function sw9_change() {
  if ($("#display_sw9").is(":checked")) {
    client.publish(topic_raiz + "/actions/sw9", "1");
    console.log("Mensaje sw9 on");
  } else {
    client.publish(topic_raiz + "/actions/sw9", "0");
    console.log("Mensaje sw9 off");
  }
}

function sw10_change() {
  if ($("#display_sw10").is(":checked")) {
    client.publish(topic_raiz + "/actions/sw10", "1");
    console.log("Mensaje sw10 on");
  } else {
    client.publish(topic_raiz + "/actions/sw10", "0");
    console.log("Mensaje sw10 off");
  }
}
