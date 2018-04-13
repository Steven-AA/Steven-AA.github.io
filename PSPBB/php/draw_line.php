<?php 
$id=$_POST["id"];
$starttime=$_POST["starttime"];
$endtime=$_POST["endtime"];
header("Access-Control-Allow-Origin: *"); 
header("Content-Type: application/json; charset=UTF-8"); 
$conn = new mysqli("127.0.0.1", "root", "slxSLX123", "bddata",3306); 
$result = $conn->query("SELECT Location FROM data where id='{$id}' AND Local_Time between STR_TO_DATE('{$starttime}','%Y-%m-%d %H:%i:%s') and STR_TO_DATE('{$endtime}','%Y-%m-%d %H:%i:%s')"); 
$css=$result->fetch_all();  
//以json的格式发送ajax的success中由data接收  
echo json_encode($css);  
$conn->close();
?> 
