<?php
/*showLeaderboard.php created by Ian Santagata on 12/4/2013
  returns json object with leaderboard statistics of the 10 highest
  users as well as the user who requested the statistics

  Assumes that the username of the winner is passed into script
*/

include "../lib/Query.php";

$uname = $_GET["uname"];

// add a place column to the statistics table

// query the statistics table, ordered by place/points

// use a for loop to extract the top ten rows

// put the top ten rows and the 11th user row with their place into a json object

// return json object of the top 10 and the user underneath
?>
