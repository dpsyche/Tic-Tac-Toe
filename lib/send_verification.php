<?php
/*send_verification.php Created by Tim Bouvier on 11/30/2013
  creates and sends a verification email / webpage. Checks
  to see if mail server is running and sends accordingly.
*/

$uname = $_GET["uname"];
$ip_addr = $_SERVER["SERVER_ADDR"];
$sub = "TTT Gaming Corporation";

$msg = '<html>
          <body>
	    <h1>Congratulations</h1>
	    <h3>Your account was created successfully</h3>
	    <h5>username: '.$uname . '<br>
		email: '.$email_addr.'</h5>
            <a href="../index.html">back to main page</a>
	  </body>
	</html>';

$msg1 = "Congratulations! your account registration with TTT gaming coporation has been processed.\n
      	 \nThanks,\nTTT gaming corp.";

$ret = mail($email_addr,$sub,$msg1);

//check if mail was sent
if(!$ret){
    echo $msg;
}
else{
    echo 'Verification email has been sent to: '.$email_addr;
    echo '<br><a href="../index.html">back to main page</a>';
}

?>