<?php

$uname = $_GET["uname"];

echo '<html>
  <head>
    <style>
      h1{text-align:center;}
      h3{text-align:right;}
      b1{text-align:right;}
      td{font-size:50;}
    </style>
    <script src="../lib/jquery-1.10.2.min.js"></script>
    <script src="server_requests.js"></script>
    <script src="jquery_stuff.js"></script>
    <style type="text/css"></style></head>
  <body style="">
    <h1>Game Board</h1>
    <h3>
    <a href="main.php?uname='.$uname.'" onclick="reset_user_data()">home</a>
    </h3>
    <button id="b1" onclick="search()">search for game</button>
    <p id="search"></p>
    <p id="start_game"></p>
    <p id="err"></p>
    <p id="uname">'.$uname.'</p>
    <p id="tbl"></p>
    <div id="board" style="display: block;">
      <center>
	<table border="1" cellspacing="0">
	  <tbody>
	    <tr>
	      <td id="c0" height="100" width="100" align="center" valign="center">&nbsp;</td>
	      <td id="c1" height="100" width="100" align="center" valign="center">&nbsp;</td>
	      <td id="c2" height="100" width="100" align="center" valign="center">&nbsp;</td>
	    </tr>
	    <tr>
	      <td id="c3" height="100" width="100" align="center" valign="center">&nbsp;</td>
	      <td id="c4" height="100" width="100" align="center" valign="center">&nbsp;</td>
	      <td id="c5" height="100" width="100" align="center" valign="center">&nbsp;</td>
            </tr>
	    <tr>
	      <td id="c6" height="100" width="100" align="center" valign="center">&nbsp;</td>
	      <td id="c7" height="100" width="100" align="center" valign="center">&nbsp;</td>
	      <td id="c8" height="100" width="100" align="center" valign="center">&nbsp;</td>
            </tr>
	  </tbody>
	</table>
      </center>
    </div>
  </body>
</html>';
?>