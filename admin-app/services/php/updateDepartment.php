<?php

include_once "dbConnection.php";

$data = json_decode(file_get_contents("php://input"));

$name = $data->name;
$office_names = $data->offices;
$department_id = $data->departmentId;
$office_ids = $data->officeIds;


$first_query = "UPDATE departments SET name = '$name' WHERE department_id = '$department_id' ";

if ($connection->query($first_query)) {
    // $place_holders = implode(",", array_fill(0, count($office_names), '?'));
    // $second_query = "SELECT office_id FROM offices WHERE office_name IN ($place_holders)";
    // $stmt = $connection->prepare($second_query);
    // $stmt->execute($office_names);
    // $office_Ids = $stmt->fetchAll();

    $deleteQuery = "DELETE FROM department_offices WHERE department_id = '$department_id'";
    $connection->query($deleteQuery);

    $many = "INSERT INTO department_offices VALUES (?, ?)";
    $stmt = $connection->prepare($many);

    foreach ($office_ids as $office_id) {
        $stmt->execute(array($department_id, intval($office_id)));
    }

    include_once "loadDepartments.php";
}
