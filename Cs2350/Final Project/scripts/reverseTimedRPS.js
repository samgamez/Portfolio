$(function (){

    // Load instructions.
    $('#instructionsParagraph').text(
    'Perfect your ability to think fast by trying to win, lose, or tie versus the computer’s decision. For example, with a countdown ' +
    'clock running, the computer shows you it\'s selection first (and tells you if you won or lost).  If it shows you paper and tells ' +
    'you to win, you would then have to choose scissors (to win). However if the computer shows you paper and tells you to lose, you ' +
    'must choose rock (in order to "lose" and get points). It will take quick thinking and nerves of steel! You will be fighting ' +
    'against the clock and a tireless computer foe!  Points are collected for correct selections and (doubly) penalized for incorrect ' +
    'ones.');

    $('#optionsModal').modal({ backdrop: 'static' });

    // Set timer variables.
    var minutes = 1;
    var seconds = 0;
    var countdown;
    var pointCount = 0;
    var highScore = 0;
    // I was thinking about showing an indicator next the high score label using this value... somehow.
    // var hasNewHighScore = false;

    // Set initial state of computer throw and prompt.
    var computerThrow = Math.floor(Math.random() * 3);
    var computerPrompt = Math.floor(Math.random() * 3);
    displayNextPlay(computerThrow, computerPrompt);

    // Set Timer display values.
    $('#timerMinutes').text((minutes < 10 ? '0': '') + minutes);
    $('#timerSeconds').text((seconds < 10 ? '0': '') + seconds);

    // Modal events. When the options modal is hidden, the timer starts to count down.
    $('#optionsModal').on('hidden.bs.modal', function (event){
        countdown = setInterval(timerTick, 1000);
    });

    // When the modal is shown, the timer interval is cleared.
    $('#optionsModal').on('show.bs.modal', function (event){
        if (countdown){
            clearInterval(countdown);
        }
    });



    // Set up button event handlers. This should track the players highest score as well.
    $('#rockBtn').click(function (event){
        var yourThrow = 0;
        if ((computerPrompt == 0 && computerThrow == 2) || (computerPrompt == 1 && computerThrow == 1)
             || (computerPrompt == 2 && computerThrow === yourThrow)){
            $('#turnResult').text('Correct!');
            pointCount++;
        }
        else {
            $('#turnResult').text('Incorrect...');
            if (pointCount > 1){
                pointCount -= 2;
            }
            else {
                pointCount = 0;
            }
        }

        computerThrow = Math.floor(Math.random() * 3);
        computerPrompt = Math.floor(Math.random() * 3);

        displayNextPlay(computerThrow, computerPrompt);
    });

    $('#paperBtn').click(function (event){
        var yourThrow = 1;
        if ((computerPrompt == 0 && computerThrow == 0) || (computerPrompt == 1 && computerThrow == 2) 
            || (computerPrompt == 2 && computerThrow === yourThrow)){
            $('#turnResult').text('Correct!');
            pointCount++;
        }
        else {
            $('#turnResult').text('Incorrect...');
            if (pointCount > 1){
                pointCount -= 2;
            }
            else {
                pointCount = 0;
            }
        }

        computerThrow = Math.floor(Math.random() * 3);
        computerPrompt = Math.floor(Math.random() * 3);

        displayNextPlay(computerThrow, computerPrompt);
    });

    $('#scissorsBtn').click(function (event){
        var yourThrow = 2;
        if ((computerPrompt == 0 && computerThrow == 1) || (computerPrompt == 1 && computerThrow == 0) 
            || (computerPrompt == 2 && computerThrow === yourThrow)){
            $('#turnResult').text('Correct!');
            pointCount++;
        }
        else {
            $('#turnResult').text('Incorrect...');
            if (pointCount > 1){
                pointCount -= 2;
            }
            else {
                pointCount = 0;
            }
        }
        
        computerThrow = Math.floor(Math.random() * 3);
        computerPrompt = Math.floor(Math.random() * 3);

        displayNextPlay(computerThrow, computerPrompt);
    });

    $('#playAgainBtn').click(function (event){
        minutes = 1;
        pointCount = 0;

        $(this).addClass('d-none');
        $('.playBtn').removeAttr('disabled');

        $('#endGameStatus').text('');
        $('#turnStatus').text('');
        
        computerThrow = Math.floor(Math.random() * 3);
        computerPrompt = Math.floor(Math.random() * 3);

        displayNextPlay(computerThrow, computerPrompt);

        countdown = setInterval(timerTick, 1000);
        
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
    
    /**
     * Get the relevant throw image and prompt message according to given numbers.
     * @param {Number} cThrow The number for the computers throw.
     * @param {Number} cPrompt The number for the computers prompt message.
     */
    function displayNextPlay(cThrow, cPrompt) {
        var throwName = getThrowName(cThrow);
        
        $('#computerImgDiv img').fadeOut('fast', function () {
            $(this).attr('src', 'resources/winning-' + throwName + '.jpg');
            $(this).attr('alt', throwName);
            $(this).fadeIn('fast');
        });

        var promptMessage;
        switch (cPrompt){
            case 0:
                promptMessage = 'Choose a winning throw.';
                break;
            case 1:
                promptMessage = 'Choose a losing throw.';
                break;
            case 2:
                promptMessage = 'Choose a tie throw.';
                break;
            default:
                throw 'Invalid prompt parameter.';
        }

        $('#gameStatus').text(promptMessage);
        $('#points').text(pointCount);
    }

    /**
     * The timer function evaluates then displays the values for the countdown timer.
     */
    function timerTick(){
        // Figure the values.
        if (minutes > 0 && seconds == 0){
            minutes--;
            seconds = 59;
        }
        else if (seconds > 0) {
            seconds--;
        }

        // Display in text.
        if (minutes <= 9){
            $('#timerMinutes').text('0' + minutes);
        }
        else {
            $('#timerMinutes').text(minutes);
        }

        if (seconds <= 9){
            $('#timerSeconds').text('0' + seconds);
        }
        else {
            $('#timerSeconds').text(seconds);
        }

        // When the timer reaches zero, the end game status should display the results and whether the player got a new high score.
        if (minutes == 0 && seconds == 0){
            var endGameMessage = 'You scored ' + pointCount + ' points!'
            if (pointCount > highScore){
                endGameMessage += ' You got a new high score!';
                highScore = pointCount;
                $('#highScore').text(pointCount);
            }

            $('#endGameStatus').text(endGameMessage);


            $('.playBtn').attr('disabled', 'disabled');
            
            $('#playAgainBtn').removeClass('d-none');
            clearInterval(countdown);
        }
    }
});