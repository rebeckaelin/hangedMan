let button = document.getElementById("btns");
button.addEventListener("click", guess);

let arr_of_words = ["test", "testfg", "dh"];
let randNum = Math.ceil(Math.random() * 2);
let arr_of_guessed = [];

let word_to_guess = arr_of_words[randNum];
let arr_correct_word = [];
let indexNum = 0;
let maxTries = 10;
let currentTry = 0;





function guess() {
    currentTry++;

    let forms = document.getElementById("inputs").value;
    console.log(forms);
    const word = new String(word_to_guess);
    console.log(word);

    if(typeof forms == "string" && forms.length == 1){
        for(let i = 0; i < word.length; i++){
            if(word[i] == forms){
                // ger true om bokstaven finns och index till bokstaven i ordet,
                indexNum = i;
                console.log(true, indexNum);
                arr_correct_word.splice(i, 0, forms);
                console.log(arr_correct_word);
            }
        }
            console.log(currentTry);
    }else {
        console.log(false);
    }
}