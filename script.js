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

let guessedLetter = [];
let guesses = 0;
let userGuess; // variabel för spelarens gissning
let pickedWord;

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

// funktion för att slumpa fram ett random ord från listan ovan
function getRandomWord() {
  return levelOneWords[Math.floor(Math.random() * levelOneWords.length)];
}

//eventlistener för att starta spelet
startButton.addEventListener("click", () => {
  pickedWord = getRandomWord(); //sparar funktionen som slumpar ett ord i en variabel
  printUnderlines = pickedWord.split("").fill("_").join(" "); //variabel där vi sparar det slumpade ordet och gör det till _
  showUnderlines.innerHTML = printUnderlines; //Skriver ut rätt antal _ baserat på ordet som slumpats
  console.log(pickedWord);
});

//funktion för att få in spelarens gissningar
guessButton.addEventListener("click", () => {
  userGuess = document.querySelector("#input").value; //hämtar värdet i inputfältet
  document.querySelector("#input").value = ""; // rensar inputfältet efter varje knapptryckning på "gissa"

  if (guessedLetter.includes(userGuess)) {
    return; //kontrollerar om vi redan skrivit in gissad bokstav
  }
  if (pickedWord.includes(userGuess)) {
    let guessedLetter = printUnderlines.split(" "); //delar upp min sträng (pickedword) till en array som sparas i en variabel
    for (let i = 0; i < pickedWord.length; i++) {
      if (pickedWord[i] === userGuess) {
        guessedLetter[i] = userGuess; //ersätter _ med bokstaven om den finns i ordet
      }
    }
    if (guessedLetter.join("") === pickedWord) {
      showWinOrLoseBox.classList.remove("hidden");
      youWin.innerHTML = `Du gissade rätt!`;
    }
    printUnderlines = guessedLetter.join(" "); //gör guessedLetter tillbaks till en sträng igen
    showUnderlines.innerHTML = printUnderlines; //skriver ut _ där det fortf. saknas bokstäver
    console.log(guessedLetter);
  } else {
    guessedLetter.push(userGuess); //lägger till felaktig gissad bokstav i en array
    showUsedLetters.innerText = guessedLetter; //visa felaktiga och gissade bokstäver i html

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
      youLose.innerHTML = `Du förlorade! Rätt ord var ${pickedWord}`;
    }
  }
});

// funktion om spelet är slut
// if/else som kontrollerar om du vunnit eller förlorat
// om du vann: YAY
// om du förlorade: NEY, rätt ord var: ....
// oavsett vilket skapa "spela igen" knapp - startButton.innerText = 'SPELA IGEN'
// när du klickar på ovan knapp kör resetGame

// function resetGame(){
//     guessedLetter = [];
//     guesses = 0;
//     printUnderlines = pickedWord.split('').fill('_').join(' ');
//     showUnderlines.innerHTML = printUnderlines;
//     showWinOrLoseBox.classList.add('hidden')
// }
