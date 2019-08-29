<?php

include "dbConnection.php";

$data = json_decode(file_get_contents("php://input"));

$name = $data->name;
$ids = $data->officeIds;
$output = "";

if ($name) {
    $query = "INSERT INTO departments (name) VALUES ('$name')";
    
    if ($connection->query($query)) {
        $department_id = $connection->lastInsertId();

        $secondQuery = "SELECT office_id FROM offices WHERE office_id IN (:ids)";
        
        if (is_array($ids)) {
            $stmt = $connection->prepare($secondQuery);
            $offices = $stmt->execute(array(":ids" => implode(", ", $ids)));
            
            if (is_array($offices)) {
                foreach ($offices as $office) {
                    $extra = "INSERT INTO department_offices VALUES (':department_id', ':office_id')";
                    $stmt = $connection->prepare($extra);
                    $stmt->execute(array(":department_id" => $department_id, ':office_id'=> intval($office)));
                    echo "inserting into deportment_offices".$office;
                }
            }
        } else {
            $output = "Error: Office Ids are not stored into an array";
        }
    } else {
        $output = "Error: Query Failed";
    }
} else {
    $output = "Error: Department name was not provided";
}

include_once "loadDepartments.php";
echo json_encode($output);
