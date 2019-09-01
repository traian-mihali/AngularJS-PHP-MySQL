<?php

include_once "dbConnection.php";

$data = json_decode(file_get_contents("php://input"));

$departmentsQuery = "SELECT * FROM departments";

$departments = $connection->query($departmentsQuery)->fetchAll();


$query = "SELECT * FROM offices WHERE office_id IN (
    SELECT office_id FROM department_offices
    WHERE department_id = ?
);";

$stmt = $connection-> prepare($query);


$output = [];
foreach ($departments as $department) {
    $stmt->execute(array($department['department_id']));
    $response = $stmt->fetchAll();
    $department['offices'] = $response;
    $output[] = $department;
}


// echo var_dump($output);
echo json_encode($output);
