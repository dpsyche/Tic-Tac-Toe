<?php
/*poll_opp_active.php
  Created by Tim Bouvier on 12/5/2013
  script to determine if the opposing player
  is still active in the game.
*/

include "../lib/Query.php";

$uname = $_GET["uname"];

//query to see if opponent left game
$query = new Query("SELECT opponent FROM player WHERE uname='$uname';");
$query->execute();

//get result
$row = $query->getRow(0);
$res = stripslashes($row[0]);


//now get the check if opponent left the game
$query = new Query("SELECT opponent FROM player WHERE uname='$res';");
$query->execute();

//get result
$row = $query->getRow(0);
$res = stripslashes($row[0]);

if($res == ""){
	echo "GAME_INACTIVE";
}
else{
	echo "GAME_ACTIVE";
}

?>