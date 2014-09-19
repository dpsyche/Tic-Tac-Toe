<?php
// Created on Nov 13 2013 by Ian Santagata
// Version 1.1 - Edited return values and comments
// Checks to see if a username exists

//include "../lib/Query.php";

// Get data sent via XMLHttpRequest
//$user = $_POST["uname"];

// Check if the username already exists
$query = new Query("SELECT * FROM player WHERE uname='$username'");
$query->execute();
//$result = $query->getResult();
$result = $query->numrows();

// Returns -1 for error, 0 for username DNE, and 1 for username already exists
return $result;
?>
