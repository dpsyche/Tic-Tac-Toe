<?php
  /*drop_gstate_tbl.php created by Tim Bouvier on 11/30/2013
  accepts client requests to drop the temporary gstate table
  at the end of a game.
  */
include "../lib/Query.php";

$tbl = $_GET["tbl"];

$query = new Query("DROP TABLE IF EXISTS ".$tbl.";");
$query->execute();

echo 1;

?>