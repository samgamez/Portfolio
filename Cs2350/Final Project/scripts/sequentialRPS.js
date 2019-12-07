$(function () {
    // Load instructions.
    $('#instructionsParagraph').text(
    'How many sequences (and how fast) can you maintain your concentration in this RPS version of the classic game of Simon?' +
    'Play RPS against a growing sequence of computer throws with a timer. At first, the computer shows you one throw, ' +
    'say rock. Then you choose paper to win that sequence. Then for the 2nd sequence, the computer ' +
    'will show you the same rock again, but this time followed by, say, paper. Now you must choose paper and then scissors to ' +
    'win the computer’s sequence. The sequence will continue to grow.' +
    'To win, correctly play through ten rounds.' 
    );

    $('#optionsModal').modal({ backdrop: 'static' });

    // Variables
    var minutes = 0;
    var seconds = 0;
    var stopwatch;
    var sequencer;
    var computerSequence = [];
    var computerSequenceIdx = 0;
    var playerTurnIdx = 0;
    var roundCount = 1;
    var totalRounds = 10;
    var bestTime = 0; // In seconds.
    var gameIsOver = false;
    var playersTurn = false;

    // Set Timer display values.
    $('#timerMinutes').text((minutes < 10 ? '0' : '') + minutes);
    $('#timerSeconds').text((seconds < 10 ? '0' : '') + seconds);

    computerSequence.push(Math.floor(Math.random() * 3));
    $('#roundCount').text(roundCount);
    $('#totalRounds').text(totalRounds);

    // Initially hide the image.
    $('#imgDiv img').hide();

    $('#playAgainBtn').hide();

    $('#optionsBtn').click(function () {
        gameIsPaused = true;
    })
    // Modal events. When the options modal is hidden, the timer starts to count down.
    $('#optionsModal').on('hidden.bs.modal', function (event) {
        if (!gameIsOver) {
            stopwatch = setInterval(timerTick, 1000);

            if (!playersTurn) {
                sequencer = setInterval(displayNexImage, 600);
            }
        }
    });

    // When the modal is shown, the timer interval is cleared.
    $('#optionsModal').on('show.bs.modal', function (event) {
        if (stopwatch) {
            clearInterval(stopwatch);
        }
        if (sequencer) {
            clearInterval(sequencer);
        }
    });

    // Click functions for the play buttons.
    $('#rockBtn').click(function (event) {
        if (computerSequence[playerTurnIdx] === 2) {
            if (playerTurnIdx === computerSequence.length - 1) {
                goToNextRound();
            }
            else {
                $('#gameStatus').fadeOut('fast', function () {
                    $('#gameStatus').text('Correct!')
                    $(this).fadeIn('fast');
                    playerTurnIdx++;
                });
            }
        }
        else {
            setGameOver();
        }
    });

    $('#paperBtn').click(function (event) {
        if (computerSequence[playerTurnIdx] === 0) {
            if (playerTurnIdx === computerSequence.length - 1) {
                goToNextRound();
            }
            else {
                $('#gameStatus').fadeOut('fast', function () {
                    $('#gameStatus').text('Correct!')
                    $(this).fadeIn('fast');
                    playerTurnIdx++;
                });
            }
        }
        else {
            setGameOver();
        }
    });

    $('#scissorsBtn').click(function (event) {
        if (computerSequence[playerTurnIdx] === 1) {
            if (playerTurnIdx === computerSequence.length - 1) {
                goToNextRound();
            }
            else {
                $('#gameStatus').fadeOut('fast', function () {
                    $('#gameStatus').text('Correct!')
                    $(this).fadeIn('fast');
                    playerTurnIdx++;
                });
            }
        }
        else {
            setGameOver();
        }
    });

    $('#playAgainBtn').click(function () {
        // Resets game values to play again.
        minutes = 0;
        seconds = 0;
        stopwatch;
        sequencer;
        computerSequence = [];
        computerSequenceIdx = 0;
        playerTurnIdx = 0;
        roundCount = 1;
        gameIsOver = false;
        playersTurn = false;

        $('#timerMinutes').text((minutes < 10 ? '0' : '') + minutes);
        $('#timerSeconds').text((seconds < 10 ? '0' : '') + seconds);
    
        computerSequence.push(Math.floor(Math.random() * 3));
        $('#roundCount').text(roundCount);
        stopWatch = setInterval(timerTick, 1000);
        sequencer = setInterval(displayNexImage, 600);

        $('#endGameStatus').fadeOut('fast');
    })

    /**
     * Get's the throw's name represented by a number.
     * @param {number} throwNumber the number representing a throw.
     */
    function getThrowName(throwNumber) {
        switch (throwNumber) {
            case 0:
                return 'rock';
            case 1:
                return 'paper';
            case 2:
                return 'scissors';
            default:
                throw 'Invalid parameter.';
        }
    }

    /**
     * Gets the next image represented by the next number in computerSequence and displays it to the page.
     */
    function displayNexImage() {
        if (computerSequenceIdx < computerSequence.length) {
            var nextImgNum = computerSequence[computerSequenceIdx];
            var nextImgName = getThrowName(nextImgNum);
            $('#imgDiv img').fadeOut('fast', function () {
                $(this).attr('src', 'resources/winning-' + nextImgName + '.jpg');
                $(this).attr('alt', nextImgName);
                $(this).fadeIn('fast');
            });
            computerSequenceIdx++;
        }
        else {
            computerSequenceIdx = 0;
            $('#imgDiv img').fadeOut('fast');
            clearInterval(sequencer);
            playersTurn = true;
        }
    }

    /**
     * After reaching the end of a sequence, ends the round and goes to the next round or it will end the game.
     */
    function goToNextRound() {
        $('#gameStatus').fadeOut('fast', function () {
            $(this).text('Correct! Starting next round...');
            $(this).fadeIn('fast');
        });
        if (roundCount < totalRounds) {
            playersTurn = false;
            playerTurnIdx = 0;
            roundCount++;

            $('#roundCount').text(roundCount);
            computerSequence.push(Math.floor(Math.random() * 3));
            computerSequenceIdx = 0;

            sequencer = setInterval(displayNexImage, 600);
        }
        else {
            clearInterval(stopwatch);
            var finalTime = $('#time').text().trim();

            var endGameMessage = 'You completed all ten rounds in ' + finalTime + '. ';
            var currentTimeTotalSeconds = (minutes * 60) + seconds;
            if (bestTime > currentTimeTotalSeconds || !bestTime) {
                bestTime = currentTimeTotalSeconds;
                endGameMessage += 'You go the new best time!';
                $('#bestTime').text(finalTime);
            }
            $('#endGameStatus').text(endGameMessage);
            $('#playAgainBtn').fadeIn('fast');
            gameIsOver = true;

        }
    }

    /**
     * If the player guesses wrong then the game is over. 
     */
    function setGameOver() {
        clearInterval(stopwatch);
        $('#endGameStatus').text('The computer\'s guess was ' + getThrowName(computerSequence[playerTurnIdx]) + '. Game over!');
        $('#playAgainBtn').fadeIn('fast');
        gameIsOver = true;
    }

    /**
     * The timer function evaluates then displays the values for the countdown timer.
     */
    function timerTick() {
        // Figure the values.
        if (seconds < 59) {
            seconds++;
        }
        else if (seconds === 59) {
            minutes++;
            seconds = 0;
        }

        // Display in text.
        if (minutes <= 9) {
            $('#timerMinutes').text('0' + minutes);
        }
        else {
            $('#timerMinutes').text(minutes);
        }

        if (seconds <= 9) {
            $('#timerSeconds').text('0' + seconds);
        }
        else {
            $('#timerSeconds').text(seconds);
        }
    }
});