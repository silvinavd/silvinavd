//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
var productsArray = [];
var minCost = undefined;
var maxCost= undefined;

function showProducts(array) { 

    let contenido = "";
    for (let i = 0; i< array.length; i++){
        let products = array[i];

        if (((minCost == undefined)||(minCost != undefined && parseInt (products.cost) >= minCost)) 
       && ((maxCost == undefined) || (maxCost !=undefined && parseInt (products.cost) <= maxCost))) {
        
        contenido += 'Nombre: ' + products.name + '<br>';
        contenido += 'Descripción: ' + products.description + '<br>';
        contenido += 'Precio: ' + products.cost + '<br>';
        contenido += '<br><hr><br>'            
        }
    }


        


        document.getElementById("listado").innerHTML = contenido;
    }


document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
           productsArray = resultObj.data;

            showProducts(productsArray);
        }
});

    document.getElementById("filtrar").addEventListener("click", function(){
        minCost = document.getElementById ("rango-minimo").value;
        maxCost = document.getElementById ("rango-maximo").value;

        if ((minCost != undefined) && (minCost !="") && (parseInt(minCost)) >=0 ) {
            minCost = parseInt (minCost);
        }

        else {
            minCost = undefined;
        }
        if ((maxCost != undefined) && (maxCost !="")&& (parseInt(maxCost)) >=0) {
            maxCost = parseInt (maxCost);
    }
        else {
            maxCost = undefined;
        }
        showProducts(productsArray);
    });
    document.getElementById("borrar").addEventListener("click", function(){
        document.getElementById("rango-minimo").value = "";
        document.getElementById ("rango-maximo").value = "";
        minCost = undefined;
        maxCost = undefined;
    showProducts(productsArray)
    });
});