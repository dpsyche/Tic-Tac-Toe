<?php
/*reset_player_status.php
  Created by Tim Bouvier on 12/5/2013
  resets players status to 0 when they
  either leave the game page or complete
  a game.
*/

include "../lib/Query.php";

$uname = $_GET["uname"];

//execute query to update the players status
$query = new Query("UPDATE player SET ingame=0 WHERE uname='$uname';");
$query->execute();

//execute query to set opponent to NULL
$query = new Query("UPDATE player SET opponent=NULL WHERE uname='$uname';");
$query->execute();

echo 'successfully updated '.$uname.' ingame status to 0 and opponent to NULL';
?>