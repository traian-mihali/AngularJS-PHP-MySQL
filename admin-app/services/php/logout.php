<?php

session_start();

$_SESSION = array();

if (ini_get("session.use_cookies")) {
    $params = session_get_cookie_params();
    setcookie(session_name(), "", time() - 42000, $params['path'], $params["secure"], $params["domain"], $params["httponly"]);
}


echo json_encode($_SESSION);
session_destroy();
