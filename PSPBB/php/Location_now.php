<?php 
$id=$_POST["id"];
header("Access-Control-Allow-Origin: *"); 
header("Content-Type: application/json; charset=UTF-8"); 
$conn = new mysqli("127.0.0.1", "root", "slxSLX123", "bddata",3306); 
$result = $conn->query("SELECT * FROM data where id='{$id}'and LocalTime=
(select max(LocalTime) from data where id='{$id}')"); 
$rs=$result->fetch_array(MYSQLI_ASSOC);  
echo json_encode($rs);  
$conn->close();
?> 