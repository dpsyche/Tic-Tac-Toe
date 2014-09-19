<?php

$uname = $_GET["uname"];

Include "../lib/Query.php";

$query = new Query("Select * FROM statistics WHERE uname='$uname'");
$query->execute();
$query->getResult();
$row = $query->getRow(0);

$username = $row[0];
$wins = $row[1];
$losses = $row[2];
$ties = $row[3];
$played = $row[4];
$points = $row[5];

echo '<html>
        <body>
			<p> Username: '.$username.' </p>
			<p> Games Played: '.$played.' </p>
			<p> Points: '.$points.' </p>
			<p> Wins: '.$wins.' Losses: '.$losses.' Ties: '.$ties.' </p>
			<p></p>
			<br><a href="main.php?uname='.$uname.'">Back to Main Menu</a><br>
			
		</body>
      </html>';
?>