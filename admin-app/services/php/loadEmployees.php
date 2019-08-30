<?php

include_once "dbConnection.php";

$query = 'SELECT 
    employee_id, 
    first_name, 
    last_name, 
    email, 
    birthdate, 
    is_manager, 
    o.office_name, 
    d.name
FROM employees 
LEFT JOIN departments d USING(department_id)
LEFT JOIN offices o USING (office_id)
ORDER BY employee_id DESC';

$output = $connection->query($query)->fetchAll();

echo json_encode($output);
