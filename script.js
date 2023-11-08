let showUsedLetters = document.querySelector(".show-used-letters");
let showUnderlines = document.querySelector(".show-underlines");
let guessButton = document.querySelector("#btn");
let picture_of_man = document.querySelectorAll(".hidden"); //changing the stae of the man
let youLose = document.querySelector(".you-lose");
let youWin = document.querySelector(".you-win");
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

let gameWord = "";
let used_Letters = [];
let foundWord = [];
let failCount = 0;
let maxTries = 5;

let wrong_Letters = [];
let regex = /^[a-zA-ZäöåÄÖÅ]+$/;
let state = "";

//returnerar ett random ord
function getWord() {
  return words[Math.floor(Math.random() * words.length)];
}

const initGame = () => {
  //Get random word and assign it to gameWord and makes all letters to lowcase
  gameWord = getWord().toLocaleLowerCase();
  //Create a new array using Array object and set its length to gameWords length.
  //new Array creates an empty array by itself and by passing in gameWord.length it gets a length but doesn't have content
  //With fill("_") we can fill the array with "_" based on the length and generate diffrent length based on words it gets.
  foundWord = new Array(gameWord.length).fill("_");
  console.log("Word to guess: ", gameWord);
  console.log("playfield: ", foundWord);
  console.log("word length: ", foundWord.length);
  //use join to make the letters in the array to one string and a separator.
  //Then assign it to printWords.textContent to output on document
  showUnderlines.textContent = foundWord.join(" ");

  findLetter();
};

const findLetter = () => {
  //funktion för att få in spelarens gissningar
  guessButton.addEventListener("click", () => {
    userGuess = document.querySelector("#input").value; //hämtar värdet i inputfältet
    document.querySelector("#input").value = ""; // rensar inputfältet efter varje knapptryckning på "gissa"

    if (used_Letters.includes(userGuess)) {
      return; //kontrollerar om vi redan skrivit in gissad bokstav
    }
    if (gameWord.includes(userGuess)) {
      used_Letters = foundWord;
      for (let i = 0; i < gameWord.length; i++) {
        if (gameWord[i] === userGuess) {
          foundWord[i] = userGuess; //ersätter _ med bokstaven om den finns i ordet
          console.log("Rätt bokstav: ", foundWord);
        }
      }

      if (!foundWord.includes("_")) {
        showWinOrLoseBox.classList.remove("hidden");
        youWin.textContent = `Du gissade rätt!`;
      }
      printUnderlines = used_Letters.join(" "); //
      showUnderlines.innerHTML = printUnderlines; //skriver ut _ där det fortf. saknas bokstäver
      console.log(used_Letters);
    } else {
      wrong_Letters.push(userGuess); //lägger till felaktig gissad bokstav i en array
      showUsedLetters.textContent = wrong_Letters; //visa felaktiga och gissade bokstäver i html

      console.log(failCount);
      //   console.log("Used letters: ", used_Letters);
      drawMan();
    }
  });
};

const drawMan = () => {
  if (!gameWord.includes(userGuess)) {
    //Använda bosktäver in i arryen.
    if (failCount == 0) {
      //För att få scafolding  att visas först.
      picture_of_man.item(failCount).classList.remove("hidden");
    } else {
      picture_of_man.item(5 - failCount).classList.remove("hidden");
    }

    failCount++;

    if (failCount === 5) {
      console.log("hest");
      state = "lost";
      window.setTimeout(function () {
        //delay so that the page can render
        reset(state);
      }, 200);
    }
  }
};

function reset(state) {
  if (confirm(`You ${state}, the word was: ${gameWord} play again?`)) {
    location.reload();
  }
}

initGame();
