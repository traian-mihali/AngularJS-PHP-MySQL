<?php

session_start();

$_SESSION = array();

if (init_get("session.use_cookies")) {
    $params = session_get_cookie_params();
    setcookie(session_name(), "", time() - 42000, $params['path'], $params["secure"], $params["domain"], $params["httponly"]);
}


session_destroy();
