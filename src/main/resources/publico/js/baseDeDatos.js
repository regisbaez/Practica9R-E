var condition;

window.addEventListener('load', function () {
    function conseguirLatitudYLongitud(evento) {
        localStorage.clear();
        condition = navigator.onLine ? "online" : "offline";
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (ubicacion) {
                var latitud = ubicacion.coords.latitude;
                var longitud = ubicacion.coords.longitude;

                window.localStorage.setItem("latitudOffline", latitud);
                window.localStorage.setItem("longitudOffline", longitud);
            });
        } else {
            alert("Error: Tu navegador no soporta geolocalizacion.")
        }
    }
    conseguirLatitudYLongitud();
});

var baseDeDatosIndexed = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

var baseDeDatosAbierta = baseDeDatosIndexed.open("BDRE", 1);

baseDeDatosAbierta.onupgradeneeded = function (e) {
    active = baseDeDatosAbierta.result;
    var objetoPersona = active.createObjectStore("PERSONAS", {keyPath: 'identificador', autoIncrement: true});
};

function agregarDelFormulario() {
    if (navigator.geolocation) {
        agregarConLatitudyLongitud(navigator.geolocation.getCurrentPosition);
    } else {
        alert("Error: Tu navegador no soporta geolocalizacion.")
    }

    function agregarConLatitudyLongitud(ubicacion) {
        latitud = window.localStorage.getItem("latitudOffline");
        longitud = window.localStorage.getItem("longitudOffline");

        var baseDeDatos = baseDeDatosAbierta.result;

        var procesamientoDeDatos = baseDeDatos.transaction(["PERSONAS"], "readwrite");

        procesamientoDeDatos.onerror = function (e) {
            alert(request.error.name + '\n\n' + request.error.message);
        };

        procesamientoDeDatos.oncomplete = function (e) {
            document.querySelector("#nombre").value = '';
            document.querySelector("#sector").value = '';
            document.querySelector("#nivelEscolar").value = '';
            alert('Persona correctamente procesada y agregada a la base de datos.');
        };

        var Personas = procesamientoDeDatos.objectStore("PERSONAS");

        var request = Personas.put({
            nombrePersona: document.querySelector("#nombre").value,
            sectorPersona: document.querySelector("#sector").value,
            nivelEscolarPersona: document.querySelector("#nivelEscolar").value,
            ubicacionLatitud: latitud.toString(),
            ubicacionLongitud: longitud.toString()
        });

        request.onerror = function (e) {
            var error = "Oops! - Hubo un error: " + e.target.errorCode;
            alert(error)
        };

        request.onsuccess = function (e) {
            document.querySelector("#nombre").value = "";
            document.querySelector("#sector").value = "";
            document.querySelector("#nivelEscolar").value = "";
        };
    }
}

$(document).ready(function () {
    $("#sincronizar").unbind().on("click", function () {
        var ruta = $("#form-sincronizar").attr("action");

        var baseDeDatos = baseDeDatosAbierta.result;
        var procesamientoDeDatos = baseDeDatos.transaction("PERSONAS", "readwrite");

        var store = procesamientoDeDatos.objectStore("PERSONAS");
        store.getAll().onsuccess = function (data) {
            var datos = data.target.result;

            $.ajax({
                url: ruta,
                type: "POST",
                data: {
                    datos: JSON.stringify(datos)
                },
                success: function () {
                    console.log("Se han mandado los datos al servidor!");
                    var transaccion = baseDeDatosAbierta.result.transaction("PERSONAS", "readwrite");
                    var registros = transaccion.objectStore("PERSONAS");
                    var registrosAEliminar = [];

                    registros.openCursor().onsuccess = function (e) {
                        var actual = e.target.result;
                        if (actual) {
                            registrosAEliminar.push(actual.value);
                            actual.continue();
                        }

                        for (var i in registrosAEliminar) {
                            registros.delete(registrosAEliminar[i].identificador).onsuccess = function (e) {
                            };
                        }
                        window.location.replace("/");
                    };
                }
            });
        };
    });
});

baseDeDatosAbierta.onsuccess = function (e) {
    var data = baseDeDatosAbierta.result.transaction(["PERSONAS"]);
    var personas = data.objectStore("PERSONAS");
    var personas_recuperados = [];
    personas.openCursor().onsuccess = function (e) {
        var cursor = e.target.result;
        if (cursor) {
            personas_recuperados.push(cursor.value);
            cursor.continue();
        }
    };
    data.oncomplete = function () {
        imprimirTabla(personas_recuperados);
    }
};


function imprimirTabla(registrosPersonas) {
    var registros = document.createElement("table");
    var filaAListar = registros.insertRow();
    registros.setAttribute("class", "table");
    filaAListar.insertCell().innerHTML = "Nombre";
    filaAListar.insertCell().textContent = "Sector";
    filaAListar.insertCell().textContent = "Nivel Escolar";
    filaAListar.insertCell().textContent = "Latitud";
    filaAListar.insertCell().textContent = "Longitud";
    filaAListar.insertCell().textContent = "Eliminar";
    filaAListar.insertCell().textContent = "Modificar";
    for (var key in registrosPersonas) {
        filaAListar = registros.insertRow();
        filaAListar.insertCell().textContent = "" + registrosPersonas[key].nombrePersona;
        filaAListar.insertCell().textContent = "" + registrosPersonas[key].sectorPersona;
        filaAListar.insertCell().textContent = "" + registrosPersonas[key].nivelEscolarPersona;
        filaAListar.insertCell().textContent = "" + registrosPersonas[key].ubicacionLatitud;
        filaAListar.insertCell().textContent = "" + registrosPersonas[key].ubicacionLongitud;
        filaAListar.insertCell().innerHTML = "<button class='btn btn-outline-danger' onclick='borrarPersona(" + registrosPersonas[key].identificador + ")'><i class='fas fa-trash-alt'/></button>";
        filaAListar.insertCell().innerHTML = "<button class='btn btn-outline-success' onclick='modificarPersona(" + registrosPersonas[key].identificador + ")'><i class='far fa-edit'/></button>";
    }
    if (registrosPersonas.length > 0) {
        document.getElementById("tablaRegistros").appendChild(registros);
    }
}

function borrarPersona(identificador) {
    var data = baseDeDatosAbierta.result.transaction(["PERSONAS"], "readwrite");
    var personas = data.objectStore("PERSONAS");
    personas.delete(identificador).onsuccess = function (e) {
        window.location.replace("/");
    };
}

function modificarPersona(identificador) {
    var nombre = prompt("Nombre: (darle a OKAY si no se quiere modificar)");
    var sector = prompt("Sector: (darle a OKAY si no se quiere modificar)");
    var data = baseDeDatosAbierta.result.transaction(["PERSONAS"], "readwrite");
    var personas = data.objectStore("PERSONAS");
    var solicitudUpdate = undefined;

    personas.get(identificador).onsuccess = function (e) {
        var resultado = e.target.result;
        if (nombre !== "" && nombre !== null) {
            resultado.nombrePersona = nombre;
        }
        if (sector !== "" && sector !== null) {
            resultado.sectorPersona = sector;
        }
        if(sector !== "" && sector !== null || nombre !== "" && nombre !== null){
            solicitudUpdate = personas.put(resultado);
        } else{
            solicitudUpdate = personas.put(personas.get(identificador));
        }
        window.location.replace("/");
    }
}
