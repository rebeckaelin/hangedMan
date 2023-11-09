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
    //Tar värdet från input.
    guess = document.querySelector("#guessInput").value;
    //Rensar input fältet efter att spelaren har klickat på knappen "gissa". 
    document.querySelector("#guessInput").value = "";   

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

//Funktion som lyssnar efter händelser.
//Kollar om spelaren har använt det gissade ordet förut.
//Om spelaren har det händer ingenting.
const actionListner = (action) => {
  if (guessedLetters.includes(action)) {
    return; 
  
  }
//Kontrollerar så att bara bokstäver har används till inputet, regex returnerar sant.
  if (regex.test(action)) {
    //Kollar om spelaren har använt det gissade ordet förut.
    //Om spelaren har det, händer ingenting.
    if (guessedLetters.includes(action)) {
      return;
    }

    if (wordToGuess.includes(action)) {
      guessedLetters = printUnderlines;
      //Loopar igenom ordet baserat på längd
      for (let i = 0; i < wordToGuess.length; i++) {
        //Kollar om gissade bokstaven finns i "index" på loopade ordet.
        if (wordToGuess[i] === action) {
           //Byter ut understrecket med en bokstav på samma index om bokstaven finns i det sökta ordet.
          printUnderlines[i] = action;
        }
      }
      //Om arraen som har det sökta ordet inte har några understreck i sig vinner spelaren spelet.
      if (!printUnderlines.includes("_")) {
        
        /*Om  spelaren har gissat rätt, stoppa klockan. */
        clearInterval(timer);                 
        showWinOrLoseBox.classList.remove("hide");
        //Skriver ut en ett meddelande på skärmen.
        youWin.innerHTML = `Du vann,  <br> Vill du spela igen? <br><br> <b>Klicka Här</b>`; 
        disableGuess();
        //Visar en knapp med text som man kan klicka på för att starta om spelet.
        resetButton.classList.remove("hide"); 
        resetButton.addEventListener("click", () => {
          // Laddar om en ny sida om man klickar på reset knappen.
          location.reload();
        });
      }
      //Klipper ihop alla använda bokstäver till en sträng.
      let underlines = guessedLetters.join(" ");
      //Placerar ett understreck där det inte finns bokstäver. 
      showUnderlines.textContent = underlines; 
    } else {
      //Skriver in alla fel bokstäver in i en array.
      wrongLetters.push(action); 
      //Skriv ut fel bokstäver in i HTML.
      showWrongLetters.textContent = wrongLetters;

      drawMan(action);
    }
  } else {
    //Om spelaren inte skriver in en bokstav visas en alert.
    alert("Enter a letter."); 
  }
};

//En funktion för att rita ut mannen, om spelar inte gissar rätt bokstav.
const drawMan = (guess) => {
  if (!wordToGuess.includes(guess)) {
    //Om ordet inte innehåller spelarens gissning, går man in i "if" uttrycket.
    if (failedGuesses == 0) {
      // På först misslyckandet skrivs "scaffolding" ut.
      theHangedMan.item(failedGuesses).classList.remove("hidden");
    } else {
      // Resten av gubben skrivs ut.
      theHangedMan.item(5 - failedGuesses).classList.remove("hidden"); 
    }

    failedGuesses++; //incrementerar på antalet misslyckade försök.

    //Om spelaren har misslyckats fem gånger förlorar spelaren spelet.
    if (failedGuesses === 5) {
      
      //Visar en låda med text, genom att ta bort hide klassen .
      showWinOrLoseBox.classList.remove("hide"); 
      //Skriver ut en ett meddelande på skärmen.
      youWin.innerHTML = `Du Förlorade! Rätta ordet var: "${wordToGuess}". <br>Vill du spela igen?<br> Klicka Här`;
      //Visar en knapp med text som man kan klicka på för att starta om spelet, genom att ta bort hide klassen.
      resetButton.classList.remove("hide"); 

      resetButton.addEventListener("click", () => {
         // Laddar om en ny sida om man klickar på knappen för att spela igen.
        location.reload();
      });
    }
  }
};
//funktion som gör att man inte kan gissa när man vunnit eller förlorat
function disableGuess() {
  guessButton.disabled = true;
}
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
  //output av tiden
  document.querySelector(".header__timer").textContent = time + "s ";

  // om timern når 0 så skriver spelet ut förlorar rutan eller om spelaren har gissat fel 5 gånger.
  if (time === 0 || failedGuesses === 5 ) {
    clearInterval(timer);
  
    //Visar en låda med text, genom att ta bort hide klassen.
    showWinOrLoseBox.classList.remove("hide"); 
    //Skriver ut en ett meddelande på skärmen.
    youWin.innerHTML = `Du Förlorade! Rätta ordet var: "${wordToGuess}". <br>Vill du spela igen?<br> Klicka Här`; 
     //Visar en knapp med text som man kan klicka på för att starta om spelet, genom att ta bort hide klassen.
    resetButton.classList.remove("hide");

    resetButton.addEventListener("click", () => {
      location.reload(); // Laddar om en ny sida om man klickar på knappen.
    });
  }
}, 1000);
