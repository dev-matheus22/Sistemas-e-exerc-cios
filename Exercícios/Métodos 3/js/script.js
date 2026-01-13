// var array1 = [3,6,9];
// var array2 = [2,4,6];

// let novoArray = array1.concat(array2);

// let arraySlice = novoArray.slice(3)

// document.write(arraySlice)

// let pergunta = Number(prompt("Digite um número"))

// if(novoArray.includes(pergunta)){
//     alert("Acertou")
// } else {
//     alert("Errou")
// }

// var array3 = ["Posição", "Aguardar", "Normalmente", "Suspiro", "Bola"];

// let resposta = prompt("Digite uma palavra");

// if (array3.includes(resposta)){
//     array3.reverse()
//     document.write(array3)
// } else {
//     alert("Errou")
// };

// var array4 = [3,5,7,9,2];

// let pergunta = parseInt(prompt("Digite um número"));

// array4.unshift(pergunta);

// document.write("Número adicionado" +array4+"<br>");

// array4.splice(1,1);

// document.write("Novo array: "+array4+"<br>");

// var array5 = [12, 8, 32, 4, 11, 70];

// let dobro = array5.map(num => num*2);

// dobro.sort((a,b) => a - b)

// document.write(dobro)

const array6 = [1,2,3,4,5,6,7];

let pares = array6.filter(par => par % 2 === 0)

document.write(pares+"<br>")

let pares2 = pares.join("|")

document.write(pares2)



