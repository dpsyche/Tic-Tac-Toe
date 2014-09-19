/*server_requests.js created by Tim Bouvier on 11/29/2013
 contains a library of function calls to query the database
 for games / gamestate / updates
*/
window.onerror=function(msg, url, linenumber){
    alert('Error message: '+msg+'\nURL: '+url+'\nLine Number: '+linenumber)
    return true
}

/*GLOBALS*/
var update_timer;
var search_timer;
var user_active_timer;
/*END OF GLOBALS*/


//initial search for player and game board display
function search(){//[c.1]
    var xmlhttp;
    var uname = document.getElementById("uname").innerHTML;
    search_timer = window.setInterval(display_searching,300);
    if(window.XMLHttpRequest){
	xmlhttp = new XMLHttpRequest();
    }
    else{
	xmlhttp = new ActiveObject("Microsoft.XMLHttp");
    }
    
    xmlhttp.onreadystatechange = function(){
	if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
	    var ret = xmlhttp.responseText;
	    window.clearInterval(search_timer);
	    document.getElementById("search").innerHTML ="";
	    if(ret == "0"){
		document.getElementById("search").innerHTML = "No games available at this time, please try again..";
	    }
	    else{
		document.getElementById("search").innerHTML = "Found game, please start playing..";
		document.getElementById("tbl").innerHTML = ret;
		$("#board").show();
		$("#b1").hide();
		update_timer = window.setInterval(getIt,1000);
		user_active_timer = window.setInterval(check_game_active,1000);
	    }
	}
    }   
    xmlhttp.open("GET","../server/findNextSearching_2.php?uname="+uname,true);
    xmlhttp.send();
}

//function to update board when other player moves
function getIt(){//[c.2]
    var xmlhttp;
    var uname = document.getElementById("uname").innerHTML;
    var tbl = document.getElementById("tbl").innerHTML;
    if(window.XMLHttpRequest){
	xmlhttp = new XMLHttpRequest();
    }
    else{
	xmlhttp = new ActiveObject("Microsoft.XMLHttp");
    }

    xmlhttp.onreadystatechange = function(){
	if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
	    if(xmlhttp.responseText != "failed query"){
		var jsonResponse = JSON.parse(xmlhttp.responseText);
		var count=0;
		//loop through response array and update board
		for(i=0;i<9;i++){
		    if(jsonResponse[i]!=uname && jsonResponse[i]!=""){
			document.getElementById("c"+i).innerHTML = "O";
		    }
		    if(jsonResponse[i] != ""){
			count++;
		    }
		}
		
		//check if we have a winning game + kill board updates if so
		if(jsonResponse[9] != "play_on" || count == 9){
		    window.clearInterval(update_timer);
		    if(count==9 && jsonResponse[9]=="play_on"){
			document.getElementById("err").innerHTML = "GAME OVER, TIE GAME";
			addTie();
			alert("Game Over, tie game!");
			prompt_play_again();
		    }
		    else if(jsonResponse[9] == uname){
			document.getElementById("err").innerHTML = "GAME OVER, YOU WON!";
			addWin();
			alert("Game Over, you won!");
			prompt_play_again();
		    }
		    else{
			document.getElementById("err").innerHTML = "GAME OVER, YOU LOST!";
			addLoss();
			alert("Game Over, you lost!");
			prompt_play_again();
		    }
		    drop_gstate_tbl();
		}
	    }
	    
	}   
	
    }

    xmlhttp.open("GET","../server/pollMove_2.php?uname="+uname+"&tbl="+tbl,true);
    xmlhttp.send();
}

function addWin(){//[c.7]
    var xmlhttp;
    var uname = document.getElementById("uname").innerHTML;
    if(window.XMLHttpRequest){
	xmlhttp = new XMLHttpRequest();
    }
    else{
	xmlhttp = new ActiveObject("Microsoft.XMLHttp");
    }
    xmlhttp.onreadystatechange = function(){
	if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
	}
    }
    xmlhttp.open("GET","../server/addWin.php?uname="+uname,true);
    xmlhttp.send();
}

function addTie(){//[c.8]
    var xmlhttp;
    var uname =document.getElementById("uname").innerHTML;
    if(window.XMLHttpRequest){
        xmlhttp = new XMLHttpRequest();
    }
    else{
        xmlhttp = new ActiveObject("Microsoft.XMLHttp");
    }
    xmlhttp.onreadystatechange = function(){
	if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
	}
    }
    xmlhttp.open("GET","../server/addTie.php?uname="+uname,true);
    xmlhttp.send();
}

function addLoss(){//[c.9]
    var xmlhttp;
    var uname =document.getElementById("uname").innerHTML;
    if(window.XMLHttpRequest){
        xmlhttp = new XMLHttpRequest();
    }
    else{
        xmlhttp = new ActiveObject("Microsoft.XMLHttp");
    }
    xmlhttp.onreadystatechange = function(){
	if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
	}
    }
    xmlhttp.open("GET","../server/addLoss.php?uname="+uname,true);
    xmlhttp.send();
}

function prompt_play_again(){//[c.10]
    var uname = document.getElementById("uname").innerHTML;

    if(confirm("Do you want to play again?")){
	//clear the board
	for(i=0;i<9;i++){
	    document.getElementById("c"+i).innerHTML = "&nbsp;";
	}
	document.getElementById("err").innerHTML = "";
	$("#board").hide();
	$("#b1").show();
	search();
    }
    else{
	window.location.replace("main.php?uname="+uname);
    }
}

function reset_game_state(){
    var xmlhttp;
    var uname = document.getElementById("uname").innerHTML;
    var tbl = document.getElementById("tbl").innerHTML;
    if(window.XMLHttpRequest){
	xmlhttp = new XMLHttpRequest();
    }
    else{
	xmlhttp = new ActiveObject("Microsoft.XMLHttp");
    }
    xmlhttp.onreadystatechange = function(){
	if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
	}
    }
    xmlhttp.open("GET","../server/reset_game_state.php?uname="+uname+"&tbl="+tbl,true);
    xmlhttp.send();
}

function makeMove(coor){//[c.3]
    var xmlhttp;
    var uname = document.getElementById("uname").innerHTML;
    var coordinate = coor;
    var tbl = document.getElementById("tbl").innerHTML;
    if(window.XMLHttpRequest){
        xmlhttp = new XMLHttpRequest();
    }
    else{
        xmlhttp = new ActiveObject("Microsoft.XMLHttp");
    }
    
    xmlhttp.onreadystatechange = function(){
        if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
            var ret = xmlhttp.responseText;
	    //alert("server sent back "+ret);
	    if(ret == "0"){
		document.getElementById("err").innerHTML = "Invalid Move!";
	    }
	    else if(ret == "1"){
		document.getElementById("err").innerHTML = "";
		document.getElementById("c"+coordinate).innerHTML = "X";
	    }
	    else{
		document.getElementById("err").innerHTML = "GAME OVER";
	    }
        }
    }
    
    xmlhttp.open("GET","../server/makeMove_2.php?coordinate="+coordinate+"&uname="+uname+"&tbl="+tbl,true);
    xmlhttp.send();
}

function drop_gstate_tbl(){//[c.4]
    var xmlhttp;
    var uname = document.getElementById("uname").innerHTML;
    var tbl = document.getElementById("tbl").innerHTML;
    if(window.XMLHttpRequest){
        xmlhttp = new XMLHttpRequest();
    }
    else{
        xmlhttp = new ActiveObject("Microsoft.XMLHttp");
    }
    xmlhttp.onreadystatechange = function(){
	if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
	}
    }
    //alert("check before sending request to drop table");
    xmlhttp.open("GET","../server/drop_gstate_tbl.php?tbl="+tbl,true);
    xmlhttp.send();
}

function reset_user_data(){//[c.11]
    var uname = document.getElementById("uname").innerHTML;
    var xmlhttp;
    if(window.XMLHttpRequest){
	xmlhttp = new XMLHttpRequest();
    }
    else{
        xmlhttp = new ActiveObject("Microsoft.XMLHttp");
    }
    xmlhttp.onreadystatechange = function(){
        if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
        }
    }
    xmlhttp.open("GET","../server/reset_player_status.php?uname="+uname,true);
    xmlhttp.send();
}

function check_game_active(){//[c.12]
    var uname = document.getElementById("uname").innerHTML;
    var xmlhttp;
    if(window.XMLHttpRequest){
        xmlhttp = new XMLHttpRequest();
    }
    else{
        xmlhttp = new ActiveObject("Microsoft.XMLHttp");
    }
    xmlhttp.onreadystatechange = function(){
        if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
	    var ret = xmlhttp.responseText;
	    
	    if(ret == "GAME_INACTIVE"){
		window.clearInterval(user_active_timer);
		alert("player 2 left the game!");
		drop_gstate_tbl();
		reset_user_data();
		prompt_play_again();
	    }
        }
    }
    xmlhttp.open("GET","../server/poll_opp_active.php?uname="+uname,true);
    xmlhttp.send();
}


function display_searching(){//[c.5]
    var current_display = document.getElementById("search").innerHTML;
    
    if(current_display == "" || current_display == "searching"){
	document.getElementById("search").innerHTML = "searching .";
    }
    else if(current_display == "searching ."){
	document.getElementById("search").innerHTML = "searching . .";
    }
    else if(current_display == "searching . ."){
	document.getElementById("search").innerHTML = "searching . . .";
    }
    else{
	document.getElementById("search").innerHTML = "searching";
    }

}