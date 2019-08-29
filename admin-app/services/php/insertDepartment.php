<?php

include "dbConnection.php";

$data = json_decode(file_get_contents("php://input"));

$departmentName = $data->name;
$ids = $data->officeIds;

if ($departmentName) {
    $query = "INSERT INTO departments (name) VALUES ('$departmentName')";
    
    if ($connection->query($query)) {
        $departmentId = $connection->lastInsertId();

        $secondQuery = "SELECT office_id FROM offices WHERE office_id IN (:ids)";
        $stmt = $connection->prepare($secondQuery);
        $offices = $stmt->execute(array(":ids" => implode(", " .$ids)));

        echo "$OFFICES ".var_dump($offices);
        if ($offices) {
            foreach ($offices as $office) {
                $extra = "INSERT INTO department_offices VALUES (':departmentId', ':officeId')";
                $stmt = $connection->prepare($extra);
                $stmt->execute(array(":departmentId" => $departmentId, ':officeId'=> intval($office)));
                echo "inserting into deportment_offices".$office;
            }
        }
        include_once "loadDepartments.php";
    }
} else {
    echo "Error: Invalid Department Provided";
}

echo json_encode($data);
