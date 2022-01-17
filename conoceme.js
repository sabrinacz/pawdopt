


function dibujarCardIndividual() { 
    $('#mascotanombre').text(`Soy ${mascota.nombre}`);

    let card = document.createElement("div");
    card.setAttribute("id", id);
    card.classList.add("card", "col-sm-4", "col-md-4", "col-lg-12");
   
    
    //funcion de agregar id
    card.innerHTML= `
    <img src="./img/akar-icons_trash-can.svg" class="icontrash" id="boton${id}">
    <img src="${mascota.imagen}" class="card-img-top" alt="${mascota.nombre}"> 
        <div class="card-body">
            <h5 class="card-title">${mascota.nombre}</h5>
            <p class="card-text">
            <strong>Edad:</strong> ${mascota.edadAños} ${mascota.mesesAños} <br>
            <strong>Peso:</strong> ${mascota.peso}kg <br>
            <strong>Tamaño:</strong> ${mascota.tamaño} <br>
            <strong>Sobre mí:</strong> ${mascota.descripcion}</p>
        </div>
    `;

    $('#container').prepend(card);
    
    $(`#boton${id}`).click(()=> {
        console.log("prueba");
        $(`#${id}.card`).fadeOut("slow");

        listaMascotas.splice(id, 1);
        listaObjs.splice(id, 1);

        $('#resultado').text(`Tenemos ${listaObjs.length} mascota/s`);
        
        localStorage.removeItem(localStorage.key(id));
    }); 

}