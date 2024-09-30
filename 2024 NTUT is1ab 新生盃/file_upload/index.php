<?php
    session_start();

    if (!isset($_SESSION['uid'])) {
        $new_uid = uniqid();
        $_SESSION['uid'] = $new_uid;
    }

    $uid = $_SESSION['uid'];

    if(isset($_FILES['file'])){
        $file = $_FILES['file'];

        if( preg_match('/h/i', $file['name']) !== 0
        || preg_match('/h/i', file_get_contents($file['tmp_name'])) !== 0
        || $file['size'] > 0x100
        ){ die("Bad file!"); }
        
        $uploadpath = 'upload/'.md5($uid).'/';
        @mkdir($uploadpath);
        @system("echo 'Forbidden' > $uploadpath/index.php");
        move_uploaded_file($file['tmp_name'], $uploadpath.$file['name']);

        Header("Location: ".$uploadpath.$file['name']);
        die("Upload success!");
    }
    highlight_file(__FILE__);
?>

<form method=POST enctype=multipart/form-data>
  <input type=file name=file>
  <input type=submit value=Upload>
</form>