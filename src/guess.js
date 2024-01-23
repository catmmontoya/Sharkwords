const alphabet = "abcdefghijklmnopqrstuvwxyz";

function setupGuesses(element, handleGuess) {
  alphabet.split("").forEach((letter) => {
    //splitting each letter and then for each letter...
    const btn = document.createElement("button"); //create a button element
    btn.innerText = letter; //sets the inner text to display a letter
    btn.addEventListener("click", (e) => handleGuess(e, letter)); //attach the event handler (handleGuess) to the click event
    element.append(btn); //add the button to the given element
  });
}

export default setupGuesses;
