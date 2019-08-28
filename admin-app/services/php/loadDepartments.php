<?php

include_once "dbConnection.php";

$data = json_decode(file_get_contents("php://input"));

$query = "SELECT DISTINCT department_id, name, office_id, office_name FROM departments d LEFT JOIN department_offices do USING(department_id) LEFT JOIN offices o USING(office_id) GROUP BY department_id ORDER BY department_id ASC";


$output = $connection->query($query)->fetchAll();


echo json_encode($output);
