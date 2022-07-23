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


var encender_lamp6 = true;
var apagar_lamp6 = true;

var envio_estado_mqtt_on_lamp6 = true;
var envio_estado_mqtt_off_lamp6 = true;

var envio_mqtt = false;

var hora_on_6;
var minutos_on_6;
var formato_on_6;
var hora_off_6;
var minutos_off_6;
var formato_off_6;
var etado_switch6_tarea;

var horaon6;
var minutoson6;
var formatoon6;
var horaoff6;
var minutosoff6;
var formatooff6;

let alarmTimeOn,alarmTimeOff, isAlarmSetOn,isAlarmSetOff,setAlarmaOFF,
ringtone = new Audio("/files/ringtone.mp3");


function sw6_change_TAREA(){  
     
    if ($('#display_sw6_TAREA').is(":checked")){
      //setAlarm_on();
      //setAlarm_off();
      setAlarm_on_mqtt_6(); 
      setAlarm_off_mqtt_6(); 

    }else{
      //setAlarm_on();
      //setAlarm_off();
      setAlarm_on_mqtt_6(); 
      setAlarm_off_mqtt_6(); 
    }
}



for (let i = 12; i > 0; i--) {
    i = i < 10 ? `0${i}` : i;
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[0].firstElementChild.insertAdjacentHTML("afterend", option);
}

for (let i = 59; i >= 0; i--) {
    i = i < 10 ? `0${i}` : i;
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[1].firstElementChild.insertAdjacentHTML("afterend", option);
}

for (let i = 2; i > 0; i--) {
    let ampm = i == 1 ? "AM" : "PM";
    let option = `<option value="${ampm}">${ampm}</option>`;
    selectMenu[2].firstElementChild.insertAdjacentHTML("afterend", option);
}

for (let i = 12; i > 0; i--) {
    i = i < 10 ? `0${i}` : i;
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[3].firstElementChild.insertAdjacentHTML("afterend", option);
}

for (let i = 59; i >= 0; i--) {
    i = i < 10 ? `0${i}` : i;
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[4].firstElementChild.insertAdjacentHTML("afterend", option);
}

for (let i = 2; i > 0; i--) {
    let ampm = i == 1 ? "AM" : "PM";
    let option = `<option value="${ampm}">${ampm}</option>`;
    selectMenu[5].firstElementChild.insertAdjacentHTML("afterend", option);
}

setInterval(() => {
    let date = new Date(),
    h = date.getHours(),
    m = date.getMinutes(),
    s = date.getSeconds(),
    ampm = "AM";
    if(h >= 12) {
        h = h - 12;
        ampm = "PM";
    }
    h = h == 0 ? h = 12 : h;
    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;
    s = s < 10 ? "0" + s : s;
    
    if (alarmTimeOn === `${h}:${m} ${ampm}`) {
        ringtone.play();
        ringtone.loop = true;
        if(encender_lamp6 == true){
            encender_lamp6 = false;
            apagar_lamp6 = true;
            var channel = ably.channels.get(topic_raiz+"/actions/sw6");
            channel.publish(clientId, "1"); 
        }
    }
    if (alarmTimeOff === `${h}:${m} ${ampm}`) {
        ringtone.pause();
        if(apagar_lamp6 == true){
            apagar_lamp6 = false;
            encender_lamp6 = true;
            var channel = ably.channels.get(topic_raiz+"/actions/sw6");
            channel.publish(clientId, "0"); 
        }
    }
});

/*
function setAlarm_on() {

    if (isAlarmSetOn) {
        alarmTimeOn = "";
        ringtone.pause();
        content.classList.remove("disable");
        console.log('Mensaje sw6 TAREA off');
        document.getElementById("display_ALARMA_bt_6").innerHTML ="LAMPARA SEIS desactivado";
        return isAlarmSetOn = false;
    }

    let time_on = `${selectMenu[0].value}:${selectMenu[1].value} ${selectMenu[2].value}`;
    let time_off = `${selectMenu[3].value}:${selectMenu[4].value} ${selectMenu[5].value}`;

    if (time_on.includes("horas_6_on") || time_on.includes("minutos_6_on") || time_on.includes("formato_6_on")) {
        $("#display_sw6_TAREA").prop('checked',"");
        return alert("Por favor, seleccione una hora válida para configurar la ACTIVACION de esta función!");  
        setAlarmaOFF = false;         
     }else{
        if (time_off.includes("horas_6_off") || time_off.includes("Minuto_6_off") || time_off.includes("formato_6_off")) {      
            $("#display_sw6_TAREA").prop('checked',"");
            return alert("Por favor, seleccione una hora válida para configurar la ACTIVACION de esta función!");  
            setAlarmaOFF = false;   
        }else{
            setAlarmaOFF = true; 
            }
    }

    alarmTimeOn = time_on;
    isAlarmSetOn = true;
    content.classList.add("disable");    
    console.log('tiempo on');
    console.log(time_on);
    document.getElementById("display_ALARMA_bt_6").innerHTML ="LAMPARA SEIS activado";

}
*/

/*
function setAlarm_off() {

    let time_off = `${selectMenu[3].value}:${selectMenu[4].value} ${selectMenu[5].value}`;

    let time_mqtt_on = `1,${selectMenu[0].value},${selectMenu[1].value},${selectMenu[2].value},${selectMenu[3].value},${selectMenu[4].value},${selectMenu[5].value}`;
   
    var channel = ably.channels.get(topic_raiz+"/hora/recibe/programa/lampara6");

 if(setAlarmaOFF == true){
 
    if (isAlarmSetOff) {
        alarmTimeOff = "";
        ringtone.pause();
        content.classList.remove("disable");
        console.log('Mensaje sw6 TAREA off');
        document.getElementById("display_ALARMA_bt_6").innerHTML ="LAMPARA SEIS desactivado";
        return isAlarmSetOff = false;
    }

    alarmTimeOff = time_off;
    isAlarmSetOff = true;
    content.classList.add("disable");    
    console.log('tiempo off');
    console.log(alarmTimeOff);
    document.getElementById("display_ALARMA_bt_6").innerHTML ="LAMPARA SEIS activado";

    if (envio_estado_mqtt_on_lamp6 == true){
        channel.publish(clientId,time_mqtt_on); 
        console.log('Mensaje sw6 on');
        envio_estado_mqtt_on_lamp6 = false;
        envio_estado_mqtt_off_lamp6 = true;
    } 

    }else{
        $("#display_sw6_TAREA").prop('checked',"");
        if (envio_estado_mqtt_off_lamp6 == true){
            // channel.publish(clientId,time_mqtt); 
             console.log('Mensaje sw6 off');
             envio_estado_mqtt_off_lamp6 = false;
             envio_estado_mqtt_on_lamp6 = true;
         } 
        return
    }
}

*/



function setAlarm_on_mqtt_6() {

    if (isAlarmSetOn) {
        alarmTimeOn = "";
        ringtone.pause();
        content.classList.remove("disable");
        console.log('Mensaje sw6 TAREA off');
        document.getElementById("display_ALARMA_bt_6").innerHTML ="LAMPARA SEIS desactivado";
        return isAlarmSetOn = false;
    }

    hora_on_6;
    minutos_on_6;
    formato_on_6;
    hora_off_6;
    minutos_off_6;
    formato_off_6;

    let time_on_mqtt_6 = `${hora_on_6}:${minutos_on_6} ${formato_on_6}`;
    let time_off_mqtt_6 = `${hora_off_6}:${minutos_off_6} ${formato_off_6}`;

    if (time_on_mqtt_6.includes("horas_6_on") || time_on_mqtt_6.includes("minutos_6_on") || time_on_mqtt_6.includes("formato_6_on")) {
        $("#display_sw6_TAREA").prop('checked',"");
        return alert("Por favor, seleccione una hora válida para configurar la ACTIVACION de esta función!");  
        setAlarmaOFF = false;         
     }else{
        if (time_off_mqtt_6.includes("horas_6_off") || time_off_mqtt_6.includes("Minuto_6_off") || time_off_mqtt_6.includes("formato_6_off")) {      
            $("#display_sw6_TAREA").prop('checked',"");
            return alert("Por favor, seleccione una hora válida para configurar la ACTIVACION de esta función!");  
            setAlarmaOFF = false;   
        }else{
            setAlarmaOFF = true; 
            }
    }

    alarmTimeOn = time_on_mqtt_6;
    isAlarmSetOn = true;
    content.classList.add("disable");    
    console.log('tiempo on');
    console.log(time_on_mqtt_6);
    document.getElementById("display_ALARMA_bt_6").innerHTML ="LAMPARA SEIS activado";

}


function setAlarm_off_mqtt_6() {

    let time_off_mqtt_6 = `${hora_off_6}:${minutos_off_6} ${formato_off_6}`;

    let time_on_horas = `${selectMenu[0].value}`;
    let time_on_minutos = `${selectMenu[1].value}`;
    let time_on_formato = `${selectMenu[2].value}`;

    let time_off_horas = `${selectMenu[3].value}`;
    let time_off_minutos = `${selectMenu[4].value}`;
    let time_off_formato = `${selectMenu[5].value}`;

/////////////////////////

if (time_on_horas.includes("horas_6_on")) {
    horaon6 = hora_on_6;
}else{horaon6 = time_on_horas;}
console.log(horaon6);

if (time_on_minutos.includes("minutos_6_on")) {
    minutoson6 = minutos_on_6;
}else{minutoson6 = time_on_minutos;}
console.log(minutoson6);

if (time_on_formato.includes("formato_6_on")) {
    formatoon6 = formato_on_6;
}else{formatoon6 = time_on_formato;}
console.log(formatoon6);

/////////////////////////////////////

if (time_off_horas.includes("horas_6_off")) {
    horaoff6 = hora_off_6;
}else{horaoff6 = time_off_horas;}
console.log(horaoff6);

if (time_off_minutos.includes("minutos_6_off")) {
    minutosoff6 = minutos_off_6;
}else{minutosoff6 = time_off_minutos;}
console.log(minutosoff6);

if (time_off_formato.includes("formato_6_off")) {
    formatooff6 = formato_off_6;
}else{formatooff6 = time_off_formato;}
console.log(formatooff6);



    var time_mqtt_on = "1," + horaon6 + "," + minutoson6 + "," + formatoon6 + "," + horaoff6 + "," + minutosoff6 + "," + formatooff6;
  
console.log(time_mqtt_on);

 if(setAlarmaOFF == true){
 
    if (isAlarmSetOff) {
       
        alarmTimeOff = "";
        ringtone.pause();
        content.classList.remove("disable");
        console.log('Mensaje sw6 TAREA off');
        document.getElementById("display_ALARMA_bt_6").innerHTML ="LAMPARA SEIS desactivado";
        return isAlarmSetOff = false;
    }

    alarmTimeOff = time_off_mqtt_6;
    isAlarmSetOff = true;
    content.classList.add("disable");    
    console.log('tiempo off');
    console.log(alarmTimeOff);
    document.getElementById("display_ALARMA_bt_6").innerHTML ="LAMPARA SEIS activado";

    if (envio_estado_mqtt_on_lamp6 == true){
        var channel = ably.channels.get(topic_raiz+"/hora/recibe/programa/lampara6");
        channel.publish(clientId,time_mqtt_on); 
        console.log('Mensaje sw6 on');
        envio_estado_mqtt_on_lamp6 = false;
        envio_estado_mqtt_off_lamp6 = true;
    } 

    }else{
        $("#display_sw6_TAREA").prop('checked',"");
        if (envio_estado_mqtt_off_lamp6 == true){
            channel.publish(clientId,time_mqtt_on); 
             console.log('Mensaje sw6 off');
             envio_estado_mqtt_off_lamp6 = false;
             envio_estado_mqtt_on_lamp6 = true;
         }

        return
    }
}

//////////////////////////////////////////////

var topic_datos_hora_prog_lamp6 = "/hora/envia/programa/lampara6";

var conexion_recibe_6 = url+'channels='+topic_raiz+topic_datos_hora_prog_lamp6+'&v='+version+'&key='+username+':'+password;
var eventSource = new EventSource(conexion_recibe_6);

eventSource.onmessage = function(event) {
  var message = JSON.parse(event.data);

  var topic = message.channel;
// Decodificar mensaje
var decodedString = atob(message.data);
console.log('Topic: ' + message.channel + '  Mensaje: ' + decodedString ); 

if (topic == topic_raiz+topic_datos_hora_prog_lamp6){
  var splitted = decodedString.toString().split(",");
  var etado_switch6_tarea = splitted[0];
  hora_on_6 = splitted[1];
  minutos_on_6 = splitted[2];
  formato_on_6 = splitted[3];
  hora_off_6 = splitted[4];
  minutos_off_6 = splitted[5];
  formato_off_6 = splitted[6];


  document.getElementById("horas_6_on").innerHTML = hora_on_6;
  selectMenu[0].firstElementChild.insertAdjacentHTML("afterend", hora_on_6);
  //selectMenu[0].hora_on_6
  document.getElementById("minutos_6_on").innerHTML = minutos_on_6;
  selectMenu[1].firstElementChild.insertAdjacentHTML("afterend", minutos_on_6);
  //selectMenu[1].minutos_on_6
  document.getElementById("formato_6_on").innerHTML = formato_on_6;
  selectMenu[2].firstElementChild.insertAdjacentHTML("afterend", formato_on_6);
  //selectMenu[2].formato_on_6

  document.getElementById("horas_6_off").innerHTML = hora_off_6;
  document.getElementById("minutos_6_off").innerHTML = minutos_off_6;
  document.getElementById("formato_6_off").innerHTML = formato_off_6;

  if(etado_switch6_tarea == "1"){
    $("#display_sw6_TAREA").prop('checked', true);   
    setAlarm_on_mqtt_6(); 
    setAlarm_off_mqtt_6();   
  }else{
    $("#display_sw6_TAREA").prop('checked',"");
    setAlarm_on_mqtt_6(); 
    setAlarm_off_mqtt_6(); 
  }

}
};

////////////////////////////////////////////////////////
