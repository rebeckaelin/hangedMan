let showUsedLetters = document.querySelector('.show-used-letters')
let showUnderlines = document.querySelector('.show-underlines')
let guessButton = document.querySelector('#btn')
let showScaffold = document.getElementById('scaffold')
let showHead = document.getElementById('head')
let showBody = document.getElementById('body')
let showArms = document.getElementById('arms')
let showLegs = document.getElementById('legs')
let youLose = document.querySelector('.you-lose')

let guessedLetter = [];
let guesses = 0;

// variabel för spelarens gissning
let userGuess;

let levelOneWords = ["bil", "hund", "cykel", "sol", "blomma", "bok", "dator", "äpple", "katt", "regn", "glas", "stol", "sten", "måne", "ballong", "elefant", "flaska", "stjärna", "kaffe", "fågel", "träd", "fjäril", "buss", "gräs", "orm", "hus", "spegel", "flod", "mus", "nyckel", "fjäll", "korv", "park", "penna", "lampa", "toalett", "sko", "tåg", "fjäder", "musik", "vatten", "regnbåge", "kamera"]

// funktion för att slumpa fram ett random ord från listan ovan
function getRandomWord() {
    return levelOneWords[Math.floor(Math.random()*levelOneWords.length)];
}
//sparar funktionen som slumpar ett ord i en variabel
let pickedWord = getRandomWord();
console.log(pickedWord);
//variabel där vi sparar det slumpade ordet och gör det till _
printUnderlines = pickedWord.split('').fill('_',0).join(' ')
//Skriver ut rätt antal _ baserat på ordet som slumpats
showUnderlines.innerHTML = printUnderlines 

//funktion för att få in spelarens gissningar c
guessButton.addEventListener('click', () => {
    

    // console.log(userGuess);
    
    if (pickedWord.includes(userGuess)) {
        let guessedLetter = printUnderlines.split(' ');
        
        for (let i = 0; i < pickedWord.length; i++) {
            if (pickedWord[i] === userGuess) {
                guessedLetter[i] = userGuess;
            }
        }
        printUnderlines = guessedLetter.join(' ')
        showUnderlines.innerHTML = printUnderlines;
    } else {
        guessedLetter.push(userGuess);
        showUsedLetters.innerText = guessedLetter;
        // console.log(guessedLetter);
        guesses++;
        // console.log(guesses);

        if (guesses === 1){
            showScaffold.style.visibility = 'visible';
        }
        if (guesses === 2){
            showHead.style.visibility = 'visible'
        }
        if (guesses === 3) {
            showBody.style.visibility = 'visible';
        }
        if (guesses === 4) {
            showArms.style.visibility = 'visible';
        }
        if (guesses === 5){
            showLegs.style.visibility = 'visible';
            youLose.innerHTML = `Du förlorade! Rätt ord var ${pickedWord}`
        }
    }
})






























// {
//     guessedLetter.push(userGuess);
//     showUsedLetters.innerText = guessedLetter;
//     // console.log(guessedLetter);
    
//     guesses++;
//     if (guesses === 1){
//         guesses++;
//         console.log(guesses);
//     showScaffold.style.visibility = 'visible';
//     }
//     if (guesses === 2) {
        
//     }
//     if (guesses === 3) {
//         showBody.style.visibility = 'visible';
//     }
//     if (guesses === 4){
//         showArms.style.visibility = 'visible';
//     }
//     else (guesses === 5)
//     showLegs.style.visibility = 'visible';
//     console.log('you lose');        
    
// } 