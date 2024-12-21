history.forward()
// connect options control de usuarios
url = "https://realtime.ably.io/event-stream?";
version = "1.2";
username = "QLTmug.ldqIyQ";
password = "F57OdMEvI0r1R6ZEzasbjy6YOEpUqyrYi3djkW7OC5M";
topic_raiz = "K5A3506";
topic_conexion = "/conexion";
topic_autenticacion = "/autenticacion";
topic_comparar_acceso = "/compararAcceso";

// // Mensajes
mensaje_inicial = "Desconectado";
clientId =
topic_raiz = "K5A3506";
  " WEB FAM-K5A3506_INGRESO--->> " + Math.floor(Math.random() * 1000000 + 1);

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
  //console.log('Topic: ' + message.channel + '  Mensaje: ' + decodedString );

  if (topic == topic_raiz) {
    var splitted = decodedString.toString().split(",");
    var conexion_tarjeta = splitted[0];
    var mensaje_estado = splitted[1];

    console.log("Topic: " + message.channel + "  Mensaje: " + decodedString);

    if (conexion_tarjeta == "Conectado" || conexion_tarjeta == "Desconectado") {
      document.getElementById("display_conexion_tarjeta").innerHTML =
        conexion_tarjeta;
    }

    if (
      mensaje_estado == "LLene los dos campos" ||
      mensaje_estado == "LLene el campo de usuario" ||
      mensaje_estado == "LLene el campo de clave" ||
      mensaje_estado == "No autorizado"
    ) {
      document.getElementById("display_autorizacion").innerHTML =
        mensaje_estado;

      mensaje_estado = "Bienvenido(a) a luces K5A#35_06.";

      setTimeout(() => {
        document.getElementById("display_autorizacion").innerHTML =
          mensaje_estado;
        console.log("Intente de Nuevo");
      }, 5000);
    }
  }
};
//////////////////////////////////////////////

//recibir mensajes de los topicos suscritos de conexion y desconexion

var conexion_2 =
  url +
  "channels=" +
  topic_raiz +
  topic_comparar_acceso +
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
  //console.log('Topic: ' + message.channel + '  Mensaje: ' + decodedString );

  if (topic == topic_raiz + topic_comparar_acceso) {
    var splitted = decodedString.toString().split(",");

    var nombre_autorizado = splitted[0];
    var clave_autorizada = splitted[1];
    var usua_autent = splitted[2];
    var clav_autent = splitted[3];
    var enlase = splitted[4];

    if (nombre_autorizado == usua_autent && clave_autorizada == clav_autent) {
      if (nombre.includes("nombre") || clave.includes("clave")) {
        console.log(" NO Atorizado por campos no lleno");
      } else {
        console.log("Atorizado!!!");
        window.location = enlase;
      }
    } else {
      console.log(" NO Atorizado");
    }
  }
};
//////////////////////////////////////////////

var nombre, clave;
function validar() {
  nombre = document.getElementById("nombre").value;
  clave = document.getElementById("clave").value;
  //console.log(nombre+","+clave);

  var validando = ably.channels.get(topic_raiz + topic_autenticacion);
  validando.publish(clientId, nombre + "," + clave);

  // window.location=enlase_final;
  // setTimeout(function(){mostrarAviso()},3000); // 3000ms = 3s
}

//////////////////////////////////////////////

function presionar_tecla() {
  tecla_es = event.keyCode;

  if (tecla_es == 13) {
    validar();
  }
}
window.onkeydown = presionar_tecla;
