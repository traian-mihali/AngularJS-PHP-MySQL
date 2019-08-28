<?php

include_once "dbConnection.php";

$data = json_decode(file_get_contents("php://input"));


$monthYear = $data->monthYear;
$grossIncome = $data->grossIncome;
$employee = intval($data->employee);

$date = str_replace('/', '-', $data->monthYear);
$monthYear = date("Y-m-d", strtotime($date));

$query = "SELECT employee_id FROM employees LEFT JOIN monthly_income mi USING(employee_id) WHERE CONCAT(first_name + ' ' + last_name) = '$employee' AND mi.gross_income IS NULL";
$result = $connection->query($query)->fetch();

if ($result) {
    $employeeId = implode('|', $result);
    $secondQuery = "INSERT INTO monthly_income (month_year, gross_income, employee_id) VALUES (DATE_ADD('$monthYear', INTERVAL 1 DAY), '$grossIncome', '$employeeId')";
    if ($connection->query($secondQuery)) {
        include "loadSalaries.php";

        $output = "Data Successfully Inserted";
    } else {
        $output = "Something failed";
    }
} else {
    $output = "Employee Not Found";
}


echo json_encode($output);
