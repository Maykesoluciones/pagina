  url = "https://api.callmebot.com/whatsapp.php?";
  movil = "+573012375155";
  mensaje = "Dios+Siempre+es+Bueno"
  apikey = "423627";


var conexion = url+'phone='+movil+'&text='+mensaje+'&apikey='+apikey;


fetch(conexion)
.then(respuesta => respuesta.json() )
.then(respuesta => console.log(respuesta.name))
