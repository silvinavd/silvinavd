var product = {};
var arrayComments =[];

function showProduct(product,arrayComments) {
    let imgs = "";
    let comments = "<hr>";

    imgs +=`
    <img class="img" src= "${product.images[0]}" width="300px" height = "200px">
    <img class="img" src= "${product.images[1]}" width="300px" height = "200px">
    <img class="img" src= "${product.images[2]}" width="300px" height = "200px">
    <img class="img" src= "${product.images[3]}" width="300px" height = "200px">
    <img class="img" src= "${product.images[4]}" width="300px" height = "200px">
    `;

    arrayComments.forEach(function(comment){
        let puntos = "";
        comments += `
        <strong>${comment.user} </strong> dice: <br>
        <p>${comment.description}</p>`;

    for (let i=1; i<=comment.score; i++){
        puntos += `<span class= "fa fa-star checked"></span>`;
    }
    for (let i= comment.score + 1; i<=5; i++){
        puntos += `<span class= "fa fa-star"></span>`;
    }

    comments += `<sub>${comment.dateTime}</sub><br>`;
    comments += `<div style= "text-align: right;">${puntos}</div><br><hr>`;



});
    document.getElementById("productImagesGallery").innerHTML = imgs;
    document.getElementById ("comentarios").innerHTML = comments;
}

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then (function(resultObj){
        if (resultObj.status === "ok"){
            arrayComments = resultObj.data;
        }
    })
})



document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            product = resultObj.data;

            let productNameHTML = document.getElementById("categoryName");
            let productDescriptionHTML = document.getElementById("categoryDescription");
            let productCountHTML = document.getElementById("productCount");
            let productsoldCount = document.getElementById("soldCount");
            let productcategory = document.getElementById ("category");

            productNameHTML.innerHTML = product.name;
            productDescriptionHTML.innerHTML = product.description;
            productCountHTML.innerHTML = product.cost;
            productsoldCount.innerHTML = product.soldCount;
            productcategory.innerHTML = product.category;


            showProduct(product, arrayComments);
        }
    });
});

/*document.getElementById("enviarComentario").addEventListener("click", function(){
    let now= new Date();
    let dateTime = `${(now.getFullYear)()-${(now.getMonth()+1}}-${now.getDate()}`;
    dateTime += `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`   

    let nuevo = {
        score: parseInt(document.getElementById("productCalification").value;
        description: document.getElementById("comentar").value;
        user: JSON.parse(localStorage.getItem("User-Logged")).email;
        dateTime: dateTime

        };

        arrayComments.push(nuevo);

        showProduct(product,arrayComments)

    }

    }     
});*/