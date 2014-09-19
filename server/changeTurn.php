<?php
// Created on Nov 15 2013 by Ian Santagata
// Version 1.0
// Changes which player turn it is in the database
//
// To be run immediately after player makes valid move, non-game ending move
// Assume database table has already intitialized player table and game state

include "../lib/Query.php";

// Retrieve usernames from XMLHttpRequest
$uname = $_GET("uname");

// Extract opponent name from table
$q = new Query("SELECT opponent FROM player WHERE uname='$uname'");
$q->execute();
$result = $q->getResult();

if ($row = $q->getRow(0)) {
	$opponent = $row[0];

	// Exchange turn control from player to opponent
	$query = new Query("UPDATE player SET turn=0 WHERE uname='$uname'");
	$query->execute();
	$query = new Query("UPDATE player SET turn=1 WHERE uname='$opponent'");
	$query->execute();
	
	$ret = $opponent;
}
else {
	$ret = NULL;
}

// Return username to JS of whose turn it is or NULL if error
echo $ret;
?>
