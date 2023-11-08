/*-------- DOM -------------*/

let showWrongLetters = document.querySelector(".used-letters__text"); //HTML sectionen för fel gissade ord.
let showUnderlines = document.querySelector(".show-underlines"); //HTML sectionen för det sökta ordet.
let guessButton = document.querySelector("#guessButton"); //En knapp för att gissa en bokstav.
let resetButton = document.querySelector(".win"); //En reset knapp för spelet.
let theHangedMan = document.querySelectorAll(".hidden"); //För att kunna visa gubben.
let youWin = document.querySelector(".win"); //För att skriva ut win or lose skylt till skärmen.
let startButton = document.querySelector(".header__button"); //Knapp för att starta spelet.
let showWinOrLoseBox = document.querySelector(".hide"); //HTML paragraf för win eller lose lådan.

//En lista med ord.
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

/*-------- Variabler -------------*/

let wordToGuess = ""; //En variabel till det valda ordet från listan.
let guessedLetters = []; //En array till alla gissade ord.
let printUnderlines = []; //En array för att hålla ord spelare söker efter och understreck.
let failedGuesses = 0; //För att hålla koll på hur  många gånger spelaren har misslyckats.
let maxTries = 5; //max antal försök.
let wrongLetters = []; //All bokstäver som är fel.
let regex = /^[a-zA-ZäöåÄÖÅ]+$/; //Regex för att kolla så att inputet bara är bokstäver.
let state = "";

/*-------- Funktioner -------------*/

//Väljer ut ett ord på från ord listan.
function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

//En funktion som initierar spelet.
const initGame = () => {
  //Tar ett ord på från listan och sparar den i wordToGuess och gör alla bokstäver till små bokstäver.
  wordToGuess = getRandomWord().toLocaleLowerCase();
  //Skapa en ny array med Array-objekt och ställ in dess längd till wordToGuesss-längden.
  //new Array skapar en tom array av sig själv och genom att skicka in wordToGuess.length får den en längd men har inget innehåll.
  //Med fill("_") kan vi fylla arrayen med "_" baserat på längden och generera olika längder baserat på ord den får.
  printUnderlines = new Array(wordToGuess.length).fill("_");

  //använd join för att göra bokstäverna i arrayen till en sträng och en separator.
  //Tilldela den sedan till printWords.textContent för att mata ut på dokumentet
  showUnderlines.textContent = printUnderlines.join(" ");

  findLetter();
};

const findLetter = () => {
  //En funktion för att få spelarens gissning
  guessButton.addEventListener("click", () => {
    guess = document.querySelector("#guessInput").value; //Tar värdet från input.
    document.querySelector("#guessInput").value = ""; //Rensar input fältet efter att spelaren har klickat på knappen "gissa".

    if (regex.test(userGuess)) {
      //Kontrollerar så att bara bokstäver har används till inputet, regex returnerar sant.
      if (guessedLetters.includes(userGuess)) {
        return; //Kollar om spelaren har använt det gissade ordet förut.
        //Om spelaren har det händer ingenting.
      }

      if (wordToGuess.includes(userGuess)) {
        guessedLetters = printUnderlines;
        for (let i = 0; i < wordToGuess.length; i++) {
          //Loopar igenom ordet baserat på längd
          if (wordToGuess[i] === userGuess) {
            //Kollar om gissade bokstaven finns i "index" på loopade ordet.
            printUnderlines[i] = userGuess; //Byter ut understrecket med en bokstav på samma index om bokstaven finns i det sökta ordet.
          }
        }

        if (!printUnderlines.includes("_")) {
          //Om arraen som har det sökta ordet inte har några understreck i sig vinner spelaren spelet.
          showWinOrLoseBox.classList.remove("hide");
          youWin.innerHTML = `Du vann,  <br> Vill du spela igen? <br> Klicka Här`; //Skriver ut en ett meddelande på skärmen.
          resetButton.classList.remove("hide"); //Visar en knapp med text som man kan klicka på för att starta om spelet.
          resetButton.addEventListener("click", () => {
            // Laddar om en ny sida om man klickar på knappen.
            location.reload();
          });
        }
        let underlines = guessedLetters.join(" "); //Klipper ihop alla använda bokstäver till en sträng.
        showUnderlines.textContent = underlines; //Placerar ett understreck där det inte finns bokstäver
      } else {
        wrongLetters.push(userGuess); //Skriver in alla fel bokstäver in i en array.
        showWrongLetters.textContent = wrongLetters; //Skriv ut fel bokstäver in i HTML.

        drawMan(userGuess);
      }
    } else {
      alert("Enter a letter."); //Om spelaren inte skriver in en bokstav visas en alert.
    }
  });

  document.addEventListener("keydown", (e) => {
    if (wordToGuess.includes(e.key)) {
      guessedLetters = printUnderlines;
      for (let i = 0; i < wordToGuess.length; i++) {
        //Loopar igenom ordet baserat på längd
        if (wordToGuess[i] === e.key) {
          //Kollar om gissade bokstaven finns i "index" på loopade ordet.
          printUnderlines[i] = e.key; //Byter ut understrecket med en bokstav på samma index om bokstaven finns i det sökta ordet.
        }
      }

      if (!printUnderlines.includes("_")) {
        showWinOrLoseBox.classList.remove("hide");
        youWin.innerHTML = `Du vann,  <br> Vill du spela igen? <br> Klicka Här`;
        resetButton.classList.remove("hide");

        resetButton.addEventListener("click", () => {
          location.reload();
        });
      }
      let underlines = guessedLetters.join(" "); //Klipper ihop alla använda bokstäver till en sträng.
      showUnderlines.textContent = underlines; //Placerar ett understreck där det inte finns bokstäver
    } else {
      wrongLetters.push(e.key); //Skriver in alla fel bokstäver in i en array.
      showWrongLetters.textContent = wrongLetters; //Skriv ut fel bokstäver in i HTML.

      drawMan(e.key);
    }
  });
};

//En funktion för att rita ut mannen om spelar inte gissar rätt bokstav.
const drawMan = (guess) => {
  if (!wordToGuess.includes(guess)) {
    //Om ordet inte innehåller spelarens gissning, går man in i "if" uttrycket.

    if (failedGuesses == 0) {
      // På först misslyckandet skrivs "scafolding" ut.
      theHangedMan.item(failedGuesses).classList.remove("hidden");
    } else {
      theHangedMan.item(5 - failedGuesses).classList.remove("hidden"); // Resten av gubben skrivs ut.
    }

    failedGuesses++; //Plusa på antalet misslyckade försök.

    if (failedGuesses === 5) {
      //Om spelaren har misslyckats fem gånger förlorar spelaren spelet.

      showWinOrLoseBox.classList.remove("hide"); //Visar en låda med text, genom att ta bort hide klassen .
      youWin.innerHTML = `Du Förlorade! Rätta ordet var: "${wordToGuess}". <br>Vill du spela igen?<br> Klicka Här`; //Skriver ut en ett meddelande på skärmen.
      resetButton.classList.remove("hide"); //Visar en knapp med text som man kan klicka på för att starta om spelet, genom att ta bort hide klassen.
      resetButton.addEventListener("click", () => {
        location.reload(); // Laddar om en ny sida om man klickar på knappen.
      });
    }
  }
};
//En funktion för att starta om spelet, med liten fördröjning för att rita ut allting på skärmen.
//"State" visar om man vunnit eller förlorat.

/*-----funktionsanrop-------*/

/*Initierar spelet*/
initGame();
