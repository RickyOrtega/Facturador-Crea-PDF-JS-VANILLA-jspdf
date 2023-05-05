const nombre_cliente = document.getElementById('nombre_cliente');
const direccion_cliente = document.getElementById('direccion_cliente');
const telefono_cliente = document.getElementById('telefono_cliente');
const email_cliente = document.getElementById('email_cliente');
const fecha_actual = document.getElementById('requested_date');
const codigos = document.getElementsByClassName('tb_principal_codigo');
const nombres = document.getElementsByClassName('tb_principal_nombre');
const cantidades = document.getElementsByClassName('tb_principal_cantidad');
const precios = document.getElementsByClassName('tb_principal_precio');
const costos = document.getElementsByClassName('tb_principal_costo');
const subtotal = document.getElementById('input_subTotal');
const input_Impuesto = document.getElementById('input_Impuesto');
const input_Descuento = document.getElementById('input_Descuento');
const input_Total = document.getElementById('input_Total');

let numero_factura = 1;
let numero_pagina = 1;

boton_facturar.addEventListener('click', function () {

    guardarPDF();

});

function guardarPDF() {

    var doc = new jsPDF('p', 'pt', 'letter');
    var margin = 10;
    var scale = (doc.internal.pageSize.width - margin * 2) / document.body.scrollWidth;

    doc.html(document.body, {

        x: margin,
        y: margin,

        html2canvas: {

            scale: scale,

        },
        callback: function (doc) {

            doc.output('dataurlnewwindow', { filename: 'Factura' + numero_factura + '.pdf' });

        }

    });

}

/*function guardarPDF() {

    let doc = new jsPDF('p', 'pt', 'letter');

    doc.setFontSize(22);

    //Información de la empresa
    doc.text(20, 20, 'Las Nubes');
    doc.line(20, 25, 590, 25);

    //Información de la factura
    doc.text(400, 20, 'Factura: ' + numero_factura);
    doc.text(400, 60, 'Fecha: ' + fecha_actual.value);

    doc.setFontSize(16);

    //Información del cliente
    doc.text(20, 60, 'Cliente: ' + nombre_cliente.value);
    doc.text(20, 80, 'Dirección: ' + direccion_cliente.value);
    doc.text(20, 100, 'Teléfono: ' + telefono_cliente.value);
    doc.text(20, 120, 'Email: ' + email_cliente.value);
    doc.line(20, 125, 590, 125);

    //Información de la tabla
    doc.text(25, 140, 'Código');
    doc.text(85, 140, 'Nombre');
    doc.text(285, 140, 'Cantidad');
    doc.text(370, 140, 'Precio');
    doc.text(500, 140, 'Costo');

    //Líneas de la tabla
    doc.line(20, 145, 590, 145);
    doc.line(20, 145, 20, 600);
    doc.line(80, 145, 80, 600);
    doc.line(280, 145, 280, 600);
    doc.line(360, 145, 360, 600);
    doc.line(460, 145, 460, 600);
    doc.line(590, 145, 590, 600);
    doc.line(20, 600, 590, 600);

    //Información de los totales
    doc.text(400, 620, 'Subtotal: ' + subtotal.value);
    doc.text(400, 640, 'Impuesto: ' + input_Impuesto.value);
    doc.text(400, 660, 'Descuento: ' + input_Descuento.value);
    doc.text(400, 680, 'Total: ' + input_Total.value);

    //Información de los productos

    let y = 170;

    for (let i = 0; i < codigos.length; i++) {

        doc.text(25, y, codigos[i].value);
        doc.text(85, y, nombres[i].value);
        doc.text(285, y, cantidades[i].value);
        doc.text(365, y, parseFloat(precios[i].value).toLocaleString('es-CO', { style: 'currency', currency: 'COP' }));
        doc.text(505, y, costos[i].value);

        y += 20;

        if (y > 600) {

            doc.addPage();
            y = 170;

        }

    }

    //doc.save('Factura' + numero_factura + '.pdf');
    doc.output('dataurlnewwindow', { filename: 'Factura' + numero_factura + '.pdf' });


    numero_factura++;
}*/