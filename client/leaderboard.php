<?php

$uname = $_GET["uname"];

Include "../lib/Query.php";

$counter = new Query("Select * FROM statistics");
$counter->execute();
$userTotal = $counter->numRows();
$leaderboardLimit = 10;
if ($userTotal < $leaderboardLimit) {
	$leaderboardLimit = $userTotal;
}

$query = new Query("Select * FROM statistics ORDER BY points DESC, wins DESC, uname ASC LIMIT $leaderboardLimit");
$query->execute();
$query->getResult();
echo '<html>
        <body>
	  <h3>Hello '.$uname.', this is the Leaderboard page. </h3>
	  <table border="1">
	  <tr>
	  <td>Ranking</td>
	  <td>Username</td>
	  <td>Wins</td>
	  <td>Losses</td>
	  <td>Ties</td>
	  <td>Total Games</td>
	  <td>Points</td>
	  </tr>';
for ($i = 0; $i < $leaderboardLimit; $i++) {
	$row = $query->getRow($i);
	$username = $row[0];
	$wins = $row[1];
	$losses = $row[2];
	$ties = $row[3];
	$played = $row[4];
	$points = $row[5];
	$ranking = $i + 1;
	echo '
	  <tr>
	  <td>'.$ranking.'</td>
	  <td>'.$username.'</td>
	  <td>'.$wins.'</td>
	  <td>'.$losses.'</td>
	  <td>'.$ties.'</td>
	  <td>'.$played.'</td>
	  <td>'.$points.'</td>
	  </tr>';
}

echo'
	</table>
	<br><a href="main.php?uname='.$uname.'">Back to Main Menu</a><br>
	</body>
      </html>';

?>