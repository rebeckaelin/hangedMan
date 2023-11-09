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
  "APA",
  // "motivation",
  // "length",
  // "brick",
  // "tenant",
  // "day",
  // "gold",
  // "technique",
  // "sacred",
  // "sunshine",
  // "aquarium",
  // "therapist",
  // "jail",
  // "technology",
  // "javascript",
  // "master",
  // "surf",
  // "electronics",
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

    actionListner(guess);
  });

  //Kollar efter "globala" knapptryck i dokumentet när textrutan ej är fokuserad.
  document.addEventListener("keydown", (e) => {
    //Hindrar sidan att upptäcka knapptryck i något annat än textrutan när den är focuserad.
    if (document.activeElement === document.querySelector(".inputBox")) {
      return;
    } else {
      actionListner(e.key);
    }
  });
};

//Funktion som lyssnar efter händelser
const actionListner = (action) => {
  if (guessedLetters.includes(action)) {
    return; //Kollar om spelaren har använt det gissade ordet förut.
    //Om spelaren har det händer ingenting.
  }

  if (regex.test(action)) {
    //Kontrollerar så att bara bokstäver har används till inputet, regex returnerar sant.
    if (guessedLetters.includes(action)) {
      return; //Kollar om spelaren har använt det gissade ordet förut.
      //Om spelaren har det händer ingenting.
    }

    if (wordToGuess.includes(action)) {
      guessedLetters = printUnderlines;
      for (let i = 0; i < wordToGuess.length; i++) {
        //Loopar igenom ordet baserat på längd
        if (wordToGuess[i] === action) {
          //Kollar om gissade bokstaven finns i "index" på loopade ordet.
          printUnderlines[i] = action; //Byter ut understrecket med en bokstav på samma index om bokstaven finns i det sökta ordet.
        }
      }
      //Om arraen som har det sökta ordet inte har några understreck i sig vinner spelaren spelet.
      if (!printUnderlines.includes("_")) {
        showWinOrLoseBox.classList.remove("hide");
        youWin.innerHTML = `Du vann,  <br> Vill du spela igen? <br><br> <b>Klicka Här</b>`; //Skriver ut en ett meddelande på skärmen.
        disableGuess();
        resetButton.classList.remove("hide"); //Visar en knapp med text som man kan klicka på för att starta om spelet.
        resetButton.addEventListener("click", () => {
          // Laddar om en ny sida om man klickar på knappen.
          location.reload();
        });
      }
      let underlines = guessedLetters.join(" "); //Klipper ihop alla använda bokstäver till en sträng.
      showUnderlines.textContent = underlines; //Placerar ett understreck där det inte finns bokstäver
    } else {
      wrongLetters.push(action); //Skriver in alla fel bokstäver in i en array.
      showWrongLetters.textContent = wrongLetters; //Skriv ut fel bokstäver in i HTML.

      drawMan(action);
    }
  } else {
    alert("Enter a letter."); //Om spelaren inte skriver in en bokstav visas en alert.
  }
};

//En funktion för att rita ut mannen om spelar inte gissar rätt bokstav.
const drawMan = (guess) => {
  if (!wordToGuess.includes(guess)) {
    //Om ordet inte innehåller spelarens gissning, går man in i "if" uttrycket.
    if (failedGuesses == 0) {
      // På först misslyckandet skrivs "scaffolding" ut.
      theHangedMan.item(failedGuesses).classList.remove("hidden");
    } else {
      theHangedMan.item(5 - failedGuesses).classList.remove("hidden"); // Resten av gubben skrivs ut.
    }

    failedGuesses++; //incrementerar på antalet misslyckade försök.

    //Om spelaren har misslyckats fem gånger förlorar spelaren spelet.
    if (failedGuesses === 5) {
      showWinOrLoseBox.classList.remove("hide"); //Visar en låda med text, genom att ta bort hide klassen .
      youWin.innerHTML = `Du Förlorade! <br>Rätt ord var: "${wordToGuess}". <br><br>Vill du spela igen?<br> <b>Klicka Här</b>`; //Skriver ut en ett meddelande på skärmen.
      resetButton.classList.remove("hide"); //Visar en knapp med text som man kan klicka på för att starta om spelet, genom att ta bort hide klassen.
      disableGuess();
      resetButton.addEventListener("click", () => {
        location.reload(); // Laddar om en ny sida om man klickar på knappen.
      });
    }
  }
};

function disableGuess() {
  guessButton.disabled = true;
}
console.log(wrongLetters);
/*-----funktionsanrop-------*/

/*Initierar spelet*/
initGame();

//TIMER TIMER TIMER TIMER TIMER TIMER
//Ställ in tidsbegränsing här
let time = 100;

// Countdown timer som räknar ner tiden du har kvar på innan du förlorar
//setInterval kallar kontinuerligt på en funktion efter angiven tid. Vilket är efter varje sekund i detta fall.
let timer = setInterval(() => {
  time--;
  console.log(time);
  //output av tiden
  document.querySelector(".header__timer").textContent = time + "s ";

  // om timern når 0 så skriver spelet ut förlorar rutan.
  if (time === 0) {
    clearInterval(timer);
    showWinOrLoseBox.classList.remove("hide"); //Visar en låda med text, genom att ta bort hide klassen .
    youWin.innerHTML = `Du Förlorade! <br>Rätt ord var: "${wordToGuess}". <br><br>Vill du spela igen?<br> <b>Klicka Här</b>`; //Skriver ut en ett meddelande på skärmen.
    resetButton.classList.remove("hide"); //Visar en knapp med text som man kan klicka på för att starta om spelet, genom att ta bort hide klassen.

    resetButton.addEventListener("click", () => {
      location.reload(); // Laddar om en ny sida om man klickar på knappen.
    });
  }
}, 1000);
