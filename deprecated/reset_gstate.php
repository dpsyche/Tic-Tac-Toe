<?php

include "../lib/Query.php";

//set all board positions to null
$query = new Query("UPDATE gstate SET uname=NULL;");
$query->execute();

print("gstate reset successful");

?>