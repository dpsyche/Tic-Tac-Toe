<?php
// Created on Nov 15 2013 by Ian Santagata
// Version 1.0
// Logs a player out via the database fields

include "Query.php";

// Get target username from XMLHttpRequest sent by JS
$uname = $_GET["uname"];

// Search database for the username
$q = new Query("SELECT * FROM player WHERE uname='$uname'");
$q->execute();
$result = $q->getResult();

// If the user exists and is logged in, log him out
if ($row = $q->getRow(0)) {
	if ($row[2] == b'1') {
		$query = new Query("UPDATE player SET online=b'0' WHERE uname='$uname'");
		$query->execute();
	}
}

echo '<html>
       <body>
         <h1>You are logged out, '.$uname.'</h1>
	 <br><a href="../index.html">Return to Login Screen</a>
       </body>
     </html>';

?>
