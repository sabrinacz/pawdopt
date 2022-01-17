/* Página para adopción de mascotas. */

// Una lista recibirá mis objetos
let listaMascotas = [];

// Clase mascota, recibira los datos para construir mi objeto
class Mascota {
    constructor(id, especie, nombre, edadAños, mesesAños, imagen, peso, tamaño, descripcion){
        this.id = id;
        this.especie = especie;
        this.nombre = nombre;
        this.edadAños = edadAños;   
        this.mesesAños = mesesAños;
        this.imagen = imagen;
        this.peso = peso;
        this.tamaño = tamaño;
        this.descripcion = descripcion;
    };
}

let dibujarListaMascotas = () => { 
    listaObjs.forEach((mascota, id) => {
        dibujarCard(mascota, id);
    });
}

//Cargo mi DATA JSON
$.ajax({
    url: "./data/data.json",
    dataType: "json",
    success: (respuesta) => {
        //lo mando como parametro a la f(x)   
      listaMascotas=respuesta;
      dibujarListaMascotas(respuesta);
      guardarStorage(respuesta);
    },
});


//Indico la cantidad de mascotas
$(document).ready(function() {
    $('#resultado').append(`Tenemos ${listaObjs.length} mascota/s`);
});


//Función que calcula el tamaño en base al peso del animal
let calcularTamaño = (peso) => {
    let tamaño;
    console.log(tamaño);
    if (peso != 0 && peso < 5) {
        tamaño = (`mini`);
    }
    else if (peso >= 5 && peso < 9) {
        tamaño = (`pequeño`);
    }
    else if (peso >= 9 && peso < 20) {
        tamaño = (`mediano`);
    }
    else if (peso >= 20 && peso < 30) {
        tamaño = (`grande`);
    }
    else if (peso >= 30 && peso <= 70) {
        tamaño = (`gigante`);
    }
    else {
        tamaño = (`No pudimos calcularlo. Ingresá un peso entre 0.1 y 70kg<br>`);
    }
    return tamaño;
};


// En esta sección voy a poder cargar más mascotas a mi array
$('#formulario').submit ( (e)=> {
    e.preventDefault(); //previene que se recarge
    cargarMascota();
})

// Valido mi form
function validar(nomb,edad,pes,desc) {
    if(nomb == ""|| nomb == 'undefined' || nomb.includes('@')) {
        return 'nombre no valido.';
    }
    if(isNaN(edad) || edad == null || edad > 20){
        return 'La edad debe ser un número menor o igual a 20 años';
    }
    if(isNaN(pes) || pes == null || pes > 70){
        return 'El peso debe ser un número menor o igual a 70kg';
    }
    if(desc==null ||desc==="undefinded" || desc=="") {
        return 'La descripción no puede estar vacía';
    } else {
        return 'ok';
    }
}

// Avisos de error
function dibujarError(mensaje) {
    $('#errorform').fadeIn("slow");
    $('#errorform').text(mensaje);
}


// Cargo desde el form de "Hay nuevos rescatados"
function cargarMascota() {  
    let id = listaMascotas.length+1;
    let ele0 = document.getElementById("especie");
    let especie = ele0.options[ele0.selectedIndex].value;
    let nombre = document.getElementById("nombre").value;
    let edadAños = parseInt(document.getElementById("edad").value);
    let ele1 = document.getElementById("mesesaños")
    let mesesAños = ele1.options[ele1.selectedIndex].value;
    let imagen = document.getElementById("imagen").value
    let peso = parseFloat(document.getElementById("peso").value);
    let tamaño = calcularTamaño(peso);
    let descripcion = document.getElementById("descripcion").value;

    
    //valido los datos
    let datos = validar(nombre,edadAños,peso,descripcion);

        if (datos == "ok"){       
        let mascota = new Mascota(id, especie, nombre, edadAños, mesesAños, imagen, peso, tamaño, descripcion);
   
        listaMascotas.push(mascota);
        
        listaObjs.push(mascota);
        
        $('#resultado').text(`Tenemos ${listaObjs.length} mascota/s`);

        localStorage.setItem(mascota.id,JSON.stringify(mascota));    
        
        dibujarCard(mascota);
        } 

        else {
        dibujarError(`*${datos}`)
        }
}



//Renderizar: dibujarlo en mi documento
//Esta funcion lo dibuja en el HTML
//Crea una card por cada mascota
function dibujarCard(mascota, id) {
    let card = document.createElement("div");
    card.setAttribute("id", id);
    card.classList.add("card", "col-sm-4", "col-md-4", "col-lg-2")   
    
    card.innerHTML= `
    <img src="./img/akar-icons_trash-can.svg" class="icontrash" id="boton${id}">
    <img src="${mascota.imagen}" class="card-img-top" alt="Imagen de ${mascota.nombre}"> 
        <div class="card-body">
            <h5 class="card-title">${mascota.nombre}</h5>
            <p class="card-text">
            <strong>Edad:</strong> ${mascota.edadAños} ${mascota.mesesAños} <br>
            <strong>Peso:</strong> ${mascota.peso}kg <br>
            <strong>Tamaño:</strong> ${calcularTamaño(mascota.peso)} <br>
            <strong>Sobre mí:</strong> ${mascota.descripcion}</p>
            <a href="#" class="btn btn-primary" id="conocemascota${id}">Conocéme</a>
        </div>
    `;

    $('#container').prepend(card);
    
    // Si toco el tacho de basura para BORRAR
    $(`#boton${id}`).click(()=> {
        $(`#${id}.card`).fadeOut("slow");
        listaMascotas.splice(id, 1);
        listaObjs.splice(id, 1);
        $('#resultado').text(`Tenemos ${listaObjs.length} mascota/s`);        
        localStorage.removeItem(localStorage.key(id));
    }); 
    
    // Botón CONOCEME
    $(`#conocemascota${id}`).click(()=> {
        $(".modal").show();
        conocerMascota(mascota);
    });

}

//Si toco el botón CONOCEME
function conocerMascota(mascota) {
    function alertTop(message, type) {
   
    let wrapper = $('.alert')
    wrapper.addClass("alert-"+type);    

    if ($('.alert')[0].style.display =="none") {
        $('#alert-message').text(message);
        $('.alert').fadeIn("slow");
    } else {
        $('#alert-message').text(message);
    }
    }

    $('.btn-close').click(() =>{
        $('.alert').fadeOut("slow");
    });

    $('#liveAlertBtn').click( ()=> {
        if (document.getElementById("email").value.includes("@")==true && document.getElementById("nombreusuario").value!="") {
        $(".modal").hide();
        let message = `¡Te enviamos un mail para que conozcas a ${mascota.nombre}!`;
        alertTop(message, 'success');
    } else {
        alert("Completar un nombre y email correcto")
    }
    })
}

// Ventana modal de CONOCEME
$("body").prepend(`
<div id="myModal" class="modal">
    <div class="modal-content">
    <span class="closemodal">&times;</span>
    <p>Ingresá tu mail y te contactaremos</p>

    <form action=" " method="get" id="formulario2">
    <label for="nombreusuario" id="lblnombreusuario" class="form-label">Nombre y Apellido</label>
    <input id="nombreusuario" type="text" class="form-control"><br><br>  
    <label for="email" id="lblemail" class="form-label">Email</label>
    <input id="email" type="email" value="ejemplo@mail.com" class="form-control"><br><br>
    
    <input type="submit" class="btn btn-primary" value="Enviar" id="liveAlertBtn"> 

    </form>

    </div>
</div>
`);

let modal = document.getElementsByClassName("modal")[0];

// Si el usuario toca la cruz cierra el modal
let span = document.getElementsByClassName("closemodal")[0];
span.onclick = function() {
    modal.style.display = "none";
}
// Si el usuario clickea afuera del modal lo cierra
window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }


// Guardo la lista en el storage
// Uso FOREACH
function guardarStorage(){
    listaMascotas.forEach((mascota,indice) => {
    localStorage.setItem(indice,JSON.stringify(mascota));
})
}

// Con esta función me fijo que estén en el storage
const tomarTodoLocal = () => {
    for (let i=0; i < localStorage.length; i++) {
        let clave = localStorage.key(i);
        console.log("clave:"+clave);
        console.log("valor"+localStorage.getItem(clave));
    }
}
//tomarTodoLocal();


// Llama al storage y lo presenta como objeto. Lo guarda en una lista vacía
listaObjs = [];
const tomarTodoLocalObj=() => {
    for (let i=0; i < localStorage.length; i++) {
        listaObjs.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
    };
};
tomarTodoLocalObj();

// Si quiero borrar todo el storage
$('#resetstorage').click ( ()=> {
    let borrarTodo = prompt('¿Estas seguro que querés borrar todo? Escribir "si" para confirmar');
    if (borrarTodo =="si" || borrarTodo =="SI"|| borrarTodo =="Si"|| borrarTodo =="Sí") {
        localStorage.clear();
        location.reload();
    }
})

