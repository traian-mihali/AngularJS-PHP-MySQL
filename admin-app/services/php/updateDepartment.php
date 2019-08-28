<?php

include_once "dbConnection.php";

$data = json_decode(file_get_contents("php://input"));

$ids = $data->officeIds;

    $query = "UPDATE departments (name) SET name = ('$data->name')";
    
    if ($connection->query($query)) {
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
    }
