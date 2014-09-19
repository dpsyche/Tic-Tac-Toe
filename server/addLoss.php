<?php
/*addLoss.php created by Ian Santagata on 12/4/2013
  updates database table to reflect win/loss/tie/played/points 
  user records
*/

include "../lib/Query.php";

$uname = $_GET["uname"];

// extract user data from table
$query = new Query("SELECT uname,losses,played FROM statistics WHERE uname='$uname';");
$query->execute();
$query->getResult();
$row = $query->getRow(0);

// increase values as necessary (+0 points for a loss)
$losses = $row[1] + 1;
$played = $row[2] + 1;

// update player data
$query = new Query("UPDATE statistics SET losses=$losses, played=$played WHERE uname='$uname';");
$query->execute();

// success message
echo "successfully updated statistics";
?>
