const palavraAleatoria = "amor".toUpperCase()
const palavraSplitted = palavraAleatoria.split("")
console.log(palavraSplitted);

let tentativas = 6
let numLetrasAcertadas = 0;
const letrasReveladas = Array(palavraSplitted.length).fill("")

function disableButton(id) {
  document.getElementById(id).classList.add("disabled");
}

function encontrarLetra(letra) {
  // console.log(`Letra clicada: ${letra}`)
  disableButton(letra);

  // console.log(`Letra pressionada: ${letra}`)
  let encontrada = false;

  for (let index = 0; index < palavraSplitted.length; index++) {
    const element = palavraSplitted[index];
    if (element === letra){
      letrasReveladas[index] = letra;
      numLetrasAcertadas++;
      
      encontrada = true;
    }
  }
  
  if (encontrada === false) {
    tentativas--;
  }

  if (numLetrasAcertadas === palavraSplitted.length) {
    console.log("Parabéns, você ganhou o jogo!")
    return;
  }
  if (tentativas < 1) {
    console.log("Você perdeu o jogo!")
    return;
  }
  
  console.log(`Tentativas: ${tentativas}`)
  console.log(letrasReveladas);
}

/**
 * Generates a virtual keyboard from A-Z in HTML.
 */
function generateKeyboard() {
  const mainElement = document.querySelector(".keyboard");

  for (let index = 65; index < 91; index++) {
    const letter = String.fromCharCode(index)
    const buttonElement = `<button id="${letter}" onclick="encontrarLetra('${letter}')" type="button" class="btn btn-primary">${letter}</button>`

    mainElement.innerHTML += buttonElement;
  }
}

generateKeyboard()

document.addEventListener('keydown', function(event) {
  const tecla = event.key.toUpperCase();
  const buttonElement = document.getElementById(tecla);

  if(buttonElement?.classList.contains("disabled")) {
    return;
  }

  const alphabetRegex = /^[A-Z]$/;

  if(alphabetRegex.test(tecla)) {
    console.log(tecla);
    encontrarLetra(tecla);
    // document.getElementById(tecla).focus();
  }
});