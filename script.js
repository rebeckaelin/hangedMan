let showWrongLetters = document.querySelector(".used-letters__text");
let showUnderlines = document.querySelector(".show-underlines");
let guessButton = document.querySelector("#guessButton");
let theHangedMan = document.querySelectorAll(".hidden"); //changing the stae of the man
let youWin = document.querySelector(".win");
let startButton = document.querySelector(".header__button");
let showWinOrLoseBox = document.querySelector(".hidden");

const words = [
  "motivation",
  "length",
  "brick",
  "tenant",
  "day",
  "gold",
  "technique",
  "sacred",
  "sunshine",
  "aquarium",
  "therapist",
  "jail",
  "technology",
  "javascript",
  "master",
  "surf",
  "electronics",
];

let wordToGuess = "";
let guessedLetters = [];
let printUnderlines = [];
let failedGuesses = 0;
let maxTries = 5;

let wrongLetters = [];
let regex = /^[a-zA-ZäöåÄÖÅ]+$/;
let state = "";

//returnerar ett random ord
function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

const initGame = () => {
  //Get random word and assign it to wordToGuess and makes all letters to lowcase
  wordToGuess = getRandomWord().toLocaleLowerCase();
  //Create a new array using Array object and set its length to wordToGuesss length.
  //new Array creates an empty array by itself and by passing in wordToGuess.length it gets a length but doesn't have content
  //With fill("_") we can fill the array with "_" based on the length and generate diffrent length based on words it gets.
  printUnderlines = new Array(wordToGuess.length).fill("_");

  console.log("Word to guess: ", wordToGuess); //tänker vi kan ta bort dessa 3 loggarna? /Rebban
  console.log("playfield: ", printUnderlines);
  console.log("word length: ", printUnderlines.length);

  //use join to make the letters in the array to one string and a separator.
  //Then assign it to printWords.textContent to output on document
  showUnderlines.textContent = printUnderlines.join(" ");

  findLetter();
};

const findLetter = () => {
  //funktion för att få in spelarens gissningar
  guessButton.addEventListener("click", () => {
    userGuess = document.querySelector("#guessInput").value; //hämtar värdet i inputfältet
    document.querySelector("#guessInput").value = ""; // rensar inputfältet efter varje knapptryckning på "gissa"

    if (guessedLetters.includes(userGuess)) {
      return; //kontrollerar om vi redan skrivit in gissad bokstav
    }
    if (wordToGuess.includes(userGuess)) {
      guessedLetters = printUnderlines;
      for (let i = 0; i < wordToGuess.length; i++) {
        if (wordToGuess[i] === userGuess) {
          printUnderlines[i] = userGuess; //ersätter _ med bokstaven om den finns i ordet
          console.log("Rätt bokstav: ", printUnderlines); //ta bort denna? /Rebban
        }
      }

      if (!printUnderlines.includes("_")) {
        showWinOrLoseBox.classList.remove("hidden");
        youWin.innerHTML = `Snyggt! <br> Du gissade rätt!`;
        //en funktion för att spela igen? /Rebban
      }
      let underlines = guessedLetters.join(" "); //
      showUnderlines.textContent = underlines; //skriver ut _ där det fortf. saknas bokstäver
      console.log(guessedLetters); //ta bort denna? /Rebban
    } else {
      wrongLetters.push(userGuess); //lägger till felaktig gissad bokstav i en array
      showWrongLetters.textContent = wrongLetters; //visa felaktiga och gissade bokstäver i html

      console.log(failedGuesses); //ta bort denna? /Rebban
      drawMan();
    }
  });
};

const drawMan = () => {
  if (!wordToGuess.includes(userGuess)) {
    //Använda bosktäver in i arryen.
    if (failedGuesses == 0) {
      //För att få scafolding  att visas först.
      theHangedMan.item(failedGuesses).classList.remove("hidden");
    } else {
      theHangedMan.item(5 - failedGuesses).classList.remove("hidden");
    }

    failedGuesses++;

    if (failedGuesses === 5) {
      state = "förlorade!";
      window.setTimeout(function () {
        //delay so that the page can render
        resetGame(state);
      }, 200);
    }
  }
};

function resetGame(state) {
  if (
    confirm(`Du ${state}, rätt ord var: ${wordToGuess} vill du spela igen?`)
  ) {
    location.reload();
  }
}

initGame();
