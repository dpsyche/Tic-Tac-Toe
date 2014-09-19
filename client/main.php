<?php

$uname = $_GET["uname"];

echo '<html>
       <body>
       <center>
         <h1>Welcome, '.$uname.'</h1>
	 <img src="../images/ttt.jpeg" alt="ttt_img" width="304" height="114"><br>
	 <br><a href="board.php?uname='.$uname.'">Play Game</a><br>
	 <br><a href="leaderboard.php?uname='.$uname.'">Leaderboard</a><br>
	 <br><a href="accountInfo.php?uname='.$uname.'">Account Info</a><br>
	 <br><a href="computer.php?uname='.$uname.'">Play against Computer</a><br>
	 <br><a href="../lib/logout.php?uname='.$uname.'">Logout</a>
       </center>
       </body>
     </html>';
?>