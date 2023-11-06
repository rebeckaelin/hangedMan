let usedLetters = document.querySelector('.used-letters')
let showWord = document.querySelector('.word')
let guessButton = document.querySelector('#btn')

// let guessedLetter = [];
let userGuess;

let levelOneWords = ["bil", "hund", "cykel", "sol", "blomma", "bok", "dator", "äpple", "katt", "regn", "glas", "stol", "sten", "måne", "ballong", "elefant", "flaska", "stjärna", "kaffe", "fågel", "träd", "fjäril", "buss", "gräs", "orm", "hus", "spegel", "flod", "mus", "nyckel", "fjäll", "korv", "park", "penna", "lampa", "toalett", "sko", "tåg", "fjäder", "musik", "vatten", "regnbåge", "kamera"]

// funktion för att slumpa fram ett random ord från listan ovan
function getRandomWord() {
    return levelOneWords[Math.floor(Math.random()*levelOneWords.length)];
}

let pickedWord = getRandomWord();
console.log(pickedWord);
typeOutWord = pickedWord.split('').fill('_',0).join(' ')

showWord.innerHTML = typeOutWord //Skriver ut rätt antal _ baserat på ordet som slumpats

// hämtar in det användaren skriver i inputfältet. sparas i en variabel
guessButton.addEventListener('click', () => {
    userGuess = document.querySelector('#input').value;
    document.querySelector('#input').value = '';
    // console.log(userGuess);
    

    if (pickedWord.includes(userGuess)) {
        let guessedLetter = typeOutWord.split(' ');
        

        for (let i = 0; i < pickedWord.length; i++) {
            if (pickedWord[i] === userGuess) {
                guessedLetter[i] = userGuess;
            }
        }
        typeOutWord = guessedLetter.join(' ')
        showWord.innerHTML = typeOutWord;
    } else{
        guessedLetter.push(userGuess);
        usedLetters.innerHTML = guessedLetter
        console.log(guessedLetter);
    }
})

