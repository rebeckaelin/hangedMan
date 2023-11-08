/*-------- Variables -------------*/

let showUsedLetters = document.querySelector(".show-used-letters"); 	//Get the HTML section that holds the already guessed letters.
let showUnderlines = document.querySelector(".show-underlines");	//Gets the HTML section that hold the letter to guess.
let guessButton = document.querySelector("#btn");			//A button ti guess a letter.
let picture_of_man = document.querySelectorAll(".hidden"); 		//For changing the state of the man.
let youLose = document.querySelector(".you-lose");		//Ta bort?	//Lose HTML paragraph.
let youWin = document.querySelector(".you-win");		//Ta bort?	//Win HTML paragraph. 
let startButton = document.querySelector(".header__button");		//Button to start the game.
let showWinOrLoseBox = document.querySelector(".hidden");		//HTML Paragraph for the win box at the end of the game.

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

let gameWord = "";		    //Variable to hold the randomly chosen word from the list.
let used_Letters = [];		//Array for all the used words.
let foundWord = [];	//?
let failCount = 0;		    //To keep track of how many times the player has failed, so that we can draw the man.
let maxTries = 5;   

let wrong_Letters = [];	//?	
let regex = /^[a-zA-ZäöåÄÖÅ]+$/; //Used to check that only letters are used for the input.
let state = "";

/*-------- Functions -------------*/


//Returns a random word out the word list.
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
  //Function to get the players guess.
    guessButton.addEventListener("click", () => {
    userGuess = document.querySelector("#input").value; //Gets the value from the inputfield.
    document.querySelector("#input").value = "";        // "Cleans" the input field after every guess.

    if(regex.test(userGuess)) {			    //Checks that only letters are used for the input. regex.test() returns true.
        if (used_Letters.includes(userGuess)) {
          return; 					                  //Check if the player already has used that letter before, 											//if so then the game does nothing.
        }
        if (gameWord.includes(userGuess)) {
          used_Letters = foundWord;
          for (let i = 0; i < gameWord.length; i++) {
            if (gameWord[i] === userGuess) {
              foundWord[i] = userGuess; 		//Replaces the underline with the letter if it's in the word.
            }
          }

          if (!foundWord.includes("_")) {		          //If the array that has the word the player needs to guess for, has no underlines,  				     				//The player wins the game.  
            showWinOrLoseBox.classList.remove("hidden_end-sign");
            youWin.textContent = `Du gissade rätt!`;  //Prints a win statement to the screen.
          }
          printUnderlines = used_Letters.join(" ");   //Joins al the use dletter into one string.
          showUnderlines.innerHTML = printUnderlines; //PLaces underlines where a letter is still missing.
          
        } else {
          wrong_Letters.push(userGuess); 		          //Places a wrong guessed letter into wrong letter array.
          showUsedLetters.textContent = wrong_Letters; //Render wrong letters and in the html.

          drawMan();
        }
    } else {
      alert("Enter a letter.");
    }                                                 //En of regex test.
  });
}	                                           

                              

//Function to draw the man if wrong guess.
const drawMan = () => {
  if (!gameWord.includes(userGuess)) {		      //If the word does not contain the player guess, then enter the if statement.
    if (failCount == 0) {			                  // On first fail draw the scafolding.
      picture_of_man.item(failCount).classList.remove("hidden");
    } else {					                          // Then on the rest of fails draw the scafolding.
      picture_of_man.item(5 - failCount).classList.remove("hidden");
    }

    failCount++;                  		       //Increment number of fails.

    if (failCount === 5) {			            //If the number of fails is 5 then the player losses the game.
      state = "lost";				                //State for game.
      window.setTimeout(function () {
        					                          //delay so that the page can render.
        reset(state);
      }, 200);
    }
  }
};
//Function to reset the game, with small delay to let everyting render on the page.
//The state variable gives win or lose into the .
function reset(state) {
  if (confirm(`You ${state}, the word was: ${gameWord} play again?`)) {
    location.reload();				          //Reloads the page.
  }
}

/*-----Function calls-------*/

/*Initiates the game*/
initGame();
