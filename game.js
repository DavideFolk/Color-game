let buttonColours = ['red', 'blue', 'green', 'yellow'];
let gamePattern = [];
let userClickedPattern = [];
let started = false;
let level = 0;

function nextSequence() {
	userClickedPattern = [];
	level++;
	$('#level-title').text('Level ' + level);
	let randomNumber = Math.floor(Math.random() * 4);
	let randomChosenColour = buttonColours[randomNumber];
	gamePattern.push(randomChosenColour);

	$('#' + randomChosenColour)
		.fadeOut(100)
		.fadeIn(100);

	playSound(randomChosenColour);
}

function playSound(name) {
	let audio = new Audio('sounds/' + name + '.mp3');
	audio.play();
}

function animatePress(currentColour) {
	$('#' + currentColour).addClass('pressed');
	setTimeout(() => {
		$('#' + currentColour).removeClass('pressed');
	}, 100);
}

function checkAnswer(currentLevel) {
	if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
		console.log('success');
		if (userClickedPattern.length === gamePattern.length) {
			setTimeout(function () {
				nextSequence();
			}, 1000);
		}
	} else {
		let audio = new Audio('sounds/wrong.mp3');
		audio.play();
		console.log('wrong');
		$('body').addClass('game-over');
		setTimeout(function () {
			$('body').removeClass('game-over');
		}, 200);
		$('#level-title').text('Game Over, Press Any Key to Restart');
		startOver();
	}
}

function startOver() {
	level = 0;
	gamePattern = [];
	started = false;
}

$('.btn').click(function (e) {
	if (started) {
		let userChosenColour = this.id;
		userClickedPattern.push(userChosenColour);
		playSound(userChosenColour);
		animatePress(userChosenColour);
		checkAnswer(userClickedPattern.length - 1);
	}
});

$(document).keydown(function (e) {
	if (!started) {
		$('#level-title').text('Level ' + level);
		nextSequence();
		started = true;
	}
});
