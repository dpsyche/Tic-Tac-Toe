<?php
// Created on Nov 15 2013 by Ian Santagata
// Version 1.0
// Poll for game state change with player turn control, return board for moves/owners

include "../lib/Query.php";

$username = $_GET("uname");
$state = "";
$turn = 0;

// Wait for turn of player with loop
do {
	$q = new Query("SELECT turn FROM player WHERE uname='$username'");
	$q->execute();
	$result = $q->getResult();
	if ($row = $q->getRow()) {
		$turn = $row[0];
	}
	
	// Wait five seconds
	sleep(5);
} while($turn != 1);

// Continue when it is the player's turn
$query = new Query("SELECT * FROM gstate");
$query->execute();
$res = $query->getResult();

// Setup the state to be returned to JS
for ($i = 0; $i <= 8; $i++) {
	$rows = $$query->getRow($i);
	$state = $state . "$rows[0]|";
	if ($rows[1] == NULL) {
		$state = $state . "null|";
	}
	else {
		$state = $state . "$rows[1]|";
	}
}

// Echos the state of the board back ("" if not player turn yet) with following syntax:
// 		0|null|1|tim|2|ian|3|null|4|ian|5|tim|6|tim|7|null|8|null|
echo $state;

?>
