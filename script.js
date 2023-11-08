
let button = document.getElementById("btns");
button.addEventListener("click", checkWord);



let word;
let state = "";

addEventListener("load", () => {
    getWord();
});

function getWord(){
    word = wordList[Math.floor(Math.random() * length_wordList - 1)].toLowerCase();
    console.log(word);
    return word;
}

function reset(state){
    if( confirm(`You ${state}, the word was: ${word} play again?`) ){
    location.reload();
}
}



