//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
const ORDER_ASC_BY_PRECIO = "precio->PRECIO";
const ORDER_DESC_BY_PRECIO = "PRECIO->precio";
const ORDER_DESC_BY_VENTAS = "SOLDCOUNT->soldCount";


var productsArray = [];
var minCost = undefined;
var maxCost = undefined;

function sortProducts(criterio, array) {
    let result = [];


    if (criterio === ORDER_ASC_BY_PRECIO) {
        result = array.sort(function (a, b) {
            if (a.cost < b.cost) { return -1; }
            if (a.cost > b.cost) { return 1; }
            return 0;
        });
    }
    else if (criterio === ORDER_DESC_BY_PRECIO) {
        result = array.sort(function (a, b) {
            if (a.cost > b.cost) { return -1; }
            if (a.cost < b.cost) { return 1; }
            return 0;
        });
    }
    else if (criterio === ORDER_DESC_BY_VENTAS) {
        result = array.sort(function (a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if (aCount > bCount) { return -1; }
            if (aCount < bCount) { return 1; }
            return 0;
        });
    }
    return result;
}

;






function showProducts(array) {

    let contenido = "";
    for (let i = 0; i < array.length; i++) {
        let products = array[i];

        if (((minCost == undefined) || (minCost != undefined && parseInt(products.cost) >= minCost))
            && ((maxCost == undefined) || (maxCost != undefined && parseInt(products.cost) <= maxCost))) {

            contenido +=
                `
            <a href="category-info.html" class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col-3">
                        <img src="` + products.imgSrc + `" alt="` + products.description + `" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">`+ products.name + `</h4>
                            <small class="text-muted">` + products.cost + ` artículos</small>
                        </div>
                       
                    </div>
                </div>
            </a>
            `
        }
    }
    document.getElementById("listado").innerHTML = contenido;
}


document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            productsArray = resultObj.data;

            //ordenar array

            productsArray = sortProducts(ORDER_ASC_BY_PRECIO, productsArray);

            //acá muestro

            showProducts(productsArray);
        }
    });
    document.getElementById("sortAsc").addEventListener("click", function () {
        productsArray = sortProducts(ORDER_ASC_BY_PRECIO, productsArray)
        showProducts(productsArray);
    });
    document.getElementById("sortDesc").addEventListener("click", function () {
        productsArray = sortProducts(ORDER_DESC_BY_PRECIO, productsArray)
        showProducts(productsArray);
    });
    document.getElementById("sortByCount").addEventListener("click", function () {
        productsArray = sortProducts(ORDER_DESC_BY_VENTAS, productsArray)
        showProducts(productsArray);
    });






    document.getElementById("filtrar").addEventListener("click", function () {
        minCost = document.getElementById("rango-minimo").value;
        maxCost = document.getElementById("rango-maximo").value;

        if ((minCost != undefined) && (minCost != "") && (parseInt(minCost)) >= 0) {
            minCost = parseInt(minCost);
        }

        else {
            minCost = undefined;
        }
        if ((maxCost != undefined) && (maxCost != "") && (parseInt(maxCost)) >= 0) {
            maxCost = parseInt(maxCost);
        }
        else {
            maxCost = undefined;
        }
        showProducts(productsArray);
    });
    document.getElementById("borrar").addEventListener("click", function () {
        document.getElementById("rango-minimo").value = "";
        document.getElementById("rango-maximo").value = "";
        minCost = undefined;
        maxCost = undefined;
        showProducts(productsArray)
    });
});



document.getElementById("buscador").addEventListener('input', function () {
    buscar = document.getElementById("buscador").value.toLowerCase();
    showProducts(productsArray);
});

document.getElementById("limpbusc").addEventListener("click", function () {
    document.getElementById("buscador").value = "";
    buscar = undefined;

    showProducts(productsArray);
});