var numWins = 0;
var winsElm;

var hangWordElm;

var gleft = 12;
var guessLeftElm;

var guessedLettersElm = [];
var currentLetter;

var correctWord;

//Format (Question,Answer)
var guessCollection = {
    'What show featured talking animals with an aardvark as the main character?':'Arthur',
    'Pika Pika??': 'Pokemon',
    'Football headed character who lives in Brookyln; not Stewie from Family Guy': 'Hey Arnold',
    'Cowardly Dog': 'Courage',
    'Talking Babies that go on adventures': 'Rugrats',
    'Its time to D-D-D-D DUEL!': 'Yu-Gi-Oh',
    'A Teenage Witch': 'Sabrina'
}

function getRandomQuestion(){
    
}
// Will attach DOMs once the HTML fully loads
window.onload = function() {
    winsElm = document.getElementById('win-status')
    hangWordElm = document.getElementById('hang-word');
    guessLeftElm = document.getElementById('guesses-left');
    guessedLettersElm = document.getElementById('guessed-letters');

};

