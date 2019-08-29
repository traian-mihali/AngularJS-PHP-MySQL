<?php

include_once "dbConnection.php";

$data = json_decode(file_get_contents("php://input"));

$name = $data->name;
$officeNames = $data->offices;
$department_id = $data->departmentId;

$output = '';
$query = "UPDATE departments SET name = '$name' WHERE department_id = '$department_id' ";

echo var_dump($ids);
echo var_dump($query);
    
if ($connection->query($query)) {
    $secondQuery = "SELECT office_id FROM offices WHERE office_name IN ( :officeNames)";
    $stmt = $connection->prepare($secondQuery);
    $offices = $stmt->execute(array(":officeNames" => implode(", " .$officeNames)));

    if ($offices) {
        foreach ($offices as $office) {
            $extra = "INSERT INTO department_offices VALUES (:department_id, :office_id)";
            $stmt = $connection->prepare($extra);
            $stmt->execute(array(":department_id" => $department_id, ':office_id'=> intval($office)));
        }
    } else {
        $output = "No offices found";
    }
} else {
    $output = "Query Failed";
}

echo json_encode($output);
