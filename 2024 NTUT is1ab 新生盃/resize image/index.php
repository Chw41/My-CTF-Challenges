<?php

class Upload
{
    private $filename;
    private $uploadDir = 'uploads/';

    public function __construct($file)
    {
        if (strtolower(pathinfo($file['name'], PATHINFO_EXTENSION)) === 'php') {
            throw new \Exception('不允許上傳 PHP 文件。');
        }

        if (!is_dir($this->uploadDir)) {
            system("mkdir -p $this->uploadDir");
        }

        if ($file['tmp_name'] === "uploads/default.png") {
            return;
        }

        $this->filename = $this->uploadDir . uniqid() . '.' . pathinfo($file['name'], PATHINFO_EXTENSION);
        if (move_uploaded_file($file['tmp_name'], $this->filename)) {
            echo "文件已上傳: " . htmlspecialchars($this->filename) . "<br>";
        } else {
            throw new \Exception('文件上傳失敗。');
        }
    }

    public function createDefaultImage($path, $width, $height) {
        system("echo 'Default Image weight: $width height: $height' > $path");
    }
}

class Image
{
    private $path;
    private $width;
    private $height;

    public function __construct($path, $width, $height)
    {
        $this->path = $path;
        $this->width = $width;
        $this->height = $height;

        if (!$this->isImage()) {
            echo "Not an image.<br>";
            return;
        }

        echo "處理圖片: " . htmlspecialchars($this->path) . "，尺寸: $width x $height<br>";
    }

    private function isImage()
    {
        return @getimagesize($this->path) !== false;
    }

    public function output($path = null)
    {
        $filePath = $path ?? $this->path;

        if (file_exists($filePath)) {
            header('Content-Type: image/jpeg');
            readfile($filePath);
        } else {
            echo "文件不存在。<br>";
        }
    }

    public function __destruct()
    {
        if (!file_exists($this->path)) {
            $defaultFile = 'uploads/default.png';
            $upload = new Upload(['name' => 'default.png', 'tmp_name' => $defaultFile]);
            $upload->createDefaultImage($defaultFile, $this->width, $this->height);
            $this->output($defaultFile);
        } else {
            system("rm -rf $this->path");
        }
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_FILES['file'])) {
        try {
            $upload = new Upload($_FILES['file']);
            echo "文件上傳成功。<br>";
        } catch (\Exception $e) {
            echo $e->getMessage();
        }
    }

    if (isset($_POST['path'], $_POST['width'], $_POST['height'])) {
        $path = $_POST['path'];
        $width = intval($_POST['width']);
        $height = intval($_POST['height']);

        $image = new Image($path, $width, $height);
        $image->output();
    }
} else {
    highlight_file(__FILE__);
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Resize image</title>
</head>
<body>
    <form action="" method="POST" enctype="multipart/form-data">
        <label for="file">上傳文件：</label>
        <input type="file" name="file" id="file" required>
        <br>
        <button type="submit">上傳文件</button>
    </form>

    <form action="" method="POST">
        <label for="path">圖片路徑：</label>
        <input type="text" name="path" id="path" required>
        <br>
        <label for="width">寬度：</label>
        <input type="number" name="width" id="width" required>
        <br>
        <label for="height">高度：</label>
        <input type="number" name="height" id="height" required>
        <br>
        <button type="submit">處理圖片</button>
    </form>
</body>
</html>
