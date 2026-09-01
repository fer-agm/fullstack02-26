const prompt = require('prompt-sync')();
// node ejemplo.js     




// let num1 = Number(prompt('número 2: '));
// let num2 = Number(prompt('número 1: '));


// let opcion = prompt('1. suma \n2. resta \n3. mult \n4. división')
// switch (opcion) {
//     case '1':
//         suma = num1 + num2;
//         console.log(`la suma es ${suma}!`);
//         break;
//     case '2':
//             resta = num1 - num2;
//             console.log(`la resta es, ${resta}!`);
//             break;        
//     case '3':
//         mult = num1 + num2;
//         console.log(`el producto es, ${mult}!`);
//         break;
//     case '4':
//         div = num1 / num2;
//         console.log(`el cociente es ${div}!`);
//         break;
//     default:
//         console.log('Opción no válida.')
// }






// while (true){
//     let edad = prompt('Ingrese edad: ');

//     if (edad === '' || edad===null){
//          console.log('saliendo');
//          break;
//     }

//     let edadnum = Number(edad)


//     if (isNaN(edadnum) || edad <=0){
//         console.log('ingrese edad válida.');
//     } else if(edadnum<18){
//         console.log('Persona es menor de edad.');

//     } else if(edadnum>= 18 && edad<=65){
//         console.log('Persona es adulto.');



//     } else if(edadnum>65 && edad<85){
//         console.log('Persona es adulto mayor.');
//     } else {
//         console.log('Persona es de años dorados.');
//     } 
// }








////////////////////////////////////////////////////////////////////////////////////////////
let nomap = prompt('ingrese nombre y apellido separados por un espacio ( ): ');

let [nombre,apellido] = nomap.split(' ').map(val => val.trim());
if (nombre==null || apellido == null){
    console.log('no válido.')
} else{
    nomUp = nombre.toUpperCase()
    apUp  = apellido.toUpperCase()
}



    let sueldoActual = prompt('Ingrese sueldo actual: $')
    if (isNaN(sueldoActual)){
        sueldoActual = 0
    }

    let sueldoPas = prompt('Ingrese sueldo promedio del semestre anterior: $')
    if (isNaN(sueldoPas)){
        sueldoPas = 0
    }

let benef = prompt('ingrese número de beneficiarios. Si no tiene, aprete enter o 0: ')

if (benef == ''){
    benef = '0'
}



if (benef != 0 ){
    var cargasSiNo = 'Sí'    
} else{
    var cargasSiNo = 'No'
}

if (sueldoPas<= 429899){
    tramo = '1(A)';
    asifG = 16829;
} else if (sueldoPas > 429899 && sueldoPas<=627913){
    tramo = '2(B)';
    asifG = 10327;

} else if (sueldoPas> 627913 && sueldoPas <= 979330){
    tramo = '3(C)';
    asifG = 3264;

} else{
    tramo = '4(D)';
    asifG = 0;

}

console.log('Al trabajador ' + nomUp + ' ' + apUp + ' le corresponde valor de familiar ($0, $3264, $10327, o $16828) por su renta del semestre anterior que es: $' + asifG + '.')

for (let r of benef){
    totalAsig = asifG * r;
}

sueldoCarga = sueldoActual + asifG;

console.log('La persona de \n-Nombre: '+nombre + '.\n-Apellido: '+apellido + '.\n-Cargas '+ cargasSiNo+'.\nCantidad de cargas familiares: ' + benef + '.\nEstá en el tramo que le corresponde al ingreso del semestre anterrior: '+tramo+'.\nLe corresponde por carga familiar el monto: $'+totalAsig+'.\n Su sueldo del mes más las cargas familiares es de: $'+sueldoCarga+'.')
