<?php
// Created on Nov 14 2013 by Ian Santagata
// Version 1.0
// Checks to see if the game has been won/tied and if the game is over
//
// Returns 1 if game is over and returns 0 if game is not over

include "../lib/Query.php";

// Pull all of the coordinate and username data from the table
$q = new Query("SELECT * FROM gstate");
$q->execute();
$spot0 = $q->getRow(0);
$spot1 = $q->getRow(1);
$spot2 = $q->getRow(2);
$spot3 = $q->getRow(3);
$spot4 = $q->getRow(4);
$spot5 = $q->getRow(5);
$spot6 = $q->getRow(6);
$spot7 = $q->getRow(7);
$spot8 = $q->getRow(8);

// Test for winning conditions based on upper left spot
switch ($spot0[1]) {
	case $username:

		// If upper three spots owned by same user
		switch($spot1[1]) {
			case $username:
				switch($spot2[1]) {
					case $username:
						return 1;
				}
				break;
		}

		// If left three spots owned by same user
		switch($spot3[1]) {
			case $username:
				switch($spot6[1]) {
					case $username:
						return 1;
				}
				break;
		}
		break;
}

// Test for winning conditions based on center spot
switch ($spot4[1]) {
	case $username:

		// If upper left, middle, and lower right spots owned by same user
		switch($spot0[1]){
			case $username:
				switch($spot8[1]) {
					case $username:
						return 1;
				}
				break;
		}
		
		// If upper right, middle, and lower left spots owned by same user
		switch($spot2[1]) {
			case $username:
				switch($spot6[1]) {
					case $username:
						return 1;
				}
				break;
		}

		// If middle column is owned by same user
		switch($spot1[1]) {
			case $username:
				switch($spot7[1]) {
					case $username:
						return 1;
				}
				break;
		}

		// If middle row is owned by same user
		switch($spot3[1]) {
			case $username:
				switch($spot5[1]) {
					case $username:
						return 1;
				}
				break;
		}
		break;
}

// Test for winning conditions based on lower right spot
switch($spot8[1]) {
	case $username:

		// If bottom row is owned by same user
		switch($spot6[1]) {
			case $username:
				switch($spot7[1]) {
					case $username:
						return 1;
				}
				break;
		}

		// If right colum is owned by same user
		switch($spot2[1]) {
			case $username:
				switch($spot5[1]) {
					case $username:
						return 1;
				}
				break;
		}
		break;
}

// Test for board full (draw) for each spot taken
$t0 = ($spot0[1] != NULL);
$t1 = ($spot1[1] != NULL);
$t2 = ($spot2[1] != NULL);
$t3 = ($spot3[1] != NULL);
$t4 = ($spot4[1] != NULL);
$t5 = ($spot5[1] != NULL);
$t6 = ($spot6[1] != NULL);
$t7 = ($spot7[1] != NULL);
$t8 = ($spot8[1] != NULL);

// If board full, return
if ($t0 && $t1 && $t2 && $t3 && $t4 && $t5 && $t6 && $t7 && $t8) {
	return 1;
}

// If code still running by this point, no winning condition and board not full
return 0;
?>
