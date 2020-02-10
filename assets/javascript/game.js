var numWins = 0;
var winsElm;

var hangWordElm;

var gleft = 12;
var guessLeftElm;

var guessedLetters = [];
var guessedLettersElm;
var currentLetter;

var answer;
var coveredAnswer = [];

var lettersLeft;
var question;

var imageElm;
var audioElm;

//Format (Question,Answer,image)
var guessCollection = [
	{
		question: 'What show featured talking animals with an aardvark as the main character?',
		answer: 'Arthur',
		image: 'assets/images/Arthur.png',
		sound: 'assets/sounds/heyArnoldSoundBite.mp3'
	},
	{
		question: 'Pika Pika??',
		answer: 'Pokemon',
		image: 'assets/images/pokemon.png',
		sound: 'assets/sounds/heyArnoldSoundBite.mp3'
	},
	{
		question: 'Football headed character who lives in Brookyln; not Stewie from Family Guy',
		answer: 'Hey Arnold!',
		image: 'assets/images/hey arnold.png',
		sound: 'assets/sounds/heyArnoldSoundBite.mp3'
	},
	{
		question: 'Cowardly Dog',
		answer: 'Courage',
		image: 'assets/images/courage.jpg',
		sound: 'assets/sounds/courageSoundBite.mp3'
	},
	{
		question: 'Talking Babies that go on adventures',
		answer: 'Rugrats',
		image: 'assets/images/Rugrats.jpg',
		sound: 'assets/sounds/heyArnoldSoundBite.mp3'
	},
	{
		question: 'Its time to D-D-D-D DUEL!',
		answer: 'Yu-Gi-Oh',
		image: 'assets/images/yugioh.jpg',
		sound: 'assets/sounds/heyArnoldSoundBite.mp3'
	},
	{
		question: 'Woogie, Woogie, Woogie, Woogie.',
		answer: 'Rocket Power',
		image: 'assets/images/rocketpower.jpg',
		sound: 'assets/sounds/heyArnoldSoundBite.mp3'
	}
];

function getRandomQA() {
	return guessCollection[Math.floor(Math.random() * guessCollection.length)];
}

//Will check if character is an alphabetial letter
function isLetter(char) {
	return char.match(/[A-Z|a-z]/i);
}

// Creates a substitute string for the answer, repalcing letters with an underscore
function outPutWordSubstitute() {
	coveredAnswer = [];
	lettersLeft = answer.length;

	for (var i = 0; i < answer.length; i++) {
		if (!isLetter(answer[i])) {
			coveredAnswer.push(answer[i]);
			lettersLeft--;
		} else if (answer[i] === ' ') {
			coveredAnswer.push(' ');
			lettersLeft--;
		} else {
			coveredAnswer.push('_');
		}
	}
	hangWordElm.innerHTML = coveredAnswer.join('');
}

// Resets the game for a new question
function resetGame() {
	var qai = getRandomQA();
	question.innerHTML = qai['question'];
	answer = qai['answer'];
	imageElm.src = qai['image'];
	audioElm.src = qai['sound'];

	outPutWordSubstitute();
	console.log(qai['question']);
	console.log(answer);

	winsElm.innerHTML = 'Wins: ' + numWins;

	gleft = 12;
	guessLeftElm.innerHTML = 'Number of Guesses Remaing: ' + gleft;

	guessedLetters = [];
	guessedLettersElm.innerHTML = '';
}

//Updates the elements instead of resetting
function updateStats(newGuess) {
	winsElm.innerHTML = 'Wins: ' + numWins;
	guessLeftElm.innerHTML = 'Number of Guesses Remaing: ' + gleft;
	guessedLetters.push(newGuess);
	guessedLettersElm.innerHTML = guessedLetters.toString();
	hangWordElm.innerHTML = coveredAnswer.join('');
}

// Logic if guessed character is wrong
function wrongGuess(guess) {
	if (--gleft === 0) {
		console.log('You lost');
		resetGame();
	} else {
		updateStats(guess);
	}
}

function winnerWinner() {
	var duration = audioElm.duration;
	audioElm.play();
	numWins++;
	setTimeout(resetGame, duration * 1000);
}
//Logic if guessed character exists in Answer
function correctGuess(guess) {
	var i = -1;
	console.log('Correct Guess with letter: ' + guess);
	console.log('Current lettersleft ' + (lettersLeft - 1));

	while ((i = answer.toLowerCase().indexOf(guess, i + 1)) >= 0) {
		//Strings are immutable, change to character array
		lettersLeft--;
		coveredAnswer[i] = answer[i];
	}
	if (lettersLeft === 0) {
		updateStats(guess);
		winnerWinner();
	} else {
		updateStats(guess);
	}
}

// Will attach DOMs once the HTML fully loads
window.onload = function() {
	winsElm = document.getElementById('win-status');
	hangWordElm = document.getElementById('hang-word');
	guessLeftElm = document.getElementById('guesses-left');
	guessedLettersElm = document.getElementById('guessed-letters');
	question = document.getElementById('question');
	imageElm = document.getElementById('img-banner');
	audioElm = document.getElementById('showAudio');
	resetGame();
};

// Only characters from A-Z (lowercase modified) will be accepted
document.onkeydown = function(event) {
	if (event.keyCode >= 65 && event.keyCode <= 90) {
		var guess = event.key.toLowerCase();
		console.log('Guess:' + guess);
		if (!guessedLetters.includes(guess) && !answer.toLowerCase().includes(guess)) {
			wrongGuess(guess);
		} else if (!guessedLetters.includes(guess) && answer.toLowerCase().includes(guess)) {
			correctGuess(guess);
		}
	}
};
