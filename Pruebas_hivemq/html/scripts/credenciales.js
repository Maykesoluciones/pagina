history.forward()

// // Mensaje Inicial
mensaje_inicial = "Desconectado";

const connectUrl = 'wss://2e884035f7e847b48b7266ff13d4eaf3.s1.eu.hivemq.cloud:8884/mqtt';
topic_raiz = "Pruebas";
topic_conexion = "/conexion";
topic_autenticacion = "/autenticacion";
topic_comparar_acceso = "/compararAcceso";

const options = {
  clean: true,
  connectTimeout: 4000,
  clientId: "WEB FAM-MERCADO--->> " + Math.floor(Math.random() * 1000000 + 1),
  username: 'mayke',
  password: 'MaykeS2025',
};
const client = mqtt.connect(connectUrl, options);

client.on('connect', () => {
  console.log('Conexion Exitosa con HiveMQ')
  client.subscribe(topic_raiz)
  client.subscribe(topic_raiz + topic_comparar_acceso)
  client.publish(topic_raiz + topic_conexion, mensaje_inicial);
});

//recibir mensajes de los topicos suscritos de conexion y desconexion


client.on('message', (topic, message) => {
  console.log(`Mensaje recibido [${topic}]: ${message.toString()}`);
 
  if (topic == topic_raiz){
    var splitted = message.toString().split(",");
    var conexion_tarjeta = splitted[0];
    var mensaje_estado = splitted[1];
    if (conexion_tarjeta == "Conectado" || conexion_tarjeta == "Desconectado") {
      document.getElementById("display_conexion_tarjeta").innerHTML = conexion_tarjeta;
    }
  }
  
  if (
    mensaje_estado == "LLene los dos campos" ||
    mensaje_estado == "LLene el campo de usuario" ||
    mensaje_estado == "LLene el campo de clave" ||
    mensaje_estado == "No autorizado"
  ) {
    document.getElementById("display_autorizacion").innerHTML =
      mensaje_estado;

    mensaje_estado = "";

    setTimeout(() => {
      document.getElementById("display_autorizacion").innerHTML =
        mensaje_estado;
      console.log("Intente de Nuevo");
    }, 5000);
  }

  if (topic == topic_raiz + topic_comparar_acceso) {
    var splitted = message.toString().split(",");
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
//////////////////////////////////////////////

});

var nombre, clave;
function validar() {
  nombre = document.getElementById("nombre").value;
  clave = document.getElementById("clave").value;

  client.publish(topic_raiz + topic_autenticacion, nombre + "," + clave);

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
