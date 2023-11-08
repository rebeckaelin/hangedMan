
let button = document.getElementById("btns");
button.addEventListener("click", checkWord);

let used_words = document.getElementById("used-words-para");//input point for js to html
let the_word = document.getElementById("the-word");//input point for js to html

let picture_of_man = document.querySelectorAll(".hidden");//changing the stae of the man

let word;
let letter;
let used_Letters = [];
let foundWord = [];
let failCount = 0;
let maxTries = 5;
let init = false;
let the_Word = [];

let regex = /^[a-zA-ZäöåÄÖÅ]+$/; 
let state = "";

addEventListener("load", () => {
    getWord();
});

function getWord(){
    word = wordList[Math.floor(Math.random() * length_wordList - 1)].toLowerCase();
    console.log(word);
    return word;
}

function checkWord(){
//Getting input from form
    letter = document.getElementById("inputs").value;
    
    
   if(!init){      
        foundWord = new Array(word.length).fill("_")
        the_word.textContent = foundWord.join(" ");
        init = true;
    }
    
    //make sure the input is a letter
    if(regex.test(letter) && (letter.length == 1)){
        //Kollar om bokstaven finns i ordet om inte så visas en del av gubben 
        
        if(!(word.includes(letter))){
                //Använda bosktäver in i arryen.
            if( failCount == 0){
                //För att få scafolding  att visas först.
                picture_of_man.item( failCount ).classList.remove("hidden");
            } else {
                picture_of_man.item( (5-failCount) ).classList.remove("hidden");
            }
            failCount++;
            if(failCount >= maxTries){
                state = "lost";
                window.setTimeout(function(){//delay so that the page can render
                    reset(state)
            }, 200);
            }
        }
        
        if(word.includes(letter)){
            //loop  through and find the letter and index
            for(let i = 0; i < word.length; i++){
                if(word[i] == letter){
                    foundWord[i] = letter;
                    console.log("Found letters one", foundWord);
                    
                }
                if( word[i] == "_" ) {
                    foundWord[i] = "_";
                }
            
            //Checking if the player has won   
            let tostring = foundWord.join(""); 
            console.log( tostring );
            if( tostring == word ){
                window.setTimeout(function(){//delay so that the page can render
                        state = "won";
                        reset(state);
                    }, 200);
                
            } 
            }
            the_word.textContent = foundWord.join(" ");
            
        } else {
            //If the letter has not been used before push it into used letter and update page
            if( !(used_Letters.includes(letter)) ){
                used_Letters.push(letter)
                used_words.textContent = used_Letters;
                console.log("Used letters", used_Letters);
            } else {
                alert("You have already used that letter pick another letter");
            }
        }

    }else {
        alert("Type in a letter");
    }
}

function reset(state){
    if( confirm(`You ${state}, the word was: ${word} play again?`) ){
    location.reload();
}
}



