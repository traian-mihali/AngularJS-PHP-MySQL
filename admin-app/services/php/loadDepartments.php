<?php

include_once "dbConnection.php";

$data = json_decode(file_get_contents("php://input"));

$query = "SELECT * FROM departments
LEFT JOIN department_offices USING (department_id)
LEFT JOIN offices o USING (office_id)
GROUP BY department_id, office_id";


$output = $connection->query($query)->fetchAll();

echo json_encode($output);
