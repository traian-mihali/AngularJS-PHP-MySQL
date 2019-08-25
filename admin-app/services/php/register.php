<?php

include_once 'dbConnection.php';

$form_data = json_decode(file_get_contents('php://input'));

$message = "";
$validation_error = "";

if (empty($form_data->email)) {
    $error[] = "Email is Required.";
} else {
    if (!filter_var($form_data->email, FILTER_VALIDATE_EMAIL)) {
        $error[] = "Invalid Email Format.";
    } else {
        $data[':email'] = $form_data->email;
    }
}

if (empty($form_data->password)) {
    $error[] = "Password is required.";
} else {
    $data[':password'] = password_hash($form_data ->password, PASSWORD_BCRYPT);
}

if (empty($form_data->name)) {
    $error[] = 'Name is Required.';
} else {
    $data[':name'] = $form_data->name;
}

if (empty($error)) {
    $query = "INSERT INTO users (email, password, name) VALUES(:email, :password, :name)";
    
    $prepared = $connection->prepare($query);
    if ($prepared->execute($data)) {
        $message = "Registration Completed.";
    }
} else {
    $validation_error = implode(", ", $error);
}

$output = array(
    "error" => $validation_error,
    "message" => $message
);

echo json_encode($output);
