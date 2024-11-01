<?php

$config = include_once "config.php";

$servername = "localhost";
$username = "root";
$password = $config["password"];
$dbname = "library";

$conn = new mysqli(hostname: $servername,username: $username,password: $password,database: $dbname);

if($conn->connect_error){
    die("Connection Failed".$conn->connect_error);
}
