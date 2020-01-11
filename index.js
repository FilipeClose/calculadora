document.getElementById("soma").addEventListener("click", () => {
	var num1 = document.getElementById("ent1").value;
	var num2 = document.getElementById("ent2").value;
	var total = +num1 + +num2;
	alert(`O resultado da soma é: `+ total);
})
document.getElementById("subt").addEventListener("click", () => {
	var num1 = document.getElementById("ent1").value;
	var num2 = document.getElementById("ent2").value;
	var total = +num1 - +num2;
	alert(`O resultado da subtração é: `+ total);
})
document.getElementById("mult").addEventListener("click", () => {
	var num1 = document.getElementById("ent1").value;
	var num2 = document.getElementById("ent2").value;
	var total = +num1 * +num2;
	alert(`O resultado da multiplicação é: `+ total);
})
document.getElementById("dividir").addEventListener("click", () => {
	var num1 = document.getElementById("ent1").value;
	var num2 = document.getElementById("ent2").value;
	var total = +num1 / +num2;
	alert(`O resultado da divisao é: `+ total);
})
document.getElementById("raiz").addEventListener("click", () => {
	var num1 = document.getElementById("ent1").value;
	var total = +num1 *0.5;
	alert(`O resultado da divisao é: `+ total);
})

