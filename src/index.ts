let showUsedLetters = document.querySelector(
  ".show-used-letters"
) as HTMLElement;
let showUnderlines = document.querySelector(".show-underlines") as HTMLElement;
let guessButton = document.querySelector("#btn") as HTMLButtonElement;
let showScaffold = document.getElementById("scaffold") as HTMLElement;
let showHead = document.getElementById("head") as HTMLElement;
let showBody = document.getElementById("body") as HTMLElement;
let showArms = document.getElementById("arms") as HTMLElement;
let showLegs = document.getElementById("legs") as HTMLElement;
let youLose = document.querySelector(".you-lose") as HTMLElement;
let youWin = document.querySelector(".you-win") as HTMLElement;
let startButton = document.querySelector(
  ".header__button"
) as HTMLButtonElement;
let showWinOrLoseBox = document.querySelector(".hidden") as HTMLElement;

let wrongLetters: string[] = [];
let guesses: number = 0;
let userGuess: string; // variabel för spelarens gissning
let pickedWord: string;
let printUnderlines: string;

let levelOneWords: string[] = [
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

// funktion för att slumpa fram ett random ord från listan ovan
function getRandomWord() {
  return levelOneWords[Math.floor(Math.random() * levelOneWords.length)];
}

function disableButton(condition: boolean): void {
  guessButton.disabled = condition;
}

disableButton(true);

//eventlistener för att starta spelet
startButton.addEventListener("click", (): void => {
  pickedWord = getRandomWord(); //sparar funktionen som slumpar ett ord i en variabel
  printUnderlines = pickedWord
    .split("" as string)
    .fill("_" as string)
    .join(" " as string); //variabel där vi sparar det slumpade ordet och gör det till _
  if (showUnderlines) {
    showUnderlines.textContent = printUnderlines; //Skriver ut rätt antal _ baserat på ordet som slumpats}
  }
  console.log(pickedWord);

  disableButton(false);
  resetGame();
  startButton.innerText = "BÖRJA OM";
});

//funktion för att få in spelarens gissningar
guessButton.addEventListener("click", (): void => {
  console.log(`Före: ${printUnderlines}`);
  userGuess = (document.querySelector("#input") as HTMLInputElement).value;
  (document.querySelector("#input") as HTMLInputElement).value = "";
  if (wrongLetters.includes(userGuess)) {
    return; //kontrollerar om vi redan skrivit in gissad bokstav
  }
  if (pickedWord.includes(userGuess)) {
    let printLetter: string[] = printUnderlines.split(" "); //delar upp min sträng (pickedword) till en array som sparas i en variabel
    console.log(printLetter);

    for (let i = 0; i < pickedWord.length; i++) {
      if (pickedWord[i] === userGuess) {
        printLetter[i] = userGuess; //ersätter _ med bokstaven om den finns i ordet
      }
    }
    if (printLetter.join("") === pickedWord) {
      showWinOrLoseBox.classList.remove("hidden");
      youWin.textContent = `Du gissade rätt!`;
      startButton.textContent = "SPELA IGEN";
      disableButton(true);
    }
    printUnderlines = printLetter.join(""); //gör wrongLetters tillbaks till en sträng igen
    console.log(`Efter: ${printUnderlines}`);
    showUnderlines.innerText = printUnderlines; //skriver ut _ där det fortf. saknas bokstäver
  } else {
    wrongLetters.push(userGuess); //lägger till felaktig gissad bokstav i en array
    showUsedLetters.innerText = wrongLetters.join(" "); //visa felaktiga gissade bokstäver
    // console.log(wrongLetters);
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

function resetGame(): void {
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
