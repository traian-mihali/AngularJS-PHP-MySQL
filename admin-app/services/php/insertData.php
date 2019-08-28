<?php

include_once "dbConnection.php";

$data = json_decode(file_get_contents("php://input"));

$table = $data->table;
$key = $data->key;
$value = $data->value ? $data->value  : null;

if ($value) {
    $query = "INSERT INTO $table ($key) VALUES ('$value')";
    if ($connection->query($query)) {
        $newQuery = "SELECT * FROM $table ORDER BY '$key' DESC";
        $output = $connection->query($newQuery)->fetchAll();
    }
} else {
    $output->error = "No Value has been provided.";
}

echo json_encode($output);
