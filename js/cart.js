function modificarSubtotal(indice, precio) {
    let cantidad = parseInt(document.getElementById(`cantidad-${indice}`).value);
    subTotal = cantidad * precio;
    document.getElementById(`subTotal-${indice}`).innerHTML = subTotal;
    calcTotal();
}



function calcTotal() {
    let subtotales = document.getElementsByClassName("subtotales");
    let suma = 0;
    console.log(subtotales);
    for (let i = 0; i < subtotales.length; i++) {
        suma += parseInt(subtotales[i].innerHTML);
    }
    document.getElementById("totalProducts").innerHTML = suma;
    calcEnvio();
}


function showAllProducts(array) {
    let contenido = "";
    let conversion;
    for (let i = 0; i < array.length; i++) {
        let product = array[i];
        if (product.currency === 'USD') {
            conversion = product.unitCost * 40;
        } else {
            conversion = product.unitCost;
        }
        contenido += `
        <tr class="text-center">
            <td>
                <img class="img-thumbnail" style="width:150px" src="${product.src}" alt="${product.name}">
            </td>
            <td>
                ${product.name}
            </td>
            <td>
                ${product.currency} ${product.unitCost} 
            </td>
            <td>
            <button onclick="this.parentNode.querySelector('input[type=number]').stepDown();modificarSubtotal(${i},${product.unitCost});">-</button>
                <input type="number" id="cantidad-${i}" min="1" max="999" name="quantity" onchange="modificarSubtotal(${i}, ${product.unitCost})" value="${product.count}" >
                <button onclick="this.parentNode.querySelector('input[type=number]').stepUp();modificarSubtotal(${i},${product.unitCost});">+</button>
                </td>
            <td id="subTotal-${i}" class="subtotales">
                ${(product.unitCost * product.count).toFixed(2)} 
            </td>
        </tr>       
        `;

    }
    $('#tabla').append(contenido);
    calcTotal();
}


function calcEnvio() {
    let envio = parseInt(document.querySelector('input[name="envio"]:checked').value);
    let porcentaje = (envio / 100);

    let subtotal = parseInt(document.getElementById("totalProducts").innerHTML);
    let totalenvio = 0;
    totalenvio = (porcentaje * subtotal);
    let total = (subtotal + totalenvio);
    document.getElementById("total").innerHTML = total;
    document.getElementById("shippingCost").innerHTML = totalenvio;
}



//Validar formulario

let form = document.getElementById("validar");
form.addEventListener("submit", function (e) {
    if (form.checkValidity() === false) {
        e.preventDefault();
        e.stopPropagation();
    }
    if (form.checkValidity() === true) {
        document.getElementById("cart").innerHTML = `<div class="alert alert-sucess alert dismissible show" role="alert">
<strong>Felicidades!</strong>
<p>Tu compra fue realizada con éxito </p>
<button type="button" class="close" aria-label="Close" data-dismiss="alert">
        <span aria-hidden="true">&times;</span>
      </button>        </div> `}
    form.classList.add("was-validated");

})

/* let tiposPago = document.getElementById("formadePago");
 for (var i=0; i< tiposPago.lenght; i++){
     tiposPago[i].addEventListener("change", function () {
         seleccionarPago();
     });
 }


     function seleccionarPago(){

     var pagos = document.getElementsByName("name");
     for (var i = 0; i<pagos.lenght; i++){
         if(pagos[i].checked && (pagos[i].value)=="1"){

             document.getElementById("datosTarjeta").classList.remove("d-none");
             document.getElementById("datosBanco").classList.add("d-none");

         } else if(pagos[i].checked && (pagos[i].value)=="2"){
             document.getElementById("datosTarjeta").classList.add("d-none");
             document.getElementById("datosBanco").classList.remove("d-none");
         }
     }
     }
/*   function pagoValido() {
     let nombreTarjeta = document.getElementById("nombreTarjeta").value;
     let numTarjeta = document.getElementById ("numTarjeta").value;
     let fechaTarjeta= document.getElementById ("fechaTarjeta").value;
     let codigoTarjeta = document.getElementById ("codigoTarjeta").value;
     let pagoValido=true;
      

     for (var i= 0; i<
 }
*/
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(CART_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            //  showProductCart(resultObj.data.articles[0]); 
            showAllProducts(resultObj.data.articles);
        }
    });
});

