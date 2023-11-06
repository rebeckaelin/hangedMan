const head = document.querySelector("#head");
const body = document.querySelector("#body");
const arms = document.querySelector("#arms");
const legs = document.querySelector("#legs");
const scaffold = document.querySelector("#scaffold");
const resetbtn = document.querySelector("#reset");
const guessbtn = document.querySelector("#guessbtn");
const inputletter = document.querySelector("#guessletter");

const words = ["motivation", "hund", "katt"];

let gameWord = "";
let failCount = 0;
let wordtoShow = [];
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
  wordtoShow = new Array(gameWord.length).fill("_")
  console.log("Word to guess: ", gameWord);
  console.log("playfield: ", wordtoShow);
  console.log("word length: ", wordtoShow.length);

  findLetter();
};


//Function to find the letter
const findLetter = () => {
  guessbtn.addEventListener("click", () => {
    //assign inputletter"field" to guessletter
    let guessletter = inputletter.value.toLocaleLowerCase();

    console.log("letter guessed: ", guessletter);

    if (gameWord.includes(guessletter)) {
        //Loops through "secret word"(gameWord)
      for (let index = 0; index < gameWord.length; index++) {
        //Checks the current array(gameWord) and checks if character at current index is strictly(===) guessletter
        if (gameWord[index] === guessletter) {
            //IF true check wordtoShow array and assign same index to guessletter
          wordtoShow[index] = guessletter;
        }
      }
      console.log("found words", wordtoShow);
      inputletter.value = "";
    } else {
        //if letter not found, increment failCount
      failCount ++;
      console.log("Fail counter: ", failCount);
      guessedWords.push(guessletter);
      console.log("Words guessed: ", guessedWords);
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
                alert("GAME OVER!!!")
            }, 50)
            guessbtn.disabled = true
            break;
    }

}

resetbtn.addEventListener("click", () => {
    location.reload();
})


initGame();
