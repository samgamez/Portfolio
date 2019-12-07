<?php
    require_once 'db_connection.php';
    header('Content-type: application/json');

    $result = array();
    if (!isset($_POST['username'])) { $result['error'] = 'No username found'; }

    if (!isset($_POST['score'])) { $result['error'] = 'No score found'; }

    if (!isset($_POST['error'])) {
        // Code to add a new score to the high scores table
        $sql = "Insert Into ScoreBox (name, score) Values ('" . $_POST['username'] . "', '" . $_POST['score'] . "');";

        if (mysqli_query($conn, $sql)){
            $result['success'] = 'success';
        }
        else {
            $result['error'] = "Error: " . $sql . mysqli_error($conn);
        }
    }

    echo json_encode($result);

?>