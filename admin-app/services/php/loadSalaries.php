<?php

include_once "dbConnection.php";

$data = json_decode(file_get_contents("php://input"));

$query = "SELECT mi.monthly_income_id, mi.gross_income, DATE_FORMAT(month_year, '%Y %M') as month_year, concat(e.first_name, ' ', e.last_name) AS full_name, e.employee_id FROM monthly_income mi RIGHT JOIN employees e USING(employee_id) WHERE month_year IS NOT NULL ORDER BY month_year DESC";

$output = $connection->query($query)->fetchAll();

echo json_encode($output);
