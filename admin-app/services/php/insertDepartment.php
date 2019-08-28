<?php

include_once "dbConnection.php";

$data = json_decode(file_get_contents("php://input"));

$departmentName = $data->name;
$ids = $data->officeIds;

if ($departmentName) {
    $query = "INSERT INTO departments (name) VALUES ('$departmentName')";
    
    if ($connection->query($query)) {
        $departmentId = $connection->lastInsertId();

        $secondQuery = "SELECT office_id FROM offices WHERE office_name IN (:ids)";
        $stmt = $connection->prepare($secondQuery);
        $offices = $stmt->execute(array(":ids" => implode(", " .$ids)));

        if ($offices) {
            try {
                $connection->beginTransaction();
    
                foreach ($offices as $office) {
                    $extra = "INSERT INTO department_offices VALUES (:departmentId, :officeId)";
                    $stmt = $connection->prepare($extra);
                    $stmt->execute(array(":departmentId" => $departmentId, ':officeId'=> intval($office)));
                }
    
                $connection->commit();
            } catch (PDOException $ex) {
                $connection->rollBack();
                echo $ex->getMessage();
            }
        }
        include_once "loadDepartments.php";
    }
}
