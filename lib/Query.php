<?php
/*Query.php: Takes a query string as an argument for the
	     constructor and provides methods to execute,
	     and then methods to operate on the result ie.
	     (get the number of row and columns / get a 
	     specific row)

	     Example:
		      $q = new Query("Select * From Employees");
		      $q->execute();
		      $result = $q->getResult();
*/ 


class Query{
      private $server = "localhost";
      private $db_uname = "root";
      private $db_password = "";
      private $database = "ttt";
      private $query= "";
      private $result = "";

      function Query($query){
      	       $this->query = $query;
      }

      function execute(){//[s.1]
      	   if($this->query == ""){
	           return -1;
	       }
	       $conn = mysql_connect($this->server,$this->db_uname, $this->db_password) or 
				die("Unable to connect to MySQL server");
	       mysql_select_db($this->database) or die("Unable to select database");
	       
	       $this->result = mysql_query($this->query) or die("failed query");
	       mysql_close($conn);
	       
	       return 0;
      }

      //return result object
      function getResult(){//[s.2]
      	   //to make sure we're at the beginning
      	   mysql_data_seek($this->result,0);
      	   return $this->result;
      }
      
      //return row object
      function getRow($index) {//[s.3]
      	   $res = $this->result;
	       mysql_data_seek($res,$index);
	       $ret = mysql_fetch_array($res);
	       return $ret;
      }

      function numColumns(){//[s.4]
      	   if($this->result == "") {
	           return -1;
	       }
      	   return mysql_num_fields($this->result);
      }

      function numRows(){//[s.5]
      	    if($this->result == ""){
	          return -1;
	        }
      	   	return mysql_num_rows($this->result);
      }
      
      //if you want to print output to a browser window      
      function printIt(){//[s.6]
			$num_cols = mysql_num_fields($this->result);
	  		$num_rows = mysql_num_rows($this->result);
	       	print("<h3>");
	       	//print field names
	       	print("<pre>");
	    for($i=0;$i<$num_cols;$i++){
			print(mysql_field_name($this->result,$i));
			print("\t");
		}
		print("</pre>");
		print("</h3>");
		print("<p>");
		print("<pre>");
		mysql_data_seek($this->result,0);
		for($i=0;$i<$num_rows;$i++){
			$row = mysql_fetch_row($this->result);
			for($j=0;$j<$num_cols;$j++){
				print($row[$j]);
				print("\t");
		         
			}
			print("<br>");
		}
		print("</pre>");
		print("</p>");
	}
}			

?>
