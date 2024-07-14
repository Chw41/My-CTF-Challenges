<?php

define('MYSQL_HOST', 'mysql');
define('MYSQL_USER', 'web_user');
define('MYSQL_PASSWORD', 'n%6GZgt*hH[+p7vJ');
define('MYSQL_DATABASE', 'web');

$GLOBALS['_pdo'] = false;

function get_pdo()
{
    if ($GLOBALS['_pdo']) {
        return $GLOBALS['_pdo'];
    }
    try {
        $pdo = new PDO(
            'mysql:host=' . MYSQL_HOST . ';dbname=' . MYSQL_DATABASE . ';charset=utf8mb4',
            MYSQL_USER,
            MYSQL_PASSWORD,
            array(
                PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES \'utf8mb4\' COLLATE \'utf8mb4_unicode_ci\';',
                PDO::ATTR_TIMEOUT => 2
            )
        );
        $GLOBALS['_pdo'] = $pdo;
    } catch (Exception $e) {
        http_response_code(500);
        die("Failed to connect database. Please contact the administrtor.");
    }
    return $pdo;
}

function get_post_param($key, $default = null)
{
    if (isset($_POST[$key])) {
        return $_POST[$key];
    } else {
        return $default;
    }
}

function get_get_param($key, $default = null)
{
    if (isset($_GET[$key])) {
        return $_GET[$key];
    } else {
        return $default;
    }
}