<?php

include_once "dbConnection.php";

$query = "INSERT INTO department_offices VALUES (?, ?)";

$stmt = $connection->prepare($query);

$departmentId = 79;
$officeId = 1;

$stmt->execute(array("?" => $departmentId, "?" => $officeId));
