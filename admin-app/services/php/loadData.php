<?php

include_once "dbConnection.php";

$info = json_decode(file_get_contents("php://input"));

$table = $info->table;

$query = "SELECT * FROM $table";

$output = $connection->query($query)->fetchAll();

echo json_encode($output);
