<?php
    // Start session to store username.
    session_start();
?>
<!DOCTYPE html>
<html>
    <head>
        <title>Typing Game</title>
        <link rel="stylesheet" href="lookGood.css">
        <link rel="stylesheet" href="gameStyles.css">
            <?php
                require_once 'db_connection.php';
                
                // Get word pool.
                $query = "SELECT word FROM Word ORDER BY word DESC";
                
                $results = mysqli_query($conn, $query) or die(mysqli_error($conn));

                $array = array();
                while ($row = mysqli_fetch_array($results, MYSQLI_ASSOC)) {
                    array_push($array, $row['word']);
                }
                
                if (isset($_POST['username'])){
                    $_SESSION['typingGameUsername'] = $_POST['username'];
                }
                $username = $_SESSION['typingGameUsername'];
            ?>
        <script>
                var username = <?php echo json_encode($username) ?>;
                var myArray = <?php echo json_encode($array) ?>; 

                function getUsername(){
                    return username;
                }

                function getDictionary(){
                    return myArray;
                }
        </script>
        <script src="https://code.jquery.com/jquery-3.4.1.min.js"
            integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo="
            crossorigin="anonymous"></script>
        <script src="game.js"></script>
    </head>
    <body>
            <div class="gameTimerGroup">
                <span>Time:</span> <span id="gameTimer"></span>
            </div>
        <h1>
            Typing Game
        </h1>
        <div class="userInfo"></div>
        <div class="game">
            <span class="wordGroup">
                <div class="timer"></div>
                <div class="lifebar" style="height:15px;width:20px;background-color:#33aa33"></div>
                <span class="word"></span>
            </span>
            <span class="wordGroup">
                <div class="timer"></div>
                <div class="lifebar" style="height:15px;width:20px;background-color:#33aa33"></div>
                <span class="word"></span>
            </span>
            <span class="wordGroup">
                <div class="timer"></div>
                <div class="lifebar" style="height:15px;width:20px;background-color:#33aa33"></div>
                <span class="word"></span>
            </span>
            <span class="wordGroup">
                <div class="timer"></div>
                <div class="lifebar" style="height:15px;width:20px;background-color:#33aa33"></div>
                <span class="word"></span>
            </span>
            <span class="wordGroup">
                <div class="timer"></div>
                <div class="lifebar" style="height:15px;width:20px;background-color:#33aa33"></div>
                <span class="word"></span>
            </span>
            <div>
                <input id="userWord" />
            </div>
        </div>
    </body>
</html>