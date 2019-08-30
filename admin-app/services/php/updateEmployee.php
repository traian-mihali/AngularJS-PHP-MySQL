<?php

include_once "dbConnection.php";

$data = json_decode(file_get_contents("php://input"));


$employee_id = $data->employee_id;
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


$query = "UPDATE employees SET first_name = '$first_name', last_name = '$last_name', email = '$email', birthdate = '$birthdate', is_manager = '$manager', office_id = '$office_id', department_id = '$department_id' WHERE employee_id = '$employee_id'";

$output = new stdClass();
if ($connection->query($query)) {
    $output->success = "Data Successfully Updated";
    echo json_encode($output);
}
