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

<h1>Keyboard Typing Game</h1>

<form action="verify_password.php" method="post" id="formLogin">
  <label for="username">Username:</label>
  <input type="text" id="username" name="username"><br>
  <input type="submit" value="Login" id="btnLogin" name="btnLogin">
</form>

<p><a href="new_user.php">Sign up</a> for an account</p>


<?php

// Debugging
  // if (isset($_POST['username'])) {
  //   echo "<br><br> Username was set with POST as {$_POST['username']}";
  // }
  
?>

</body>
</html>

    
