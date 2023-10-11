import { words } from './secret-words.js'
const myModal = new bootstrap.Modal(document.getElementById("staticBackdrop"), {});
let gameOver = false;

function obterPalavraAleatoria(palavras) {
  const indiceAleatorio = Math.floor(Math.random() * palavras.length);
  return palavras[indiceAleatorio];
}


const palavraAleatoria = obterPalavraAleatoria(words)
const palavraSplitted = palavraAleatoria.name.toUpperCase().split("")
console.log(palavraSplitted);

let tentativas = 0
let numLetrasAcertadas = 0;
const letrasReveladas = Array(palavraSplitted.length).fill("")

function setTipHTML() {
  const tipHTMLElement = document.getElementById("tip-text")
  tipHTMLElement.innerHTML = palavraAleatoria.tip;
}

function disableButton(id) {
  document.getElementById(id).classList.add("disabled");
}

function encontrarLetra(letra) {
  if (gameOver) return;
  // console.log(`Letra clicada: ${letra}`)
  const bodyModalHTMLElement = document.querySelector('.modal-body')
  disableButton(letra);

  // console.log(`Letra pressionada: ${letra}`)
  let encontrada = false;

  for (let index = 0; index < palavraSplitted.length; index++) {
    const element = palavraSplitted[index];
    if (element === letra){
      letrasReveladas[index] = letra;
      numLetrasAcertadas++;
      document.getElementById(`secret-word-${index}`).innerHTML = letra;
      
      encontrada = true;
    }
  }
  
  if (encontrada === false) {
    tentativas++;
    const hangmanImgHTMLElement = document.getElementById("hangman-img");
    hangmanImgHTMLElement.src = `./images/hangman-${tentativas}.svg`
    
    const guessesHTMLElement = document.getElementById("guesses-text")
    guessesHTMLElement.innerHTML = `${tentativas}/6`
  }

  if (numLetrasAcertadas === palavraSplitted.length) {
    gameOver = true;
    console.log("Parabéns, você ganhou o jogo!")
    bodyModalHTMLElement.innerHTML = "Parabéns, você ganhou o jogo!"
    myModal.show();
    return;
  }
  if (tentativas > 5) {
    gameOver = true;
    console.log("Você perdeu o jogo!")
    bodyModalHTMLElement.innerHTML = "Você perdeu o jogo!"
    myModal.show();
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
    encontrarLetra(tecla);
    // document.getElementById(tecla).focus();
  }
});

function generateRandomWordHTML() {
  const palavraSecretaHTMLElement = document.querySelector(".palavra-secreta-ul");
  
  for (const key in palavraSplitted) {
    palavraSecretaHTMLElement.innerHTML += `<li id='secret-word-${key}'>&#8203;</li>`;
  }
}

generateRandomWordHTML()
setTipHTML()


