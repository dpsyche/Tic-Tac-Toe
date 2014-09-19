<?php
/*addWin.php created by Ian Santagata on 12/4/2013
  updates database table to reflect win/loss/tie/played/points 
  user records
*/

include "../lib/Query.php";

$uname = $_GET["uname"];

// extract winning user data from table
$query = new Query("SELECT uname,wins,played,points FROM statistics WHERE uname='$uname';");
$query->execute();
//$query->getResult();
$row = $query->getRow(0);

// increase values as necessary (+3 points for a win)
$wins = $row[1] + 1;
$played = $row[2] + 1;
$points = $row[3] + 3;

// update winning player data
$query = new Query("UPDATE statistics SET wins=$wins, played=$played, points=$points WHERE uname='$uname';");
$query->execute();

// success message
echo "successfully updated statistics";
?>
