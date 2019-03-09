//VARIABLES================================================================================================

var storedSelections = [],
    wordBank = ['pikachu', 'mew', 'charmander', 'squirtle', 'bulbasaur', 'gengar', 'mewtwo', 'machamp', 'alakazam', 'ditto'],
    remainingGuesses,
    currentWord,
    displayedWord,
    totalWins = 0,
    keySelection;

$(document).ready(function() {
    startGame();
});

//FUNCTIONS================================================================================================

//Start of game function. Will reset the guesses and word.
function startGame() {
    remainingGuesses = 12;
    storedSelections = [];
    currentWord = wordBank[Math.floor(Math.random() * wordBank.length)];
    //console.log(currentWord);
    displayedWord = '_'.repeat(currentWord.length);
    $('.currentWordGuess').text(displayedWord.split('').join(' '));
    $('.winCount').text(totalWins);
    $('.playerGuesses').text("Letters Guessed: ")
    $('.totalGuessesLeft').text(remainingGuesses);
    $('.pokemonImage').html('<img src="assets/images/pokeball.png" width=200px />');
}

//End of game function. Will only appear when game is over by either correct guess or running out of guesses. See below for if statement
function endGame() {
    $('.playerGuesses').text("Click here to play again");
    $('.playerGuesses').on("click", function() {
        startGame();
        $('.playerGuesses').off("click");
    }) 
    $('.pokemonImage').html('<img src="assets/images/' + currentWord + '.png" width=200px />');
}

//Function that is used for onkeyup events
document.onkeyup = function(event) {
    keySelection = event.key.toLowerCase();
    if (storedSelections.indexOf(keySelection) === -1) {
        storedSelections.push(keySelection);
        $('.playerGuesses').text("Letters Guessed: " + storedSelections.join(' '));
        if (currentWord.indexOf(keySelection) !== -1) {
            for (var i = 0; i < currentWord.length; i++) {
                if (currentWord.charAt(i) === keySelection) {
                    displayedWord = displayedWord.substr(0, i) + keySelection + displayedWord.substr(i + 1);
                }
            }   
        }
        else {
            remainingGuesses--;
            $('.totalGuessesLeft').text(remainingGuesses)
        }
    }
    $('.currentWordGuess').text(displayedWord.split('').join(' '));
    if (displayedWord === currentWord) {
        $('.currentWordGuess').text('you win! the word was: ' + currentWord);
        totalWins++;
        endGame();
    }
    else if (remainingGuesses === 0) {
        $('.currentWordGuess').text('too bad... the word was: ' + currentWord);
        endGame();
    }
};