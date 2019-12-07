<?php
ini_set('display_errors', 1);
ini_set('html_errors', 1);
error_reporting(E_ALL);
?>

<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Keyboard Typing Game</title>
  <style></style>
  <link rel="stylesheet" href="lookGood.css">
  <script type="text/javascript" src="sha256.js"></script>
  <script type="text/javascript" src="login.js"></script>
</head>
<body>

<?php
require_once 'db_connection.php';

  // Generates salt when the username is sent via post request
  if (isset($_POST['username'])) {
    $query = "SELECT salt FROM authentication WHERE username = '{$_POST['username']}'";
    $results = mysqli_query($conn, $query) or die(mysqli_error($conn));
    $row = mysqli_fetch_array($results, MYSQLI_ASSOC);
    $salt = $row['salt'];

    // Debugging
    // echo "<br>Salt: $salt";
  }

  // Validates password when hashedPassword is sent via post request
  if (isset($_POST['hashedPassword'])) {
    
    // Debugging
    // echo "<br>PASSWORD: {$_POST['password']}";
    // echo "<br>HASHED PASSWORD: {$_POST['hashedPassword']}";
    
    $query = "SELECT * FROM authentication WHERE username = '{$_POST['username']}'
        AND hashed_password = '{$_POST['hashedPassword']}'";
    $results = mysqli_query($conn, $query) or die(mysqli_error($conn));

    // If a row is found that matches the hashedPassword
    if ($results->num_rows > 0) {
        ?>
            <!-- Creates a new form with username and automatically submits via POST to game.php -->
            <form action="game.php" method="post" id="usernameForm">
                <input type="hidden" id="username" name="username" value=<?=$_POST['username']?>>
                <input type="submit" id="startGame" value="Start Game" style="visibility: hidden;">
            </form>
            <script>document.getElementById("usernameForm").submit();</script>
        <?php
    // Error message is shown and password can be re-entered
    } else {
        echo "<br>Password doesn't match.";
    }
  }
?>

<!-- Form that gets password from user and runs hashExistingPassword() -->
<form action="" method="post">
    <label for="password">Password:</label>
    <input type="password" id="password" name="password" required><br>
    <input type="hidden" id="username" name="username" value="<?=$_POST['username']?>">
    <input type="hidden" id="salt" name="salt" value="<?=$salt?>">
    <input type="hidden" id="hashedPassword" name="hashedPassword" value="">
    <input type="submit" value="Login" onclick="hashExistingPassword()">
</form>

</body>
</html>