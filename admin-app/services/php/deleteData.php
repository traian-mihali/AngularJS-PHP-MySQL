<?php

include_once 'dbConnection.php';

$info = json_decode(file_get_contents("php://input"));

$table = $info->table;
$key = $info->key;
$value = $info->value;

$query = "DELETE FROM $table WHERE $key = $value";

if ($connection->query($query)) {
    switch ($table) {
        case "departments":
            include_once 'loadDepartments.php';
            return;
        case "employees":
            include_once "loadEmployees.php";
            return;
        default:
            include_once 'loadData.php';
    }
}
