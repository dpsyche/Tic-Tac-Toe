<?php
  //print("successfully logged in!");
  $uname = $_GET["uname"];
  header("location:../client/main.php?uname=".$uname);
?>