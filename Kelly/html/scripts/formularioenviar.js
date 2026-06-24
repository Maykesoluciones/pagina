
////////////////////////////////////////////////////////


function validar(){
    var nombre,clave;
    nombre = document.getElementById('nombre').value;
    clave = document.getElementById('clave').value;
    console.log(nombre+","+clave);
	
	var channel = ably.channels.get(topic_raiz+topic_autenticacion);
   channel.publish(clientId, nombre+","+clave); 

    // window.location=enlase_final;
    // setTimeout(function(){mostrarAviso()},3000); // 3000ms = 3s
}



// function mostrarAviso(){
//     alert("Han pasado los tres segundos");
// }
