<?php

include_once "dbConnection.php";

$data = json_decode(file_get_contents("php://input"));
$name = $data->name;
$office_names = $data->offices;
$office_ids = $data->officeIds;


$firstQuery = "INSERT INTO departments (name) VALUES ('$name')";

if ($connection->query($firstQuery)) {
    $department_id = $connection->lastInsertId();

    // $place_holders = implode(",", array_fill(0, count($office_names), '?'));
    // $secondQuery = "SELECT office_id FROM offices WHERE office_name IN ($place_holders)";
    // $stmt = $connection->prepare($secondQuery);
    // $stmt->execute($office_names);
    // $office_ids = $stmt->fetchAll();
    
    $many = "INSERT INTO department_offices VALUES (?, ?)";
    $stmt = $connection->prepare($many);

    foreach ($office_ids as $office_id) {
        $stmt->execute(array($department_id, intval($office_id)));
    }

    include_once "loadDepartments.php";
}
