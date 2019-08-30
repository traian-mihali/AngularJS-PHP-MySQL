<?php

include_once "dbConnection.php";

$data = json_decode(file_get_contents("php://input"));

$first_name = $data->first_name;
$last_name = $data->last_name;
$email = $data->email;


$date = str_replace('/', '-', $data->birthdate);
$birthdate = date(
    "Y-m-d",
    strtotime($date)
);
$manager = $data->is_manager;
$office_id = $data->office_id;
$department_id = $data->department_id;


$query = "INSERT INTO employees (first_name, last_name, email, birthdate, is_manager, office_id, department_id) VALUES ('$first_name', '$last_name', '$email', DATE_ADD('$birthdate', INTERVAL +1 DAY), '$manager', '$office_id', '$department_id')";

$output = new stdClass();
if ($connection->query($query)) {
    $output->success = "Successfully Inserted an employee.";
} else {
    $output->error = "Invalid data provided.";
}

echo json_encode($output);
