const palavraAleatoria = "amor"
const palavraSplitted = palavraAleatoria.split("")
console.log(palavraSplitted);

let tentativas = 6
let numLetrasAcertadas = 0;
const letrasReveladas = Array(palavraSplitted.length).fill("")

function encontrarLetra(letra) {
  if (numLetrasAcertadas === palavraSplitted.length) {
    console.log("Parabéns, você ganhou o jogo!")
    return;
  }
  if (tentativas < 1) {
    console.log("Você perdeu o jogo!")
    return;
  }

  console.log(`Letra pressionada: ${letra}`)
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
  
  console.log(`Tentativas: ${tentativas}`)
  console.log(letrasReveladas);
}

// 1º tentativa
encontrarLetra("a");

// 2º tentativa
encontrarLetra("m");

// 3º tentativa
encontrarLetra("o");

// 4º tentativa
encontrarLetra("r");

// 5º tentativa
encontrarLetra("r");

// 5º tentativa
encontrarLetra("r");

// 5º tentativa
encontrarLetra("r");

/**
 * Generates a virtual keyboard from A-Z in HTML.
 */
function generateKeyboard() {
  const mainElement = document.getElementById("main");

  for (let index = 65; index < 91; index++) {
    const letter = String.fromCharCode(index)
    const buttonElement = `<button type="button" class="btn btn-primary">${letter}</button>`

    mainElement.innerHTML += buttonElement;
  }
}

generateKeyboard()