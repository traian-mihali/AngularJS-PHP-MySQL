<?php

include_once "dbConnection.php";

$data = json_decode(file_get_contents("php://input"));


$grossIncome = $data->grossIncome;
$monthly_income_id = $data->monthly_income_id;

$date = str_replace('/', '-', $data->monthYear);
$monthYear = date(
    "Y-m-d",
    strtotime($date)
);

$secondQuery = "UPDATE monthly_income SET month_year = DATE_ADD('$monthYear', INTERVAL 1 DAY), gross_income = '$grossIncome' WHERE monthly_income_id = '$monthly_income_id'";

if ($connection->query($secondQuery)) {
    include_once "loadSalaries.php";
    $output = "Data Successfully Updated";
} else {
    $output = "Something failed";
}


echo json_encode($output);
