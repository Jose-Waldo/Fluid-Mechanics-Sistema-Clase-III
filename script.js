// Variables importantes para el calculo 
// Relaciones en accesorios
let listaAccesoriosComunes = ["SALIDA DE TANQUE o Entrada Tuberia que se proyecta hacia dentro", " Entrada con bordes afilados", " Entrada achaflanada", " Entrada redondeada", 
    " Valvula globo--abierta por completo", " Válvula de ángulo--abierta por completo", " Válvula de compuerta--abierta por completo", 
    " --3/4 abierta", "--1/2 abierta", " --1/4 abierta", " Válvula de verificación--tipo giratorio", 
    " Válvula de verificación--tipo bola", " Válvula de mariposa--abierta por completo, 2 a 8 pulg", " --10 a 14 pulg", " --16 a 24 pulg", " Válvula de pie--tipo disco de vástago", 
    " Válvila de pie--tipo disco bisagra", " Codo de 90°", " Codo de 90° de radio largo", " Codo roscado a 90°", " Codo estandar a 45°", " Codo roscado a 45°", " Vuelta cerrada en retorno", 
    " Te estándar--con flujo directo", "--con flujo ramal"
];

let leDAccesorios = [1, 0.5, 0.25, 0.6, 340, 150, 8, 35, 160, 900, 100, 150, 45, 35, 
25, 420, 75, 30, 20, 50, 16, 26, 50, 20, 60];


//Propiedades del agua
let tempetaturaAgua = [0, 5, 10, 15, 20, 25, 35, 45, 50, 55, 60, 65, 70,
    75, 80, 85, 90, 95, 100];
    
let pesoEspecificoAgua = [9.81, 9.81, 9.81, 9.81, 9.79, 9.78, 9.77, 
9.75, 9.73, 9.71, 9.69, 9.67, 9.65, 9.62, 9.59, 9.56, 9.53, 9.50,9.47,
9.44, 9.40];
    
let densidadAgua = [1000, 1000, 1000, 1000, 998, 997, 996, 994, 992, 
    990, 988, 986, 984, 981, 978, 975, 971, 968, 965, 962, 958];

let viscosidadDinamicaAgua = [1.75*10**-3, 1.52*10**-3, 1.30*10**-3, 1.15*10**-3, 
1.02*10**-3, 8.91*10**-4, 8.00*10**-4, 7.18*10**-4, 6.51*10**-4, 5.94*10**-4,
5.41*10**-4, 4.98*10**-4, 4.60*10**-4, 4.31*10**-4, 4.02*10**-4, 3.73*10**-4,
3.50*10**-4, 3.30*10**-4, 3.11*10**-4, 2.92*10**-4, 2.82*10**-4];
    
let viscosidadCinematica = [1.75*10**-6, 1.52*10**-6, 1.30*10**-6, 1.15*10**-5, 
1.02*10**-6, 8.94*10**-7, 8.03*10**-7, 7.22*10**-7, 6.56*10**-7, 6.00*10**-7, 
5.48*10**-7, 5.0*10**-7, 4.67*10**-7, 4.39*10**-7, 4.11*10**-7, 3.83*10**-7, 
3.60*10**-7, 3.41*10**-7, 3.22*10**-7, 3.04*10**-7, 2.94*10**-7];
    
// Propiedades de los materiales
let materialTub = ["Vidrio", "Plástico", "Tubo extruido, cobre, latón, y acero", 
"Acero, comercial o soldado", "Hierro galvanizado", "Hierro ductil, recubierto", 
"Hierro ductil, no recubierto", "Concreto, bien fabricado", "Acero remachado"];
    
let Rugosidad = ["Liso", 3.0*10**-7, 1.5*10**-6, 4.6*10**-5, 1.5*10**-4,
1.2*10**-4, 2.4*10**-4, 1.2*10**-4, 1.8*10**-3];

// FUNSIONES DEL PROGRAMA
// Funsiones para el calculo de cabezas
function cabPresion (p, gama) {
    return p / gama
}

// Funsiones para el calculo de cabezas
function cabVelosidad (v) {
    return (v**2) / (2*9.81)
}

// Calculo de viscocidad
function calculovis (p, u) {
    return p / u
}

// Numero de Reinolds NR
function numeroReinolds (D, v, vel) {
    return (D*vel) / v
}

// Facor de fricción 
function factorFriccion (D, e, v, vel) {
    let NR = numeroReinolds (D, v, vel)
    let De = 1 / (3.7*(D / e));
    let dso = 5.74 / (NR**0.9);

    return (0.25) / (Math.log10(De + dso))**2;
}

// Calculo de hl para acceroios 
function calcHlAccesorios (arrayLed, f, vel) {
    let sumLeD = 0;
    for (i in arrayLed) {
        sumLeD += arrayLed[i];
    }

    return sumLeD * cabVelosidad(vel) * f
}

// Calculo de hl por fricción
function calcHlPorFriccion (L, f, vel, d) {
    return (L/d) * cabVelosidad(vel) * f
}

// Calculo de hl con Ks
function calcuHlConK (arrayKs, vel) {
    let sumKs = 0;
    for (i in arrayKs) {
        sumKs += arrayKs[i];
    }

    return sumKs * cabVelosidad(vel);
}

// Funcion para el calculo de energia total

function energiaTotal (arrayLed, arrayKs, f, vel, d, L) {
    return calcHlAccesorios (arrayLed, f, vel) + calcHlPorFriccion (L, f, vel, d) + calcuHlConK (arrayKs, vel)
}

// Funcion General para el calculo
function definitiva (p1, z1, v1, hlvar, p2, z2, v2, gama) {
    return cabPresion(p1, gama) + z1 + cabVelosidad(v1) - hlvar - cabPresion(p2, gama) - z2 - cabVelosidad(v2);
}

// Funsión para crear lista para la selección de elementos
function crearOpciones (liscontenidoItems, contenedorOpciones) {
    let item, labelItem, entradaDos; 
    for (i in liscontenidoItems) {
        item = document.createElement("li");
        labelItem = document.createElement("label");
        labelItem.classList.add("laber-acce")
        labelItem.innerHTML = liscontenidoItems[i];
        entradaDos = document.createElement("input");
        entradaDos.type = "number";
        entradaDos.classList.add("numero-elementos-acce");
        item.appendChild(labelItem);
        item.appendChild(entradaDos);
        item.classList.add("items-acce");
        contenedorOpciones.appendChild(item);
    }
}
// Crea los elementos que hacen parte de la lista seleccionable
function crearListaSelect (listaSele, arrayContenido) {
    for (i in arrayContenido) {
        let opcion = document.createElement("option");
        opcion.innerHTML = arrayContenido[i];
        listaSele.appendChild(opcion);
    }
}
// Encuentra la rugocidad en base al material
function encontrarEenBaseaMaterial (material, arrayBusque) {
    return arrayBusque.indexOf(material);
}

// Funsión para calcular la velocidad en base al caudal
function veloEnbaseQ (Q, D) {
    return (4*Q) / (Math.PI * D**2);
}

function DiametroCalculo (Q, e, v, L, p1, z1, v1, p2, z2, gama, arrayLe, arraKs, CONDICION) {
    let enrPun = 0;
    let D = (Math.random() * 5).toFixed(5);
    // Esto es si tiene la velocidad en el punto 1 es diferente
    if (CONDICION == "Cv") {
        let c = 0;
        while (true) {
            c++
            D = (Math.random() * 5).toFixed(5);
            let vel = veloEnbaseQ(Q, D);
            let f = factorFriccion(D, e, v, vel);
            let hltotal = energiaTotal (arrayLe, arraKs, f, vel, D, L);
            enrPun = definitiva(p1, z1, v1, hltotal, p2, z2, vel, gama);
            if (enrPun <= 0.05 && enrPun >= -0.004) {
                return D;
                break
            }
            
            else if (c == 800000) {
                break;
            }
            
        }
    }

    // Esto es para tuberias que conservan una mista velocidad
    else if (CONDICION == "Nv") {
        let c = 0;
        while (true) {
            c++
            D = (Math.random() * 5).toFixed(5);
            let vel = veloEnbaseQ(Q, D);
            let f = factorFriccion(D, e, v, vel);
            let hltotal = energiaTotal (arrayLe, arraKs, f, vel, D, L);
            enrPun = definitiva(p1, z1, 0, hltotal, p2, z2, vel, gama);

            if (enrPun <= 0.05 && enrPun >= -0.004) {
                console.log("Se completo");
                return D;
                break
            }

            else if (c == 800000) {
                break;
            }
        }
    }
    
    

}

let p1 = 0;
let p2 = 288;
let L = 100;
let z1 = 23;
let z2 = 2.5;
let Q = 0.50;
let e = 1.5*10**-4;
let gama = 62.4;
let v = 1.21*10**-3;
let arrayLe = [8, 30, 30];
let arraKs = [0.5];

let res = DiametroCalculo (Q, e, v, L, p1, z1, 10, p2, z2, gama, arrayLe, arraKs, "Nv")

console.log(res);

// Ejecución de funsiones para el calculo
let contenedorLista = document.querySelector(".lista-ime");
let selectTemperaturaAgua = document.querySelector(".lis-tem-agu");
let selectMaterialTuberia = document.querySelector(".mat-tube");
let botonCalcular = document.querySelector(".boton-calcular");

crearOpciones(listaAccesoriosComunes, contenedorLista);
crearListaSelect(selectTemperaturaAgua, tempetaturaAgua);
crearListaSelect(selectMaterialTuberia, materialTub);
let cont = 0;


botonCalcular.addEventListener("click", function(){
    let Pnsto = document.querySelectorAll(".entrada-presion");
    let znsto = document.querySelectorAll(".entrada-elevacion");
    let Qls = document.querySelector(".entrada-caudal");
    let Lds = document.querySelector(".entrada-long");
    let tepmagu = selectTemperaturaAgua.value;
    let mateirTuber = selectMaterialTuberia.value;
    // Valores extraidos
    let pns =  [parseFloat(Pnsto[0].value), parseFloat(Pnsto[1].value)];
    let zns =  [parseFloat(znsto[0].value), parseFloat(znsto[1].value)];
    let Qns =  parseFloat(Qls.value).toFixed(5);
    let L =parseFloat(Lds.value);
    let e = parseFloat(Rugosidad[encontrarEenBaseaMaterial (mateirTuber, materialTub)]);
    let v = parseFloat(viscosidadCinematica[encontrarEenBaseaMaterial (parseInt(tepmagu), tempetaturaAgua)]);
    let gama =  (parseFloat(pesoEspecificoAgua[encontrarEenBaseaMaterial (parseInt(tepmagu), tempetaturaAgua)])) * 1000;
    
    // Obtener los valores de los LeD, de los elementos
    // Obtiene los valores solo de los elementos digitados *************
    let valoresDeEntradasAccesorios = document.querySelectorAll(".numero-elementos-acce");
    let obtenidosEntradas = [];
    let nombreAccesorio = [];


    for (i in valoresDeEntradasAccesorios) {
        if (isNaN(parseInt(valoresDeEntradasAccesorios[i].value))) {

        }

        else {
            nombreAccesorio.push(valoresDeEntradasAccesorios[i].previousElementSibling.textContent);
            obtenidosEntradas.push(parseInt(valoresDeEntradasAccesorios[i].value))
            valoresDeEntradasAccesorios[i].value = "";
        }
    }

    // error

    // Función para obtener los valores de LeD, de cada uno se los elementos
    let LeDsDelSistema = [];
    for (i of nombreAccesorio) {
        let po = listaAccesoriosComunes.indexOf(i);
        LeDsDelSistema.push(leDAccesorios[po]);
    }

    console.error(LeDsDelSistema);
    let ksSistem = []
    for (i in LeDsDelSistema) {
        console.warn(obtenidosEntradas[i]);
        if (LeDsDelSistema[i] <= 1) {
            LeDsDelSistema[i] *= parseInt(obtenidosEntradas[i]);
            ksSistem.push(LeDsDelSistema[i]);
            obtenidosEntradas.shift();
            LeDsDelSistema[i] = 0;
            LeDsDelSistema.shift();
        }
        LeDsDelSistema[i] *= parseInt(obtenidosEntradas[i]);
    }
    console.error(obtenidosEntradas);
    console.group("Valores Introducidos");
    console.log("p1: " + pns[0]);
    console.log("p2: " + pns[1]);
    console.log("Q: " + Qns);
    console.log("z1: " + zns[0]);
    console.log("z2: " + zns[1]);
    console.log("LeDsDelSistema: " + LeDsDelSistema);
    console.log("ksSistem: " + ksSistem);

    console.log("gama: " + gama);
    console.log("e: " + e);
    console.log("v: " + v);


    // Efectual el calculo de sistemas de tuebrias clase II
    let resultado = DiametroCalculo (Qns, e, v, L, pns[0], zns[0], 10, pns[1], zns[1], gama, LeDsDelSistema, ksSistem, "Nv");
    console.log("Resultado: " + DiametroCalculo (Qns, e, v, L, pns[0], zns[0], 10, pns[1], zns[1], gama, LeDsDelSistema, ksSistem, "Nv"));
    let mostraResDOM = document.querySelector(".res-real");
    mostraResDOM.innerHTML = "Diametro: " + resultado + " m"
})

