import "./style.css";
import getRandomWord from "./src/randomWord";
import setSharkImage from "./src/sharkImage";
import { isLetterInWord, revealLetterInWord, setupWord } from "./src/word";
import setupGuesses from "./src/guess";

document.querySelector("#app").innerHTML = `
  <section id="shark-img"></section>

  <section id="game-status"></section>

  <section id="word-container"></section>

  <section id="letter-buttons"></section>
`;

const word = getRandomWord();

const gameStatusEl = document.querySelector("#game-status");
const wordContainerEl = document.querySelector("#word-container");
const letterButtonsEl = document.querySelector("#letter-buttons");
const sharkImgEl = document.querySelector("#shark-img");

setupWord(wordContainerEl, word);

const initSharkwords = () => {
  let numWrong = 0;
  // const word = "word";

  setSharkImage(sharkImgEl, numWrong);

  const handleGuess = (guessEvent, letter) => {
    const button = guessEvent.target;
    //disable button after click
    button.setAttribute("disabled", true);

    if (isLetterInWord(letter)) {
      //handle correct/incorrect guess
      revealLetterInWord(letter);
    } else {
      numWrong += 1;
      setSharkImage(sharkImgEl, numWrong);
    }
    // setupGuesses(document.querySelector("#letter-buttons"), handleGuess);

    const isWordComplete = Array.from(
      document.querySelectorAll(".letter-box")
    ).every((el) => el.innerText !== ""); //This is saying, if every spot is not empty then return false and the game is not over yet.

    let wordComplete = true;

    let letterBoxes = document.querySelectorAll(".letter-box");

    for (const box of letterBoxes) {
      if (box.innerText === "") {
        wordComplete = false;
        break;
      }
    }

    //check if game over
    if (isWordComplete || numWrong === 5) {
      document.querySelectorAll("button").forEach((btn) => {
        btn.disabled = true;
      });
      gameStatusEl.innerText = isWordComplete ? "You win!" : "You lose!"; //ternary that is inside the isWordComplete
    }
  };
  setupGuesses(letterButtonsEl, handleGuess);
  // for debugging:
  console.log(`[INFO] Correct word is: ${word}`);
};

initSharkwords();
