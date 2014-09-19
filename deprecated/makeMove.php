<?php
// Created on Nov 14 2013 by Ian Santagata
// Version 1.1 - Updated to include checkGame.php check and include ../lib/Query.php
// Makes a move in game if the move is valid
//
// Returns 0 for an invalid move, 1 for a successful move (game state change),
// and 2 for a game ending move using helper function to check win conditions

include "../lib/Query.php";

$coor = $_GET["coordinate"];
$username = $_GET["uname"];

// Returning 0 produces error message in JS
$ret = 1;

// Check for valid move on board
/*
if ($coor >= 0 && $coor <= 8) {

	// Repeat over all coordinates, if statement allows only match of desired coor works
	for ($var = 0; $var <= 8; $var++) {
		if ($coor == $var) {
			$q = new Query("SELECT * FROM gstate WHERE coordinate=$coor");
			$q->execute();
			$result = $q->getResult();
			$row = $q->getRow(0);

			// Update database with username of person making valid move
			if ($row[1] == NULL) {
				$query = new Query("UPDATE gstate SET uname='$username' WHERE 
					coordinate='$coor'");
				$query->execute();

				// Check to see if the game is over once a valid move is made
				if ((require "checkGame.php") == 2) {
					$ret = 2;
				} else {
					$ret = 1;
				}
			}

			// If board space is already taken by either user - invalid move
			else {
				$ret = 0;
			}
		}
	}
}

// Echo text to be caught by JS (0 - invalid, 1 - sucessful move, 2 - game ending move)
*/
echo $ret;
?>
