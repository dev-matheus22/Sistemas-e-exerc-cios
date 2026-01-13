let matriz = [
    [1,2,3],
    [4,5,6],
    [7,8,9]
];

let dobra = matriz[0].map(num => num*2);

document.write(dobra+"<br>");

var pares = matriz[0].filter(num => num % 2 ===0)
var pares1 = matriz[1].filter(num => num % 2 ===0)
var pares2 = matriz[2].filter(num => num % 2 ===0)

document.write(pares.concat(pares1, pares2))

