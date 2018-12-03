var datosGanador = JSON.parse(localStorage.getItem('ganador'));
var clicks = 0
var primerClick
var intentos = 0;
var pares = 0;
var movimientos

// Depende de que boton de nivel toques te va a dar la cantidad de movientos
$('.nivel').on('click', function () {
    var lvl = $(this).attr('id')
    if (lvl == "facil") {
        movimientos = 18;
    } else if (lvl == "intermedio") {
        movimientos = 12;
    } else if (lvl == "dificil") {
        movimientos = 9;
    }
    // si el input nombre esta vacio mostrame el cartel ups y volvelo a ocultar en 2 segundos
    if ($('#name').val() == '') {
        $('#campo').removeClass("ocultar");
        setTimeout(function () {
            $('#campo').addClass("ocultar");
        }, 2000)

        // si el input nombre es distinto de vacio me va a mostrar el tablero de cartas, 
        //el cartel donde ingresas tus datos se va a ocultar, se va a apendear los movimientos y el nivel
        // en el texto  de arriba 

    } else if ($('#name').val() !== '') {
        $('#nombre').append($('#name').val())
        $('.contenedor').removeClass("ocultar")
        $('.ingresoDatos').addClass("ocultar")
        $('#movimientos').append(movimientos)
        $('#level').append(lvl)
    }
});

// creo un array de las imagenes que me va a mostrar cuando haga click en la imagen tapada
var arr = [
    'images/alce.jpg',
    'images/epelante.jpg',
    'images/nena.jpg',
    'images/peces.jpg',
    'images/unichancho.jpg',
    'images/zapas.jpg',
    'images/alce.jpg',
    'images/epelante.jpg',
    'images/nena.jpg',
    'images/peces.jpg',
    'images/unichancho.jpg',
    'images/zapas.jpg',
]
// Creo una función ramdom para que me ponga las nuevas imagene de manera aleatoria

arr.sort(function (a, b) {
    return Math.random() - 0.5
})

var imgsLength = $('.tapada').length

for (var i = 0; i < imgsLength; i++) {
    $('.tapada').eq(i).attr('data-img', arr[i])
}

// contador de clicks
$('img').on('click', function () {
    clicks = clicks + 1
    console.log(clicks)

    if (clicks == 1 && intentos <= movimientos) {
        $(this).addClass('noPointer');
        $(this).addClass('flipping');
        var id = $(this).attr('id')
        var img = $(this).attr('data-img')
        var visible = $(this).attr('data-img')
        $(this).attr('src', visible)
        primerClick = {
            id: id,
            img: img
        }
    } else if (clicks == 2 && intentos <= movimientos) {
        $(this).addClass('noPointer');
        $(this).addClass('flipping');
        var visible = $(this).attr('data-img')
        $(this).attr('src', visible)
        if (contadorClicks = 2) {
            intentos++
            $('#intentos').html(intentos)
            console.log("Intentos", intentos)
            if (primerClick.img == $(this).attr('data-img') && primerClick.id != $(this).attr("id")) {
                //   console.log('iguales')
                pares++
                console.log("PARES:", pares)
                $(this).addClass("filter").addClass("noPointer");
                $("#" + primerClick.id).addClass("filter").addClass("noPointer")
                clicks = 0
                // compara las imágenes y si son iguales permanecen dadas vueltas y si no se muestra de nuevo
                // la imagen tapada
                //   si son iguales ponerle la clase gris
            } else {
                var that = this
                setTimeout(function () {
                    $(that).attr("src", "images/tapada.jpg").removeClass("noPointer").removeClass("flipping");
                    $("#" + primerClick.id).attr("src", "images/tapada.jpg").removeClass("noPointer").removeClass('flipping');
                    clicks = 0
                }, 1000)
                console.log('distintas')

                //   si son distintas volver a mostrar la tapada
            }
            //COMPARACION
            if (pares == 6 && intentos <= movimientos) {
                console.log("GANASTE!")
                $("#ganadores").removeClass("ocultar")
                $(".contenedor").addClass("opacity")

                ganador()
            } else if (pares != 6 && intentos >= movimientos) {
                console.log("perdiste")
                $('#desafortunado').removeClass("ocultar")
                $(".contenedor").addClass("opacity")
            }
        }
    }

})

// función del Local Storage me guarda el nombre del jugador que gane, si gana me guarda el nombre, 
// y los movimientos en una tabla 

function ganador() {
    var datos = {
        nombre: $('#name').val(),
        dif: $('#level').html(),
        intentos: intentos,
    }
    if (datosGanador == null) {
        datosGanador = []
    }
    datosGanador.push(datos);

    localStorage.setItem("ganador", JSON.stringify(datosGanador));

    for (i = 0; i < datosGanador.length; i++) {
        console.log(datosGanador[i])
        var datos = `
            <div class="datosGanador">
                <div class="persona"><span> ${datosGanador[i].nombre}</span></div>
                <div class="dificultad"><span> ${datosGanador[i].dif}</span></div>
                <div class="mov"><span> ${datosGanador[i].intentos}</span></div>
            </div>
        `
        $('#ganadoresData').append(datos)
        $('#movs').html(intentos)
    }
}

// funcion del botón para volver a jugar que sirve para recargar la página

$('.recargar').on('click', function () {
    location.reload()


})