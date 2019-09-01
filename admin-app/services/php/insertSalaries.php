<?php

include_once "dbConnection.php";

$data = json_decode(file_get_contents("php://input"));

$monthYear = $data->monthYear;
$grossIncome = $data->grossIncome;
$employeeId = $data->employeeId;

$date = str_replace('/', '-', $data->monthYear);
$newDate = new Datetime($date);
$newDate->modify('+ 1 Day');
// $newDate->format("Y-m-d");
// $monthYear = date("Y-m-d", strtotime($newDate));

$newMonthYear = $newDate->format("Y-m-d");

$query = "SELECT month_year, employee_id FROM monthly_income WHERE month_year = '$newMonthYear' AND employee_id = '$employeeId'";
$salaries = $connection->query($query)->fetchAll();

if (count($salaries) === 0) {
    $query = "INSERT INTO monthly_income (month_year, gross_income, employee_id) VALUES ('$newMonthYear', '$grossIncome', '$employeeId')";
    
    if ($connection->query($query)) {
        include_once "loadSalaries.php";
    } else {
        echo json_encode(["error" => "Query for inserting the data failed"]);
    }
} else {
    echo json_encode(["error" => "There is a month already set"]);
}
