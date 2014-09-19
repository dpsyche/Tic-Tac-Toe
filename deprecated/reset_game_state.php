<?php
/*reset_game_state.php created by Tim Bouvier on 11/27/2013
  resets all gamestate / player state db tables to default 
  values.
*/

include "../lib/Query.php";

$uname = $_GET["uname"];

//blow away gamestate table data
$query = new Query("UPDATE gstate SET uname=NULL;");
$query->execute();

//reset player table data
$query = new Query("UPDATE player SET ingame=0;");
$query->execute();
$query = new Query("UPDATE player SET turn=0;");
$query->execute();
$query = new Query("UPDATE player SET opponent=NULL;");
$query->execute();

echo "successfully reset gamestate";
?>