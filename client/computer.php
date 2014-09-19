<?php


$uname = $_GET["uname"];

echo '
<html>
<head>
	<meta charset="utf-8" />
	<title>Tic Tac Toe</title>
	<script type="text/javascript" src="./ai_js/library.js"></script>
	<script type="text/javascript" src="./ai_js/main.js"></script>
	<div align="center">
	<a href="main.php?uname='.$uname.'"><b><font size="5">home</b></a>
	</div>
</head>
<body>
	<div id="ttt">loading……</div>
</body>
</html>';

?>