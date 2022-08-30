//// Formulario y sweetAlert

let formulario = document.getElementById("formulario");
formulario.addEventListener("submit", validarFormulario);


function validarFormulario(e) {
    e.preventDefault();
    console.log("Mensaje Enviado!");
    Swal.fire({
        title: '<h2 class="sweet">MENSAJE ENVIADO!</h2>',
        confirmButtonColor: 'rgb(0, 0, 0)',
        confirmButtonText: '<h3 class="swee">SALIR</h3>',
        imageUrl: '../img/marca.jpg',
        imageWidth: 400,
        imageHeight: 400,})
}

