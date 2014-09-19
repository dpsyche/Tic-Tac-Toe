<?php

/*pollMove_2.php created by Tim Bouvier 11/26/2013
		Checks gamestate and returns a json 
		object with gamestate.*/

include '../lib/Query.php';
$winning_game = "";
$req_uname = $_GET["uname"];
$tbl = $_GET["tbl"];
$query = new Query("SELECT * FROM ".$tbl.";");

//execute it and convert it to json eventually
$query->execute();

//initialize gamestate array
for($i=0;$i<$query->numRows();$i++){
  $row = $query->getRow($i);
  $coordinates[$i] = stripslashes($row[1]);
}

if(($coordinates[0] == $coordinates[1]) && ($coordinates[1]==$coordinates[2]) && ($coordinates[1]!="")){
  $winning_game = $coordinates[1];
}
if(($coordinates[3] == $coordinates[4]) && ($coordinates[4]==$coordinates[5]) && ($coordinates[4]!="")){
  $winning_game = $coordinates[4];
}
if(($coordinates[6] == $coordinates[7]) && ($coordinates[7]==$coordinates[8]) && ($coordinates[7]!="")){
  $winning_game = $coordinates[7];
}
if(($coordinates[0] == $coordinates[3]) && ($coordinates[3]==$coordinates[6]) && ($coordinates[3]!="")){
  $winning_game = $coordinates[3];
}
if(($coordinates[1] == $coordinates[4]) && ($coordinates[4]==$coordinates[7]) && ($coordinates[4]!="")){
  $winning_game = $coordinates[4];
}
if(($coordinates[2] == $coordinates[5]) && ($coordinates[5]==$coordinates[8]) && ($coordinates[5]!="")){
  $winning_game = $coordinates[5];
}
if(($coordinates[0] == $coordinates[4]) && ($coordinates[4]==$coordinates[8]) && ($coordinates[4]!="")){
  $winning_game = $coordinates[4];
}
if(($coordinates[6] == $coordinates[4]) && ($coordinates[4]==$coordinates[2]) && ($coordinates[4]!="")){
  $winning_game = $coordinates[4];
}

/*for($i=0;$i<$query->numRows();$i++){
	$row = $query->getRow($i);
	$ret[$i]= stripslashes($row[1]);
}*/
if($winning_game != ""){
	$coordinates[9] = $winning_game;
}
else{
	$coordinates[9] = "play_on";
}

echo json_encode($coordinates);
?>