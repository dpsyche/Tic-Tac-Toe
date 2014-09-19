<?php
// Created on Nov 13 2013 by Ian Santagata
// Version 1.1 - Updated Nov 14 2013
//				Readability improved, utilized less space for error catches with MySQL
// Version 1.2 - Updated Nov 15 2014
//				Removed mark from game state table and updated initialized values
// Sets up the Tic-Tac-Toe (TTT) game database on the server side with PHP and MySQL

// Create and test connection
$conn = mysql_connect("localhost","root","root") or
	die("Connection error: " . mysql_error());

// Create database if it does not already exist
$db = "ttt";
$sql = "CREATE DATABASE IF NOT EXISTS " . $db;
$query = mysql_query($sql,$conn) or 
	die("Database Creation Error: " . mysql_error($conn));

// Select database for use
$query = mysql_select_db($db,$conn) or 
	die("Database Use Error: " . mysql_error($conn));

// Create tables in database if they do not already exist
$tables = array("player" => "player",
				"stats" => "statistics",
				"gs" => "gstate");

// Player table only needs uname and password, defaults all else to NULL
$sql = array("player" => 
		"CREATE TABLE IF NOT EXISTS player(
		uname VARCHAR(25) NOT NULL PRIMARY KEY,
		password VARCHAR(25) NOT NULL,
		online BIT(1) NOT NULL, 
		ingame BIT(2) NOT NULL, 
		turn BIT(1), 
		opponent VARCHAR(25))",

// Statistics table only needs uname, defaults all else to 0
		"stats" =>
		"CREATE TABLE IF NOT EXISTS statistics(
		uname VARCHAR(25) NOT NULL PRIMARY KEY,
		wins SMALLINT UNSIGNED DEFAULT '0',
		losses SMALLINT UNSIGNED DEFAULT '0',
		ties SMALLINT UNSIGNED DEFAULT '0',
		played SMALLINT UNSIGNED DEFAULT '0',
		points MEDIUMINT DEFAULT '0')",

// Execute queries to create tables one at a time
foreach ($tables as $tbl=>$type) 
	{
	$query = mysql_query($sql[$tbl],$conn) or 
		die("Table Creation Error on " . $type . " : " . mysql_error($conn));
	}
print("successfully created tables / database<br>");
print("successfully initialized game state");
?>
