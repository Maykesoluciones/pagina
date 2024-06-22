var gateway = `ws://${window.location.hostname}/ws`;
var websocket;
window.addEventListener('load', onload);
var direction;

function onload(event) {
    initWebSocket();
}

function initWebSocket() {
    console.log('Trying to open a WebSocket connection…');
    websocket = new WebSocket(gateway);
    websocket.onopen = onOpen;
    websocket.onclose = onClose;
    websocket.onmessage = onMessage;
}

function onOpen(event) {
    console.log('Connection opened');
    document.getElementById("motor-state").innerHTML = "Datos sin guardar";
    document.getElementById("motor-state").style.color = "black";
}

function onClose(event) {
    console.log('Connection closed');
    document.getElementById("motor-state").innerHTML = "No esta conectado al WIFI_CONFIG"
    setTimeout(initWebSocket, 2000);
}

function submitForm(){

   // var vacio = document.getElementById("vacio").value;
    var ssid = document.getElementById("ssid").value;
	var pass = document.getElementById("pass").value;
	
	if(ssid.length==0 ||  pass.length==0){
		console.log("campos vacios");
		document.getElementById("motor-state").innerHTML = "Ingrese los datos";
        document.getElementById("motor-state").style.color = "red";
	}else{
		websocket.send("Credenciales&"+ssid+"&"+pass);
		document.getElementById("motor-state").innerHTML = "Guardando...";
        document.getElementById("motor-state").style.color = "blue";
	}   
}

function reset(){
    websocket.send("ResetWIFI");
    console.log('ResetWIFI');
}

function onMessage(event) {
    console.log(event.data);
    direction = event.data;
    if (direction=="Datos Guardados"){ 
      document.getElementById("motor-state").innerHTML = "Datos Guardados"
      document.getElementById("motor-state").style.color = "green";
	  websocket.send("Reiniciar");
    }

}