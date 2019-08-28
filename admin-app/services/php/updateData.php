<?php

include_once "dbConnection.php";

$data = json_decode(file_get_contents("php://input"));

$table = $data->table;
$id = $data->id;
$key = $data->key;
$value = $data->value;

$query = "UPDATE $table SET $key = '$value' WHERE office_id = '$id'";

if ($connection->query($query)) {
    include_once 'loadData.php';
}
