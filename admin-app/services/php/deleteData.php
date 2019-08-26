<?php

include_once 'dbConnection.php';

$info = json_decode(file_get_contents("php://input"));

$table = $info->table;
$key = $info->key;
$value = $info->value;

$query = "DELETE FROM $table WHERE $key = $value";

if ($connection->query($query)) {
    $output = $connection->query("SELECT * FROM $table")->fetchAll();
}

echo json_encode($output);
