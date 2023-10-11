const words = [
  {name: "abacaxi", tip: "Fruta tropical."},
  {name: "banana", tip: "Fruta amarela."},
  {name: "cachorro", tip: "Animal de estimação."},
  {name: "elefante", tip: "Animal terrestre e grande."},
  {name: "girafa", tip: "Animal de pescoço longo."},
  {name: "janela", tip: "Parte da casa que permite ver o exterior."},
  {name: "lapis", tip: "Instrumento para escrever ou desenhar."},
  {name: "bicicleta", tip: "Veículo de duas rodas."},
  {name: "computador", tip: "Máquina para processar informações."},
  {name: "televisao", tip: "Aparelho para assistir programas."},
  {name: "cadeira", tip: "Móvel para sentar."},
  {name: "teclado", tip: "Conjunto de botões para digitar."},
  {name: "sapato", tip: "Calçado para os pés."},
  {name: "calendario", tip: "Mostra os dias, meses e anos."},
  {name: "geladeira", tip: "Mantém alimentos frios."},
  {name: "piano", tip: "Instrumento musical."},
  {name: "bolacha", tip: "Alimento crocante."},
  {name: "papel", tip: "Material para escrever."},
  {name: "ventilador", tip: "Usado para refrescar o ambiente."},
  {name: "relógio", tip: "Mostra a hora."},
  {name: "paralelepipedo", tip: "Sólido geométrico."},
  {name: "bicicleta", tip: "Veículo de duas rodas."},
  {name: "escova", tip: "Usada para pentear os cabelos."},
  {name: "espelho", tip: "Reflete a imagem."},
  {name: "radio", tip: "Aparelho para ouvir música."},
  {name: "futebol", tip: "Esporte com uma bola."},
  {name: "palmeira", tip: "Tipo de árvore."},
  {name: "maracuja", tip: "Fruta tropical."},
  {name: "escola", tip: "Local de aprendizagem."},
  {name: "pneu", tip: "Parte do carro."},
  {name: "chave", tip: "Abre portas."},
  {name: "cama", tip: "Móvel para dormir."},
  {name: "garfo", tip: "Utensílio de cozinha."},
  {name: "fogao", tip: "Utilizado para cozinhar."},
  {name: "queijo", tip: "Produto derivado do leite."},
  {name: "oculos", tip: "Usado para melhorar a visão."},
  {name: "cachecol", tip: "Acessório para o pescoço."},
  {name: "aviao", tip: "Meio de transporte aéreo."},
  {name: "pombo", tip: "Ave comum nas cidades."},
  {name: "amarelo", tip: "Cor."},
  {name: "rosa", tip: "Flor."},
  {name: "mochila", tip: "Saco para carregar objetos."},
  {name: "lagarto", tip: "Réptil."},
  {name: "lousa", tip: "Usada para escrever com giz."},
  {name: "azul", tip: "Cor."},
  {name: "piscina", tip: "Local de lazer com água."},
  {name: "uva", tip: "Fruta pequena e arredondada."},
  {name: "pente", tip: "Utensílio para arrumar o cabelo."}
]

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
  // console.log(`Letra clicada: ${letra}`)
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
    console.log("Parabéns, você ganhou o jogo!")
    return;
  }
  if (tentativas > 5) {
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

function MostrarLetrasCertas (){
  // const container = document.querySelector(".palavra-secreta-container");
  // container.innerHTML = "";
  // palavraSplitted.split("").forEach((letra)) => {
  //   if 
  // }
}

function generateRandomWordHTML() {
  const palavraSecretaHTMLElement = document.querySelector(".palavra-secreta-ul");
  
  for (const key in palavraSplitted) {
    palavraSecretaHTMLElement.innerHTML += `<li id='secret-word-${key}'>&#8203;</li>`;
  }
}

generateRandomWordHTML()
setTipHTML()