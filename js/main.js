/*

    Voy a considerar la tabla como lo que es, una matriz de nx5, donde n es la cantidad de filas que se van a generar

*/

let table_body = document.getElementById('table_body');
let numeroActual = document.getElementById('inputGroup-sizing-sm');
let botonGenerarInputs = document.getElementById('valor_actual');
let descuento = document.getElementById('input_Descuento');
let iva = document.getElementById('input_Impuesto');
let boton_facturar = document.getElementById('facturar');
let sub_total_global = 0;
let sub_total_IVA = 0;
let sub_total_descuento = 0;
let total = 0;

botonGenerarInputs.addEventListener('click', initFunctions);

function initFunctions() {

    incrementarNumero();

    table_body.appendChild(crearRow());

    const input_codigo = document.getElementById('codigo_' + numeroActual.innerHTML);

    if (input_codigo != null) {
        input_codigo.setAttribute('value', numeroActual.innerHTML);
    }

}

function incrementarNumero() {
    numeroActual.innerHTML = parseInt(numeroActual.innerHTML) + 1;
}

function crearRow() {

    let row = document.createElement('tr');

    const th1 = document.createElement('th');
    th1.setAttribute('scope', 'row');
    const td2 = document.createElement('td');
    const td3 = document.createElement('td');
    const td4 = document.createElement('td');
    const td5 = document.createElement('td');

    const input_codigo = crearInput('number', 'tb_principal_codigo form-control', 'codigo_' + numeroActual.innerHTML, true, -1);
    const input_nombre = crearInput('text', 'tb_principal_nombre form-control', 'nombre_' + numeroActual.innerHTML, false, -1);
    const input_cantidad = crearInput('number', 'tb_principal_cantidad form-control', 'cantidad_' + numeroActual.innerHTML, false, 1);
    input_cantidad.addEventListener('change', function () {

        cantidadPrecio(input_cantidad);
    });
    input_cantidad.addEventListener('keyup', function () {

        cantidadPrecio(input_cantidad);
    });
    const input_precio = crearInput('text', 'tb_principal_precio form-control', 'precio_' + numeroActual.innerHTML, false, 0);
    input_precio.addEventListener('change', function () {
        cantidadPrecio(input_precio);
    });
    input_precio.addEventListener('keyup', function () {
        cantidadPrecio(input_precio);
    });
    const input_costo = crearInput('text', 'tb_principal_costo form-control', 'costo_' + numeroActual.innerHTML, true, -1);

    th1.appendChild(input_codigo);
    td2.appendChild(input_nombre);
    td3.appendChild(input_cantidad);
    td4.appendChild(input_precio);
    td5.appendChild(input_costo);

    row.appendChild(th1);
    row.appendChild(td2);
    row.appendChild(td3);
    row.appendChild(td4);
    row.appendChild(td5);

    return row;
}

function crearInput(type, clase, id, disabled, min) {
    let input = document.createElement('input');
    input.setAttribute('type', type);
    input.setAttribute('class', clase);
    input.setAttribute('id', id);

    if (disabled) {
        input.setAttribute('disabled', '');
    }

    if (min >= 0) {
        input.setAttribute('min', min);
    }

    return input;
}

function cantidadPrecio(element) {
    let numeroElemento = element.id.split('_')[1];

    let cantidad = document.getElementById('cantidad_' + numeroElemento).value;
    let precio = document.getElementById('precio_' + numeroElemento).value;
    let costo = document.getElementById('costo_' + numeroElemento);

    const monto_sin_format = cantidad * precio;
    const monto_formateado = monto_sin_format.toLocaleString('es-CO', { style: 'currency', currency: 'COP' });

    costo.value = monto_formateado;

    calcularSubTotal();
}

function calcularSubTotal() {
    const costos = document.getElementsByClassName('tb_principal_costo');
    const sub_total = document.getElementById('input_subTotal');
    let stotal = 0;

    for (let i = 0; i < costos.length; i++) {

        let costo = costos[i].value;

        if (costos[i].value == '') {

            costos[i].value = '$0';

        }
        let costo_sin_format = costo.split('$')[1].split('.').join('');
        let costo_formateado = parseInt(costo_sin_format);

        stotal += costo_formateado;
    }

    sub_total_global = stotal;

    console.log(sub_total_global);

    sub_total.setAttribute('value', stotal.toLocaleString('es-CO', { style: 'currency', currency: 'COP' }));

    calcularTotal(total);
    calcularTotal(stotal);

}

iva.addEventListener('change', function () {

    calcularIva(iva, sub_total_global);

});

iva.addEventListener('keyup', function () {

    calcularIva(iva, sub_total_global);

});

function calcularIva(element, sub_total) {

    sub_total_IVA = element.value/100 * sub_total + sub_total;

    calcularDescuento(descuento, sub_total_IVA);
    calcularTotal(total);
}

descuento.addEventListener('change', function () {

    calcularDescuento(descuento, sub_total_IVA);

});

descuento.addEventListener('keyup', function () {

    calcularDescuento(descuento, sub_total_IVA);

});

function calcularDescuento(element, sub_total_IVA) {

    total = sub_total_IVA - element.value/100 * sub_total_IVA;

    console.log("Subtotal + IVA - descuento: " + total);

    calcularTotal(total);

}

function calcularTotal(total) {

    const total_final = document.getElementById('input_Total');


    total_final.setAttribute('value', total.toLocaleString('es-CO', { style: 'currency', currency: 'COP' }));

}