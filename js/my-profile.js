//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    let perfil= localStorage.getItem ("perfil");

    if (perfil) {
        perfil = JSON.parse(perfil);

        if (perfil.imgUrl !=""){
            document.getElementById("imgPerfil").src = perfil.imgUrl;
        }

        document.getElementById("imgUrl").value = perfil.imgUrl;
        document.getElementById("nombre").value = perfil.nombre;
        document.getElementById("apellido").value = perfil.apellido;
        document.getElementById("email").value = perfil.email;
        document.getElementById("edad").value = perfil.edad;
        document.getElementById("telefono").value = perfil.telefono;
    }

    document.getElementById("confirmar").addEventListener ("click", function (e) {
        let passedValidation = true;
        let imgUrl = document.getElementById("imgUrl");
        let nombre = document.getElementById("nombre");
        let apellido = document.getElementById("apellido");
        let email = document.getElementById("email");
        let edad = document.getElementById("edad");
        let telefono = document.getElementById("telefono");

        if (nombre.value === "") {
            nombre.classList.add("is-invalid");
            passedValidation = false;
        } else {
            nombre.classList.remove ("is-invalid");
        }

        if (apellido.value === "") {
            apellido.classList.add("is-invalid");
            passedValidation = false;
        } else {
            apellido.classList.remove ("is-invalid");
        }

        if (email.value === "") {
            email.classList.add("is-invalid");
            passedValidation = false;
        } else {
            email.classList.remove ("is-invalid");
        }

        if (edad.value === "") {
            edad.classList.add("is-invalid");
            passedValidation = false;
        } else {
            edad.classList.remove ("is-invalid");
        }

        if (telefono.value === "") {
            telefono.classList.add("is-invalid");
            passedValidation = false;
        } else {
            telefono.classList.remove ("is-invalid");
        }

        if (passedValidation) {
            localStorage.setItem ("perfil", JSON.stringify( {
                nombre: nombre.value,
                apellido: apellido.value,
                email: email.value,
                edad: edad.value,
                telefono: telefono.value,
                imgUrl: imgUrl.value,
            }));

            window.location="my-profile.html"
        }





    })

});