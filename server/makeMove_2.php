<?php
/* makeMove_2.php created by Tim Bouvier on 11/27/2013
   accepts client requests to make a move on the board 
   and validates or denies them.
*/

include "../lib/Query.php";

$uname = $_GET["uname"];
$coordinate = $_GET["coordinate"];
$tbl = $_GET["tbl"];
$ret = 0;

//check if its their turn
$turn = new Query("SELECT * FROM player WHERE uname='$uname' AND turn=1;");
$turn->execute();
if($turn->numRows() == 0){
	echo 0;
	exit();
}

//check if spot is valid
$query = new Query("SELECT uname FROM ".$tbl." WHERE coordinate=$coordinate;");
$query->execute();
$row = $query->getRow(0);
$res = stripslashes($row[0]);
if($res == ""){
	//valid so now update the spot to the requesting user
	$update_row = new Query("UPDATE ".$tbl." SET uname='$uname' WHERE coordinate=$coordinate;");
	$update_row->execute();

	//set their turn to inactive
	$turn_inactive = new Query("UPDATE player SET turn=0 WHERE uname='$uname';");
	$turn_inactive->execute();

	//get opponents uname
	$opp = new Query("SELECT opponent FROM player WHERE uname='$uname';");
	$opp->execute();
	$row = $opp->getRow(0);
	$name = stripslashes($row[0]);

	//set opponent to active
	$opp_set_active = new Query("UPDATE player SET turn=1 WHERE uname='$name';");
	$opp_set_active->execute();
}
else{
	//not a valid move
	echo 0;
	exit();
}

//success
echo 1;

?>