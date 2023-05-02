const numeroAGenerar = document.getElementById('generated_number');
const fecha = document.getElementById('requested_date');

const min = 25;
const max = 1998;

window.addEventListener('load', function (){

    generarNumeroAleatorio();

    fechaActual();

});

function generarNumeroAleatorio(){
    let numero = Math.floor(Math.random() * (max - min + 1) + min);

    numeroAGenerar.value = numero;
}

function fechaActual(){
    let fechaActual = new Date();
    let dia = fechaActual.getDate();
    let mes = fechaActual.getMonth() + 1;
    let agno = fechaActual.getFullYear();

    fecha.value = `${dia}/${mes}/${agno}`;
}