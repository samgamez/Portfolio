<?php
// Database credentials
    // $hostname = "sql201.epizy.com";
    // $username = "epiz_24388369";
    // $password = "weberstudent1";
    // $db_name = "epiz_24388369_cs3750_names";

    $hostname = "localhost";
    $username = "root";
    $password = "";
    $db_name = "cs3750";

// Create connection
$conn = mysqli_connect($hostname, $username, $password, $db_name);

// Check connection
if (!$conn) {
    die("Connection to database failed: " . mysqli_connect_error());
} else {
    // Debugging
    //echo "Connected to database successfully";
}
