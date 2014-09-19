<?php
// Created by Ian Santagata
// Test script to test MySQL PHP interaction
// Feel free to edit and test for your own needs

	include "Query.php";
	$q = new Query("SELECT * FROM gstate");
	$q->execute();
	$result = $q->getResult();
	for ($i = 0; $i <= 8; $i++) {
		$row = $q->getRow($i);
		printf("Coordinate: %s Username: %s\n", $row[0], $row[1]);
	}
?>
