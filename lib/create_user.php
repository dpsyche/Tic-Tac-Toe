<?php

include "Query.php";

$username = $_POST["uname"];
$password = $_POST["pwd"];
$password_conf = $_POST["pwd_conf"];
$email_addr = $_POST["email"];
//echo $username, $password;

if($password != $password_conf){
  header("location:create_account_failure.php?");
  exit();
}
if($username == "" || $password == ""){
  header("location:create_account_failure.php?");
  exit();
}

// Check that the username is unique
if ((require "../server/checkUsername.php") == 0) {
  $q = new Query("INSERT INTO player (uname, password) VALUES('$username','$password')");
  $q->execute();

  $q = new Query("INSERT INTO statistics (uname) VALUES('$username')");
  $q->execute();

// Check to see that user created properly now
  if ((require "../server/checkUsername.php") == 1) {
	header("location:create_account_success.php?email=".$email_addr."&uname=".$username);
  } 
  else {
    header("location:create_account_failure.php?");
  }
}

// Produce error if username taken or error thrown
else {
  header("location:create_account_failure.php?");
}
?>
