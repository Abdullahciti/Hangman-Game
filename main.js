// Letters
const letters = "abcdefghijklmnopqrstuvwxyz"
/*
const enLetters = "abcdefghijklmnopqrstuvwxyz"
const uaLetters = "аб"
const deLetters = "abcdefghijklmnopqrstuvwxyz"
const arLetters = "ابتثحج"
*/
// Get Array from Letters
let lettersArray = Array.from(letters)

//  Select Letters Container
let lettersContainer = document.querySelector(".letters");

// Generate Letters
lettersArray.forEach(letter => {
    
    //Create Span
    let span = document.createElement("span");

    // Create Letter Text Node
    let theLetter = document.createTextNode(letter);

    // Appent The letter to The Span
    span.appendChild(theLetter);

    // Add Class on Span 
    span.className = 'letter-box';

    // Append Span to The Letter Container
    lettersContainer.appendChild(span);
})

// Object of Words + Categories

const words = {
    programming: ["php", "javascript", "go", "scala", "fortran", "r", "mysql", "python"],
    movies: ["Prestige", "Inception", "Parasite", "Interstellar", "Whiplash", "Memento", "Coco", "Up"],
    people: ["Albert Einstein", "Hitchcock", "Alexander", "Cleopatra", "Mahatma Ghandi"],
    countries: ["Syria", "Palestine", "Yemen", "Egypt", "Bahrain", "Qatar"]
}

// Get Random Property

let allKeys = Object.keys(words);

// Random Number Depend On Keys Length

let randomPropNumber = Math.floor(Math.random() * allKeys.length);

// Category
let randomPropName = allKeys[randomPropNumber];

// Category Words
let randomPropValue = words[randomPropName];

// Random Numebr Depends of Words
let randomValueNumber = Math.floor(Math.random() * randomPropValue.length);

// The Choosen Word
let randomValueValue = randomPropValue[randomValueNumber];

// Set Category Info
document.querySelector(".game-info .category span").innerHTML = randomPropName //+ ' ' + randomValueValue

// Select Letters Guess Element
let lettersGeussContainer = document.querySelector(".letters-guess"); 

// Convert Chosen Word to An Array
let lettersAndSpace = Array.from(randomValueValue);

// Create Span Depends on the Chosen Word
lettersAndSpace.forEach(letter =>{

    // Create Empty Span
    let emptySpan = document.createElement("span");

    // if the letter = " "
    if(letter === " "){
        // Add Class To the Span
        emptySpan.className = "with-space";
    }

    // Appen this Span to the Letters Guess Container
    lettersGeussContainer.appendChild(emptySpan);
})

//Select Guess Spans
let guessSpans = document.querySelectorAll(".letters-guess span");

// Set Wrong Attempts
let wrongAttempts = 0;

// Selet the Draw Element
let theDraw = document.querySelector(".hangman-draw")

// Handle Click on Letters 
document.addEventListener("click", (e) => {
    if (e.target.className === 'letter-box') {
        // Set the Status right or Wrond
        let theStatus = false;
        e.target.classList.add("clicked");

        // get Clicked Letter
        let theClickedLetter = e.target.innerHTML.toLowerCase()

        // The Chosen Word 
        let theChosenWord = Array.from(randomValueValue.toLowerCase());

        // Loop to Compare between letters and chosen word
        theChosenWord.forEach((wordLetter, wordIndex) => {

            // if the Clicked Letter equals to my Chosen Word
            if (theClickedLetter === wordLetter) {
                
                // Set the Status to correct
                theStatus = true;

                // Loop on all geuss Spans
                guessSpans.forEach((span, spanIndex) => {

                    if(wordIndex === spanIndex){

                        span.innerHTML = wordLetter;
                    
                    }
                });

            }

        }) 
        // out of the Loop

        // if the Wrong letter has be chosen
        if (theStatus !== true) {

            // increase wrong attempts
            wrongAttempts++

            // Add Class Wrong on the Draw Element
            theDraw.classList.add(`wrong-${wrongAttempts}`);

            // Play Fail Audio
            // document.getElementById("incorrect").play()

            if( wrongAttempts === 8){
                lettersContainer.classList.add("finished");
                endGame()
            }
        }
        else{
            // Play correct Audio
            // document.getElementById("correct").play()
        }


    }
});

// End Game Function
function endGame() {
    // Add Pop-Up div
    let div = document.createElement("div");

    // create TextNode
    let divText = document.createTextNode(`Game Over, The Word is ${randomValueValue}`);

    // Append Text To Div
    div.appendChild(divText);

    // Add Class on Div 
    div.className = `popup`;

    // Append To The Body
    document.body.appendChild(div);
};