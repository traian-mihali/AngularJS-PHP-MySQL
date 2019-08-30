<?php

include_once "dbConnection.php";

$data = json_decode(file_get_contents("php://input"));


$monthYear = $data->monthYear;
$grossIncome = $data->grossIncome;
$employeeId = $data->employeeId;

$date = str_replace('/', '-', $data->monthYear);
$monthYear = date("Y-m-d", strtotime($date));


$query = "INSERT INTO monthly_income (month_year, gross_income, employee_id) VALUES (DATE_ADD('$monthYear', INTERVAL 1 DAY), '$grossIncome', '$employeeId')";

if ($connection->query($query)) {
    include_once "loadSalaries.php";
} else {
    echo "Query for inserting the data failed";
}
