<?php

include_once "dbConnection.php";

$data = json_decode(file_get_contents("php://input"));



echo json_encode($data);
