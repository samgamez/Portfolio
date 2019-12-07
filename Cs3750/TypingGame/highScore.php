<?php
session_start();
$username = $_SESSION['typingGameUsername'];
ini_set('display_errors', 1);
ini_set('html_errors', 1);
error_reporting(E_ALL);

?>
<!DOCTYPE html>
<head>
	<link rel="stylesheet" href="lookGood.css">
	<script>
		var username = <?php echo json_encode($username) ?>;
		if (!username){
			window.location.replace('/TypingGame');
		}
	</script> 
</head>
<html>
	<body>
		
		<h1>High Score Page</h1>
		
		<!-- <form method="post" action="highScore.php">
			<label>Enter a Name</label>
			<input id="name" name="name"/>
			<label>Enter a Score</label>
			<input id="score" name="score"/>
			<input type="submit" value="submit" name="submit"/>
		</form>-->
		<?php
		//if ()
		//{
			/* $servername = "sql300.epizy.com";
			$username = "epiz_24402955";
			$password = "xsWZEZCDDDvvGX";
			$dbname = "epiz_24402955_Names";

			// Create connection
			$conn = mysqli_connect($servername, $username, $password, $dbname);
			// Check connection
			if (!$conn) {
				die("Connection failed: " . mysqli_connect_error());
			} */

			require_once 'db_connection.php';
			
			//$sql = "INSERT INTO ScoreBox (name, score)
			//VALUES (" . $_POST['name'] . ", " . $_POST['score'] .")";

			/* if (mysqli_query($conn, $sql)) {
				echo "Score Saved" . "<br>";
			} else {
				echo "Error: " . $sql . "<br>" . mysqli_error($conn);
			} */
			
			$sql = "SELECT name, score FROM ScoreBox ORDER BY score DESC LIMIT 10";
			
			$result = $conn->query($sql);
			
			echo "<div>";
			if ($result->num_rows > 0) {
				// output data of each row
				$i = 1;
				echo "<table><tr><th>Place</th><th>Name</th><th>Score</th></tr>";
				while($row = $result->fetch_assoc()) {
					echo "<tr><td>" . $i . "</td><td>" . $row["name"]. "</td><td>" . $row["score"]. "</td></tr>";
					$i++;
				}
				echo "</table>";
			} else {
				echo "0 results";
			}
			echo "</div>";
			mysqli_close($conn);
			
		//}
		?>

	</body>
</html>
