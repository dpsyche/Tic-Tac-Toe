<?php

include "Query.php";

$username = $_POST["uname"];
$password = $_POST["pwd"];

$q = new Query("SELECT * FROM player WHERE uname='$username' AND password='$password';");
$q->execute();
//$result = $q->getResult();
$count = $q->numRows();
//echo $username;
//echo $password;
//echo $count;
if($count == 1){
  //session_register("username");
  //session_register("password"); 

  // Update online bit status if login success
  $q = new Query("UPDATE player SET online=1");
  $q->execute();
  header("location:login_success.php?uname=".$username);

 
}
else{
  header("location:login_failure.php");
}
?>
