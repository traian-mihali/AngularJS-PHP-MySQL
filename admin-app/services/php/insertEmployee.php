<?php

include_once "dbConnection.php";

$data = json_decode(file_get_contents("php://input"));


$office = $data->office_name;
$name = $data->name;
$monthly_gross_income = $data->monthly_gross_income;


$office_query = "SELECT office_id FROM offices WHERE office_name = '$office'";
$office_id = $connection->query($office_query)->fetch()["office_id"];

$department_query = "SELECT department_id FROM departments WHERE name = '$name'";
$department_id = $connection->query($department_query)->fetch()["department_id"];

$salary_query = "SELECT salary_id FROM salaries WHERE monthly_gross_income = '$monthly_gross_income'";
$salary_id = $connection->query($salary_query)->fetch()["salary_id"];


// $keys = array();
// $values = array();
// $error = array();
// foreach ($data as $key => $value) {
//     if (empty($value) && $key == "first_name") {
//         $error[] = "First Name is required.";
//     } elseif (empty($value) && $key == "last_name") {
//         $error[] = "Last Name is required.";
//     } elseif (empty($value) && $key == "email") {
//         $error[] = "Email is required.";
//     } else {
//         $values[] = $value;
//         $keys[] = $key;
//     }
// }

// $key = implode(", ", $keys);

$first_name = $data->first_name;
$last_name = $data->last_name;
$email = $data->email;

$date = str_replace('/', '-', $data->birthdate);
$birthdate = date(
    "Y-m-d",
    strtotime($date)
);
$manager = intval($data->is_manager);


$query = "INSERT INTO employees (first_name, last_name, email, birthdate, is_manager, salary_id, office_id, department_id) VALUES ('$first_name', '$last_name', '$email', '$birthdate', '$manager', '$salary_id', '$office_id', '$department_id')";

$output = $connection->query($query);

echo json_encode($output);
