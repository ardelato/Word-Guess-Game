var numWins = 0;
var winsElm;

var hangWordElm;

var gleft = 12;
var guessLeftElm;

var guessedLettersElm = [];
var currentLetter;

var correctWord;

var answer;
var question;
//Format (Question,Answer)
var guessCollection = {
	'What show featured talking animals with an aardvark as the main character?': 'Arthur',
	'Pika Pika??': 'Pokemon',
	'Football headed character who lives in Brookyln; not Stewie from Family Guy': 'Hey Arnold!',
	'Cowardly Dog': 'Courage',
	'Talking Babies that go on adventures': 'Rugrats',
	'Its time to D-D-D-D DUEL!': 'Yu-Gi-Oh',
	'A Teenage Witch': 'Sabrina'
};
// Make it easier to randomly pick a q and a
var qaSet = Object.entries(guessCollection);

function getRandomQA() {
	return qaSet[Math.floor(Math.random() * qaSet.length)];
}

function isLetter(char) {
	return char.match(/[A-Z|a-z]/i);
}

function outPutWordSubstitute() {
	var coveredAnswer = '';
	for (var i = 0; i < answer.length; i++) {
		if (!isLetter(answer[i])) {
			coveredAnswer += answer[i];
		} else if (answer[i] === ' ') {
			coveredAnswer += ' ';
		} else {
			coveredAnswer += '_';
		}
	}
	hangWordElm.innerHTML = coveredAnswer;
}
function resetGame() {
	var qa = getRandomQA();
	console.log(qa[0]);
	question.innerHTML = qa[0];
	answer = qa[1];
	console.log(answer);
	outPutWordSubstitute();
}

// Will attach DOMs once the HTML fully loads
window.onload = function() {
	// winsElm = document.getElementById('win-status')
	hangWordElm = document.getElementById('hang-word');
	// guessLeftElm = document.getElementById('guesses-left');
	// guessedLettersElm = document.getElementById('guessed-letters');
	question = document.getElementById('question');
	resetGame();
};

// Only characters from A-Z (lowercase modified) will be accepted
document.onkeydown = function(event) {
	if (event.keyCode >= 65 && event.keyCode <= 90) {
		var guess = event.key.toLowerCase();
		console.log('Guess:' + guess);
	}
};
