<?php

include_once "dbConnection.php";

$query = 'SELECT 
    employee_id, 
    first_name, 
    last_name, 
    email, 
    birthdate, 
    is_manager, 
    s.monthly_gross_income, 
    o.office_name, 
    d.name
FROM employees 
LEFT JOIN departments d USING(department_id)
LEFT JOIN salaries s USING(salary_id)
LEFT JOIN offices o USING(office_id)';

$output = $connection->query($query)->fetchAll();

echo json_encode($output);
