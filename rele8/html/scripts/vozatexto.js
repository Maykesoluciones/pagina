const contenido = document.querySelector('.contenido')
var mensaje;

function iniciar_reco_VOZ(){
  document.getElementById("btn").style.display = "none" 
  aranque();
}


function aranque() {

  // Create a Speech Recognition object with callback
  Reconocimiento = new p5.SpeechRec('es-CO', voz_escuchada);
  // This must come after setting the properties
  Reconocimiento.start();

  // Speech recognized event
  function voz_escuchada() {
    
    if (Reconocimiento.resultValue) {
      mensaje = Reconocimiento.resultString;
      // Show user
      contenido.innerHTML= mensaje;
      console.log(mensaje);
    }
    leerTextoCondicionado(mensaje)
  }
  //////////////////////////////////////////////////////////////////////////////////////
Reconocimiento.onError = function(event) {
console.log(event.error);
  setTimeout(() => { 
    contenido.innerHTML= 'Error: ' + event.error;   
    document.getElementById("btn").style.display = ""
      console.log("Error");     
      },1000); 
}

  //////////////////////////////////////////////////////////////////////////////////////
  Reconocimiento.onStart = function(event) {
    setTimeout(() => { 
        contenido.innerHTML = 'Escucho...' 
        console.log("sonido inicio");     
        },1000); 
  }

  //////////////////////////////////////////////////////////////////////////////////////
  Reconocimiento.onEnd = function(event) {
    setTimeout(() => {
      console.log("sonido Termidado");   
      // Reconocimiento.start(); 
      document.getElementById("btn").style.display = ""      
        },1000); 
  }
}

 /*Función que condiciona la respuesta dependiendo de el contenido de la grabación */
const leerTextoCondicionado = (mensaje)=>{
    const voz = new SpeechSynthesisUtterance()
    
    
      ///////////////////////////// IP ///////////////////////////////////
  
    if(mensaje.includes('ip')|| mensaje.includes('IP')){
        voz.text ="Consulta ip,";
        var channel = ably.channels.get(topic_raiz+"/ip");
        channel.publish(clientId, "ip"); 
        console.log('consulta ip);
           
    }else{
        //voz.text = mensaje
    } 
    
    
// PREGUNTAS
    if(mensaje.includes('qué hora es') || mensaje.includes('dime la hora') || mensaje.includes('Dime la hora')){
      
        var date = new Date;
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
      
        voz.text = 'son las ' + strTime
      
    }else{
        //voz.text = mensaje
    }  
 /////////////////////////////////////////////////////////// 
  
    if(mensaje.includes('qué fecha es hoy')){
      
        var date = new Date;
        var mes = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"]
              
        voz.text = "hoy es " + date.getDate() + " de "+ mes[date.getMonth()] + "del" + date.getFullYear()
      
    }else{
        //voz.text = mensaje
    }
////////////////////////////////////////////////////////////////
  
    if(mensaje.includes('Cómo te llamas') || mensaje.includes('Cómo te llamas')  || mensaje.includes('Cuál es tu nombre')){
      

              
        voz.text = 'Mi nombre es, Ely, tu asistente de Voz'
      
    }else{
        //voz.text = mensaje
    }
////////////////////////////////////////////////////////////////
  
    if(mensaje.includes('qué día es hoy')|| mensaje.includes('Qué día es hoy')){
      
        var date = new Date;
        var dia = ["lunes", "martes", "miercoles", "jueves", "viernes", "sabado", "domingo"]
        voz.text ="hoy es "+ dia[date.getDay()-1];
    }else{
        //voz.text = mensaje
    }  
  
  ///////////////////////////// SALIR ///////////////////////////////////
  
    if(mensaje.includes('salir')|| mensaje.includes('Salir')){
        voz.text ="hasta la próxima";
      
        setTimeout(() => {
        window.location = "https://maykesoluciones.github.io/pagina/rele8/html/signin.html";
        },1500);      
    }else{
        //voz.text = mensaje
    } 
  
////////////////////////////////// lamparassss ////////////////////////////////////////////////////  
 
    if(mensaje.includes('lámpara 1 prender') || mensaje.includes('lámpara 1 encender') || mensaje.includes('encender lámpara uno') || mensaje.includes('encender lámpara 1')){
        voz.text = 'Listo!!!'
        var channel = ably.channels.get(topic_raiz+"/actions/sw1");
        channel.publish(clientId, "1"); 
        console.log('Mensaje sw1 on');
    }else{
        //voz.text = mensaje
    }

    if(mensaje.includes('lámpara 1 Apagar') || mensaje.includes('lámpara 1 apagar') || mensaje.includes('Apagar lámpara uno') || mensaje.includes('Apagar lámpara 1')){
        voz.text = 'Listo!!!'
        var channel = ably.channels.get(topic_raiz+"/actions/sw1");
        channel.publish(clientId, "0"); 
        console.log('Mensaje sw1 off');
    }else{
        //voz.text = mensaje
    }
///////////////////////////////////
if(mensaje.includes('lámpara 2 prender') || mensaje.includes('lámpara 2 encender') || mensaje.includes('encender lámpara dos')|| mensaje.includes('encender lámpara 2')){
    voz.text = 'Listo!!!'
    var channel = ably.channels.get(topic_raiz+"/actions/sw2");
    channel.publish(clientId, "1"); 
    console.log('Mensaje sw2 on');
}else{
    //voz.text = mensaje
}

if(mensaje.includes('lámpara 2 Apagar') || mensaje.includes('lámpara 2 apagar') || mensaje.includes('Apagar lámpara dos')|| mensaje.includes('Apagar lámpara 2')){
    voz.text = 'Listo!!!'
    var channel = ably.channels.get(topic_raiz+"/actions/sw2");
    channel.publish(clientId, "0"); 
    console.log('Mensaje sw2 off');
}else{
    //voz.text = mensaje
}
///////////////////////////////////
if(mensaje.includes('lámpara 3 prender') || mensaje.includes('lámpara 3 encender') || mensaje.includes('encender lámpara tres')|| mensaje.includes('encender lámpara 3')){
    voz.text = 'Listo!!!'
    var channel = ably.channels.get(topic_raiz+"/actions/sw3");
    channel.publish(clientId, "1"); 
    console.log('Mensaje sw3 on');
}else{
    //voz.text = mensaje
}

if(mensaje.includes('lámpara 3 Apagar') || mensaje.includes('lámpara 3 apagar') || mensaje.includes('Apagar lámpara tres')|| mensaje.includes('Apagar lámpara 3')){
    voz.text = 'Listo!!!'
    var channel = ably.channels.get(topic_raiz+"/actions/sw3");
    channel.publish(clientId, "0"); 
    console.log('Mensaje sw3 off');
}else{
    //voz.text = mensaje
}
///////////////////////////////////
if(mensaje.includes('lámpara 4 prender') || mensaje.includes('lámpara 4 encender') || mensaje.includes('encender lámpara cuatro')|| mensaje.includes('encender lámpara 4')){
    voz.text = 'Listo!!!'
    var channel = ably.channels.get(topic_raiz+"/actions/sw4");
    channel.publish(clientId, "1"); 
    console.log('Mensaje sw4 on');
}else{
    //voz.text = mensaje
}

if(mensaje.includes('lámpara 4 Apagar') || mensaje.includes('lámpara 4 a pagar') || mensaje.includes('Apagar lámpara cuatro')|| mensaje.includes('Apagar lámpara 4')){
    voz.text = 'Listo!!!'
    var channel = ably.channels.get(topic_raiz+"/actions/sw4");
    channel.publish(clientId, "0"); 
    console.log('Mensaje sw4 off');
}else{
    //voz.text = mensaje
}
///////////////////////////////////
if(mensaje.includes('lámpara 5 prender') || mensaje.includes('lámpara 5 encender') || mensaje.includes('encender lámpara cinco')|| mensaje.includes('encender lámpara 5')){
    voz.text = 'Listo!!!'
    var channel = ably.channels.get(topic_raiz+"/actions/sw5");
    channel.publish(clientId, "1"); 
    console.log('Mensaje sw5 on');
}else{
    //voz.text = mensaje
}
if(mensaje.includes('lámpara 5 Apagar') || mensaje.includes('lámpara 5 apagar') || mensaje.includes('Apagar lámpara cinco')|| mensaje.includes('Apagar lámpara 5')){
    voz.text = 'Listo!!!'
    var channel = ably.channels.get(topic_raiz+"/actions/sw5");
    channel.publish(clientId, "0"); 
    console.log('Mensaje sw5 off');
}else{
    //voz.text = mensaje
}
///////////////////////////////////
if(mensaje.includes('lámpara 6 prender') || mensaje.includes('lámpara 6 encender') || mensaje.includes('encender lámpara seis') || mensaje.includes('encender lámpara 6')){
    voz.text = 'Listo!!!'
    var channel = ably.channels.get(topic_raiz+"/actions/sw6");
    channel.publish(clientId, "1"); 
    console.log('Mensaje sw6 on');
}else{
    //voz.text = mensaje
}

if(mensaje.includes('lámpara 6 Apagar') || mensaje.includes('lámpara 6 apagar') || mensaje.includes('Apagar lámpara seis') || mensaje.includes('Apagar lámpara 6')){
    voz.text = 'Listo!!!'
    var channel = ably.channels.get(topic_raiz+"/actions/sw6");
    channel.publish(clientId, "0"); 
    console.log('Mensaje sw6 off');
}else{
    //voz.text = mensaje
}
///////////////////////////////////
if(mensaje.includes('lámpara 7 prender') || mensaje.includes('lámpara 7 encender') || mensaje.includes('encender lámpara siete')|| mensaje.includes('encender lámpara 7')){
voz.text = 'Listo!!!'
var channel = ably.channels.get(topic_raiz+"/actions/sw7");
channel.publish(clientId, "1"); 
console.log('Mensaje sw2 on');
}else{
//voz.text = mensaje
}

if(mensaje.includes('lámpara 7 Apagar') || mensaje.includes('lámpara 7 apagar') || mensaje.includes('Apagar lámpara siete')|| mensaje.includes('Apagar lámpara 7')){
voz.text = 'Listo!!!'
var channel = ably.channels.get(topic_raiz+"/actions/sw7");
channel.publish(clientId, "0"); 
console.log('Mensaje sw7 off');
}else{
//voz.text = mensaje
}
///////////////////////////////////
if(mensaje.includes('lámpara 8 prender') || mensaje.includes('lámpara 8 encender') || mensaje.includes('encender lámpara ocho')|| mensaje.includes('encender lámpara 8')){
voz.text = 'Listo!!!'
var channel = ably.channels.get(topic_raiz+"/actions/sw8");
channel.publish(clientId, "1"); 
console.log('Mensaje sw8 on');
}else{
//voz.text = mensaje
}

if(mensaje.includes('lámpara 8 Apagar') || mensaje.includes('lámpara 8 apagar') || mensaje.includes('Apagar lámpara ocho')|| mensaje.includes('Apagar lámpara 8')){
voz.text = 'Listo!!!'
var channel = ably.channels.get(topic_raiz+"/actions/sw8");
channel.publish(clientId, "0"); 
console.log('Mensaje sw3 off');
}else{
//voz.text = mensaje
}
///////////////////////////////////
if(mensaje.includes('lámpara 9 prender') || mensaje.includes('lámpara 9 encender') || mensaje.includes('encender lámpara nueve')|| mensaje.includes('encender lámpara 9')){
voz.text = 'Listo!!!'
var channel = ably.channels.get(topic_raiz+"/actions/sw9");
channel.publish(clientId, "1"); 
console.log('Mensaje sw9 on');
}else{
//voz.text = mensaje
}

if(mensaje.includes('lámpara 9 Apagar') || mensaje.includes('lámpara 9 apagar') || mensaje.includes('Apagar lámpara nueve')|| mensaje.includes('Apagar lámpara 9')){
voz.text = 'Listo!!!'
var channel = ably.channels.get(topic_raiz+"/actions/sw9");
channel.publish(clientId, "0"); 
console.log('Mensaje sw9 off');
}else{
//voz.text = mensaje
}
///////////////////////////////////
if(mensaje.includes('lámpara 10 prender') || mensaje.includes('lámpara 10 encender') || mensaje.includes('encender lámpara diez')|| mensaje.includes('encender lámpara 10')){
voz.text = 'Listo!!!'
var channel = ably.channels.get(topic_raiz+"/actions/sw10");
channel.publish(clientId, "1"); 
console.log('Mensaje sw10 on');
}else{
//voz.text = mensaje
}

if(mensaje.includes('lámpara 10 Apagar') || mensaje.includes('lámpara 10 a pagar') || mensaje.includes('Apagar lámpara diez')|| mensaje.includes('Apagar lámpara 10')){
voz.text = 'Listo!!!'
var channel = ably.channels.get(topic_raiz+"/actions/sw10");
channel.publish(clientId, "0"); 
console.log('Mensaje sw10 off');
}else{
//voz.text = mensaje
}
///////////////////////////////////
/////////// Encender todas las lamparas
if(mensaje.includes('encender todas las lámparas') || mensaje.includes('encender todas las luces') || mensaje.includes('enciende todas las lámparas') || mensaje.includes('enciende todas las luces')){
voz.text = 'Listo!!!'
  
  

setTimeout(() => {
var channel = ably.channels.get(topic_raiz+"/actions/sw1");
channel.publish(clientId, "1"); 
console.log('Mensaje sw1 on');
},1000);

setTimeout(() => {
var channel = ably.channels.get(topic_raiz+"/actions/sw2");
channel.publish(clientId, "1"); 
console.log('Mensaje sw2 on');
},2000);

setTimeout(() => {
var channel = ably.channels.get(topic_raiz+"/actions/sw3");
channel.publish(clientId, "1"); 
console.log('Mensaje sw3 on');
},3000);

setTimeout(() => {
var channel = ably.channels.get(topic_raiz+"/actions/sw4");
channel.publish(clientId, "1"); 
console.log('Mensaje sw4 on');
},4000);

setTimeout(() => {
var channel = ably.channels.get(topic_raiz+"/actions/sw5");
channel.publish(clientId, "1"); 
console.log('Mensaje sw5 on');
},5000);

setTimeout(() => {
var channel = ably.channels.get(topic_raiz+"/actions/sw6");
channel.publish(clientId, "1"); 
console.log('Mensaje sw6 on');
},6000);
    
setTimeout(() => {
var channel = ably.channels.get(topic_raiz+"/actions/sw7");
channel.publish(clientId, "1"); 
console.log('Mensaje sw7 on');
},7000);
    
setTimeout(() => {
var channel = ably.channels.get(topic_raiz+"/actions/sw8");
channel.publish(clientId, "1"); 
console.log('Mensaje sw8 on');
},8000);
    
setTimeout(() => {
var channel = ably.channels.get(topic_raiz+"/actions/sw9");
channel.publish(clientId, "1"); 
console.log('Mensaje sw9 on');
},9000);
    
setTimeout(() => {
var channel = ably.channels.get(topic_raiz+"/actions/sw10");
channel.publish(clientId, "1"); 
console.log('Mensaje sw10 on');
},10000);

}else{
//voz.text = mensaje
}
/////////// Apagar todas las lamparas
if(mensaje.includes('Apagar todas las lámparas')|| mensaje.includes('Apagar todas las luces')|| mensaje.includes('apaga todas las luces')|| mensaje.includes('apaga todas las lámparas')){
    voz.text = 'Listo!!!'
  
  
    
    setTimeout(() => {
    var channel = ably.channels.get(topic_raiz+"/actions/sw1");
    channel.publish(clientId, "0"); 
    console.log('Mensaje sw1 off');
    },1000);
    
    setTimeout(() => {
    var channel = ably.channels.get(topic_raiz+"/actions/sw2");
    channel.publish(clientId, "0"); 
    console.log('Mensaje sw2 off');
    },2000);
    
    setTimeout(() => {
    var channel = ably.channels.get(topic_raiz+"/actions/sw3");
    channel.publish(clientId, "0"); 
    console.log('Mensaje sw3 off');
    },3000);
    
    setTimeout(() => {
    var channel = ably.channels.get(topic_raiz+"/actions/sw4");
    channel.publish(clientId, "0"); 
    console.log('Mensaje sw4 off');
    },4000);
    
    setTimeout(() => {
    var channel = ably.channels.get(topic_raiz+"/actions/sw5");
    channel.publish(clientId, "0"); 
    console.log('Mensaje sw5 off');
    },5000);
    
    setTimeout(() => {
    var channel = ably.channels.get(topic_raiz+"/actions/sw6");
    channel.publish(clientId, "0"); 
    console.log('Mensaje sw6 off');
    },6000);
        
    setTimeout(() => {
    var channel = ably.channels.get(topic_raiz+"/actions/sw7");
    channel.publish(clientId, "0"); 
    console.log('Mensaje sw7 off');
    },7000);
        
    setTimeout(() => {
    var channel = ably.channels.get(topic_raiz+"/actions/sw8");
    channel.publish(clientId, "0"); 
    console.log('Mensaje sw8 off');
    },8000);
        
    setTimeout(() => {
    var channel = ably.channels.get(topic_raiz+"/actions/sw9");
    channel.publish(clientId, "0"); 
    console.log('Mensaje sw9 off');
    },9000);
        
    setTimeout(() => {
    var channel = ably.channels.get(topic_raiz+"/actions/sw10");
    channel.publish(clientId, "0"); 
    console.log('Mensaje sw10 off');
    },10000);
    
    }else{
    //voz.text = mensaje
    }
    
if(mensaje.includes('apágate') || mensaje.includes('reiníciate') || mensaje.includes('apaga te')){
  voz.text = 'Hasta pronto...'
  console.log("apagando");
  location.reload();
}else{
//voz.text = mensaje
}

    voz.rate = 0.9; // velocidad de reproduccion valor menor mas lento
    window.speechSynthesis.speak(voz)
}


