
/*-------- Variables -------------*/

let showWrongLetters = document.querySelector(".used-letters__text");   //Get the HTML section that holds the already guessed letters.
let showUnderlines = document.querySelector(".show-underlines");        //Gets the HTML section that hold the letter to guess.
let guessButton = document.querySelector("#guessButton");               //A button to guess a letter.
let theHangedMan = document.querySelectorAll(".hidden");                //changing the state of the man
let youWin = document.querySelector(".win");                            //Changes the Lose or win HTML paragraph.
let startButton = document.querySelector(".header__button");            //Button to start the game.
let showWinOrLoseBox = document.querySelector(".hide");                 //HTML Paragraph for the win box at the end of the game.

//List for all the words.
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

let wordToGuess = "";           //Variable to hold the randomly chosen word from the list.
let guessedLetters = [];        //Array for all the used words.
let printUnderlines = [];       //Array to hold the under lines for the places where there is no letter.
let failedGuesses = 0;          //To keep track of how many times the player has failed, so that we can draw the man.
let maxTries = 5;

let wrongLetters = [];
let regex = /^[a-zA-ZäöåÄÖÅ]+$/; //Used to check that only letters are used for the input.
let state = "";

/*-------- Functions -------------*/

//Returns a random word out the word list.
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

  

  //use join to make the letters in the array to one string and a separator.
  //Then assign it to printWords.textContent to output on document
  showUnderlines.textContent = printUnderlines.join(" ");

  findLetter();
};

const findLetter = () => {
  //Function to get the players guess.
  guessButton.addEventListener("click", () => {
    userGuess = document.querySelector("#guessInput").value; //Gets the value from the inputfield.
    document.querySelector("#guessInput").value = "";        //"Cleans" the input field after every guess.


    if( regex.test(userGuess) ){                             //Checks that only letters are used for the input. regex.test() returns true.
      if (guessedLetters.includes(userGuess)) {
            return;                                          //Check if the player already has used that letter before, 											
                                                             //if so then the game does nothing.
            }
      if (wordToGuess.includes(userGuess)) {
        guessedLetters = printUnderlines;
        for (let i = 0; i < wordToGuess.length; i++) {
          if (wordToGuess[i] === userGuess) {
            printUnderlines[i] = userGuess;                    //Replaces the underline with the letter if it's in the word.
          }
        }

        if (!printUnderlines.includes("_")) {                 //If the array that has the word the player needs to guess for, has no underlines,  				     				
                                                              //The player wins the game.  
          showWinOrLoseBox.classList.remove("hide");
          youWin.innerHTML = `Snyggt, <br> du gissade rätt!`; //Prints a win statement to the screen.
          window.setTimeout(function () {
                                                              //delay so that the page can render.
            location.reload();
            }, 1000);
        }
        let underlines = guessedLetters.join(" ");            //Joins all the used letters into one string.
        showUnderlines.textContent = underlines;              //PLaces underlines where a letter is still missing.
        
      } else {
        wrongLetters.push(userGuess);                         //Places a wrong guessed letter into the wrong letter array.
        showWrongLetters.textContent = wrongLetters;          //Render wrong letters into the html.

      
        drawMan();
      }
    } else {
      alert("Enter a letter.");
    }
  });
}	                                           

                              

//Function to draw the man if the player entered the wrong guess.
const drawMan = () => {
  if (!wordToGuess.includes(userGuess)) {                 //If the word does not contain the player guess, then enter the if statement.
    //Använda bosktäver in i arryen.
    if (failedGuesses == 0) {                             // On first fail draw the scafolding.
      theHangedMan.item(failedGuesses).classList.remove("hidden");
    } else {
      theHangedMan.item(5 - failedGuesses).classList.remove("hidden");  // Then on the rest of fails draw the rest of the man.
    }

    failedGuesses++;                                      //Increment number of fails.

    if (failedGuesses === 5) {                            //If the number of fails is five then the player losses the game.
      state = "förlorade!";                               //State for game.                        
       
      window.setTimeout(function () {
                                                          //delay so that the page can render
        resetGame(state);
      }, 200);
    }
  }
};
//Function to reset the game, with small delay to let everyting render on the page.
//The state variable gives win or lose into the template string.
function resetGame(state) {
  if (
    confirm(
      `Du ${state}, rätt ord var: ${wordToGuess}. Vill du spela igen?`
    )
  ) {
    location.reload();
  }
}

/*-----Function calls-------*/

/*Initiates the game*/
initGame();
