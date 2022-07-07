// connect options control de usuarios

url = "https://realtime.ably.io/event-stream?";
version = "1.2"
username = "VRDsGQ.B_CYIQ";
password = "dPUOfDfiuRQrRSX9wt1fcYc9v-AKBdGQa2jTP60_D5g";
topic_raiz = "mami";
topic_conexion = "/conexion";
topic_autenticacion = "/autenticacion";
topic_comparar_acceso = "/compararAcceso";

    // // Mensajes
    mensaje_inicial = "Desconectado"
    clientId=  " WEB FAM-MERCADO_INGRESO--->> " + Math.floor((Math.random() * 1000000) + 1);

var ably = new Ably.Realtime(username+':'+password);

   var channel = ably.channels.get(topic_raiz+topic_conexion);
   channel.publish(clientId, mensaje_inicial);                    // publicar siempre que inice el servidor web con mensaje de inicio

  //recibir mensajes de los topicos suscritos de conexion y desconexion

  var conexion = url+'channels='+topic_raiz+'&v='+version+'&key='+username+':'+password;
  var eventSource = new EventSource(conexion);

  eventSource.onmessage = function(event) {
    var message = JSON.parse(event.data);
  
    var topic = message.channel;
  // Decodificar mensaje
  var decodedString = atob(message.data);
  console.log('Topic: ' + message.channel + '  Mensaje: ' + decodedString ); 
  
  if (topic == topic_raiz){
    var splitted = decodedString.toString().split(",");
    var conexion_tarjeta = splitted[0];

    if(conexion_tarjeta == "Conectado" || conexion_tarjeta == "Desconectado"){
      document.getElementById("display_conexion_tarjeta").innerHTML = conexion_tarjeta;
    }
  }
  };
  //////////////////////////////////////////////
  
    //recibir mensajes de los topicos suscritos de conexion y desconexion
	
  var conexion_2 = url+'channels='+topic_raiz+topic_comparar_acceso+'&v='+version+'&key='+username+':'+password;
  var eventSource = new EventSource(conexion_2);

  eventSource.onmessage = function(event) {
    var message = JSON.parse(event.data);
  
    var topic = message.channel;
  // Decodificar mensaje
  var decodedString = atob(message.data);
  console.log('Topic: ' + message.channel + '  Mensaje: ' + decodedString ); 
  
  if (topic == topic_raiz+topic_comparar_acceso){
    var splitted = decodedString.toString().split(",");
	
	   var   nombre_autorizado =  splitted[0];
       var   clave_autorizada  =  splitted[1];
       var   usua_autent =  splitted[2];
       var   clav_autent  =  splitted[3];
       var   enlase   =  splitted[4];
	

    if(nombre_autorizado == usua_autent && clave_autorizada == clav_autent){
      console.log("Atorizado!!!");
	  window.location=enlase;
    }else{
	  console.log(" NO Atorizado");	
	}
	
  }
  };
  //////////////////////////////////////////////
  
  var nombre,clave;
  function validar(){
    nombre = document.getElementById('nombre').value;
    clave = document.getElementById('clave').value;
    console.log(nombre+","+clave);
	
	var validando = ably.channels.get(topic_raiz+topic_autenticacion);
   validando.publish(clientId, nombre+","+clave); 

    // window.location=enlase_final;
    // setTimeout(function(){mostrarAviso()},3000); // 3000ms = 3s
}






/*

    if (topic == topic_raiz + topic_credenciales_RX){
     splitted = message.toString().split(",");
      autorizacion = splitted[0]
      mensaje = splitted[1];

      $("#display_autorizacion").html(autorizacion);
      $("#display_ms_espera").html(mensaje);

    }
    if (topic == topic_raiz + topic_credenciales_acc){
         splitted = message.toString().split(",");

          nombre_autorizado =  splitted[0];
          clave_autorizada  =  splitted[1];
          autorizado_nombre =  splitted[2];
          autorizada_clave  =  splitted[3];
          enlase   =  splitted[4];

          $("#display_autorizacion").html(autorizacion);
          $("#display_ms_espera").html(mensaje);


          if(nombre_autorizado == autorizado_nombre && clave_autorizada == autorizada_clave){
            window.location=enlase;
          }

        }


  })
*/