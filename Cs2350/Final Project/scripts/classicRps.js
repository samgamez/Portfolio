/**
 * Javascript for the classic game of rock, paper, scissors. Throws are figured using a number from 0-2.
 * 0 is rock, 1 is paper, and 2 is scissors. Each time a button is clicked to make a throw, the computer randomly generates it's choice.
 */
$(function () {
    var computerThrow = 1;
    var yourThrow = 1;
    var gameCount = 0;
    var totalGameLimit = 5;
    var playerWinCount = 0;
    var playerLossCount = 0;
    var tieCount = 0;

    updateScoreDisplay();

    // Load initial instructions modal.
    $('#instructionsParagraph').text(
    'Click the rock, paper, or scissors buttons to make your throw to try and win the computer.' +
    'Scissors beat Paper, Paper beats Rock, and Rock beats Scissors.  Anything else results in a "tie".');

    $('#optionsModal').modal({ backdrop: 'static' });

    $('#rockBtn').click(function (event) {
        yourThrow = 0;
        computerThrow = Math.floor(Math.random() * 3);

        displayResults(yourThrow, computerThrow);
    });

    $('#paperBtn').click(function (event) {
        yourThrow = 1;
        computerThrow = Math.floor(Math.random() * 3);

        displayResults(yourThrow, computerThrow);
    });

    $('#scissorsBtn').click(function (event) {
        yourThrow = 2;
        computerThrow = Math.floor(Math.random() * 3);

        displayResults(yourThrow, computerThrow);
    });

    $('#playAgainBtn').click(function (event) {
        // Reset score values.
        gameCount = 0;
        playerWinCount = 0;
        playerLossCount = 0;
        tieCount = 0;
        updateScoreDisplay();

        // Hides the play again button.
        $(this).addClass('d-none');

        // Re-enable the rock, paper, scissors select buttons.
        $('.playBtn').removeAttr('disabled');

        $('#gameStatus').text('');
    });
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

    function displayResults(yourThrow, computerThrow) {
        var playerState = '';
        var computerState = '';
        var playerChoice = getThrowName(yourThrow);
        var computerChoice = getThrowName(computerThrow);

        // Find results using if-else statements.
        if (yourThrow === computerThrow) {
            playerState = 'tie';
            computerState = 'tie';
            $('#gameStatus').text('Tie!');
            tieCount++;
        }
        else if (yourThrow === 0 && computerThrow === 2 || yourThrow === 1 && computerThrow === 0 || yourThrow === 2 && computerThrow === 1) {
            playerState = 'winning';
            computerState = 'losing';
            $('#gameStatus').text('You win!');
            playerWinCount++;
        }
        else {
            playerState = 'losing';
            computerState = 'winning';
            $('#gameStatus').text('You lose!');
            playerLossCount++;
        }

        // Update images.
        $('#computerImgDiv img').fadeOut('fast', function (){
            $(this).attr('src', 'resources/' + computerState + '-' + computerChoice + '.jpg');
            $(this).attr('alt', computerChoice);
            $(this).fadeIn('fast');
        });

        $('#playerImgDiv img').fadeOut('fast', function (){
            $(this).attr('src', 'resources/' + playerState + '-' + playerChoice + '.jpg');
            $(this).attr('alt', playerChoice);
            $(this).fadeIn('fast');
        });

        gameCount++;
        updateScoreDisplay();
        if (gameCount === totalGameLimit) {
            // Disable rock, paper, scissors buttons
            $('.playBtn').attr('disabled', 'disabled');

            $('#playAgainBtn').removeClass('d-none');

            var endGameText = 'Game over! ';
            if (playerWinCount > playerLossCount){
                endGameText += 'You win!';
            }
            else if (playerWinCount < playerLossCount){
                endGameText += 'You lose!';
            }
            else {
                endGameText += 'Tie!';
            }
            $('#endGameStatus').text(endGameText);
        }
    }

    function updateScoreDisplay() {
        $('#gameCount').text(gameCount);
        $('#totalGames').text(totalGameLimit);
        $('#playerWins').text(playerWinCount);
        $('#ties').text(tieCount);
        $('#playerLosses').text(playerLossCount);
    }

})