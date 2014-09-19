
window.onerror=function(msg, url, linenumber){
    alert('Error message: '+msg+'\nURL: '+url+'\nLine Number: '+linenumber)
    return true
}

function sendIt(){
    var xmlhttp;
    var str = document.getElementById("REQ").value;
    //alert(str);
    //check support for XMLHttpRequest
    if(window.XMLHttpRequest){
	//alert("creating new XMLHTTP OBJECT!");
	xmlhttp = new XMLHttpRequest();
    }
    else{
	xmlhttp = new ActiveObject("Microsoft.XMLHTTP");
    }

    xmlhttp.onreadystatechange = function(){
	if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
	    //alert("hit readystatechange event!");
	    document.getElementById("disReply").innerHTML = xmlhttp.responseText;
	    //alert("redirecting to google.com");
	    //window.location.replace("http://google.com")
	}
    }
    //alert("sending request!");
    xmlhttp.open("GET","../server/getIt.php?q="+str,true);
    //alert("opened connection");
    xmlhttp.send();
    //alert("sent it!");
}