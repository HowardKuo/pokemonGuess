var storedSelections = [],
    remainingGuesses,
    currentWord,
    totalWins,
    keySelection;

document.onkeyup = function(event) {
    keySelection = event.key.toLowerCase()
    if (storedSelections.indexOf(keySelection) === -1) {
        storedSelections.push(keySelection);
        remainingGuesses--;
    }

    console.log(keySelection);
};