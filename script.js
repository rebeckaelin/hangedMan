let usedLetters = document.querySelector('.used-letters')


let guessedLetter = []

let levelOneWords = ["bil", "hund", "cykel", "sol", "blomma", "bok", "dator", "äpple", "katt", "regn", "glas", "stol", "sten", "måne", "ballong", "elefant", "flaska", "stjärna", "kaffe", "fågel", "träd", "fjäril", "buss", "gräs", "orm", "hus", "spegel", "flod", "mus", "nyckel", "fjäll", "korv", "park", "penna", "lampa", "toalett", "sko", "tåg", "fjäder", "musik", "vatten", "regnbåge", "kamera"]

// funktion för att slumpa fram ett random ord från listan ovan
function getRandomWord() {
    return levelOneWords[Math.floor(Math.random()*levelOneWords.length)];
}

let pickedWord = getRandomWord();
console.log(pickedWord);
console.log(pickedWord.split('').fill('_',0).join(' '));

// console.log(pickedWord);
let userGuess = document.querySelector('#inputs').value;
console.log(userGuess);
