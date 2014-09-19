//getNextSearching() takes in one username as an argument
//searches for the first username in that table other than the argument with an ingame status of '1' (searching)
//sets both of those ingame statuses to '2' (ingame), both of their opponent colunms to each others' usernames, and 
//generates a random number to assign '0' (off turn) to one player's 'turn' column and '1' (on turn) to the other.

<?php

//these variables are used in the queries
$database = "ttt";
$table = "player";
/*
function findNextSearching(username)
{
  
  //Assumed unique usernames
  
  $uName1 = username;
  
  //find a row with inGame = 1 that isn't the user with name uName
  $query2 = new Query("SELECT FIRST(username) FROM '$table' WHERE ingame = 1 AND uname != '$uName1';");
  $uName2 = $query2->getResult();

  $update1 = new Query("UPDATE '$table' SET ingame = 2, Opponent = '$uName2' WHERE username = '$uName1';");
  $update2 = new Query("UPDATE '$table' SET ingame = 2, Opponent = '$uName1' WHERE username = '$uName2';");
  
  $update1->execute();
  $update2->execute();
  
  //sets turnRand to a random interger between 1 and 2 inclusive
  $turnRand = int rand(1, 2);
  
  //if turnRand = 1, this will set the "turn" column for uName1 to 1 and uName2 to 0
  if ($turnRand == 1) {
    $turnUpdate1 = new Query("UPDATE '$table' SET turn = 1 WHERE username = '$uName1';");
    $turnUpdate2 = new Query("UPDATE '$table' SET turn = 0 WHERE username = '$uName2';");
    $turnUpdate1->execute();
    $turnUpdate2->execute();
  }
  //if turnRand = 2, this will set the "turn" column for uName1 to 0 and uName2 to 1

  else {
    $turnUpdate1 = new Query("UPDATE '$table' SET turn = 0 WHERE username = '$uName1';");
    $turnUpdate2 = new Query("UPDATE '$table' SET turn = 1 WHERE username = '$uName2';");
    $turnUpdate1->execute();
    $turnUpdate2->execute();

  }

}*/
echo 1;
?>