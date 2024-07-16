<?php
require_once 'config.php';
session_start();

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $action = get_post_param('action', '');
    $username = get_post_param('username', '');
    $password = get_post_param('password', '');
    $url = get_post_param('url', '');
    $id = get_post_param('id', '');

    if ($action == 'register') {
        $pdo = get_pdo();
        $stmt = $pdo->prepare("SELECT * FROM users WHERE username =?");
        $stmt->execute([$username]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user) {
            echo 'Username exists!';
            exit;
        }

        $stmt = $pdo->prepare("INSERT INTO users (username, password) VALUES (?,?)");
        $stmt->execute([$username, $password]);

        echo 'Register!';
    } else if ($action == 'login') {
        $pdo = get_pdo();
        $stmt = $pdo->prepare("SELECT * FROM users WHERE username =? and password =?");
        $stmt->execute([$username, $password]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user) {
            $_SESSION['user_id'] = $user['id'];
            echo 'login!';
            exit;
        } else {
            echo 'Invalid username or password.';
        }
    } else if ($action == 'insert') {
        if ($_SESSION['user_id']) {
            $user_id = $_SESSION['user_id'];

            if (!preg_match('/^https?:\/\//i', $url)) {
                echo 'Must start with https:// or https://';
                exit;
            }

            $pdo = get_pdo();
            $stmt = $pdo->query("INSERT INTO urls (url, user_id) VALUES ('$url', '$user_id')");

            if ($stmt) {
                echo 'Insert!';
            } else {
                echo 'Failed to insert!';
            }
        } else {
            echo 'Login first!';
        }
    } else if ($action == 'delete') {
        if ($_SESSION['user_id']) {
            $user_id = $_SESSION['user_id'];
            $pdo = get_pdo();
            $stmt = $pdo->prepare("DELETE FROM urls where id=? and user_id=?");
            $stmt->execute([$id, $user_id]);

            if ($stmt->rowCount() > 0) {
                echo 'Delete!';
            } else {
                echo 'Failed to delete!';
            }
        } else {
            echo 'Login first!';
        }
    }
} else {
    header('Location: index.php');
}
?>