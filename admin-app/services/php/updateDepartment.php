<?php

include_once "dbConnection.php";

$data = json_decode(file_get_contents("php://input"));

// $ids = $data->officeIds;

// $query = "UPDATE departments SET name = ('$data->name')";

// echo var_dump("ids".$ids);
// echo var_dump("$query".$query);
    
// if ($connection->query($query)) {
//     $secondQuery = "SELECT office_id FROM offices WHERE office_name IN ( :id)";
//     $stmt = $connection->prepare($secondQuery);
//     $offices = $stmt->execute(array(":ids" => implode(", " .$ids)));

//     if ($offices) {
//         foreach ($offices as $office) {
//             $extra = "INSERT INTO department_offices VALUES (:departmentId, :officeId)";
//             $stmt = $connection->prepare($extra);
//             $stmt->execute(array(":departmentId" => $departmentId, ':officeId'=> intval($office)));
//         }
//     }
// }

echo json_encode($data);
