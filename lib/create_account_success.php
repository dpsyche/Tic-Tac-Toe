<?php
  /*echo '<html><body><h1>Successfully created account</h1>
       <a href="../index.html">back to main page</a></body></html>';*/

  $email_addr = $_GET["email"];
  $uname = $_GET["uname"];

  //now call the script to send email / browser verification
  require "send_verification.php";
?>