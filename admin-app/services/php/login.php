<?php

include_once 'dbConnection.php';

session_start();

$form_data = json_decode(file_get_contents("php://input"));
$validation_error = "";

if (empty($form_data->email)) {
    $error[] = "Email is required";
} else {
    if (!filter_var($form_data->email, FILTER_VALIDATE_EMAIL)) {
        $error[] = "Invalid Email Format";
    } else {
        $data[':email'] = $form_data->email;
    }
}

if (empty($form_data->password)) {
    $error[] = "Password is required";
}

if (empty($error)) {
    $query = "SELECT * FROM users WHERE email = :email";
    
    $prepared = $connection->prepare($query);
    if ($prepared->execute($data)) {
        $result = $prepared->fetchAll();

        if ($prepared->rowCount() > 0) {
            foreach ($result as $row) {
                if (password_verify($form_data->password, $row['password'])) {
                    $_SESSION["name"] = $row["name"];
                } else {
                    $validation_error = "Invalid Password";
                }
            }
        } else {
            $validation_error = "Invalid Email";
        }
    }
} else {
    $validation_error = implode(", ", $error);
}

$_SESSION['email'] = $form_data->email;

$output = array('error'=> $validation_error, 'session_data'=> $_SESSION);

echo json_encode($output);
