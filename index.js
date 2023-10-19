import { secretWordsMock } from "./mocks/secret-words-mock.js";

// Initialize modal using Bootstrap
const myModal = new bootstrap.Modal(
  document.getElementById("staticBackdrop"),
  {}
);

/**
 * Function to get a random word from the provided word list.
 * @param {Array} words
 */
function getRandomWord(words) {
  const randomIndex = Math.floor(Math.random() * words.length);
  return words[randomIndex];
}

// Initialize an array to store the character array of the random word
let wordSplitted = [];
// Initialize an array to store revealed letters
let revealedLetters = [];
// Other game variables
let gameOver = false;
let attempts = 0;
let numCorrectLetters = 0;

/**
 * Set random word hint in HTML text element.
 * @param {any} randomWord
 */
function setHintText(randomWord) {
  // Get the hint element by its ID
  const hintElement = document.getElementById("hint-text");
  // Set the inner HTML of the hint element with the hint from the random word
  hintElement.innerHTML = randomWord.hint;
}

/**
 * Disable a virtual keyboard button by id.
 * @param {string} buttonId
 */
function disableButton(buttonId) {
  // Get the button element by its ID and add the "disabled" class
  document.getElementById(buttonId).classList.add("disabled");
}

/**
 * Find a letter in the character array of random word.
 * @param {string} letter
 */
window.findLetter = function (letter) {
  // Check if the game is over before proceeding
  if (gameOver) return;

  // Get the modal title element
  const modalTitleElement = document.getElementById("staticBackdropLabel");

  // Disable the button corresponding to the clicked letter
  disableButton(letter);

  // Initialize a flag to indicate if the letter was found in the word
  let letterFound = false;

  // Loop to go through the word's character array and update the revealed letters
  for (let index = 0; index < wordSplitted.length; index++) {
    const element = wordSplitted[index];
    if (element === letter) {
      revealedLetters[index] = letter;
      numCorrectLetters++;
      document.getElementById(`secret-word-${index}`).innerHTML = letter;

      letterFound = true;
    }
  }

  // If the letter was not found, update the number of attempts and the hangman image
  if (!letterFound) {
    attempts++;
    const hangmanImgElement = document.getElementById("hangman-img");
    hangmanImgElement.src = `./images/hangman-${attempts}.svg`;

    const guessesElement = document.getElementById("guesses-text");
    guessesElement.innerHTML = `${attempts}/6`;
  }

  // Check if all letters have been guessed
  if (numCorrectLetters === wordSplitted.length) {
    gameOver = true;
    // console.log("Parabéns, você ganhou o jogo! 🎉👏🏼");
    modalTitleElement.innerHTML = "Parabéns, você ganhou o jogo! 🎉👏🏼";
    myModal.show();
    return;
  }

  // Check if the number of attempts has exceeded the limit
  if (attempts > 5) {
    gameOver = true;
    // console.log("Você perdeu o jogo! 😭😢");
    modalTitleElement.innerHTML = "Você perdeu o jogo! 😭😢";
    myModal.show();
    return;
  }

  // console.log(`Attempts: ${attempts}`);
  // console.log(revealedLetters);
};

/**
 * Generates a virtual keyboard with buttons for letters A-Z in HTML.
 */
function generateKeyboard() {
  const keyboardContainer = document.querySelector(".keyboard-container");

  for (let charCode = 65; charCode < 91; charCode++) {
    const letter = String.fromCharCode(charCode);
    const buttonHTML = `<button id="${letter}" onclick="findLetter('${letter}')" type="button" class="btn btn-primary">${letter}</button>`;

    keyboardContainer.innerHTML += buttonHTML;
  }
}

document.addEventListener("keydown", function (event) {
  const pressedKey = event.key.toUpperCase();
  const buttonElement = document.getElementById(pressedKey);

  // Check if the button is disabled
  if (buttonElement?.classList.contains("disabled")) {
    return;
  }

  // Check if the pressed key is a valid letter (A-Z)
  const alphabetRegex = /^[A-Z]$/;
  if (alphabetRegex.test(pressedKey)) {
    // Call the findLetter function with the pressed key
    findLetter(pressedKey);
    // Focus on the corresponding button
    buttonElement.focus();
  }
});

/**
 * Configures HTML to display whitespace for each letter of the secret word.
 */
function setSecretWordBlankLetters() {
  const secretWordListElement = document.querySelector(".secret-word-ul");

  for (const index in wordSplitted) {
    secretWordListElement.innerHTML += `<li id='secret-word-${index}'>&#8203;</li>`;
  }
}

function startGame() {
  // Get a random word from the mock data
  const randomWord = getRandomWord(secretWordsMock);
  // Convert the random word to uppercase and split it into an array of characters
  wordSplitted = randomWord.name.toUpperCase().split("");
  // Initialize an array to store revealed letters, initially filled with empty strings
  revealedLetters = Array(wordSplitted.length).fill("");

  generateKeyboard();
  setHintText(randomWord);
  setSecretWordBlankLetters();
}

startGame();
