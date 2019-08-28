<?php

include_once "dbConnection.php";

$query = "SELECT employee_id, CONCAT(first_name, ' ', last_name) as full_name FROM employees WHERE employee_id NOT IN ( SELECT employee_Id FROM monthly_income) ORDER BY employee_id ASC";

$output = $connection->query($query)->fetchAll();

echo json_encode($output);
