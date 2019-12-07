$(function () {

    // Load instructions.
    $('#instructionsParagraph').text(
        'RPS Credit Wager has you wagering highly valuable credits deciding if you can defeat the computer over nine rounds. ' +
        'However, you have some inside information! You know that the computer will choose each throw (rock, paper, and scissors) ' +
        'exactly three times each, you just don’t know exactly when. Bet your credits based on your faith in knowing the computer’s ' +
        'next throw. The catch is, if you tie against the computer on a throw, you must at least DOUBLE your next bet! Bet carefully and ' +
        'amass the largest bank possible. ');

    $('#optionsModal').modal({ backdrop: 'static' });

    // Variables
    var totalRounds = 9;
    var currentRound = 1;
    var currentBet = 0;
    var creditCount = 100;
    var highScore = 0;
    var computerThrows = [0, 0, 0, 1, 1, 1, 2, 2, 2]; // The computer only has access to three choices of each throw.
    var tieBetValue = 0;

    $('#totalRounds').text(totalRounds);
    $('#currentRound').text(currentRound);
    $('#currentBet').text(currentBet);
    $('#creditCount').text(creditCount);
    $('#highScore').text(highScore);
    $('#gameStatus').text('Enter a bet and choose a throw to start the game!');
    $('#endGameStatus').hide();
    $('#playAgainBtn').hide();

    // Focus the bet input upon closing the pause modal.
    $('#optionsModal').on('hidden.bs.modal', function (event) {
        $('#creditBet').focus();
    });

    $('#rockBtn').click(function (event) {
        if (checkBet()) {
            currentBet = Number($('#creditBet').val());
            var yourThrow = 0;
            var computerThrow = getComputerThrowValue();

            displayResults(yourThrow, computerThrow);

        }
    });

    $('#paperBtn').click(function (event) {
        if (checkBet()) {
            currentBet = Number($('#creditBet').val());
            var yourThrow = 1;
            var computerThrow = getComputerThrowValue();

            displayResults(yourThrow, computerThrow);
        }
    });

    $('#scissorsBtn').click(function (event) {
        if (checkBet()) {
            currentBet = Number($('#creditBet').val());
            var yourThrow = 2;
            var computerThrow = getComputerThrowValue();

            displayResults(yourThrow, computerThrow);
        }
    });

    $('#playAgainBtn').click(function () {
        currentRound = 1;
        currentBet = 0;
        creditCount = 100;
        computerThrows = [0, 0, 0, 1, 1, 1, 2, 2, 2];
        tieBetValue = 0;

        $('#totalRounds').text(totalRounds);
        $('#currentRound').text(currentRound);
        $('#currentBet').text(currentBet);
        $('#creditCount').text(creditCount);
        $('#gameStatus').text('Enter a bet and choose a throw to start the game!');
        $('#playAgainBtn').fadeOut('fast');
        $('#endGameStatus').fadeOut('fast');

        $('.playBtn').removeAttr('disabled');
        $('#creditBet').removeAttr('disabled');

    });

    /**
     * Checks to ensure the bet is a valid bet. If the bet is invalid the input is to an invalid state.
     */
    function checkBet() {
        var currentBet = Number($('#creditBet').val());
        var invalidMessage = '';
        if (!currentBet || isNaN(currentBet) || currentBet < 1) {
            invalidMessage = 'Please enter a valid number.';
        }
        else if (tieBetValue && currentBet < tieBetValue * 2) {
            invalidMessage = 'Your bet needs to be at least ' + (tieBetValue * 2) + ' credits.';
        }

        if (invalidMessage) {
            $('#creditBet').addClass('is-invalid');
            $('#creditBetInvalidMsg').text(invalidMessage);
            return false;
        }
        else {
            $('#creditBet').removeClass('is-invalid');
            $('#creditBetInvalidMsg').text('');
            return true;
        }
    }

    /**
     * Displays the results of a single round.
     * @param {Number} yourThrow The number representing the players throw.
     * @param {Number} computerThrow The number representing the computer's throw.
     */
    function displayResults(yourThrow, computerThrow) {
        var playerState = '';
        var computerState = '';
        var playerChoice = getThrowName(yourThrow);
        var computerChoice = getThrowName(computerThrow);

        // Find results using if-else statements.
        if (yourThrow === computerThrow) {
            playerState = 'tie';
            computerState = 'tie';
            $('#gameStatus').text('Tie! You must double your last bet.');
            tieBetValue = currentBet;
        }
        else if (yourThrow === 0 && computerThrow === 2 || yourThrow === 1 && computerThrow === 0 || yourThrow === 2 && computerThrow === 1) {
            playerState = 'winning';
            computerState = 'losing';
            $('#gameStatus').text('You win!');
            tieBetValue = 0;
            creditCount += currentBet;
        }
        else {
            playerState = 'losing';
            computerState = 'winning';
            $('#gameStatus').text('You lose!');
            tieBetValue = 0;
            creditCount -= currentBet;
        }

        // Update images.
        $('#computerImgDiv img').fadeOut('fast', function () {
            $(this).attr('src', 'resources/' + computerState + '-' + computerChoice + '.jpg');
            $(this).attr('alt', computerChoice);
            $(this).fadeIn('fast');
        });

        $('#playerImgDiv img').fadeOut('fast', function () {
            $(this).attr('src', 'resources/' + playerState + '-' + playerChoice + '.jpg');
            $(this).attr('alt', playerChoice);
            $(this).fadeIn('fast');
        });

        $('#creditCount').fadeOut('fast', function () {
            $(this).text(creditCount);
            $(this).fadeIn('fast');
        });

        goToNextRound();
    }

    function goToNextRound(yourThrow, computerThrow) {
        if (currentRound < totalRounds) {
            currentRound++;

            $('#currentRound').fadeOut('fast', function () {
                $(this).text(currentRound);
                $(this).fadeIn('fast');
            });

            $('#creditBet').focus();
        }
        else {
            var endMessage = 'You finished with ' + creditCount + ' credits.';
            if (creditCount > highScore) {
                endMessage += ' You got a new high score!';
                highScore = creditCount;
                $('#highScore').text(highScore);
            }
            $('#endGameStatus').text(endMessage);
            $('#endGameStatus').fadeIn();
            $('#playAgainBtn').fadeIn('fast');
            $('#creditBet').attr('disabled', 'disabled');
            $('.playBtn').attr('disabled', 'disabled');


        }
    }

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
     * Removes and returns a random value from the computerThrows array.
     */
    function getComputerThrowValue() {
        if (computerThrows.length >= 1) {
            var randomIdx = Math.floor(Math.random() * computerThrows.length);
            return computerThrows.splice(randomIdx, 1)[0];
        }
    }
})