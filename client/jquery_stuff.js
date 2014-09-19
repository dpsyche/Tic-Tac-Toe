window.onerror=function(msg, url, linenumber){
    alert('Error message: '+msg+'\nURL: '+url+'\nLine Number: '+linenumber)
    return true
}

    $(document).ready(function(){//[c.6]
	    $("#board").hide();
	    $("#uname").hide();
	    $("#tbl").hide();
	    $("#c0").click(function(){
                    makeMove(0);
                });
	    $("#c1").click(function(){
		    makeMove(1);
		});
	    $("#c2").click(function(){
                    makeMove(2);
                });
	    $("#c3").click(function(){
                    makeMove(3);
                });
	    $("#c4").click(function(){
                    makeMove(4);
                });
	    $("#c5").click(function(){
                    makeMove(5);
                });
	    $("#c6").click(function(){
                    makeMove(6);
                });
	    $("#c7").click(function(){
                    makeMove(7);
                });
	    $("#c8").click(function(){
                    makeMove(8);
                });
	});
