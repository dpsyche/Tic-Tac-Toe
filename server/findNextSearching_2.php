<?php 
/*findNextSearching_2.php created by Tim Bouvier on 11/27/2013
  matches a game based on players 'ingame' status
  namely 0 - offline, 1-searching, 2- ingame
  return 0 for failure and the gstate table name for success
*/

include "../lib/Query.php";

$uname = $_GET["uname"];
$count = 0;

//set searching for game bit to 1
$query = new Query("UPDATE player SET ingame=1 WHERE uname='$uname';");
$query->execute();

//search for a match for 10 seconds
while($count <= 10){
  //find the first user looking for a game
  $query = new Query("SELECT uname FROM player WHERE ingame=1 AND uname !='$uname' LIMIT 1;");
  $query->execute();

  //check that there is at least one person looking for a game
  if($query->numRows()==0){
	$count++;
  }
  else{
	break;
  }
  sleep(1);
  
  //check to see if user was placed by another request
  $query = new Query("SELECT * FROM player WHERE ingame = 2 AND uname='$uname';");
  $query->execute();
  if($query->numRows() == 1){
    //get the gstate table and send it back
    $query = new Query("SELECT opponent FROM player WHERE uname='$uname';");
    $query->execute();
    $row = $query->getRow(0);
    $opponent = stripslashes($row[0]);
    echo $opponent.'_gstate';
    exit();
  }

}

//if we didnt find anything reply accordingly
//and reset ingame=0
if($query->numRows() == 0){
   $query = new Query("UPDATE player SET ingame=0 WHERE uname='$uname';");
   $query->execute();
   echo 0;
   exit();
}
$row = $query->getRow(0);
$opponent = stripslashes($row[0]);

//match the two players
$query = new Query("UPDATE player SET opponent='$opponent' WHERE uname='$uname';");
$query->execute();
$query = new Query("UPDATE player SET opponent='$uname' WHERE uname='$opponent';");
$query->execute();

//set the two players ingame status to ingame
$query = new Query("UPDATE player SET ingame=2 WHERE uname='$uname' OR uname='$opponent';");
$query->execute();

//set requesting players turn to active
$query = new Query("UPDATE player SET turn=1 WHERE uname='$uname';");
$query->execute();

//create the temporary gamestate table
$tmp_table = $uname."_gstate";
$query = new Query("CREATE TABLE ".$tmp_table."(coordinate INT,uname VARCHAR(25));");
$query->execute();

//now initialize the table
for($i=0;$i<9;$i++){
  $query = new Query("INSERT INTO ".$tmp_table." VALUES(".$i.",NULL);");
  $query->execute();
}

echo $tmp_table;
?>