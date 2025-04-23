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
        window.location = "https://maykesoluciones.github.io/pagina/RGB/html/signin.html";
        },1500);      
    }else{
        //voz.text = mensaje
    } 
  
////////////////////////////////// lamparassss ////////////////////////////////////////////////////  
 
    if(mensaje.includes('habilitar rgb') || mensaje.includes('rgb habilitar')){
        voz.text = 'Listo!!!'
        var channel = ably.channels.get(topic_raiz+"/actions/sw1");
        channel.publish(clientId, "1"); 
        console.log('Mensaje sw1 on');
    }else{
        //voz.text = mensaje
    }

    if(mensaje.includes('Deshabilitar rgb') || mensaje.includes('rgb Deshabilitar')){
        voz.text = 'Listo!!!'
        var channel = ably.channels.get(topic_raiz+"/actions/sw1");
        channel.publish(clientId, "0"); 
        console.log('Mensaje sw1 off');
    }else{
        //voz.text = mensaje
    }
/////////// Apagar el rgb
if(mensaje.includes('Apagar rgb') || mensaje.includes('rgb Apagar')){
    voz.text = 'Apagar RGB, Listo!!!'
      
    setTimeout(() => {
    var channel = ably.channels.get(topic_raiz+"/actions/sw2");
    channel.publish(clientId, "1"); 
    console.log('Mensaje sw2 off');
    },500);
    }  

///////////////////////////////////
if(mensaje.includes('rojo') || mensaje.includes('Rojo')){
    voz.text = ' ROJO Listo!!!'
      
    setTimeout(() => {
    var channel = ably.channels.get(topic_raiz+"/actions/sw3");
    channel.publish(clientId, "1"); 
    console.log('Mensaje sw3 rojo');
    },500);
}
///////////////////////////////////
if(mensaje.includes('verde') || mensaje.includes('Verde')){
    voz.text =  'VERDE Listo!!!'
      
    setTimeout(() => {
    var channel = ably.channels.get(topic_raiz+"/actions/sw4");
    channel.publish(clientId, "1"); 
    console.log('Mensaje sw3 verde');
    },500);
}
/////////////////////////////////////////  
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


