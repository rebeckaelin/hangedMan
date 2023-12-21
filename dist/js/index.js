let showUsedLetters = document.querySelector(".show-used-letters");
let showUnderlines = document.querySelector(".show-underlines");
let guessButton = document.querySelector("#btn");
let showScaffold = document.getElementById("scaffold");
let showHead = document.getElementById("head");
let showBody = document.getElementById("body");
let showArms = document.getElementById("arms");
let showLegs = document.getElementById("legs");
let youLose = document.querySelector(".you-lose");
let youWin = document.querySelector(".you-win");
let startButton = document.querySelector(".header__button");
let showWinOrLoseBox = document.querySelector(".hidden");
let wrongLetters = [];
let guesses = 0;
let userGuess;
let pickedWord;
let printUnderlines;
let levelOneWords = [
  "bil",
  "hund",
  "cykel",
  "sol",
  "blomma",
  "bok",
  "dator",
  "äpple",
  "katt",
  "regn",
  "glas",
  "stol",
  "sten",
  "måne",
  "ballong",
  "elefant",
  "flaska",
  "stjärna",
  "kaffe",
  "fågel",
  "träd",
  "fjäril",
  "buss",
  "gräs",
  "orm",
  "hus",
  "spegel",
  "flod",
  "mus",
  "nyckel",
  "fjäll",
  "korv",
  "park",
  "penna",
  "lampa",
  "toalett",
  "sko",
  "tåg",
  "fjäder",
  "musik",
  "vatten",
  "regnbåge",
  "kamera",
];
function getRandomWord() {
  return levelOneWords[Math.floor(Math.random() * levelOneWords.length)];
}
function disableButton(condition) {
  guessButton.disabled = condition;
}
disableButton(true);
startButton.addEventListener("click", () => {
  pickedWord = getRandomWord();
  printUnderlines = pickedWord.split("").fill("_").join(" ");
  if (showUnderlines) {
    showUnderlines.textContent = printUnderlines;
  }
  console.log(pickedWord);
  disableButton(false);
  resetGame();
  startButton.innerText = "BÖRJA OM";
});
guessButton.addEventListener("click", () => {
  userGuess = document.querySelector("#input").value;
  document.querySelector("#input").value = "";
  if (wrongLetters.includes(userGuess)) {
    return;
  }
  if (pickedWord.includes(userGuess)) {
    let printLetter = printUnderlines.split(" ");
    console.log(printLetter);
    for (let i = 0; i < pickedWord.length; i++) {
      if (pickedWord[i] === userGuess) {
        printLetter[i] = userGuess;
      }
    }
    if (printLetter.join("") === pickedWord) {
      showWinOrLoseBox.classList.remove("hidden");
      youWin.textContent = `Du gissade rätt!`;
      startButton.textContent = "SPELA IGEN";
      disableButton(true);
    }
    printUnderlines = printLetter.join(" ");
    showUnderlines.innerText = printUnderlines;
  } else {
    wrongLetters.push(userGuess);
    showUsedLetters.innerText = wrongLetters.join(" ");
    guesses++;
    if (guesses === 1) {
      showScaffold.style.visibility = "visible";
    }
    if (guesses === 2) {
      showHead.style.visibility = "visible";
    }
    if (guesses === 3) {
      showBody.style.visibility = "visible";
    }
    if (guesses === 4) {
      showArms.style.visibility = "visible";
    }
    if (guesses === 5) {
      showLegs.style.visibility = "visible";
      showWinOrLoseBox.classList.remove("hidden");
      youLose.innerHTML = `Du förlorade!<br> Rätt ord var: <b>${pickedWord}</b>`;
      startButton.innerText = "SPELA IGEN";
      disableButton(true);
    }
  }
});
function resetGame() {
  wrongLetters = [];
  guesses = 0;
  showWinOrLoseBox.classList.add("hidden");
  youWin.innerText = "";
  youLose.innerText = "";
  showScaffold.style.visibility = "hidden";
  showHead.style.visibility = "hidden";
  showBody.style.visibility = "hidden";
  showArms.style.visibility = "hidden";
  showLegs.style.visibility = "hidden";
  showUsedLetters.textContent = "";
}
