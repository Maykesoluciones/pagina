content = document.querySelector(".content"),
selectMenu = document.querySelectorAll("select"),
setAlarmBtn = document.querySelector("button");



// ENVIO DE MENSAJE INICIAL DE MQTT al abrir el navegador o esta pagina
var channel = ably.channels.get(topic_raiz+"/horasProgrmadas"); //topic
    channel.publish(clientId, "inicio_horas"); 

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
    var conex = splitted[0];

    if(conex == "Conectado" || conex == "Desconectado"){

      // ENVIO DE MENSAJE INICIAL DE MQTT estando abierta la pagina ya.
     var channel = ably.channels.get(topic_raiz+"/horasProgrmadas"); //topic
     channel.publish(clientId, "inicio_horas"); 
    }
  }
  };

  var estado_switch6_tarea;
  var hora_on_3_recibe;
  var minutos_on_3_recibe;
  var formato_on_3_recibe;
  var hora_off_3_recibe;
  var minutos_off_3_recibe;
  var formato_off_3_recibe;

  let hora_on_3_compara;
  let minutos_on_3_compara;
  let formato_on_3_compara;
  let hora_off_3_compara;
  let minutos_off_3_compara;
  let formato_off_3_compara;

  let hora_on_3_guardada;
  let minutos_on_3_guardada;
  let formato_on_3_guardada;
  let hora_off_3_guardada;
  let minutos_off_3_guardada;
  let formato_off_3_guardada;
  var time_off;

let  isAlarmSet;

///////////////////////////////////////////////////////////

function sw3_change_TAREA(){  
     
    if ($('#display_sw3_TAREA').is(":checked")){
        setAlarm(); 
    }else{
        setAlarm(); 
    }
}

////////////////////////////////////////////////////////////

for (let i = 12; i > 0; i--) {
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[0].firstElementChild.insertAdjacentHTML("afterend", option);
}

for (let i = 59; i >= 0; i--) {
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[1].firstElementChild.insertAdjacentHTML("afterend", option);
}

for (let i = 2; i > 0; i--) {
    let ampm = i == 1 ? "AM" : "PM";
    let option = `<option value="${ampm}">${ampm}</option>`;
    selectMenu[2].firstElementChild.insertAdjacentHTML("afterend", option);
}

for (let i = 12; i > 0; i--) {
     let option = `<option value="${i}">${i}</option>`;
     selectMenu[3].firstElementChild.insertAdjacentHTML("afterend", option);
 }
 
 for (let i = 59; i >= 0; i--) {
     let option = `<option value="${i}">${i}</option>`;
     selectMenu[4].firstElementChild.insertAdjacentHTML("afterend", option);
 }
 
 for (let i = 2; i > 0; i--) {
     let ampm = i == 1 ? "AM" : "PM";
     let option = `<option value="${ampm}">${ampm}</option>`;
     selectMenu[5].firstElementChild.insertAdjacentHTML("afterend", option);
 }

///////////////////////////////////////////////////////////////

function setAlarm() {
    if (isAlarmSet) {
        content.classList.remove("disable");
        document.getElementById("display_ALARMA_bt_3").innerHTML ="LAMPARA frente desactivado";
        var channel = ably.channels.get(topic_raiz+"/hora/recibe/programa/lampara3"); //topic
        channel.publish(clientId, "0"); 
        return isAlarmSet = false;
    }

    hora_on_3_recibe;
    minutos_on_3_recibe;
    formato_on_3_recibe;
    hora_off_3_recibe;
    minutos_off_3_recibe;
    formato_off_3_recibe;


    hora_on_3_compara = `${selectMenu[0].value}`;
    minutos_on_3_compara = `${selectMenu[1].value}`;
    formato_on_3_compara = `${selectMenu[2].value}`;
    hora_off_3_compara = `${selectMenu[3].value}`;
    minutos_off_3_compara = `${selectMenu[4].value}`;
    formato_off_3_compara = `${selectMenu[5].value}`;

    if(hora_on_3_compara.includes("horas_3_on")){
        hora_on_3_guardada = hora_on_3_recibe;
    }else{hora_on_3_guardada=hora_on_3_compara;}

    if(minutos_on_3_compara.includes("minutos_3_on")){
        minutos_on_3_guardada = minutos_on_3_recibe;
    }else{minutos_on_3_guardada=minutos_on_3_compara;}

    if(formato_on_3_compara.includes("formato_3_on")){
        formato_on_3_guardada = formato_on_3_recibe;
    }else{formato_on_3_guardada=formato_on_3_compara;}

    if(hora_off_3_compara.includes("horas_3_off")){
        hora_off_3_guardada = hora_off_3_recibe;
    }else{hora_off_3_guardada=hora_off_3_compara;}

    if(minutos_off_3_compara.includes("minutos_3_off")){
        minutos_off_3_guardada = minutos_off_3_recibe;
    }else{minutos_off_3_guardada=minutos_off_3_compara;}

    if(formato_off_3_compara.includes("formato_3_off")){
        formato_off_3_guardada = formato_off_3_recibe;
    }else{formato_off_3_guardada=formato_off_3_compara;}
    
    if (hora_on_3_guardada.includes("horas_3_on") || minutos_on_3_guardada.includes("minutos_3_on") || formato_on_3_guardada.includes("formato_3_on") || hora_off_3_guardada.includes("horas_3_off") || minutos_off_3_guardada.includes("minutos_3_off") || formato_off_3_guardada.includes("formato_3_off")) {
        $("#display_sw3_TAREA").prop('checked',"");
        return alert("Por favor, seleccione una hora válida para configurar la ACTIVACION de sus Lamparas!");
    }

    time_on_mqtt = `1,`+hora_on_3_guardada +`,`+ minutos_on_3_guardada + `,` + formato_on_3_guardada + `,`+ hora_off_3_guardada +`,`+ minutos_off_3_guardada + `,` + formato_off_3_guardada;

    isAlarmSet = true;
    content.classList.add("disable");
    document.getElementById("display_ALARMA_bt_3").innerHTML ="LAMPARA frente activado";

    if(estado_switch3_tarea == "1"){ 
 
    }
    if(estado_switch6_tarea == "0"){ 
        var channel = ably.channels.get(topic_raiz+"/hora/recibe/programa/lampara3"); //topic
        channel.publish(clientId, time_on_mqtt); 
    }
}

//////////////////////////////////////////////

var topic_datos_hora_prog_lamp3 = "/hora/envia/programa/lampara3";

var conexion_recibe_3 = url+'channels='+topic_raiz+topic_datos_hora_prog_lamp6+'&v='+version+'&key='+username+':'+password;
var eventSource = new EventSource(conexion_recibe_3);

eventSource.onmessage = function(event) {
  var message = JSON.parse(event.data);

  var topic = message.channel;
// Decodificar mensaje
var decodedString = atob(message.data);
console.log('Topic: ' + message.channel + '  Mensaje: ' + decodedString ); 

if (topic == topic_raiz+topic_datos_hora_prog_lamp3){
  var splitted = decodedString.toString().split(",");
  estado_switch3_tarea = splitted[0];
  hora_on_3_recibe = splitted[1];
  minutos_on_3_recibe = splitted[2];
  formato_on_3_recibe = splitted[3];
  hora_off_3_recibe = splitted[4];
  minutos_off_3_recibe = splitted[5];
  formato_off_3_recibe = splitted[6];

 document.getElementById("horas_3_on").innerHTML = hora_on_3_recibe;
 document.getElementById("minutos_3_on").innerHTML = minutos_on_3_recibe;
 document.getElementById("formato_3_on").innerHTML = formato_on_3_recibe;
 document.getElementById("horas_3_off").innerHTML = hora_off_3_recibe;
 document.getElementById("minutos_3_off").innerHTML = minutos_off_3_recibe;
 document.getElementById("formato_3_off").innerHTML = formato_off_3_recibe;

 if(estado_switch3_tarea == "1"){ 
    $("#display_sw3_TAREA").prop('checked', true); 
    isAlarmSet = true;
    content.classList.add("disable");
    document.getElementById("display_ALARMA_bt_3").innerHTML ="LAMPARA frente activado";
 }else{
    $("#display_sw3_TAREA").prop('checked', ""); 
    isAlarmSet = false;
    content.classList.remove("disable");
 }

}
};

////////////////////////////////////////////////////////
