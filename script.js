const head = document.querySelector("#head");
const body = document.querySelector("#body");
const arms = document.querySelector("#arms");
const legs = document.querySelector("#legs");
const scaffold = document.querySelector("#scaffold");
const resetbtn = document.querySelector("#reset");
const guessbtn = document.querySelector("#guessbtn");
const inputletter = document.querySelector("#guessletter");
const printwords = document.querySelector("#score");
const printguesses = document.querySelector("#tries");

const words = ["motivation", "length", "brick", "tenant", "day", "gold", "technique", "sacred", "sunshine", "aquarium", "therapist", "jail", "technology", "javascript", "master", "surf", "electronics"];

let gameWord = "";
let failCount = 0;
let wordToShow = [];
let guessedWords = [];

//Draw random word from array and return it
const getRandomWord = () => {
  let randomWord = words[Math.floor(Math.random() * words.length)];
  return randomWord;
};

const initGame = () => {
    //Get random word and assign it to gameWord and makes all letters to lowcase
  gameWord = getRandomWord().toLocaleLowerCase();
    //Create a new array using Array object and set its length to gameWords length.
    //new Array creates an empty array by itself and by passing in gameWord.length it gets a length but doesn't have content
    //With fill("_") we can fill the array with "_" based on the length and generate diffrent length based on words it gets.
  wordToShow = new Array(gameWord.length).fill("_")
  console.log("Word to guess: ", gameWord);
  console.log("playfield: ", wordToShow);
  console.log("word length: ", wordToShow.length);
  //use join to make the letters in the array to one string and a separator.
  //Then assign it to printWords.textContent to output on document
    printwords.textContent = wordToShow.join(" ");
  findLetter();
};


//Function to find the letter
const findLetter = () => {
  guessbtn.addEventListener("click", () => {
    //assign inputletter"field" to guessletter
    let guessLetter = inputletter.value.toLocaleLowerCase();

    console.log("letter guessed: ", guessLetter);

    if(gameWord.includes(guessLetter)) {
        //Loops through "secret word"(gameWord)
      for (let index = 0; index < gameWord.length; index++) {
        //Checks the current array(gameWord) and checks if character at current index is strictly(===) guessletter
        if (gameWord[index] === guessLetter) {
            //IF true, check wordtoShow array and assign same index to guessletter
          wordToShow[index] = guessLetter;
        }
      }

      console.log("found words", wordToShow);
      printwords.textContent = wordToShow.join(" ");
      inputletter.value = "";

    //Check if the wordtoShow does NOT include "_" to win the game.
      if(!wordToShow.includes("_")){
       setTimeout(()=> {
        alert("Congratulations! You win!!!\nPress restart to play again!");
        guessbtn.disabled = true;

       }, 100)
      }

    }else{
        //if letter not found, increment failCount
      failCount ++;
      console.log("Fail counter: ", failCount);
      guessedWords.push(guessLetter);
      console.log("Words guessed: ", guessedWords);
      //Print out guessed letters
      printguesses.textContent = guessedWords.join(" ")
      drawHangedMan()
      inputletter.value = "";
    }


  });
};



//Draw the "victim" based on the number assigned to failCount switch-case
//remove class hide on the svg
const drawHangedMan = () => {
    switch(failCount){
        case 1:
            head.classList.remove("hide")
            break;
        case 2:
            scaffold.classList.remove("hide")
            break;
        case 3:
            legs.classList.remove("hide")
            break;
        case 4:
            arms.classList.remove("hide")
            break;
        case 5:
            body.classList.remove("hide")
            setTimeout(() => {
                alert(`GAME OVER!!!\nCorrect word was : ${gameWord}\nPress restart to play again.`)
            }, 100)
            guessbtn.disabled = true
            break;
    }

}

resetbtn.addEventListener("click", () => {
    location.reload();
})


initGame();
